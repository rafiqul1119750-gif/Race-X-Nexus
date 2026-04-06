Components { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout Components
import Header from './components/layout/Header.tsx';
import BottomNavbar from './components/layout/BottomNavbar.tsx';

// Pages - Case Sensitive Imports with extensions
import Home from './pages/home.tsx';
import Auth from './pages/Auth.tsx';
import Social from './pages/Social.tsx';
import Studio from './pages/Studio.tsx';
import Chat from './pages/Chat.tsx';
import Music from './pages/Music.tsx';
import Leaderboard from './pages/Leaderboard.tsx';
import Event from './pages/Event.tsx';
import Admin from './pages/Admin.tsx';
import Profile from './pages/Profile.tsx';
import NotFound from './pages/not-found.tsx';

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
