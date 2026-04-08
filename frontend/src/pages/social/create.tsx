import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { X, Image as ImageIcon, Video, Camera, Check, Music } from "lucide-react";

export default function CreatePost() {
  const [, setLocation] = useLocation();
  const [file, setFile] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <X onClick={() => setLocation("/social/feed")} className="cursor-pointer" />
        <h1 className="font-black uppercase italic tracking-widest text-sm">New Creation</h1>
        <button 
          disabled={!file}
          onClick={() => setLocation("/social/feed")}
          className={`font-black text-xs uppercase p-2 px-4 rounded-xl ${file ? 'bg-cyan-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}
        >
          Share
        </button>
      </div>

      {/* Media Preview Box */}
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="aspect-square w-full rounded-[40px] border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center bg-zinc-900/30 overflow-hidden relative cursor-pointer"
      >
        {file ? (
          <img src={file} className="w-full h-full object-cover animate-in fade-in zoom-in duration-300" />
        ) : (
          <>
            <div className="p-5 bg-zinc-800 rounded-full mb-4 text-cyan-400"><Camera size={32}/></div>
            <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Tap to capture or upload</p>
          </>
        )}
        <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*,video/*" />
      </div>

      {/* Post Details */}
      <div className="mt-8 space-y-6">
        <div className="flex gap-4 items-start bg-zinc-900/50 p-4 rounded-3xl border border-white/5">
          <div className="w-10 h-10 rounded-2xl bg-zinc-800" />
          <textarea 
            placeholder="Write a caption... #RaceX #AI"
            className="flex-1 bg-transparent text-sm outline-none h-20 resize-none"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 p-4 bg-zinc-900 rounded-2xl border border-white/5 text-[10px] font-black uppercase"><Music size={14} className="text-purple-500"/> Add Music</button>
          <button className="flex items-center justify-center gap-2 p-4 bg-zinc-900 rounded-2xl border border-white/5 text-[10px] font-black uppercase"><Check size={14} className="text-cyan-500"/> Tag AI Hub</button>
        </div>
      </div>
    </div>
  );
}
