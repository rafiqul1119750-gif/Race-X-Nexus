import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

const SignIn = () => {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ identity: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic: Validation check here in future
    // Diagram Flow: Sign In Success -> Redirect to HUB
    setLocation('/hub'); 
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-8 pt-24 relative overflow-hidden">
      
      {/* Background Cinematic Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 bg-purple-500/5 blur-[120px] rounded-full" />

      {/* 🔐 Header Node */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <h1 className="text-6xl font-black italic tracking-tighter text-white leading-[0.8]">
          SIGN <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">IN</span>
        </h1>
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.5em] mt-4 ml-1">
          Authorized Personnel Only
        </p>
      </motion.div>

      {/* 🔐 Form Module */}
      <form onSubmit={handleLogin} className="space-y-4 z-10">
        
        {/* Email/Phone Input */}
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-700 group-focus-within:text-cyan-400 transition-colors" />
          <input 
            type="text" 
            placeholder="EMAIL OR PHONE" 
            required
            className="w-full bg-zinc-900/40 border border-zinc-800 p-5 pl-12 rounded-2xl focus:border-cyan-500/50 outline-none transition-all text-sm font-bold tracking-tight placeholder:text-zinc-700"
            onChange={(e) => setCredentials({...credentials, identity: e.target.value})}
          />
        </div>

        {/* Password Input (With 👁 Toggle) */}
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-700 group-focus-within:text-cyan-400 transition-colors" />
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="PASSWORD" 
            required
            className="w-full bg-zinc-900/40 border border-zinc-800 p-5 pl-12 pr-12 rounded-2xl focus:border-cyan-500/50 outline-none transition-all text-sm font-bold tracking-tight placeholder:text-zinc-700"
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end pr-2">
          <button type="button" className="text-[9px] font-black text-zinc-600 hover:text-cyan-400 uppercase tracking-widest transition-colors">
            Recovery Access?
          </button>
        </div>

        {/* 🚀 Login Action */}
        <motion.button 
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-white text-black p-5 rounded-2xl font-black flex items-center justify-center gap-3 mt-6 hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(255,255,255,0.05)]"
        >
          ENTER NEXUS <ArrowRight className="w-5 h-5" />
        </motion.button>
      </form>

      {/* 🆕 Redirect to Signup */}
      <div className="mt-12 text-center">
        <p className="text-zinc-700 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">No Identity Found?</p>
        <button 
          onClick={() => setLocation('/auth/signup')}
          className="text-white font-black text-sm uppercase border-b-2 border-cyan-500/30 pb-1 hover:text-cyan-400 transition-colors"
        >
          Initialize New Account
        </button>
      </div>

      {/* 🛡️ Guest Mode Node */}
      <div className="mt-auto pb-8 text-center opacity-40 hover:opacity-100 transition-opacity">
        <button 
          onClick={() => setLocation('/hub')}
          className="flex items-center justify-center gap-2 mx-auto"
        >
          <ShieldCheck className="w-3 h-3 text-cyan-500" />
          <span className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.3em]">
            Continue as Guest (Limited)
          </span>
        </button>
      </div>

    </div>
  );
};

export default SignIn;
