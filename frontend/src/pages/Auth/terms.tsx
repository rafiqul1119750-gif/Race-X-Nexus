import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';

const TermsConditions = () => {
  const [, setLocation] = useLocation();
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-8 pt-12 relative overflow-hidden">
      
      {/* Background Aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-cyan-500/5 blur-[100px] rounded-full" />

      {/* 📜 Header Node */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-black italic tracking-tighter text-white">
          TERMS & <span className="text-cyan-400">REGULATIONS</span>
        </h1>
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] mt-2">
          Race-X Legal Framework v1.0
        </p>
      </motion.div>

      {/* 📜 Terms Text Scroll Node */}
      <div className="flex-1 bg-zinc-900/30 border border-zinc-800 rounded-3xl p-6 overflow-y-auto mb-6 custom-scrollbar backdrop-blur-sm">
        <div className="space-y-6 text-[11px] text-zinc-400 font-medium leading-relaxed uppercase tracking-tight">
          
          <section>
            <h2 className="text-cyan-400 font-black mb-2 flex items-center gap-2">
              <ShieldCheck className="w-3 h-3" /> 01. CONTENT GOVERNANCE
            </h2>
            <p>Race-X uses real-time AI to monitor all uploads. 18+, NSFW, or copyright-infringing content will lead to an immediate permanent ban. No warnings will be issued.</p>
          </section>

          <section>
            <h2 className="text-white font-black mb-2 flex items-center gap-2">
              <FileText className="w-3 h-3" /> 02. DATA PRIVACY & ENCRYPTION
            </h2>
            <p>Your biometric and personal data are encrypted via Quantum-Shield. We do not sell user data. AI training is restricted to content explicitly marked as 'Public'.</p>
          </section>

          <section>
            <h2 className="text-purple-400 font-black mb-2 flex items-center gap-2">
              <AlertCircle className="w-3 h-3" /> 03. MONETIZATION & WALLET
            </h2>
            <p>Diamond-to-Gem conversion rates are dynamic. Withdrawals are subject to 24-hour verification. Fraudulent diamond farming will result in a wallet freeze.</p>
          </section>

          <section className="opacity-50">
            <h2 className="text-zinc-500 font-black mb-2">04. COMMUNITY CONDUCT</h2>
            <p>Harassment, hate speech, or system exploitation is strictly prohibited. Respect the creator community.</p>
          </section>
        </div>
      </div>

      {/* 📜 Checkbox ☑ Agree Node */}
      <div className="space-y-4 z-10">
        <button 
          onClick={() => setIsAgreed(!isAgreed)}
          className="flex items-start gap-4 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all text-left"
        >
          <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${isAgreed ? 'bg-cyan-500 border-cyan-500' : 'border-zinc-700'}`}>
            {isAgreed && <CheckCircle2 className="w-4 h-4 text-black stroke-[3]" />}
          </div>
          <span className="text-[10px] font-bold text-zinc-300 uppercase leading-tight">
            I confirm that I am 18+ and I agree to the <span className="text-cyan-400">Privacy Policy</span> and <span className="text-cyan-400">Rules</span>.
          </span>
        </button>

        {/* 📜 View Full Docs Button */}
        <button className="w-full py-3 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] hover:text-white transition-colors">
          View Full Legal Documentation
        </button>

        {/* ✅ Agree & Create Account Node (Redirect → MAIN HUB) */}
        <motion.button 
          whileTap={isAgreed ? { scale: 0.98 } : {}}
          disabled={!isAgreed}
          onClick={() => setLocation('/hub')}
          className={`w-full p-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
            isAgreed 
            ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-cyan-400' 
            : 'bg-zinc-900 text-zinc-700 opacity-50 cursor-not-allowed'
          }`}
        >
          CREATE ACCOUNT <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default TermsConditions;
