import React, { useEffect, useRef, useState } from "react";

export default function RXStudioUltimate() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabric, setFabric] = useState<any>(null);
  const [canvas, setCanvas] = useState<any>(null);

  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [tracks, setTracks] = useState<any[]>([]);
  const [waveform, setWaveform] = useState<number[]>([]);
  
  // Ref for hidden file inputs
  const videoFileRef = useRef<HTMLInputElement>(null);

  const FPS = 30;

  // ================= 1. SAFE INIT =================
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
    script.async = true;

    script.onload = () => {
      if (!canvasRef.current) return;
      // @ts-ignore
      const f = window.fabric;
      setFabric(f);

      const c = new f.Canvas(canvasRef.current, {
        width: 360,
        height: 600,
        backgroundColor: "#0a0a0a",
        preserveObjectStacking: true,
      });

      setCanvas(c);

      f.util.requestAnimFrame(function render() {
        c.renderAll();
        f.util.requestAnimFrame(render);
      });
    };
    document.body.appendChild(script);
    return () => { if(document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  // ================= 2. PLAYBACK ENGINE =================
  useEffect(() => {
    let interval: any;
    if (playing) {
      interval = setInterval(() => {
        setTime((t) => t + 1 / FPS);
      }, 1000 / FPS);
    }
    return () => clearInterval(interval);
  }, [playing]);

  // Sync Video Layers with Timeline Time
  useEffect(() => {
    if (!canvas) return;
    canvas.getObjects().forEach((obj: any) => {
      // Visibility Toggle
      obj.visible = time >= (obj.start || 0) && time <= (obj.end || 100);
      
      // Video Frame Sync
      if (obj.getElement && obj.getElement() instanceof HTMLVideoElement) {
        const vid = obj.getElement();
        if (obj.visible && playing) {
           if(vid.paused) vid.play();
        } else {
           vid.pause();
        }
      }
    });
    canvas.renderAll();
  }, [time, canvas, playing]);

  // ================= 3. POWER ACTIONS =================

  const addText = () => {
    if(!fabric || !canvas) return;
    const t = new fabric.Textbox("NEW TEXT", {
      left: 100, top: 100, fill: "#fff", fontSize: 30,
      fontFamily: 'Impact', textAlign: 'center'
    });
    t.start = time;
    t.end = time + 3;
    canvas.add(t).setActiveObject(t);
    syncTracks();
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvas) return;
    const url = URL.createObjectURL(file);
    addVideoLayer(url);
  };

  const addVideoLayer = (url: string) => {
    const video = document.createElement("video");
    video.src = url;
    video.muted = true;
    video.loop = true;
    video.crossOrigin = "anonymous";
    video.playsInline = true;

    video.onloadeddata = () => {
      video.play();
      // @ts-ignore
      const el = new fabric.Image(video, { left: 50, top: 50, objectCaching: false });
      el.scaleToWidth(250);
      el.start = time;
      el.end = time + 5;
      canvas.add(el).setActiveObject(el);
      syncTracks();
    };
  };

  const syncTracks = () => {
    const objs = canvas.getObjects();
    setTracks([{
      id: "master-track",
      items: objs.map((obj: any, i: number) => ({
        id: `item-${i}`,
        ref: obj,
        start: obj.start || 0,
        end: obj.end || 5,
        type: obj.type
      })),
    }]);
  };

  // ================= 4. EFFECTS =================
  const applyEffect = (type: string) => {
    const obj = canvas.getActiveObject();
    if (!obj || !fabric) return;

    const f = fabric.Image.filters;
    obj.filters = [];
    if (type === "blur") obj.filters.push(new f.Blur({ blur: 0.5 }));
    if (type === "bw") obj.filters.push(new f.Grayscale());
    if (type === "sepia") obj.filters.push(new f.Sepia());

    obj.applyFilters();
    canvas.renderAll();
  };

  // ================= UI SETUP =================
  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col font-sans overflow-hidden">
      
      {/* Top Bar */}
      <div className="p-4 bg-zinc-900 flex gap-4 overflow-x-auto border-b border-white/10">
        <button onClick={addText} className="px-4 py-2 bg-zinc-800 rounded-lg hover:bg-white hover:text-black transition-all font-bold text-xs uppercase">+ Text</button>
        <button onClick={() => videoFileRef.current?.click()} className="px-4 py-2 bg-zinc-800 rounded-lg hover:bg-white hover:text-black transition-all font-bold text-xs uppercase">+ Video</button>
        <button onClick={() => applyEffect("blur")} className="px-4 py-2 bg-cyan-900/30 text-cyan-400 border border-cyan-500/20 rounded-lg text-xs font-bold uppercase">Blur</button>
        <button onClick={() => applyEffect("bw")} className="px-4 py-2 bg-zinc-800 rounded-lg text-xs font-bold uppercase">B/W</button>
        <button onClick={() => setPlaying(!playing)} className={`px-6 py-2 rounded-full font-black text-xs uppercase transition-all ${playing ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}>
          {playing ? "Stop" : "Play"}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-[#050505]">
         <div className="rounded-xl overflow-hidden shadow-2xl border border-white/5">
            <canvas ref={canvasRef} />
         </div>
         <div className="mt-2 text-[10px] font-mono text-zinc-500">TIME: {time.toFixed(2)}s</div>
      </div>

      {/* 🎞️ ADVANCED TIMELINE */}
      <div className="h-48 bg-zinc-950 border-t border-white/10 p-4 overflow-y-auto">
        <div className="relative h-full bg-zinc-900/30 rounded-lg border border-white/5 p-2">
          {tracks.map((track) => (
            <div key={track.id} className="relative h-10 w-full bg-black/20 rounded flex items-center">
              {track.items.map((item: any) => (
                <div
                  key={item.id}
                  style={{
                    left: item.start * 40,
                    width: (item.end - item.start) * 40,
                    position: 'absolute'
                  }}
                  className="h-8 bg-cyan-600/40 border border-cyan-400 rounded-md flex items-center justify-center text-[8px] font-bold overflow-hidden"
                >
                  {item.type.toUpperCase()}
                </div>
              ))}
            </div>
          ))}
          {/* Playhead */}
          <div 
            style={{ left: time * 40 }}
            className="absolute top-0 bottom-0 w-0.5 bg-white z-10 shadow-[0_0_10px_white]"
          />
        </div>
      </div>

      <input type="file" ref={videoFileRef} hidden accept="video/*" onChange={handleVideoSelect} />
    </div>
  );
}
