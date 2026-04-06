import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';

// Pages
import Home from './pages/home';
import Social from './pages/social';
import Studio from './pages/studio';
import Auth from './pages/auth';
import Admin from './pages/admin';
import Profile from './pages/profile';
import NotFound from './pages/not-found';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-background text-white font-sans selection:bg-primary selection:text-black">
          <Header />
          <main className="container max-w-md mx-auto pt-20 pb-24 px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/social" element={<Social />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
