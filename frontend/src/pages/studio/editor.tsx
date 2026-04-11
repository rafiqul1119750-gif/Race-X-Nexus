// GOD LEVEL ENGINE (Optimized & Fixed)
import express from "express";
import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import { exec } from "child_process";
import fs from "fs";
import OpenAI from "openai";
import { Client, Storage, Databases, InputFile } from "appwrite";

const app = express();
app.use(express.json());

// Redis Connection
const connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379");
const queue = new Queue("render", { connection });

// Appwrite Setup
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT)
  .setKey(process.env.APPWRITE_KEY);

const db = new Databases(client);
const storage = new Storage(client);

// AI Setup
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ===== API ENDPOINTS =====

app.post("/render", async (req, res) => {
  const { projectId, prompt } = req.body;
  // Job add karte waqt hum unique ID dete hain taaki track ho sake
  const job = await queue.add("render-job", { projectId, prompt }, { removeOnComplete: true });
  res.json({ jobId: job.id });
});

app.get("/status/:id", async (req, res) => {
  const job = await queue.getJob(req.params.id);
  if (!job) return res.status(404).json({ error: "Job not found" });
  
  res.json({
    state: await job.getState(),
    progress: job.progress,
    result: job.returnvalue
  });
});

app.listen(3000, () => console.log("🚀 GOD ENGINE RUNNING ON PORT 3000"));

// ===== WORKER LOGIC (The Brain) =====

const worker = new Worker("render", async (job) => {
    const { projectId, prompt } = job.data;
    const tempFileName = `output_${job.id}.mp4`;

    try {
        let project = await getProject(projectId);
        
        job.updateProgress(10);

        // 🤖 AI Generation if prompt exists
        if (prompt) {
          const script = await generateScript(prompt);
          project = buildAIProject(script);
        }

        job.updateProgress(30);

        // 🎬 Render Process
        await renderPipeline(project, tempFileName);
        
        job.updateProgress(80);

        // ☁️ Upload to Appwrite
        const fileId = await uploadToAppwrite(tempFileName);

        // 🧹 Cleanup
        if (fs.existsSync(tempFileName)) fs.unlinkSync(tempFileName);

        job.updateProgress(100);
        return { fileId };

    } catch (error) {
        console.error("Worker Error:", error);
        if (fs.existsSync(tempFileName)) fs.unlinkSync(tempFileName);
        throw error;
    }
}, { connection });

// ===== CORE FUNCTIONS =====

async function getProject(id) {
  try {
    // Appwrite returns the document directly
    const doc = await db.getDocument("YOUR_DB_ID", "projects", id);
    return doc; 
  } catch (e) {
    return { duration: 5, tracks: [] };
  }
}

async function generateScript(prompt) {
  const res = await openai.chat.completions.create({
    model: "gpt-4", // Updated to stable gpt-4
    messages: [{ role: "user", content: `Create a short video script for: ${prompt}. Return only lines of text.` }],
  });
  return res.choices[0].message.content;
}

function buildAIProject(text) {
  const lines = text.split("\n").filter(l => l.trim() !== "");
  return {
    duration: lines.length * 3, // Har line ko 3 second diye
    tracks: [{
        type: "text",
        clips: lines.map((line, i) => ({
          text: line.replace(/'/g, ""), // Remove single quotes to prevent FFmpeg crash
          start: i * 3,
          end: (i + 1) * 3
        }))
    }]
  };
}

async function renderPipeline(project, outputFile) {
  return new Promise((resolve, reject) => {
    let inputs = [`-f lavfi -i color=c=black:s=360x640:d=${project.duration}`];
    let filters = [];
    let lastOutput = "[0:v]";

    let clipCount = 0;
    project.tracks.forEach((track) => {
      track.clips.forEach((clip) => {
        let nextOutput = `[v${clipCount}]`;
        
        if (track.type === "text") {
          filters.push(`${lastOutput}drawtext=text='${clip.text}':fontcolor=white:fontsize=24:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,${clip.start},${clip.end})'${nextOutput}`);
        } 
        
        else if (track.type === "image") {
          inputs.push(`-i ${clip.src}`);
          let imgIdx = inputs.length - 1;
          filters.push(`[${imgIdx}:v]scale=300:-1[img${clipCount}]; ${lastOutput}[img${clipCount}]overlay=x=(W-w)/2:y=(H-h)/2:enable='between(t,${clip.start},${clip.end})'${nextOutput}`);
        }

        lastOutput = nextOutput;
        clipCount++;
      });
    });

    // Agar koi track nahi hai toh seedha output do
    const filterComplex = filters.length > 0 ? `-filter_complex "${filters.join(";")}" -map "${lastOutput}"` : "";

    const cmd = `ffmpeg -y ${inputs.join(" ")} ${filterComplex} -pix_fmt yuv420p -c:v libx264 -preset superfast ${outputFile}`;

    console.log("Executing FFmpeg...");
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error("FFmpeg Stderr:", stderr);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function uploadToAppwrite(filePath) {
  const file = await storage.createFile(
    "YOUR_BUCKET_ID", // Bucket ID daalein
    "unique()",
    InputFile.fromPath(filePath, "render_output.mp4")
  );
  return file.$id;
}
