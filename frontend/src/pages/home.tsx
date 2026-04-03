import React, { useState } from "react";
import {
  Home,
  Video,
  Users,
  MessageCircle,
  Music,
  ShoppingBag,
  Sparkles,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("hub");

  const Card = ({ title, icon, onClick, gradient }: any) => (
    <div
      onClick={onClick}
      className={`rounded-2xl p-5 mb-4 cursor-pointer backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl transition-all duration-300 hover:scale-105`}
      style={{
        background: gradient,
      }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {icon}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between">
      
      {/* HEADER */}
      <div className="p-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Creator</h1>
          <p className="text-sm text-gray-400">0 Diamonds • 0 Gems</p>
        </div>
      </div>

      {/* MAIN HUB */}
      <div className="px-4 pb-20">
        
        {/* HERO */}
        <div className="rounded-3xl p-6 mb-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg">
          <h1 className="text-3xl font-extrabold mb-2">
            RACE-X: THE FUTURE OF CREATION
          </h1>
          <button className="mt-3 px-5 py-2 bg-white text-black rounded-full font-semibold">
            + NEW PROJECT
          </button>
        </div>

        {/* RX STUDIO */}
        <Card
          title="STUDIO"
          icon={<Zap />}
          gradient="linear-gradient(135deg, #00f2fe, #4facfe)"
          onClick={() => setActiveTab("studio")}
        />

        {/* RX MAGIC CHAT */}
        <Card
          title="MAGIC"
          icon={<Sparkles />}
          gradient="linear-gradient(135deg, #141e30, #243b55)"
          onClick={() => setActiveTab("chat")}
        />

        {/* RX SOCIAL */}
        <Card
          title="SOCIAL"
          icon={<Users />}
          gradient="linear-gradient(135deg, #8e2de2, #4a00e0)"
          onClick={() => setActiveTab("social")}
        />

        {/* RX MUSIC */}
        <Card
          title="MEDIA LIBRARY"
          icon={<Music />}
          gradient="linear-gradient(135deg, #00c6ff, #0072ff)"
          onClick={() => setActiveTab("music")}
        />

        {/* RX SHOP */}
        <Card
          title="SHOP"
          icon={<ShoppingBag />}
          gradient="linear-gradient(135deg, #f7971e, #ffd200)"
          onClick={() => setActiveTab("shop")}
        />

        {/* ADS SYSTEM */}
        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-sm text-gray-400">Ad Space (Banner / Reward Ads)</p>
        </div>

        {/* GOD MODE */}
        <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
          <h2 className="font-bold text-red-400">GOD MODE</h2>
          <p className="text-sm text-gray-300">
            Feature Control • API Input • User Management
          </p>
        </div>

        {/* LEGAL */}
        <div className="mt-6 text-xs text-gray-500 text-center">
          Terms & Conditions • Privacy Policy • Safety Scanner
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 flex justify-around py-3">
        
        <NavItem icon={<Home />} label="Hub" onClick={() => setActiveTab("hub")} />
        <NavItem icon={<Video />} label="Studio" onClick={() => setActiveTab("studio")} />
        <NavItem icon={<Users />} label="Social" onClick={() => setActiveTab("social")} />
        <NavItem icon={<MessageCircle />} label="Chat" onClick={() => setActiveTab("chat")} />
        <NavItem icon={<Music />} label="Music" onClick={() => setActiveTab("music")} />
        <NavItem icon={<ShoppingBag />} label="Shop" onClick={() => setActiveTab("shop")} />
      
      </div>
    </div>
  );
}

const NavItem = ({ icon, label, onClick }: any) => (
  <div onClick={onClick} className="flex flex-col items-center text-xs cursor-pointer">
    {icon}
    <span>{label}</span>
  </div>
);
