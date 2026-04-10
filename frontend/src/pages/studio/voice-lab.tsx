import { ArrowLeft, Mic2, Volume2, Save, Wand2, AudioLines, Share2, RefreshCw, SendHorizontal, PlayCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { databases } from "../../lib/appwrite"; 

// ✅ Nexus Config
const DATABASE_ID = 'Race-X-Nexus';
const COLLECTION_ID = 'api_configs';

export default function VoiceLab() {
  const [, setLocation] = useLocation();
  const [script, setScript] = useState("");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [voiceApiKey, setVoiceApiKey] = useState<string | null>(null);
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🛡️ 1. DYNAMIC API INJECTION
  useEffect(() => {
    const fetchVoiceKey = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        const config = response.documents.find(doc => doc.service_name === 'VOICE_LAB');
        if (config) setVoiceApiKey(config.key_value);
      } catch (error) {
        console.error("Nexus Voice Engine Link Failed:", error);
      }
    };
    fetchVoiceKey();
  }, []);

  const handleSynthesize = async () => {
    if (!script) return;
    if (!voiceApiKey) {
      alert("⚠️ Voice Engine Offline: Injection Hub mein VOICE_LAB key missing hai!");
      return;
    }

    setIsSynthesizing(true);
    setGeneratedAudio(null);

    // 🚀 Simulation: ElevenLabs/Play.ht API call
    setTimeout(() => {
      setIsSynthesizing(false);
      // Dummy Generated Audio URL
      setGeneratedAudio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    }, 4000);
  };

  const syncToStudio = () => {
    if (generatedAudio) {
      // 🚀 Voice ko cache mein bhej rahe hain Editor ke liye
      localStorage.setItem("rx_voice_buffer", generatedAudio);
      setLocation("/studio/editor");
    }
  };

  const playPreview = () => {
    if (generatedAudio) {
      audioRef.current = new Audio(generatedAudio);
      audioRef.current.play();
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-24 font-sans selection:bg-purple-500/30">
      
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <button onClick={() => setLocation("/studio")} className="p-3 bg-zinc-900 rounded-2xl border border-white/5 active:scale-75 transition-all">
          <ArrowLeft size={20}/>
        </button>
        <div className="text-center text-left">
          <h2 className="text-sm font-black italic uppercase tracking-[0.3em] text-purple-400 leading-none">RX Voice Lab</h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className={`w-1 h-1 rounded-full ${voiceApiKey ? 'bg-purple-500 animate-pulse' : 'bg-red-500'}`} />
            <p className="text-[7px] font-bold text-zinc-600 uppercase tracking-widest leading-none">
              {voiceApiKey ? "Neural Voice Node: Active" : "Nexus Link: Offline"}
            </p>
          </div>
        </div>
        <button className="p-3 bg-zinc-900 rounded-2xl border border-white/5 text-zinc-500"><Share2 size={18}/></button>
      </header>

      {/* Visualizer Area */}
      <div className="bg-zinc-900/40 border border-white/5 rounded-[45px] p-12 mb-8 flex flex-col items-center justify-center relative overflow-hidden group min-h-[220px]">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {generatedAudio && !isSynthesizing ? (
          <button onClick={playPreview} className="relative z-10 flex flex-col items-center gap-4 group">
            <div className="p-6 bg-purple-500/20 rounded-full border border-purple-500/30 group-hover:scale-110 transition-transform">
              <PlayCircle size={40} className="text-purple-400" />
            </div>
            <p className="text-[8px] font-black uppercase tracking-widest text-purple-300">Listen Preview</p>
          </button>
        ) : (
          <div className="flex items-end gap-1.5 h-16 mb-8">
            {[...Array(16)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 rounded-full transition-all duration-500 ${isSynthesizing ? 'bg-purple-500 animate-bounce' : 'bg-zinc-700 h-2'}`} 
                style={{ 
                  height: isSynthesizing ? `${Math.random() * 100}%` : '8px', 
                  animationDelay: `${i * 0.05}s` 
                }} 
              />
            ))}
          </div>
        )}
        <p className={`text-[9px] font-black uppercase tracking-[0.4em] transition-colors ${isSynthesizing ? 'text-purple-400 animate-pulse' : 'text-zinc-600'}`}>
          {isSynthesizing ? "Processing Vocal Patterns..." : generatedAudio ? "Audio Synthesis Complete" : "Neural Voice Ready"}
        </p>
      </div>

      {/* Sync Control (Appears after Generation) */}
      {generatedAudio && (
        <button 
          onClick={syncToStudio}
          className="w-full mb-8 py-6 bg-white text-black rounded-[30px] font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl animate-in fade-in slide-in-from-bottom-4"
        >
          <SendHorizontal size={16} /> Send to Studio Editor
        </button>
      )}

      {/* Mode Selection */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="group bg-zinc-900 border border-white/10 p-8 rounded-[40px] flex flex-col items-center gap-4 hover:border-purple-500/50 active:scale-95 transition-all">
          <Mic2 size={24} className="group-hover:text-purple-400 transition-colors" />
          <span className="text-[8px] font-black uppercase tracking-widest text-center leading-relaxed">Clone<br/>My Voice</span>
        </button>
        <button className="group bg-zinc-900 border border-white/10 p-8 rounded-[40px] flex flex-col items-center gap-4 hover:border-blue-500/50 active:scale-95 transition-all">
          <Volume2 size={24} className="group-hover:text-blue-400 transition-colors" />
          <span className="text-[8px] font-black uppercase tracking-widest text-center leading-relaxed">Premium<br/>AI TTS</span>
        </button>
      </div>

      {/* Input Box */}
      <div className="bg-zinc-900/20 border border-white/5 p-10 rounded-[50px] shadow-2xl">
        <h3 className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em] mb-8">Script for Dubbing</h3>
        <textarea 
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Type dialogue here..."
          className="w-full bg-transparent border-b border-white/10 pb-8 text-sm focus:border-purple-500 outline-none h-32 resize-none mb-10 transition-all placeholder:text-zinc-800 placeholder:uppercase placeholder:text-[9px] placeholder:font-black"
        />
        
        <button 
          onClick={handleSynthesize}
          disabled={isSynthesizing || !script}
          className={`w-full py-6 rounded-[30px] font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-4 shadow-xl active:scale-95 transition-all ${
            isSynthesizing 
            ? 'bg-zinc-800 text-zinc-600' 
            : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
          }`}
        >
           {isSynthesizing ? <RefreshCw size={18} className="animate-spin" /> : <Wand2 size={18} />}
           {isSynthesizing ? "Synthesizing Node..." : "Synthesize Dub"}
        </button>
      </div>

      <p className="text-center text-[7px] font-black text-zinc-800 uppercase tracking-[0.5em] mt-12">
        Race-X Vocal Lab v2.1 | Powered by Nexus Core
      </p>
    </div>
  );
}
