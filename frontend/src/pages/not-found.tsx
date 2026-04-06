import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, Compass, Zap, Ghost } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden relative">
      
      {/* --- Floating Background Elements --- */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0] 
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 opacity-10"
      >
        <Compass size={200} className="text-primary" />
      </motion.div>

      {/* --- Main 404 Visual --- */}
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative inline-block"
        >
          <h1 className="text-[120px] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-primary to-purple-600 opacity-20">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Ghost size={80} className="text-primary animate-bounce" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 space-y-2"
        >
          <h2 className="text-2xl font-black italic tracking-tight uppercase">Lost in the Nexus?</h2>
          <p className="text-sm text-gray-500 max-w-[250px] mx-auto font-medium">
            Ye rasta abhi under-construction hai ya shayad aap galat galaxy mein aa gaye hain.
          </p>
        </motion.div>

        {/* --- Action Buttons --- */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-col gap-3"
        >
          <Button 
            onClick={() => navigate('/')}
            className="h-14 bg-primary text-black font-black rounded-2xl px-10 shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            <Home className="mr-2 w-5 h-5" /> Back to Base
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="text-gray-500 font-bold hover:text-white"
          >
            Go Back
          </Button>
        </motion.div>
      </div>

      {/* --- Footer Status --- */}
      <div className="absolute bottom-10 flex items-center gap-2 px-4 py-2 bg-secondary/20 border border-white/5 rounded-full">
        <Zap size={12} className="text-primary fill-primary" />
        <span className="text-[10px] font-black uppercase tracking-widest opacity-50">System: Scanning for missing nodes...</span>
      </div>
    </div>
  );
};

export default NotFound;
