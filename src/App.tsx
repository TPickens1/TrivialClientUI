import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthModal } from './components/AuthModal';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { SupportTickets } from './components/SupportTickets';
import { RaulLiveData } from './components/RaulLiveData';
import { SpaceEstimator } from './components/SpaceEstimator';

function AppContent() {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-center mb-4 sm:mb-6">
              <img
                src="/image.png"
                alt="The Trivial Company"
                className="h-16 sm:h-24 w-auto"
              />
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-black mb-2">
              The Trivial Company
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Automated Parking Systems Client Portal
            </p>
          </div>

          <button
            onClick={() => setShowAuthModal(true)}
            className="w-full sm:w-auto bg-[#FFC107] text-black font-semibold px-6 sm:px-8 py-3 rounded-lg hover:bg-[#FFB300] transition-colors"
          >
            Sign In to Continue
          </button>
        </div>

        {showAuthModal && (
          <AuthModal onClose={() => setShowAuthModal(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar unchanged */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Main content */}
      <main
        className="
          flex-1
          overflow-y-auto
          p-3
          sm:p-6
          lg:p-8
          pt-12
          sm:pt-16
          lg:pt-8
        "
      >
        {/* MOBILE SCALE WRAPPER (mobile only) */}
        <div className="scale-[1.15] origin-top-left sm:scale-100">
          {/* Header logo (desktop behavior preserved) */}
          <div className="flex justify-end mb-3 sm:mb-4">
            <img
              src="/image.png"
              alt="The Trivial Company"
              className="h-10 sm:h-14 lg:h-16 w-auto"
            />
          </div>

          {/* ==== MAIN VIEW CONTROL ==== */}
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'tickets' && <SupportTickets />}
          {activeView === 'raul' && <RaulLiveData />}
          {activeView === 'spaceEstimator' && (
            <SpaceEstimator onBack={() => setActiveView('dashboard')} />
          )}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
