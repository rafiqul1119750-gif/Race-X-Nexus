import { ShieldAlert, XCircle, CheckCircle2, Search } from "lucide-react";

interface ContentGuardProps {
  status: 'scanning' | 'blocked' | 'passed';
  message: string;
  onClose: () => void;
}

export function ContentGuard({ status, message, onClose }: ContentGuardProps) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-6">
      <div className={`w-full max-w-sm glass-card p-8 border-t-4 text-center ${
        status === 'blocked' ? 'border-red-600 bg-red-600/5' : 
        status === 'passed' ? 'border-green-600 bg-green-600/5' : 
        'border-blue-600 bg-blue-600/5'
      }`}>
        
        {status === 'scanning' && (
          <div className="space-y-6">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <Search className="absolute inset-0 m-auto text-blue-500" size={32} />
            </div>
            <h2 className="text-2xl font-black italic text-white uppercase">Nexus Scanning</h2>
          </div>
        )}

        {status === 'blocked' && (
          <div className="space-y-5 animate-in zoom-in">
            <XCircle className="text-red-600 mx-auto" size={48} />
            <h2 className="text-2xl font-black italic text-red-600 uppercase">Access Denied</h2>
            <p className="text-xs font-bold text-white uppercase bg-red-600/10 p-2 rounded-lg">{message}</p>
            <p className="text-[9px] text-zinc-500 uppercase flex items-center justify-center gap-1">
              <ShieldAlert size={10} /> Violation Logged in God Mode
            </p>
            <button onClick={onClose} className="w-full py-4 bg-red-600 text-white font-black rounded-2xl italic uppercase text-xs">
              Acknowledge & Exit
            </button>
          </div>
        )}

        {status === 'passed' && (
          <div className="space-y-5 animate-in zoom-in">
            <CheckCircle2 className="text-green-600 mx-auto" size={48} />
            <h2 className="text-2xl font-black italic text-green-600 uppercase">Nexus Verified</h2>
            <button onClick={onClose} className="w-full py-4 bg-green-600 text-white font-black rounded-2xl italic uppercase text-xs">
              Proceed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
