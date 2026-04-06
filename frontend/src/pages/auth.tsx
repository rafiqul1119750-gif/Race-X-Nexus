import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Mail, Lock, User, ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { account } from '@/lib/appwrite';
import { ID } from 'appwrite';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await account.createEmailPasswordSession(email, password);
      } else {
        await account.create(ID.unique(), email, password, name);
        await account.createEmailPasswordSession(email, password);
      }
      navigate('/');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-2">
      {/* --- App Logo & Welcome --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex p-4 bg-primary/10 rounded-3xl border border-primary/20 mb-4 shadow-[0_0_30px_rgba(var(--primary),0.2)]">
          <Zap className="w-10 h-10 text-primary fill-primary" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter">RACE-X NEXUS</h1>
        <p className="text-gray-500 text-sm font-medium uppercase tracking-widest mt-1">
          {isLogin ? 'Welcome Back, Creator' : 'Join the Revolution'}
        </p>
      </motion.div>

      {/* --- Auth Card --- */}
      <Card className="w-full max-w-md p-6 bg-secondary/20 border-white/10 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl">
        <form onSubmit={handleAuth} className="space-y-4">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="relative"
              >
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Full Name"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-primary outline-none transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="email" 
              placeholder="Email Address"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-primary outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="password" 
              placeholder="Password"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-primary outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 bg-primary text-black font-black rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-lg"
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
            {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {isLogin ? "Don't have an account?" : "Already a member?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-primary font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </Card>

      {/* --- Social Login (Optional) --- */}
      <div className="mt-8 w-full max-w-md flex items-center gap-4">
        <div className="h-[1px] bg-white/10 flex-1"></div>
        <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Or Continue With</span>
        <div className="h-[1px] bg-white/10 flex-1"></div>
      </div>

      <div className="mt-6 flex gap-4 w-full max-w-md">
        <Button variant="outline" className="flex-1 h-14 rounded-2xl border-white/10 bg-white/5 font-bold">
          <Github className="mr-2 w-5 h-5" /> GitHub
        </Button>
        <Button variant="outline" className="flex-1 h-14 rounded-2xl border-white/10 bg-white/5 font-bold">
           Google
        </Button>
      </div>
    </div>
  );
};

export default Auth;
