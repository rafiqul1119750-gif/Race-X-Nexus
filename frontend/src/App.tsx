import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout Components (Exact names from your GitHub)
import Header from './components/layout/Header';
import BottomNavbar from './components/layout/BottomNavbar'; // Fixed Name

// Pages
import Home from './pages/home';
import Auth from './pages/auth';
import Social from './pages/social';
import Studio from './pages/studio';
import Chat from './pages/chat';
import Music from './pages/music';
import Leaderboard from './pages/leaderboard';
import Event from './pages/event';
import Admin from './pages/admin';
import Profile from './pages/profile';
import NotFound from './pages/not-found';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-black text-white font-sans">
          {/* Header at the top */}
          <Header />
          
          <main className="container max-w-md mx-auto pt-20 pb-28 px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/social" element={<Social />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/music" element={<Music />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/events" element={<Event />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin-control" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Bottom Navbar at the bottom */}
          <BottomNavbar />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
