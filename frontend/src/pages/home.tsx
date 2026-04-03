import React, { useState, useEffect } from "react";
import {
  LayoutGrid, Video, Users, MessageSquare, Music, ShoppingBag,
  Settings, Crown, Share2, User
} from "lucide-react";

/* ================= MAIN ================= */
export default function Home() {

  const [tab, setTab] = useState("hub");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const toggleRole = () => {
    setRole(role === "user" ? "admin" : "user");
    showToast("Switched to " + (role === "user" ? "Admin" : "User"));
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-cyan-400 text-5xl font-black">
        RX
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">

      {/* HEADER */}
      <div className="fixed top-0 w-full flex justify-between p-4 bg-black/70 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="flex items-center gap-2">
          {role === "admin" ? <Crown className="text-yellow-400"/> : <User />}
          <h1 className="font-black text-cyan-400 uppercase">RX {tab}</h1>
        </div>

        <button onClick={toggleRole} className="text-xs bg-white text-black px-3 py-1 rounded-xl">
          Switch
        </button>
      </div>

      {/* MAIN */}
      <main className="pt-20 pb-28 px-4 space-y-3">

        {tab === "hub" && <Hub setTab={setTab} role={role} />}
        {tab === "profile" && <Profile showToast={showToast} />}
        {tab === "studio" && <Studio showToast={showToast} />}
        {tab === "magic" && <Magic showToast={showToast} />}
        {tab === "social" && <Social showToast={showToast} />}
        {tab === "chat" && <Chat showToast={showToast} />}
        {tab === "music" && <MusicPlayer showToast={showToast} />}
        {tab === "shop" && <Shop showToast={showToast} />}
        {tab === "admin" && role==="admin" && <AdminPanel showToast={showToast} />}

      </main>

      {/* NAV */}
      <nav className="fixed bottom-0 w-full flex justify-around p-3 bg-black/80 backdrop-blur-xl border-t border-white/10">
        <Nav icon={<LayoutGrid />} active={tab==="hub"} onClick={()=>setTab("hub")} />
        <Nav icon={<Users />} active={tab==="social"} onClick={()=>setTab("social")} />
        <Nav icon={<MessageSquare />} active={tab==="chat"} onClick={()=>setTab("chat")} />
        <Nav icon={<Music />} active={tab==="music"} onClick={()=>setTab("music")} />
        <Nav icon={<User />} active={tab==="profile"} onClick={()=>setTab("profile")} />
      </nav>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded-xl">
          {toast}
        </div>
      )}

    </div>
  );
}

/* ================= HUB ================= */
const Hub = ({ setTab, role }: any) => (
  <div className="grid grid-cols-2 gap-4">

    <Glass title="RX Studio" onClick={()=>setTab("studio")} />
    <Glass title="RX Magic" onClick={()=>setTab("magic")} />
    <Glass title="RX Social" onClick={()=>setTab("social")} />
    <Glass title="RX Chat" onClick={()=>setTab("chat")} />
    <Glass title="RX Music" onClick={()=>setTab("music")} />
    <Glass title="RX Shop" onClick={()=>setTab("shop")} />

    {role==="admin" && (
      <Glass title="Admin Control" onClick={()=>setTab("admin")} />
    )}

  </div>
);

const Glass = ({ title, onClick }: any) => (
  <div
    onClick={onClick}
    className="h-28 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 cursor-pointer hover:scale-105 transition"
  >
    {title}
  </div>
);

/* ================= PROFILE ================= */
const Profile = ({ showToast }: any) => {
  const [username] = useState("rx_user");

  const share = () => {
    const link = `https://rx.app/user/${username}`;
    navigator.clipboard.writeText(link);
    showToast("Link Copied");
  };

  return (
    <div className="space-y-3">
      <div className="bg-zinc-900 p-4 rounded-xl">
        <h2 className="text-lg font-bold">@{username}</h2>
      </div>

      <button onClick={share} className="w-full bg-blue-500 p-3 rounded-xl flex justify-center gap-2">
        <Share2 /> Share Profile
      </button>
    </div>
  );
};

/* ================= ADMIN ================= */
const AdminPanel = ({ showToast }: any) => {
  const [apis,setApis]=useState<any[]>([]);

  return (
    <div>
      <h2 className="font-bold text-xl mb-2">Omniverse Control</h2>

      <button onClick={()=>setApis([...apis,{name:"",url:""}])} className="bg-green-500 p-2 rounded-xl">
        Add API
      </button>

      {apis.map((a,i)=>(
        <div key={i} className="bg-zinc-900 p-3 mt-2 rounded-xl">
          <input placeholder="API Name" className="w-full mb-2 bg-black p-2 rounded"/>
          <input placeholder="API URL" className="w-full bg-black p-2 rounded"/>
        </div>
      ))}

      <button onClick={()=>showToast("Saved")} className="mt-3 bg-blue-500 p-2 rounded-xl">
        Save Config
      </button>
    </div>
  );
};

/* ================= OTHER MODULES ================= */
const Studio = ({ showToast }: any) => (
  <button onClick={()=>showToast("AI Generated")} className="bg-cyan-400 p-3 rounded-xl w-full">Generate</button>
);

const Magic = ({ showToast }: any) => (
  <button onClick={()=>showToast("Magic Run")} className="bg-purple-500 p-3 rounded-xl w-full">Run AI</button>
);

const Social = ({ showToast }: any) => (
  <button onClick={()=>showToast("Posted")} className="bg-green-500 p-3 rounded-xl w-full">Post</button>
);

const Chat = ({ showToast }: any) => (
  <button onClick={()=>showToast("Message Sent")} className="bg-yellow-500 p-3 rounded-xl w-full">Send</button>
);

const MusicPlayer = ({ showToast }: any) => (
  <button onClick={()=>showToast("Playing")} className="bg-pink-500 p-3 rounded-xl w-full">Play Music</button>
);

const Shop = ({ showToast }: any) => (
  <button onClick={()=>showToast("Added")} className="bg-indigo-500 p-3 rounded-xl w-full">Buy</button>
);

/* ================= NAV ================= */
const Nav = ({ icon, onClick, active }: any) => (
  <button onClick={onClick} className={`${active ? "text-cyan-400" : "text-white/60"}`}>
    {icon}
  </button>
);
