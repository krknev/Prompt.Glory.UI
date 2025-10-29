"use client";

import { Header } from "../components/navhead/navhead";
import Footer from "../components/footer/footer";
import { ThemeProvider, useTheme } from "../hooks/useTheme";
import { SessionProvider, useSession } from "next-auth/react";
import { useState } from "react";
import { SignUpModal } from "../components/modals/AuthModal/SignUpModal";
import { LoginModal } from "../components/modals/AuthModal/LoginModal"; 
import { useRouter } from "next/navigation";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <ClientLayoutContent>{children}</ClientLayoutContent>
      </ThemeProvider>
    </SessionProvider>
  );
}

// Now all hooks are safe to use inside this
function ClientLayoutContent({ children }: { children: React.ReactNode }) {
    
  const { theme, toggleTheme } = useTheme();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const userRole = session?.user?.role;

  const [currentPage, setCurrentPage] = useState('home');
  const [selectedContestDetails, setSelectedContestDetails] = useState<any>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [generationPrompt, setGenerationPrompt] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const router = useRouter();
  const handleNavigate = (page: string, details?: any) => {
    if (page === 'singleContest') {
      setSelectedContestDetails(details);
    } else if (page === 'generate') {
      setGenerationPrompt(details || '');
    } else {
      setSelectedContestDetails(null);
      setGenerationPrompt('');
    }
    setCurrentPage(page);
    router.push(page);
  };

  return (
    <>
      <Header
          onToggleTheme={toggleTheme}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          theme={theme}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          setShowUploadModal={setShowUploadModal}
          setShowSignUpModal={setShowSignUpModal}
          setShowLoginModal={setShowLoginModal}
          isAuthenticated={isAuthenticated}
          user={session ? session.user : null}
        />

        <main className={`min-h-screen transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-80'}`}>
          {children}
        </main>
        {!['admin', 'dashboard', 'create'].includes(currentPage) && <Footer />}
 
        {/* {showUploadModal && (
          <UploadCard
            isModal={true}
            contestTitle="Upload Your Artwork"
            contestPrize="Share your creativity with the world"
            onClose={() => setShowUploadModal(false)}
            onSetShowUploadModal={setShowUploadModal}
          />
        )} */}
 
        {showSignUpModal && (
          <SignUpModal
            isOpen={showSignUpModal}
            onClose={() => setShowSignUpModal(false)}
            onShowLoginModal={setShowLoginModal}
            onShowSignUpModal={setShowSignUpModal}
          />
        )}
 
        {showLoginModal && (
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onShowLoginModal={setShowLoginModal}
            onShowSignUpModal={setShowSignUpModal}
          />
        )}
      </>
  );
}
