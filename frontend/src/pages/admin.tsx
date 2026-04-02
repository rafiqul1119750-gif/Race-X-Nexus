import { useState, useEffect } from "react";
import {
  ShieldAlert, Users, LayoutDashboard, Database, RefreshCw,
  Key, Coins, Eye, EyeOff, Link2, Lock, Unlock, Save,
  AlertTriangle, Settings2, Zap, MonitorOff
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

/* ───── Sidebar & Stats Components ───── */
function GodBadge() {
  return (
    <div className="p-4 rounded-2xl mb-6 text-center border border-red-500/50 bg-red-500/5 shadow-[0_0_20px_rgba(255,0,0,0.15)]">
      <ShieldAlert className="w-10 h-10 text-red-500 mx-auto mb-2 animate-pulse" />
      <h2 className="font-bold text-red-500 tracking-widest italic">GOD MODE</h2>
      <p className="text-[10px] text-zinc-500 mt-1 tracking-widest uppercase">Nexus Engine · v2.0</p>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className={`glass-card p-5 rounded-2xl border-l-4 ${color}`}>
      <p className="text-xs text-zinc-500 uppercase tracking-wider">{label}</p>
      <p className="text-3xl font-black text-white mt-1">{value}</p>
    </div>
  );
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showApiValues, setShowApiValues] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Mock Data (Jab tak backend puri tarah connect nahi hota)
  const users = [
    { id: "RX-001", username: "Admin_Nexus", status: "active", diamonds: 50000, violationCount: 0 },
    { id: "RX-002", username: "User_Test", status: "frozen", diamonds: 120, violationCount: 3 }
  ];

  const modules = [
    { id: 1, name: "RX Studio", path: "/studio", enabled: true },
    { id: 2, name: "RX Music", path: "/music", enabled: true },
    { id: 3, name: "RX Social (Reels)", path: "/social", enabled: false },
    { id: 4, name: "RX Shop (Payments)", path: "/shop", enabled: true }
  ];

  const TABS = [
    { id: "dashboard", icon: LayoutDashboard, label: "Overview" },
    { id: "modules",   icon: Database,       label: "Module Control" },
    { id: "users",     icon: Users,           label: "User Engine" },
    { id: "economy",   icon: Coins,           label: "Economy (₹/💎)" },
    { id: "apiconfig", icon: Key,             label: "API Config" },
  ];

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-6 bg-[#050505] min-h-screen text-white">

      {/* ── Sidebar ── */}
      <div className="w-full md:w-64 flex-shrink-0 space-y-2">
        <GodBadge />
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm
              ${activeTab === tab.id
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/50 shadow-[0_0_12px_rgba(59,130,246,0.2)]"
                : "bg-transparent text-zinc-500 hover:bg-white/5 hover:text-white border border-transparent"
              }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Main Content Area ── */}
      <div className="flex-1 min-w-0">

        {/* ── DASHBOARD ── */}
        {activeTab === "dashboard" && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-black italic text-white">SYSTEM OVERVIEW</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard label="Total Users" value="1,240" color="border-l-blue-500" />
              <StatCard label="Active Modules" value="3 / 4" color="border-l-purple-500" />
              <StatCard label="18+ Violations" value="3" color="border-l-red-500" />
              <StatCard label="Economy Pool (₹)" value="₹12.5L" color="border-l-yellow-500" />
            </div>

            {/* 18+ & Copyright Safety Shield */}
            <div className="glass-card p-6 border-red-500/20 bg-red-500/5">
              <h3 className="font-bold text-red-500 flex items-center gap-2 mb-4 italic">
                <ShieldAlert className="w-5 h-5" /> NEXUS SAFETY SHIELD (GOD MODE)
              </h3>
              <div className="space-y-3 text-xs uppercase tracking-widest text-zinc-400 font-bold">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>18+ Visual Scanner</span>
                  <span className="text-green-500">Active Monitoring</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Copyright Audio Hash</span>
                  <span className="text-green-500">Synced with Database</span>
                </div>
                <div className="flex justify-between">
                  <span>Rules Enforcement</span>
                  <span className="text-blue-500">God Mode Override</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MODULE CONTROL ── */}
        {activeTab === "modules" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black italic text-white">MODULE ENGINE</h2>
            {modules.map(mod => (
              <div key={mod.id} className="glass-card p-4 flex justify-between items-center border-white/5">
                <div>
                  <h3 className="font-bold text-white uppercase">{mod.name}</h3>
                  <p className="text-[10px] text-zinc-500 italic">{mod.path}</p>
                </div>
                <button className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${mod.enabled ? "bg-green-500 text-black" : "bg-red-500 text-white"}`}>
                  {mod.enabled ? "LIVE" : "LOCKED"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── USER ENGINE ── */}
        {activeTab === "users" && (
          <div className="glass-card overflow-x-auto">
            <table className="w-full text-left text-sm italic">
              <thead className="bg-white/5 text-[10px] uppercase text-zinc-500">
                <tr>
                  <th className="px-4 py-3">User ID</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Diamonds</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-white/5">
                    <td className="px-4 py-3 font-bold">{user.username}</td>
                    <td className="px-4 py-3"><span className="text-blue-400">{user.status}</span></td>
                    <td className="px-4 py-3 text-yellow-500 font-black">₹{user.diamonds}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button className="bg-red-500/20 text-red-500 p-1 rounded"><Lock size={14}/></button>
                      <button className="bg-blue-500/20 text-blue-500 p-1 rounded"><RefreshCw size={14}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
