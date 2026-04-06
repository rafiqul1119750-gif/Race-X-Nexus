import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Users, Zap, AlertTriangle, 
  Settings, BarChart3, Search, UserMinus, CheckCircle 
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { databases } from '@/lib/appwrite';
import { Query } from 'appwrite';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Admin = () => {
  const { user } = useAppContext();
  const [stats, setStats] = useState({ totalUsers: 0, totalDiamonds: 0, reportedPosts: 0 });
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Security Check: Sirf aap (Owner) hi ise dekh sakte ho ---
  useEffect(() => {
    // Yahan aap apni specific Appwrite User ID check karoge
    const fetchAdminData = async () => {
      try {
        const users = await databases.listDocuments('YOUR_DB', 'USER_STATS');
        const posts = await databases.listDocuments('YOUR_DB', 'POSTS', [Query.equal('reported', true)]);
        
        setStats({
          totalUsers: users.total,
          totalDiamonds: users.documents.reduce((acc, curr) => acc + curr.diamonds, 0),
          reportedPosts: posts.total
        });
        setUsersList(users.documents);
      } catch (err) {
        console.error("Admin access denied or error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (user?.$id !== 'YOUR_OWNER_ID') {
    return <div className="h-screen flex items-center justify-center text-rose-500 font-black italic">ACCESS DENIED: SHIELD ACTIVE</div>;
  }

  return (
    <div className="space-y-8 pb-28 pt-4">
      {/* --- Admin Header --- */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-3xl font-black tracking-tighter flex items-center gap-2">
            COMMANDER <ShieldCheck className="text-primary" />
          </h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">System Overview</p>
        </div>
        <div className="p-2 bg-secondary/50 rounded-2xl border border-white/5">
          <Settings className="w-5 h-5 text-gray-400 animate-spin-slow" />
        </div>
      </div>

      {/* --- Dashboard Stats --- */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={<Users size={18}/>} label="Users" value={stats.totalUsers} color="text-blue-400" />
        <StatCard icon={<Zap size={18}/>} label="Circulation" value={stats.totalDiamonds} color="text-primary" />
        <StatCard icon={<AlertTriangle size={18}/>} label="Reports" value={stats.reportedPosts} color="text-rose-500" />
      </div>

      {/* --- User Management Section --- */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <BarChart3 size={14} /> Manage Creators
          </h3>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600" size={12} />
            <input type="text" placeholder="Find user..." className="bg-secondary/30 border border-white/5 rounded-lg py-1 pl-7 pr-2 text-[10px] outline-none focus:border-primary/50" />
          </div>
        </div>

        <div className="space-y-3">
          {usersList.map((u) => (
            <Card key={u.$id} className="p-4 bg-secondary/10 border-white/5 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-primary">
                  {u.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold">{u.name}</p>
                  <p className="text-[10px] text-gray-500">ID: {u.$id.slice(0,8)}... | 💎 {u.diamonds}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-emerald-500 bg-emerald-500/10">
                  <CheckCircle size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-rose-500 bg-rose-500/10">
                  <UserMinus size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* --- System Logs (Quick View) --- */}
      <Card className="p-6 bg-gradient-to-br from-secondary/40 to-black border-white/10 rounded-[2rem]">
        <h4 className="text-xs font-bold uppercase mb-4 text-primary">Live Network Logs</h4>
        <div className="space-y-2 font-mono text-[9px] text-gray-500">
          <p><span className="text-emerald-500">[OK]</span> Appwrite Connection Secure</p>
          <p><span className="text-primary">[INFO]</span> Diamond Pack #4 Purchased by User_82</p>
          <p><span className="text-rose-500">[WARN]</span> Failed login attempt from IP: 192.168.1.1</p>
          <p><span className="text-blue-500">[AI]</span> Studio Engine Status: Optimizing Prompts...</p>
        </div>
      </Card>
    </div>
  );
};

// Reusable Stat Component
const StatCard = ({ icon, label, value, color }: any) => (
  <Card className="p-4 bg-secondary/20 border-white/5 flex flex-col items-center text-center space-y-1">
    <div className={`p-2 bg-white/5 rounded-xl ${color}`}>{icon}</div>
    <p className="text-lg font-black">{value}</p>
    <p className="text-[8px] text-gray-500 uppercase font-bold tracking-tighter">{label}</p>
  </Card>
);

export default Admin;
