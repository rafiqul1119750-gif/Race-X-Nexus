import { useState } from "react";
import { account, ID } from "@/lib/appwrite";
import { useLocation } from "wouter";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await account.createEmailPasswordSession(email, password);
      } else {
        await account.create(ID.unique(), email, password);
        await account.createEmailPasswordSession(email, password);
      }
      setLocation("/"); // Login ke baad Home par bhejo
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl border border-blue-500/30 shadow-[0_0_20px_rgba(0,0,255,0.2)]">
        <h1 className="text-3xl font-black text-blue-500 text-center mb-6 italic uppercase">
          Race-X {isLogin ? "Login" : "Join"}
        </h1>
        <form onSubmit={handleAuth} className="space-y-4">
          <input 
            type="email" placeholder="Email" 
            className="w-full p-3 bg-black border border-zinc-800 rounded-lg text-white focus:border-blue-500 outline-none"
            onChange={(e) => setEmail(e.target.value)} required
          />
          <input 
            type="password" placeholder="Password" 
            className="w-full p-3 bg-black border border-zinc-800 rounded-lg text-white focus:border-blue-500 outline-none"
            onChange={(e) => setPassword(e.target.value)} required
          />
          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all uppercase italic">
            {isLogin ? "Enter Nexus" : "Create Account"}
          </button>
        </form>
        <p className="text-zinc-500 text-center mt-6 text-sm">
          {isLogin ? "New to Race-X?" : "Already a member?"} 
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-400 ml-2 font-bold underline">
            {isLogin ? "Join Now" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
