import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout Components (Matching your layout folder)
import Header from './components/layout/Header';
import BottomNavbar from './components/layout/BottomNavbar';

// Pages - EXACT MATCH from your latest screenshot (All Small Letters)
import Home from './pages/home';
import Auth from './pages/auth';
import Social from './pages/social';
import Studio from './pages/studio';
import Chat from './pages/chat';
import Music from './pages/music';
import Leaderboard from './pages/leaderboard';
import Events from './pages/events'; // 'event' ko 'events' kiya aur small 'e'
import Admin from './pages/admin';
import Profile from './pages/profile';
import NotFound from './pages/not-found';
import Shop from './pages/shop';
import Wallet from './pages/wallet';

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
              <Route path="/events" element={<Events />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin-control" element={<Admin />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/wallet" element={<Wallet />} />
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
