import React, { useState, useRef } from 'react';
import { useLocation } from 'wouter';
import { User, AtSign, Mail, Lock, Camera, ArrowRight } from 'lucide-react';

const SignUp = () => {
  const [, setLocation] = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col pt-16">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black italic tracking-tighter">CREATE ACCOUNT</h1>
        <p className="text-zinc-500 text-[10px] mt-2 uppercase tracking-[0.3em]">Join the Race-X Elite</p>
      </div>

      <div className="space-y-4">
        {/* Profile Image Upload Node */}
        <div className="flex flex-col items-center mb-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-24 h-24 rounded-full bg-zinc-900 border-2 border-dashed border-zinc-700 flex items-center justify-center overflow-hidden cursor-pointer hover:border-cyan-500 transition-all"
          >
            {preview ? (
              <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <Camera className="w-8 h-8 text-zinc-600" />
            )}
          </div>
          <input type="file" ref={fileInputRef} hidden onChange={handleImage} accept="image/*" />
          <span className="text-[10px] text-zinc-500 mt-2 font-bold uppercase tracking-widest">Upload Profile Image</span>
        </div>

        {/* Inputs */}
        <div className="relative">
          <User className="absolute left-4 top-4 w-5 h-5 text-zinc-500" />
          <input type="text" placeholder="FULL NAME" className="signup-input pl-12" />
        </div>

        <div className="relative">
          <AtSign className="absolute left-4 top-4 w-5 h-5 text-zinc-500" />
          <input type="text" placeholder="USERNAME" className="signup-input pl-12" />
        </div>

        <div className="relative">
          <Mail className="absolute left-4 top-4 w-5 h-5 text-zinc-500" />
          <input type="text" placeholder="EMAIL OR PHONE" className="signup-input pl-12" />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-4 w-5 h-5 text-zinc-500" />
          <input type="password" placeholder="PASSWORD" className="signup-input pl-12" />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-4 w-5 h-5 text-zinc-500" />
          <input type="password" placeholder="CONFIRM PASSWORD" className="signup-input pl-12" />
        </div>

        {/* Continue Button -> Terms Page */}
        <button 
          onClick={() => setLocation('/auth/terms')}
          className="w-full bg-cyan-500 text-black p-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-white transition-all active:scale-95 mt-4"
        >
          CONTINUE <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <style>{`
        .signup-input {
          @apply w-full bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl focus:border-cyan-500 outline-none transition-all text-sm font-bold uppercase tracking-tighter;
        }
      `}</style>
    </div>
  );
};

export default SignUp;
