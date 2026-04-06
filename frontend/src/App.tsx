import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout Components - Fixed paths for GitHub structure
import Header from './components/layout/Header';
import BottomNavbar from './components/layout/BottomNavbar';

// Pages - Case Sensitive Names (Matching your screenshot)
import Home from './pages/Home';
import Auth from './pages/Auth';
import Social from './pages/Social';
import Studio from './pages/Studio';
import Chat from './pages/Chat';
import Music from './pages/Music';
import Leaderboard from './pages/Leaderboard';
import Event from './pages/Event';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import NotFound from './pages/not-found';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-black text-white font-sans">
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
          <BottomNavbar />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
