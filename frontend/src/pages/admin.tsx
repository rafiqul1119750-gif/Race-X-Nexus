import { useState, useEffect } from "react";
import {
  ShieldAlert, Users, LayoutDashboard, Database, RefreshCw,
  Key, Coins, Eye, EyeOff, Link2, Lock, Unlock, Save,
  AlertTriangle, Settings2, Zap, MonitorOff
} from "lucide-react";
import {
  useAdminGetUsers, useGetModules, useToggleModule,
  useAdminUserAction, useResetLeaderboard, useGrantRewards
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useGetUserProfile } from "@workspace/api-client-react";
import { useLocation } from "wouter";

/* ───── localStorage helpers ───── */
const LS_KEY = "rx_admin_config";
function loadConfig() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "{}"); } catch { return {}; }
}
function saveConfig(obj: Record<string, string>) {
  localStorage.setItem(LS_KEY, JSON.stringify(obj));
}

/* ───── Smart Share Link ───── */
function generateSmartLink(path: string) {
  const base = window.location.origin;
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return `intent://${window.location.host}${path}#Intent;scheme=https;end`;
  if (/iphone|ipad/i.test(ua)) return `${base}${path}?src=ios`;
  return `${base}${path}?src=web`;
}

/* ───── Sub-components ───── */
function GodBadge() {
  return (
    <div className="p-4 rounded-2xl mb-6 text-center border border-destructive/50 bg-destructive/5 shadow-[0_0_20px_rgba(255,0,0,0.15)]">
      <ShieldAlert className="w-10 h-10 text-destructive mx-auto mb-2 animate-pulse" />
      <h2 className="font-display font-bold text-destructive tracking-widest">GOD MODE</h2>
      <p className="text-[10px] text-muted-foreground mt-1 tracking-widest uppercase">Authorized Engine · v2.0</p>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className={`glass-panel p-5 rounded-2xl border-l-4 ${color}`}>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="text-3xl font-display font-bold text-white mt-1">{value}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [config, setConfig] = useState<Record<string, string>>(loadConfig);
  const [diamondTarget, setDiamondTarget] = useState("");
  const [gemTarget, setGemTarget] = useState("");
  const [targetUser, setTargetUser] = useState("user-001");
  const [watermarkHidden, setWatermarkHidden] = useState(
    () => localStorage.getItem("rx_hide_watermark") === "1"
  );
  const [showApiValues, setShowApiValues] = useState(false);

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  /* ── data hooks ── */
  const { data: profile } = useGetUserProfile();
  const { data: usersData } = useAdminGetUsers();
  const { data: modulesData } = useGetModules();

  const { mutate: toggleModule } = useToggleModule({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/modules"] }) }
  });
  const { mutate: userAction } = useAdminUserAction({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
        toast({ title: "Action Applied" });
      }
    }
  });
  const { mutate: resetLb } = useResetLeaderboard({
    mutation: { onSuccess: () => toast({ title: "Leaderboard Reset", variant: "destructive" }) }
  });
  const { mutate: grantRewards } = useGrantRewards({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/rewards"] });
        queryClient.invalidateQueries({ queryKey: ["/api/user/profile"] });
        toast({ title: "💎 Rewards Granted", description: `Balance updated for ${targetUser}` });
      }
    }
  });

  /* ── God Mode guard ── */
  useEffect(() => {
    if (profile && !profile.isGodMode) setLocation("/");
  }, [profile, setLocation]);

  /* ── Watermark injection ── */
  useEffect(() => {
    const existing = document.getElementById("rx-watermark-override");
    if (watermarkHidden) {
      if (!existing) {
        const style = document.createElement("style");
        style.id = "rx-watermark-override";
        style.textContent = `
          body::after {
            content: "RX PREMIUM · NEXUS ENGINE";
            position: fixed; bottom: 0; left: 0; right: 0; z-index: 99999;
            padding: 4px 12px; font-size: 10px; letter-spacing: .2em;
            font-family: 'Orbitron', monospace; color: #00f7ff40;
            text-align: center; pointer-events: none;
          }
        `;
        document.head.appendChild(style);
      }
      localStorage.setItem("rx_hide_watermark", "1");
    } else {
      existing?.remove();
      localStorage.removeItem("rx_hide_watermark");
    }
  }, [watermarkHidden]);

  /* ── persist watermark pref on reload ── */
  useEffect(() => {
    if (localStorage.getItem("rx_hide_watermark") === "1") setWatermarkHidden(true);
  }, []);

  const users = usersData?.users || [];
  const modules = modulesData?.modules || [];

  const TABS = [
    { id: "dashboard", icon: LayoutDashboard, label: "Overview" },
    { id: "modules",   icon: Database,       label: "Module Control" },
    { id: "users",     icon: Users,           label: "User Engine" },
    { id: "economy",   icon: Coins,           label: "Economy Set" },
    { id: "apiconfig", icon: Key,             label: "API Config" },
    { id: "portals",   icon: Link2,           label: "Portals & Links" },
  ];

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-6">

      {/* ── Sidebar ── */}
      <div className="w-full md:w-64 flex-shrink-0 space-y-2">
        <GodBadge />
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all btn-ripple text-sm
              ${activeTab === tab.id
                ? "bg-primary/20 text-primary border border-primary/50 shadow-[0_0_12px_rgba(0,247,255,0.2)]"
                : "bg-transparent text-muted-foreground hover:bg-white/5 hover:text-white border border-transparent"
              }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}

        <div className="pt-4 space-y-2">
          <button
            onClick={() => { queryClient.invalidateQueries(); toast({ title: "🔄 All Data Synced" }); }}
            className="w-full flex justify-center items-center gap-2 px-4 py-3 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/5 btn-ripple"
          >
            <RefreshCw className="w-4 h-4" /> Force Sync
          </button>
          <button
            onClick={() => setLocation("/portal/creator")}
            className="w-full flex justify-center items-center gap-2 px-4 py-2 border border-primary/30 rounded-xl text-xs font-bold text-primary hover:bg-primary/10 btn-ripple"
          >
            <Link2 className="w-3 h-3" /> Creator Portal ↗
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 min-w-0">

        {/* ── DASHBOARD ── */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-white text-glow">System Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard label="Total Users" value={usersData?.total || 0} color="border-l-primary" />
              <StatCard label="Active Modules" value={`${modules.filter(m => m.enabled).length} / ${modules.length}`} color="border-l-secondary" />
              <StatCard label="Live Events" value={2} color="border-l-destructive" />
              <StatCard label="Violations Pending" value={3} color="border-l-amber-400" />
              <StatCard label="Economy Pool 💎" value="1.2M" color="border-l-primary" />
              <StatCard label="API Config Status" value={Object.keys(config).length > 0 ? "Saved" : "Empty"} color="border-l-green-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-panel p-6 rounded-3xl">
                <h3 className="font-bold mb-4 text-primary flex items-center gap-2">
                  <Settings2 className="w-5 h-5" /> Quick Toggles
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/80">Watermark Override</span>
                    <button
                      onClick={() => setWatermarkHidden(v => !v)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${watermarkHidden ? "bg-primary" : "bg-muted"}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${watermarkHidden ? "translate-x-6" : "translate-x-1"}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/80">Show API Values</span>
                    <button
                      onClick={() => setShowApiValues(v => !v)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showApiValues ? "bg-primary" : "bg-muted"}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showApiValues ? "translate-x-6" : "translate-x-1"}`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-3xl border-destructive/20">
                <h3 className="font-bold mb-4 text-destructive flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> Danger Zone
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => resetLb()}
                    className="w-full px-4 py-2 bg-destructive/20 text-destructive border border-destructive/40 rounded-lg font-bold hover:bg-destructive/40 transition-colors btn-ripple text-sm"
                  >
                    Reset Global Leaderboard
                  </button>
                  <button
                    className="w-full px-4 py-2 bg-white/5 text-muted-foreground border border-white/10 rounded-lg font-bold hover:bg-white/10 transition-colors btn-ripple text-sm"
                    onClick={() => toast({ title: "Maintenance mode would activate", variant: "destructive" })}
                  >
                    Activate Maintenance Mode
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MODULE CONTROL ── */}
        {activeTab === "modules" && (
          <div>
            <h2 className="text-2xl font-display font-bold text-white mb-2 text-glow">Feature Flags</h2>
            <p className="text-sm text-muted-foreground mb-6">Toggle any module. Disabled modules show <span className="text-primary font-bold">"Locked by Admin"</span> to users.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.map(mod => (
                <div
                  key={mod.id}
                  className={`glass-panel p-5 rounded-xl flex items-center justify-between gap-4 transition-all
                    ${mod.enabled ? "border-primary/20 shadow-[0_0_10px_rgba(0,247,255,0.05)]" : "border-white/5 opacity-60"}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg ${mod.enabled ? "bg-primary/20 text-primary" : "bg-white/5 text-muted-foreground"}`}>
                      {mod.enabled ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-white text-sm truncate">{mod.name}</h3>
                      <p className="text-[10px] text-muted-foreground">{mod.path}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-[10px] font-bold ${mod.enabled ? "text-primary" : "text-destructive"}`}>
                      {mod.enabled ? "LIVE" : "LOCKED"}
                    </span>
                    <button
                      onClick={() => toggleModule({ moduleId: mod.id, data: { enabled: !mod.enabled } })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shadow-inner
                        ${mod.enabled ? "bg-primary shadow-[0_0_8px_rgba(0,247,255,0.4)]" : "bg-muted"}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${mod.enabled ? "translate-x-6" : "translate-x-1"}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── USER ENGINE ── */}
        {activeTab === "users" && (
          <div>
            <h2 className="text-2xl font-display font-bold text-white mb-6 text-glow">User Engine</h2>
            <div className="glass-panel rounded-xl overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-black/50 border-b border-white/10 uppercase text-[10px] text-muted-foreground tracking-wider">
                  <tr>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Rep</th>
                    <th className="px-4 py-3">💎</th>
                    <th className="px-4 py-3">Violations</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 font-bold text-white">{user.username}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                          ${user.status === "active" ? "bg-green-500/20 text-green-400"
                          : user.status === "frozen" ? "bg-blue-500/20 text-blue-400"
                          : "bg-destructive/20 text-destructive"}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{user.reputation}</td>
                      <td className="px-4 py-3 text-primary font-bold">{user.diamonds?.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`font-bold ${(user.violationCount ?? 0) >= 3 ? "text-destructive" : "text-muted-foreground"}`}>
                          {user.violationCount ?? 0} / 3
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => userAction({ userId: user.id, data: { action: "grant_diamonds", value: 1000 } })}
                          className="px-2 py-1 bg-primary/20 text-primary rounded text-xs hover:bg-primary/40 btn-ripple"
                        >+1k 💎</button>
                        <button
                          onClick={() => userAction({ userId: user.id, data: { action: user.status === "active" ? "freeze" : "unban" } })}
                          className={`px-2 py-1 rounded text-xs btn-ripple
                            ${user.status === "active" ? "bg-destructive/20 text-destructive hover:bg-destructive/40" : "bg-green-500/20 text-green-400 hover:bg-green-500/40"}`}
                        >
                          {user.status === "active" ? "Freeze" : "Activate"}
                        </button>
                        <button
                          onClick={() => userAction({ userId: user.id, data: { action: "reset_violations" } })}
                          className="px-2 py-1 bg-white/10 text-white rounded text-xs hover:bg-white/20 btn-ripple"
                        >Reset V</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ECONOMY SET ── */}
        {activeTab === "economy" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-white text-glow">Economy Engine</h2>
            <div className="glass-panel p-6 rounded-3xl max-w-lg">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Coins className="w-5 h-5" /> Set User Balance
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Target User ID</label>
                  <select
                    value={targetUser}
                    onChange={e => setTargetUser(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                  >
                    {users.map(u => (
                      <option key={u.id} value={u.id}>{u.username} ({u.id})</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Diamonds 💎 to Grant</label>
                    <input
                      type="number"
                      value={diamondTarget}
                      onChange={e => setDiamondTarget(e.target.value)}
                      placeholder="e.g. 5000"
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Gems 💠 to Grant</label>
                    <input
                      type="number"
                      value={gemTarget}
                      onChange={e => setGemTarget(e.target.value)}
                      placeholder="e.g. 500"
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    grantRewards({
                      data: {
                        userId: targetUser,
                        diamonds: parseInt(diamondTarget) || 0,
                        gems: parseInt(gemTarget) || 0,
                        reason: "God Mode manual grant"
                      }
                    });
                    setDiamondTarget(""); setGemTarget("");
                  }}
                  className="w-full py-3 bg-primary text-primary-foreground font-display font-bold rounded-xl shadow-[0_0_20px_rgba(0,247,255,0.3)] hover:shadow-[0_0_30px_rgba(0,247,255,0.5)] transition-all btn-ripple tracking-wider"
                >
                  <Zap className="w-4 h-4 inline mr-2" />
                  EXECUTE GRANT
                </button>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl max-w-lg">
              <h3 className="font-bold text-secondary mb-4">Watermark Control</h3>
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/10">
                <div>
                  <p className="font-bold text-white text-sm">Inject RX Footer</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Forces CSS override via &lt;style&gt; injection. Persists on reload.</p>
                </div>
                <button
                  onClick={() => setWatermarkHidden(v => !v)}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors flex-shrink-0
                    ${watermarkHidden ? "bg-primary shadow-[0_0_10px_rgba(0,247,255,0.4)]" : "bg-muted"}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${watermarkHidden ? "translate-x-8" : "translate-x-1"}`} />
                </button>
              </div>
              {watermarkHidden && (
                <p className="text-xs text-primary mt-2 flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Active — RX Premium footer injected
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── API CONFIG ── */}
        {activeTab === "apiconfig" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-white text-glow">API Configuration</h2>
            <p className="text-sm text-muted-foreground">Values saved to browser localStorage. Never sent to any external server.</p>
            <div className="glass-panel p-6 rounded-3xl max-w-xl space-y-4">
              {[
                { key: "appwrite_endpoint", label: "Appwrite Endpoint", placeholder: "https://cloud.appwrite.io/v1" },
                { key: "appwrite_project_id", label: "Appwrite Project ID", placeholder: "your-project-id" },
                { key: "appwrite_database_id", label: "Appwrite Database ID", placeholder: "your-database-id" },
                { key: "ai_key_openai", label: "OpenAI API Key", placeholder: "sk-..." },
                { key: "ai_key_anthropic", label: "Anthropic API Key", placeholder: "sk-ant-..." },
                { key: "ai_key_gemini", label: "Gemini API Key", placeholder: "AIza..." },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">{field.label}</label>
                  <div className="relative">
                    <input
                      type={showApiValues ? "text" : "password"}
                      value={config[field.key] || ""}
                      onChange={e => setConfig(c => ({ ...c, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none placeholder:text-muted-foreground pr-10"
                    />
                    <button
                      onClick={() => setShowApiValues(v => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                    >
                      {showApiValues ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => { saveConfig(config); toast({ title: "✅ Config Saved", description: "Stored in localStorage." }); }}
                className="w-full py-3 bg-primary/20 text-primary border border-primary/50 font-bold rounded-xl hover:bg-primary/30 transition-all btn-ripple tracking-wider flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> SAVE TO LOCALSTORAGE
              </button>
              {Object.keys(config).filter(k => config[k]).length > 0 && (
                <p className="text-xs text-green-400 text-center">
                  ✓ {Object.keys(config).filter(k => config[k]).length} key(s) saved
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── PORTALS & LINKS ── */}
        {activeTab === "portals" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-white text-glow">Portal & Link Engine</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Creator Portal */}
              <div className="glass-panel p-6 rounded-3xl border-primary/30">
                <h3 className="font-display font-bold text-primary mb-1">Creator Portal</h3>
                <p className="text-xs text-muted-foreground mb-4">Studio, Analytics, Social engagement. Shareable.</p>
                <div className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-muted-foreground font-mono mb-4 break-all">
                  {window.location.origin}/portal/creator
                </div>
                <button
                  onClick={() => {
                    const link = generateSmartLink("/portal/creator");
                    navigator.clipboard.writeText(link).catch(() => {});
                    toast({ title: "🔗 Smart Link Copied!", description: "Detects device & redirects accordingly." });
                  }}
                  className="w-full py-2 bg-primary/20 text-primary border border-primary/40 rounded-lg font-bold text-sm hover:bg-primary/30 btn-ripple flex items-center justify-center gap-2"
                >
                  <Link2 className="w-4 h-4" /> Generate Smart Link
                </button>
              </div>

              {/* User Portal */}
              <div className="glass-panel p-6 rounded-3xl border-secondary/30">
                <h3 className="font-display font-bold text-secondary mb-1">User Portal</h3>
                <p className="text-xs text-muted-foreground mb-4">Feed, Music, Shopping. Shareable.</p>
                <div className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-muted-foreground font-mono mb-4 break-all">
                  {window.location.origin}/portal/user
                </div>
                <button
                  onClick={() => {
                    const link = generateSmartLink("/portal/user");
                    navigator.clipboard.writeText(link).catch(() => {});
                    toast({ title: "🔗 Smart Link Copied!" });
                  }}
                  className="w-full py-2 bg-secondary/20 text-secondary border border-secondary/40 rounded-lg font-bold text-sm hover:bg-secondary/30 btn-ripple flex items-center justify-center gap-2"
                >
                  <Link2 className="w-4 h-4" /> Generate Smart Link
                </button>
              </div>

              {/* Admin Portal — NON-SHAREABLE */}
              <div className="glass-panel p-6 rounded-3xl border-destructive/30 md:col-span-2">
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-destructive" />
                  <h3 className="font-display font-bold text-destructive">Admin Portal</h3>
                  <span className="text-[10px] bg-destructive/20 text-destructive px-2 py-0.5 rounded font-bold ml-auto">NON-SHAREABLE</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  This portal is only accessible when God Mode is ON. Smart links for this portal are <span className="text-destructive font-bold">blocked for security</span>.
                </p>
                <div className="flex items-center gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <MonitorOff className="w-5 h-5 text-destructive flex-shrink-0" />
                  <p className="text-xs text-destructive">Share link generation disabled — Admin route is protected.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
