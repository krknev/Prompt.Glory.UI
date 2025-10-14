"use client";
 
import { useEffect, useState } from 'react'; 
import { useAuth } from '../hooks/useAuth';
import { LoginModal } from './modals/AuthModal/LoginModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setShowLoginModal(true);
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Authentication Required
            </h1>
            <p className="text-gray-600 mb-6">
              Please log in to access this content.
            </p>
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </div>
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)} 
            onShowSignUpModal={() => setShowLoginModal(false)} 
            onShowLoginModal={()=>console.log()}
        />
      </>
    );
  }

  return <>{children}</>;
}