import { User, Shield, Zap, AlertTriangle } from "lucide-react";
import { useGetUserProfile } from "@workspace/api-client-react";
import { format } from "date-fns";

export default function Profile() {
  const { data: profile, isLoading } = useGetUserProfile();

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto space-y-6">
      
      {/* Safety Warning Banner */}
      {profile.violationCount > 0 && (
        <div className="bg-destructive/20 border border-destructive/50 text-destructive p-4 rounded-xl flex items-start gap-3 shadow-[0_0_15px_rgba(255,0,0,0.2)]">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold">Account Warning ({profile.violationCount}/3 Violations)</h4>
            <p className="text-sm mt-1">Please adhere to community guidelines. 3 violations result in a temporary account freeze.</p>
          </div>
        </div>
      )}

      {/* Header Card */}
      <div className="glass-panel rounded-3xl p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          <div className="w-32 h-32 rounded-full border-4 border-primary p-1 shadow-[0_0_20px_rgba(0,212,255,0.4)]">
            <div className="w-full h-full rounded-full overflow-hidden bg-black">
              <img src={profile.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&fit=crop"} alt={profile.displayName} className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-3xl font-display font-black text-white">{profile.displayName}</h1>
              {profile.isGodMode && (
                <span className="bg-destructive text-white text-[10px] px-2 py-0.5 rounded font-bold tracking-widest">GOD</span>
              )}
            </div>
            <p className="text-muted-foreground mb-4">@{profile.username}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
              <div className="glass-panel-purple px-4 py-2 rounded-xl border-secondary/30 flex items-center gap-2">
                <Shield className="w-4 h-4 text-secondary" />
                <span className="text-sm font-bold">{profile.faction} Faction</span>
              </div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-bold">Level {profile.level}</span>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Diamonds</p>
                <p className="text-2xl font-display font-bold text-glow">{profile.diamonds}</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Gems</p>
                <p className="text-2xl font-display font-bold text-secondary text-glow-purple">{profile.gems}</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Reputation</p>
                <p className="text-2xl font-display font-bold text-white">{profile.reputation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-panel p-6 rounded-3xl">
          <h3 className="font-bold text-lg mb-4 text-white">Earned Badges</h3>
          <div className="flex flex-wrap gap-4">
            {(profile.badges || ['Early Adopter', 'First Collab', '10k Club']).map((badge, i) => (
              <div key={i} className="flex flex-col items-center justify-center w-24 h-24 bg-black/40 border border-white/10 rounded-2xl hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-300">
                  {i === 0 ? '🚀' : i === 1 ? '🤝' : '🏆'}
                </div>
                <span className="text-[10px] font-bold text-center px-1 text-white/70">{badge}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl">
          <h3 className="font-bold text-lg mb-4 text-white">Account Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-sm font-bold text-green-400 capitalize mt-0.5">{profile.status}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Joined</p>
              <p className="text-sm font-bold text-white mt-0.5">{profile.joinDate ? format(new Date(profile.joinDate), 'MMMM dd, yyyy') : 'Unknown'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Last Active</p>
              <p className="text-sm font-bold text-white mt-0.5">{profile.lastActive ? format(new Date(profile.lastActive), 'MMM dd, HH:mm') : 'Now'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
