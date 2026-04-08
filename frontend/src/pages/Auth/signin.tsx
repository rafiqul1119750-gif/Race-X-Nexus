import { useLocation } from "wouter";
import { ArrowLeft, Mail, Lock } from "lucide-react";

export default function SignIn() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col justify-center font-sans">
      <ArrowLeft onClick={() => setLocation('/')} className="absolute top-10 left-8 text-zinc-500" />
      <h1 className="text-4xl font-black italic tracking-tighter mb-2 uppercase">Welcome Back</h1>
      <p className="text-zinc-500 text-xs font-bold tracking-widest mb-12 uppercase">Access the Nexus Engine</p>

      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2">Email Address</p>
          <div className="flex items-center gap-4 bg-zinc-900 p-5 rounded-3xl border border-white/5">
            <Mail size={18} className="text-zinc-500" />
            <input type="email" placeholder="nexus@race-x.com" className="bg-transparent outline-none text-xs font-bold w-full" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2">Security Key</p>
          <div className="flex items-center gap-4 bg-zinc-900 p-5 rounded-3xl border border-white/5">
            <Lock size={18} className="text-zinc-500" />
            <input type="password" placeholder="••••••••" className="bg-transparent outline-none text-xs font-bold w-full" />
          </div>
        </div>

        <button 
          onClick={() => setLocation('/hub')}
          className="w-full bg-white text-black py-6 rounded-[30px] text-xs font-black uppercase tracking-widest shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95 transition-transform"
        >
          Initialize Login
        </button>
      </div>

      <p className="mt-10 text-center text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
        New to Nexus? <span onClick={() => setLocation('/auth/signup')} className="text-cyan-400 cursor-pointer">Register Node</span>
      </p>
    </div>
  );
}
