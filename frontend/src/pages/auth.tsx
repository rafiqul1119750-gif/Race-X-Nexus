import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { ShieldCheck, AlertCircle, Scale, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const TermsConditions = () => {
  const [, setLocation] = useLocation();
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col items-center">
      <div className="w-full max-w-lg bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl">
        <h1 className="text-3xl font-black italic text-cyan-400 mb-6 uppercase tracking-tighter">
          Race-X Constitution
        </h1>

        <div className="h-96 overflow-y-auto pr-4 space-y-6 text-sm text-zinc-400 font-medium custom-scrollbar">
          <section>
            <div className="flex items-center gap-2 text-white mb-2 font-bold uppercase tracking-widest text-xs">
              <EyeOff className="w-4 h-4 text-red-500" /> 1. Content Policy (18+)
            </div>
            <p>Race-X maintains a zero-tolerance policy for NSFW content. Our AI Engine automatically scans and deletes pornography, hate speech, and extreme violence. Violation results in permanent HWID ban.</p>
          </section>

          <section>
            <div className="flex items-center gap-2 text-white mb-2 font-bold uppercase tracking-widest text-xs">
              <Scale className="w-4 h-4 text-cyan-400" /> 2. Copyright & AI
            </div>
            <p>Any content uploaded is scanned against global copyright databases. Users retain IP ownership but grant Race-X a non-exclusive license to distribute. AI training is restricted to public data only.</p>
          </section>

          <section>
            <div className="flex items-center gap-2 text-white mb-2 font-bold uppercase tracking-widest text-xs">
              <ShieldCheck className="w-4 h-4 text-green-500" /> 3. Data & Privacy
            </div>
            <p>All private chats are End-to-End Encrypted. Race-X employees or AI systems cannot read your DMs. Data is stored on secure decentralized servers.</p>
          </section>
        </div>

        <div className="mt-8 flex items-start gap-3 p-4 bg-cyan-500/5 rounded-2xl border border-cyan-500/20">
          <Checkbox 
            id="terms" 
            checked={agreed} 
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
            className="border-cyan-500 data-[state=checked]:bg-cyan-500 mt-1"
          />
          <label htmlFor="terms" className="text-xs text-zinc-300 leading-tight cursor-pointer">
            I agree to the Terms, 18+ Policy, and Copyright Regulations of Race-X World.
          </label>
        </div>

        <Button 
          disabled={!agreed}
          onClick={() => setLocation('/hub')}
          className="w-full mt-6 h-14 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-cyan-400 hover:text-black transition-all disabled:opacity-30"
        >
          Enter Race-X World
        </Button>
      </div>
    </div>
  );
};

export default TermsConditions;
