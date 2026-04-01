import { Trophy, Calendar, Users, Zap } from "lucide-react";
import { useGetEvents } from "@workspace/api-client-react";
import { format } from "date-fns";

export default function Events() {
  const { data, isLoading } = useGetEvents();

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <div className="w-10 h-10 border-4 border-destructive border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const events = data?.events || [];
  const liveEvents = events.filter(e => e.status === 'live');
  const upcomingEvents = events.filter(e => e.status === 'upcoming');

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <Trophy className="w-16 h-16 text-primary mx-auto mb-4 drop-shadow-[0_0_15px_rgba(0,212,255,0.8)]" />
        <h1 className="text-4xl font-display font-black text-glow mb-2">Tournaments & Events</h1>
        <p className="text-muted-foreground">Compete globally, earn massive diamond rewards, and climb the leaderboard.</p>
      </div>

      {liveEvents.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-destructive animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
            Live Now
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveEvents.map(event => (
              <div key={event.id} className="relative glass-panel rounded-3xl overflow-hidden border-destructive/30 hover:border-destructive/60 transition-colors group">
                <div className="absolute inset-0 bg-gradient-to-r from-destructive/10 to-transparent pointer-events-none" />
                <div className="p-6 relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold bg-destructive text-white px-2 py-1 rounded tracking-wider">LIVE TOURNAMENT</span>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-muted-foreground">Prize Pool</span>
                      <span className="font-display font-bold text-primary text-glow">{event.reward}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{event.name}</h3>
                  <p className="text-sm text-white/70 mb-6">{event.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{event.participants} / {event.maxParticipants} playing</span>
                    </div>
                    <button className="px-6 py-2 bg-destructive hover:bg-red-600 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(255,0,0,0.4)] btn-ripple">
                      Join Match
                    </button>
                  </div>
                </div>
                {/* Animated loading bar at bottom */}
                <div className="absolute bottom-0 left-0 h-1 bg-destructive animate-[pulse_2s_ease-in-out_infinite]" style={{ width: `${(event.participants || 0) / (event.maxParticipants || 1) * 100}%` }} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
          <Calendar className="w-5 h-5 text-secondary" />
          Upcoming Events
        </h2>
        <div className="space-y-4">
          {upcomingEvents.map(event => (
            <div key={event.id} className="glass-panel-purple p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 hover:border-secondary/50 transition-colors">
              <div className="flex gap-5 w-full sm:w-auto">
                <div className="w-16 h-16 rounded-xl bg-secondary/20 border border-secondary/30 flex flex-col items-center justify-center flex-shrink-0 text-secondary">
                  <span className="text-xs font-bold uppercase">{format(new Date(event.startDate), 'MMM')}</span>
                  <span className="text-xl font-display font-bold">{format(new Date(event.startDate), 'dd')}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-secondary border border-secondary/30 px-1.5 py-0.5 rounded uppercase">{event.type}</span>
                  </div>
                  <h3 className="font-bold text-white text-lg">{event.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{event.description}</p>
                </div>
              </div>
              
              <div className="w-full sm:w-auto flex sm:flex-col items-center justify-between sm:items-end gap-3 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                <div className="flex items-center gap-1 text-sm font-bold text-primary">
                  <Zap className="w-4 h-4 fill-current" /> {event.reward}
                </div>
                <button className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg text-sm transition-colors btn-ripple">
                  Remind Me
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
