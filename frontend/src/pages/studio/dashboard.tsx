import React, { useEffect, useState, useRef } from "react";
import { account } from "@/lib/appwrite";

export default function Dashboard() {

  const [userData, setUserData] = useState<any>(null);
  const [cinemaData, setCinemaData] = useState<any>(null);
  const [finalVideo, setFinalVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [clonedVoiceId, setClonedVoiceId] = useState<string | null>(null);
  const [language, setLanguage] = useState("en");
  const [liveExpression, setLiveExpression] = useState("neutral");

  const videoRef = useRef<HTMLVideoElement>(null);

  const characters = [
    { name: "Hero" },
    { name: "Villain" },
    { name: "Friend" }
  ];

  useEffect(() => {
    account.get().then(setUserData);
  }, []);

  // ================= EMOTION =================
  function detectEmotion(text: string) {
    if (text.includes("fight")) return "angry";
    if (text.includes("love")) return "happy";
    if (text.includes("cry")) return "sad";
    return "neutral";
  }

  function expressionMap(e: string) {
    return {
      happy: "smile",
      sad: "cry",
      angry: "angry",
      neutral: "default"
    }[e];
  }

  // ================= CAMERA =================
  function getCameraAngle(scene: string, i: number) {
    if (scene.includes("fight")) return "dramatic_zoom";
    return ["wide", "close", "medium"][i % 3];
  }

  // ================= ENV =================
  function getEnvironment(scene: string) {
    if (scene.includes("fight")) return "bg-red-900";
    if (scene.includes("love")) return "bg-pink-700";
    if (scene.includes("cry")) return "bg-blue-900";
    return "bg-zinc-900";
  }

  // ================= TRANSITION =================
  function getTransition(scene: string) {
    if (scene.includes("fight")) return "cut";
    return "fade";
  }

  function getTransitionClass(t: string) {
    return t === "fade"
      ? "transition-opacity duration-700 opacity-90"
      : "";
  }

  // ================= SFX =================
  function getSFX(scene: string) {
    if (scene.includes("gun")) return "/sfx/gun.mp3";
    if (scene.includes("fight")) return "/sfx/hit.mp3";
    return null;
  }

  function playSFX(url: string) {
    const a = new Audio(url);
    a.play();
  }

  // ================= MUSIC =================
  function getMusic(emotion: string) {
    return `/music/${emotion}.mp3`;
  }

  function playMusic(url: string) {
    const a = new Audio(url);
    a.loop = true;
    a.volume = 0.5;
    a.play();
    return a;
  }

  // ================= TRANSLATE =================
  async function translate(text: string) {
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${language}&dt=t&q=${text}`
    );
    const data = await res.json();
    return data[0][0][0];
  }

  // ================= VOICE =================
  async function generateVoice(text: string, emotion: string) {
    const translated = await translate(text);

    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${clonedVoiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": "YOUR_ELEVENLABS_KEY",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: translated
        })
      }
    );

    return await res.blob();
  }

  // ================= AVATAR =================
  async function generateAvatar(audioUrl: string, emotion: string, camera: string) {
    const res = await fetch("https://api.heygen.com/v2/video/generate", {
      method: "POST",
      headers: {
        "X-Api-Key": "YOUR_HEYGEN_KEY",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar_id: "default",
        voice: { type: "audio", audio_url: audioUrl },
        expression: expressionMap(liveExpression || emotion),
        camera
      })
    });

    return await res.json();
  }

  // ================= SCRIPT =================
  async function generateScript(prompt: string) {
    return [
      "Hero fights villain",
      "Villain laughs",
      "Friend cries",
      "Hero wins"
    ];
  }

  // ================= MOVIE =================
  async function generateMovie() {
    const script = await generateScript("");

    const scenes: any[] = [];

    for (let i = 0; i < script.length; i++) {
      const text = script[i];

      const emotion = detectEmotion(text);
      const camera = getCameraAngle(text, i);
      const env = getEnvironment(text);
      const transition = getTransition(text);
      const sfx = getSFX(text);

      const voiceBlob = await generateVoice(text, emotion);
      const voiceUrl = URL.createObjectURL(voiceBlob);

      const avatar = await generateAvatar(voiceUrl, emotion, camera);

      scenes.push({
        text,
        emotion,
        camera,
        env,
        transition,
        sfx,
        avatar
      });
    }

    setCinemaData({ scenes });
  }

  // ================= UI =================
  return (
    <div className="bg-black text-white p-6">

      <h1 className="text-xl mb-4">
        Hi {userData?.name || "User"}
      </h1>

      <button
        onClick={generateMovie}
        className="bg-purple-600 px-4 py-2 rounded"
      >
        🎬 Generate AI Movie
      </button>

      {/* CONTROLS */}
      <div className="mt-3 flex gap-2">
        {["happy","sad","angry","neutral"].map(e => (
          <button
            key={e}
            onClick={() => setLiveExpression(e)}
            className="bg-zinc-800 px-2 py-1 text-xs rounded"
          >
            {e}
          </button>
        ))}
      </div>

      <select
        onChange={(e)=>setLanguage(e.target.value)}
        className="mt-3 bg-black border"
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="bn">Bengali</option>
      </select>

      {/* SCENES */}
      {cinemaData?.scenes?.map((s:any,i:number)=>(
        <div key={i} className={`mt-4 p-3 rounded ${s.env}`}>

          <p className="text-xs">
            🎭 {characters[i%3].name} | 🎥 {s.camera}
          </p>

          <div className={getTransitionClass(s.transition)}>

            <video
              src={s.avatar?.video_url}
              controls
              onPlay={()=> s.sfx && playSFX(s.sfx)}
            />

          </div>

        </div>
      ))}

    </div>
  );
}
