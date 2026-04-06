import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { AppProvider, useAppContext } from '@/context/AppContext';
import Navbar from '@/components/layout/Navbar';
import Header from '@/components/layout/Header';
import Loader from '@/components/ui/Loader'; // Progressive Loader
import ErrorBoundary from '@/components/ui/error-boundary';

// Lazy Loading Pages (Performance ke liye, taki Redmi phone hang na ho)
const Home = lazy(() => import('@/pages/home'));
const Social = lazy(() => import('@/pages/social'));
const Studio = lazy(() => import('@/pages/studio'));
const Shop = lazy(() => import('@/pages/shop'));
const Wallet = lazy(() => import('@/pages/wallet'));
const Profile = lazy(() => import('@/pages/profile'));
const Auth = lazy(() => import('@/pages/auth'));
const Admin = lazy(() => import('@/pages/admin'));
const NotFound = lazy(() => import('@/pages/not-found'));

// Protected Route Logic
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAppContext();
  if (loading) return <Loader />;
  return user ? <>{children}</> : <Navigate to="/auth" />;
};

function AppContent() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Header />
      <main className="pb-20 pt-16 container max-w-md mx-auto px-4">
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/social" element={<Social />} />
              
              {/* Sirf Logged-in users ke liye */}
              <Route path="/studio" element={<ProtectedRoute><Studio /></ProtectedRoute>} />
              <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
              <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              
              {/* Admin Only */}
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Navbar />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  );
}
