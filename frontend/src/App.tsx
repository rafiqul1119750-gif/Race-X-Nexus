import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout Components
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';

// --- Sabhi Pages Ka Import ---
import Home from './pages/home';
import Auth from './pages/auth';
import Social from './pages/social';
import Studio from './pages/studio';
import StudioEditor from './pages/studio-editor'; // ✅ Added
import Chat from './pages/chat';                   // ✅ Added
import Music from './pages/music';                 // ✅ Added
import Leaderboard from './pages/leaderboard';     // ✅ Added
import Event from './pages/event';                 // ✅ Added
import Admin from './pages/admin';
import UserPortal from './pages/portal-user';      // ✅ Added
import CreatorPortal from './pages/portal-creator'; // ✅ Added
import Profile from './pages/profile';
import NotFound from './pages/not-found';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-black text-white font-sans">
          {/* Header hamesha top par rahega */}
          <Header />
          
          {/* Main Content Area */}
          <main className="container max-w-md mx-auto pt-20 pb-28 px-4">
            <Routes>
              {/* Basic Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Social & Fun */}
              <Route path="/social" element={<Social />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/music" element={<Music />} />
              
              {/* Competition & Rewards */}
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/events" element={<Event />} />
              
              {/* Studio & Editing */}
              <Route path="/studio" element={<Studio />} />
              <Route path="/editor" element={<StudioEditor />} />
              
              {/* Management & Profile */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/portal" element={<UserPortal />} />
              <Route path="/creator-hub" element={<CreatorPortal />} />
              <Route path="/admin-control" element={<Admin />} />
              
              {/* 404 Error Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Bottom Navigation mobile ke liye */}
          <BottomNav />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
