import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

const SignIn = () => {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic: Authenticate user then redirect to Main Hub
    setLocation('/hub'); 
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-8 pt-20 relative overflow-hidden">
      
      {/* Cinematic Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 bg-purple-500/5 blur-[120px] rounded-full" />

      {/* 🔐 Header Node */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-black italic tracking-tighter text-white leading-none">
          SIGN <span className="text-cyan-400 text-shadow-[0_0_15px_rgba(34,211,238,0.5)]">IN</span>
        </h1>
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.4em] mt-3">
          Access the Race-X Nexus
        </p>
      </motion.div>

      {/* 🔐 Sign In Form Nodes */}
      <form onSubmit={handleLogin} className="space-y-5 z-10">
        
        {/* Email / Phone Input Node */}
        <div className="group relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-cyan-400 transition-colors" />
          <input 
            type="text" 
            placeholder="EMAIL OR PHONE" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-900/40 border border-zinc-800 p-5 pl-12 rounded-2xl focus:border-cyan-500/50 outline-none transition-all text-sm font-bold placeholder:text-zinc-700 tracking-tight"
          />
        </div>

        {/* Password Input Node (With 👁 Show/Hide) */}
        <div className="group relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-cyan-400 transition-colors" />
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="PASSWORD" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-900/40 border border-zinc-800 p-5 pl-12 pr-12 rounded-2xl focus:border-cyan-500/50 outline-none transition-all text-sm font-bold placeholder:text-zinc-700 tracking-tight"
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* 🔐 Forgot Password Node */}
        <div className="flex justify-start">
          <button type="button" className="text-[10px] font-black text-zinc-500 hover:text-cyan-400 uppercase tracking-widest transition-all">
            Forgot Password?
          </button>
        </div>

        {/* 🔐 Login Button Node (Redirect → MAIN HUB) */}
        <motion.button 
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-white text-black p-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:shadow-none mt-4"
        >
          LOGIN TO HUB <ArrowRight className="w-5 h-5" />
        </motion.button>
      </form>

      {/* 🔐 Sign Up Redirect Node */}
      <div className="mt-10 text-center">
        <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest mb-2">New Pilot?</p>
        <button 
          onClick={() => setLocation('/auth/signup')}
          className="text-white font-black text-sm uppercase underline decoration-cyan-500/50 underline-offset-8 hover:text-cyan-400 transition-colors"
        >
          Create New Account
        </button>
      </div>

      {/* 🔐 GUEST MODE Node (Limited Access) */}
      <div className="mt-auto pb-6 text-center">
        <button 
          onClick={() => setLocation('/hub')}
          className="group flex items-center justify-center gap-2 mx-auto"
        >
          <ShieldCheck className="w-4 h-4 text-zinc-700 group-hover:text-cyan-500 transition-colors" />
          <span className="text-zinc-700 text-[9px] font-black uppercase tracking-[0.2em] group-hover:text-zinc-400 transition-colors">
            Continue as Guest (Limited Access)
          </span>
        </button>
      </div>

    </div>
  );
};

export default SignIn;
