import { useState } from "react";
import { ShieldAlert, Users, LayoutDashboard, Database, RefreshCw } from "lucide-react";
import { useAdminGetUsers, useGetModules, useToggleModule, useAdminUserAction, useResetLeaderboard } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const { data: usersData } = useAdminGetUsers();
  const { data: modulesData } = useGetModules();
  
  const { mutate: toggleModule } = useToggleModule({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [`/api/modules`] })
    }
  });

  const { mutate: userAction } = useAdminUserAction({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [`/api/admin/users`] });
        toast({ title: "Action Applied", description: "User has been updated." });
      }
    }
  });

  const { mutate: resetLb } = useResetLeaderboard({
    mutation: {
      onSuccess: () => {
        toast({ title: "Leaderboard Reset", variant: "destructive" });
      }
    }
  });

  const users = usersData?.users || [];
  const modules = modulesData?.modules || [];

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
      
      {/* Sidebar Nav */}
      <div className="w-full md:w-64 space-y-2">
        <div className="p-4 glass-panel rounded-2xl mb-6 text-center border-destructive/50 shadow-[0_0_15px_rgba(255,0,0,0.2)]">
          <ShieldAlert className="w-10 h-10 text-destructive mx-auto mb-2" />
          <h2 className="font-display font-bold text-glow text-destructive">GOD MODE</h2>
          <p className="text-[10px] text-muted-foreground mt-1 tracking-widest">AUTHORIZED ACCESS ONLY</p>
        </div>

        {[
          { id: "dashboard", icon: LayoutDashboard, label: "Overview" },
          { id: "modules", icon: Database, label: "Module Toggles" },
          { id: "users", icon: Users, label: "User Management" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors btn-ripple ${activeTab === tab.id ? 'bg-primary/20 text-primary border border-primary/50 shadow-[0_0_10px_rgba(0,212,255,0.2)]' : 'bg-transparent text-muted-foreground hover:bg-white/5 hover:text-white'}`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}

        <div className="pt-8">
          <button 
            onClick={() => {
               queryClient.invalidateQueries();
               toast({ title: "Data Refreshed", description: "All endpoints re-fetched." });
            }}
            className="w-full flex justify-center items-center gap-2 px-4 py-3 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/5 btn-ripple"
          >
            <RefreshCw className="w-4 h-4" /> Force Sync
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">System Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-primary">
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-3xl font-display font-bold text-white mt-1">{usersData?.total || 0}</p>
              </div>
              <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-secondary">
                <p className="text-sm text-muted-foreground">Active Modules</p>
                <p className="text-3xl font-display font-bold text-white mt-1">{modules.filter(m=>m.enabled).length} / {modules.length}</p>
              </div>
              <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-destructive">
                <p className="text-sm text-muted-foreground">Violations Pending</p>
                <p className="text-3xl font-display font-bold text-white mt-1">3</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl mt-8">
              <h3 className="font-bold mb-4 text-destructive flex items-center gap-2">Danger Zone</h3>
              <button 
                onClick={() => resetLb()}
                className="px-4 py-2 bg-destructive/20 text-destructive border border-destructive/50 rounded-lg font-bold hover:bg-destructive hover:text-white transition-colors btn-ripple"
              >
                Reset Global Leaderboard
              </button>
            </div>
          </div>
        )}

        {activeTab === "modules" && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Feature Flags</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.map(mod => (
                <div key={mod.id} className="glass-panel p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white">{mod.name}</h3>
                    <p className="text-xs text-muted-foreground">{mod.path}</p>
                  </div>
                  <button 
                    onClick={() => toggleModule({ moduleId: mod.id, data: { enabled: !mod.enabled }})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${mod.enabled ? 'bg-primary' : 'bg-muted'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${mod.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">User Management</h2>
            <div className="glass-panel rounded-xl overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-black/50 border-b border-white/10 uppercase text-[10px] text-muted-foreground tracking-wider">
                  <tr>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Reputation</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-4 py-3 font-bold text-white">{user.username}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-destructive/20 text-destructive'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{user.reputation}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <button 
                          onClick={() => userAction({ userId: user.id, data: { action: 'grant_diamonds', value: 1000 }})}
                          className="px-2 py-1 bg-primary/20 text-primary rounded text-xs hover:bg-primary/40 btn-ripple"
                        >
                          +1k 💎
                        </button>
                        <button 
                          onClick={() => userAction({ userId: user.id, data: { action: user.status === 'active' ? 'freeze' : 'unban' }})}
                          className={`px-2 py-1 rounded text-xs btn-ripple ${user.status === 'active' ? 'bg-destructive/20 text-destructive hover:bg-destructive/40' : 'bg-green-500/20 text-green-400 hover:bg-green-500/40'}`}
                        >
                          {user.status === 'active' ? 'Freeze' : 'Unfreeze'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
