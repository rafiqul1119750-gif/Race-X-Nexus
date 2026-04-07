import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';

const SignIn = () => {
  const [, setLocation] = useLocation();
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col justify-center">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black italic tracking-tighter text-white">SIGN IN</h1>
        <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest">Access the Nexus Hub</p>
      </div>

      <div className="space-y-4">
        {/* Email / Phone Input */}
        <div className="relative">
          <Mail className="absolute left-4 top-4 w-5 h-5 text-zinc-500" />
          <input 
            type="text" 
            placeholder="EMAIL OR PHONE" 
            className="w-full bg-zinc-900/50 border border-zinc-800 p-4 pl-12 rounded-2xl focus:border-cyan-500 outline-none transition-all text-sm font-bold"
          />
        </div>

        {/* Password Input with Show/Hide */}
        <div className="relative">
          <Lock className="absolute left-4 top-4 w-5 h-5 text-zinc-500" />
          <input 
            type={showPass ? "text" : "password"} 
            placeholder="PASSWORD" 
            className="w-full bg-zinc-900/50 border border-zinc-800 p-4 pl-12 pr-12 rounded-2xl focus:border-cyan-500 outline-none transition-all text-sm font-bold"
          />
          <button 
            onClick={() => setShowPass(!showPass)} 
            className="absolute right-4 top-4 text-zinc-500"
          >
            {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <button className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest ml-1">
          Forgot Password?
        </button>

        {/* Login Button -> Redirect to Main Hub */}
        <button 
          onClick={() => setLocation('/hub')}
          className="w-full bg-white text-black p-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all active:scale-95"
        >
          LOGIN <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-zinc-500 text-xs">NEW USER?</p>
        <button onClick={() => setLocation('/auth/signup')} className="text-white font-black text-sm uppercase underline mt-1">
          Create Account
        </button>
      </div>
      
      {/* Guest Mode Option */}
      <button onClick={() => setLocation('/hub')} className="mt-6 text-zinc-600 text-[10px] uppercase tracking-widest hover:text-white">
        Continue as Guest (Limited Access)
      </button>
    </div>
  );
};

export default SignIn;
