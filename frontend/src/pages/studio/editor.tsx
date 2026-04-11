// ================= TEMPLATE SYSTEM =================

// 🎞 PRE BUILT TEMPLATES
const templates = {
  motivational: (text) => ({
    duration: text.length * 2,
    tracks: [
      {
        type: "text",
        clips: text.map((t, i) => ({
          text: t,
          start: i * 2,
          end: i * 2 + 2,
          style: "center",
        })),
      },
    ],
  }),

  sad: (text) => ({
    duration: text.length * 3,
    tracks: [
      {
        type: "text",
        clips: text.map((t, i) => ({
          text: t,
          start: i * 3,
          end: i * 3 + 3,
          style: "fade",
        })),
      },
    ],
  }),

  promo: (text) => ({
    duration: text.length * 2,
    tracks: [
      {
        type: "text",
        clips: text.map((t, i) => ({
          text: t,
          start: i * 2,
          end: i * 2 + 2,
          style: "bold",
        })),
      },
    ],
  }),
};

// ================= API UPGRADE =================

// 🎬 template render
app.post("/render-template", async (req, res) => {
  const { template, prompt } = req.body;

  const job = await queue.add("render-job", {
    template,
    prompt,
  });

  res.json({ jobId: job.id });
});

// ================= WORKER UPGRADE =================

new Worker(
  "render",
  async (job) => {
    const { projectId, prompt, template } = job.data;

    let project;

    // 🤖 TEMPLATE + AI
    if (template && prompt) {
      const script = await generateScript(prompt);
      const lines = script.split("\n");

      project = templates[template](lines);
    } else {
      project = await getProject(projectId);
    }

    await renderPipeline(project, job);

    const fileId = await upload();
    cleanup();

    return { fileId };
  },
  { connection }
);

// ================= RENDER STYLE UPGRADE =================

// 🎨 style system
function applyTextStyle(style, clip) {
  if (style === "center") {
    return `
    x=(w-text_w)/2:y=(h-text_h)/2
    `;
  }

  if (style === "fade") {
    return `
    alpha='if(lt(t,${clip.start}+0.5),(t-${clip.start})/0.5,1)'
    x=(w-text_w)/2:y=(h-text_h)/2
    `;
  }

  if (style === "bold") {
    return `
    fontsize=60:
    x=100:y=300
    `;
  }

  return "x=100:y=300";
}

// 🧠 UPDATED PIPELINE
async function renderPipeline(project) {
  return new Promise((resolve, reject) => {
    let inputs = [`-f lavfi -i color=c=black:s=360x640:d=${project.duration}`];
    let filter = "";
    let idx = 0;

    project.tracks.forEach((track) => {
      track.clips.forEach((clip) => {
        const style = applyTextStyle(clip.style, clip);

        filter += `
        [0:v] drawtext=text='${clip.text}':
        fontcolor=white:fontsize=40:
        ${style}:
        enable='between(t,${clip.start},${clip.end})'
        [v${idx}];
        `;

        idx++;
      });
    });

    const cmd = `
    ffmpeg
    ${inputs.join(" ")}
    -filter_complex "${filter}"
    -map "[v${idx - 1}]"
    -pix_fmt yuv420p
    output.mp4
    `;

    require("child_process").exec(cmd, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
