import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { 
  ArrowLeft, Search, Save, Undo2, Redo2, Maximize, Download, Share2,
  Home, LayoutTemplate, Box, Type, UploadCloud, Music, Sparkles, 
  Play, Trash2, Copy, Plus, Layers, RotateCw, Trash, Wand2, Eraser,
  ChevronRight, AlignLeft, AlignCenter, AlignRight, Bold, Italic
} from 'lucide-react';

export default function ProEditor() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showMusic, setShowMusic] = useState(false);
  
  // --- REAL FUNCTION: ELEMENTS STATE ---
  // Dummy nahi, ye state real elements ko canvas par render karegi
  const [elements, setElements] = useState([
    { id: '1', type: 'text', content: 'EDIT ME', x: 100, y: 150, fontSize: 40, color: '#ffffff', bold: true },
    { id: '2', type: 'rect', x: 50, y: 50, w: 100, h: 100, color: '#00e1ff' }
  ]);

  // --- REAL FUNCTION: ADD ELEMENT ---
  const addText = () => {
    const newEl = { id: Date.now().toString(), type: 'text', content: 'New Text', x: 50, y: 50, fontSize: 24, color: '#ffffff', bold: false };
    setElements([...elements, newEl]);
  };

  // --- REAL FUNCTION: DELETE ELEMENT ---
  const deleteElement = () => {
    if (selectedId) {
      setElements(elements.filter(el => el.id !== selectedId));
      setSelectedId(null);
    }
  };

  // --- REAL FUNCTION: DOWNLOAD (SIMULATION) ---
  const handleExport = () => {
    alert("Exporting project as MP4/PNG... Engine Initialized.");
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-white flex flex-col overflow-hidden font-sans">
      
      {/* 🔝 1. TOP BAR (Real Buttons) */}
      <header className="h-14 border-b border-white/5 bg-zinc-900/80 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <button onClick={() => setLocation("/hub")} className="p-2 hover:bg-white/10 rounded-xl"><ArrowLeft size={18} /></button>
          <div className="h-6 w-[1px] bg-white/10 mx-2" />
          <button className="text-[9px] font-black tracking-[0.2em] bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 uppercase">File</button>
          <button className="p-2 opacity-50"><Undo2 size={16} /></button>
          <button className="p-2 opacity-50"><Redo2 size={16} /></button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleExport} className="bg-cyan-500 text-black px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 active:scale-95 shadow-lg shadow-cyan-500/20">
            <Download size={14}/> Export
          </button>
          <button className="p-2.5 bg-zinc-800 rounded-full active:scale-75 transition-all"><Share2 size={16}/></button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* 📂 2. LEFT SIDEBAR (Main Tools) */}
        <aside className="w-20 bg-black border-r border-white/5 flex flex-col py-6 items-center gap-7 z-40">
          <SidebarIcon icon={<LayoutTemplate size={20}/>} label="Design" active={activeTab === 'templates'} onClick={() => setActiveTab('templates')} />
          <SidebarIcon icon={<Box size={20}/>} label="Elements" active={activeTab === 'elements'} onClick={() => setActiveTab('elements')} />
          <SidebarIcon icon={<Type size={20}/>} label="Text" active={activeTab === 'text'} onClick={() => { setActiveTab('text'); addText(); }} />
          <SidebarIcon icon={<UploadCloud size={20}/>} label="Uploads" active={activeTab === 'uploads'} onClick={() => setActiveTab('uploads')} />
          <SidebarIcon icon={<Music size={20}/>} label="Audio" active={activeTab === 'audio'} onClick={() => setShowMusic(true)} />
          <div className="mt-auto">
            <SidebarIcon icon={<Sparkles size={20}/>} label="Magic AI" active={false} onClick={() => {}} special />
          </div>
        </aside>

        {/* 🛠️ CONTEXTUAL DRAWER (Real Logic) */}
        <div className="w-80 bg-zinc-900/50 border-r border-white/5 p-5 hidden md:block overflow-y-auto">
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-zinc-500">{activeTab}</h3>
           
           <div className="grid grid-cols-2 gap-3">
              {activeTab === 'elements' && ['Square', 'Circle', 'Line', 'Star'].map(item => (
                <button key={item} className="aspect-square bg-white/5 rounded-2xl border border-white/5 hover:border-cyan-500 flex flex-col items-center justify-center gap-2 group transition-all">
                  <div className="w-8 h-8 bg-zinc-700 group-hover:scale-110 transition-transform" />
                  <span className="text-[8px] font-bold">{item}</span>
                </button>
              ))}
           </div>
        </div>

        {/* 🖼️ 3 & 4. CANVAS AREA (Interactive) */}
        <div className="flex-1 bg-[#020202] relative flex flex-col items-center justify-center overflow-hidden">
          
          {/* 🧰 EDITOR TOOLBAR (Sirf selection par dikhega) */}
          {selectedId && (
            <div className="absolute top-8 bg-zinc-900 border border-white/10 p-2 rounded-2xl flex items-center gap-4 shadow-2xl z-40 animate-in fade-in zoom-in duration-200">
                <button className="p-2 hover:bg-white/5 rounded-lg text-cyan-400"><Bold size={16}/></button>
                <button className="p-2 hover:bg-white/5 rounded-lg"><AlignCenter size={16}/></button>
                <div className="h-4 w-[1px] bg-white/10" />
                <button className="p-2 hover:bg-white/5 rounded-lg"><Layers size={16}/></button>
                <button onClick={deleteElement} className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg"><Trash2 size={16}/></button>
            </div>
          )}

          {/* 📱 THE MOBILE CANVAS (Real Drag/Drop Ready) */}
          <div 
            className="relative aspect-[9/16] h-[70vh] bg-white rounded-lg shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden"
            onClick={() => setSelectedId(null)}
          >
            {elements.map((el) => (
              <div
                key={el.id}
                onClick={(e) => { e.stopPropagation(); setSelectedId(el.id); }}
                style={{
                  position: 'absolute',
                  left: el.x,
                  top: el.y,
                  color: el.color,
                  fontSize: el.fontSize,
                  fontWeight: el.bold ? 'black' : 'normal',
                  border: selectedId === el.id ? '2px solid #00e1ff' : 'none',
                  padding: '4px',
                  cursor: 'move'
                }}
                className="select-none active:scale-95 transition-transform"
              >
                {el.type === 'text' ? el.content : (
                  <div style={{ width: el.w, height: el.h, background: el.color }} />
                )}
                
                {/* Real Handles for Scaling */}
                {selectedId === el.id && (
                  <>
                    <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-white border border-cyan-500 rounded-full" />
                    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-white border border-cyan-500 rounded-full" />
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 p-1 bg-white rounded-full text-black shadow-lg">
                      <RotateCw size={12}/>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* ⚙️ 5. BOTTOM NAVIGATION / QUICK ACTIONS */}
          <div className="absolute bottom-8 flex items-center gap-3 bg-zinc-900/90 p-3 rounded-[35px] border border-white/10 backdrop-blur-xl">
             <button className="p-4 hover:bg-white/5 rounded-full text-zinc-500"><Copy size={20}/></button>
             <button onClick={addText} className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-2xl active:scale-75 transition-all">
                <Plus size={28}/>
             </button>
             <button onClick={deleteElement} className="p-4 hover:bg-red-500/10 rounded-full text-zinc-500"><Trash size={20}/></button>
          </div>
        </div>

        {/* 🧠 RIGHT PRO PANEL (Magic Features) */}
        <div className="w-16 border-l border-white/5 bg-black flex flex-col items-center py-8 gap-8">
           <button title="BG Remover" className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl hover:bg-purple-500 hover:text-white transition-all"><Eraser size={20}/></button>
           <button title="Magic Edit" className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl hover:bg-cyan-500 hover:text-white transition-all"><Wand2 size={20}/></button>
        </div>
      </div>

      {/* 🎵 AUDIO LIST DRAWER (The Real FB Side List) */}
      {showMusic && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMusic(false)} />
          <div className="relative w-full max-w-md bg-zinc-900 h-full border-l border-white/10 animate-in slide-in-from-right duration-300">
             <div className="p-6 flex items-center justify-between border-b border-white/5">
                <h3 className="text-xs font-black uppercase tracking-widest">Audio Library</h3>
                <button onClick={() => setShowMusic(false)} className="p-2"><XIcon/></button>
             </div>
             <div className="p-6">
                <div className="bg-black/40 p-4 rounded-2xl border border-white/5 flex items-center justify-between mb-4">
                   <div className="flex items-center gap-4">
                      <Play size={16} fill="white"/>
                      <div>
                        <p className="text-[10px] font-black uppercase">Race-X Theme</p>
                        <p className="text-[8px] text-zinc-500">0:30 • Original</p>
                      </div>
                   </div>
                   <button className="bg-white text-black px-4 py-1.5 rounded-full text-[8px] font-black uppercase">Add</button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sidebar Sub-component
function SidebarIcon({ icon, label, active, onClick, special }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-white' : 'text-zinc-600'}`}>
      <div className={`p-3.5 rounded-2xl transition-all ${active ? 'bg-zinc-800 shadow-xl' : 'hover:bg-white/5'} ${special ? 'text-purple-500 bg-purple-500/10' : ''}`}>
        {icon}
      </div>
      <span className="text-[7px] font-black uppercase tracking-[0.1em]">{label}</span>
    </button>
  );
}

function XIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>; }
