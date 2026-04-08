import { useState } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "../../context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function SignUp() {
  const [, setLocation] = useLocation();
  const { claimWelcomeGift } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Yahan aapka Appwrite/Auth logic aayega baad mein
    // Abhi ke liye hum seedha reward claim karwa rahe hain
    const success = claimWelcomeGift();
    
    if (success) {
      alert("🎉 Welcome to Race-X! 10 Diamonds credited to your wallet.");
    }
    
    setLocation("/hub");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <Card className="w-full max-w-md p-8 bg-zinc-900 border-zinc-800 rounded-[30px]">
        <h2 className="text-2xl font-black italic text-white mb-6 uppercase tracking-widest">Join Race-X</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <Input 
            placeholder="EMAIL ADDRESS" 
            className="bg-black border-zinc-800" 
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            type="password" 
            placeholder="PASSWORD" 
            className="bg-black border-zinc-800" 
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 font-bold py-6 rounded-2xl">
            CREATE ACCOUNT & CLAIM 10 💎
          </Button>
        </form>
      </Card>
    </div>
  );
}
