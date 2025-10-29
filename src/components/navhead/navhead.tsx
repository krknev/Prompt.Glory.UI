"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Search, Menu, Sun, Moon, ChevronLeft, ChevronRight } from "lucide-react";
import { User } from "next-auth";
import { SidebarLink } from "./SidebarLink";

interface HeaderProps {
  onToggleTheme: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  theme: "dark" | "light";
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setShowUploadModal: Dispatch<SetStateAction<boolean>>;
  setShowSignUpModal: Dispatch<SetStateAction<boolean>>;
  setShowLoginModal: Dispatch<SetStateAction<boolean>>;
  isAuthenticated?: boolean;
  user?: User | null;
}

export function Header({
  onToggleTheme,
  currentPage,
  onNavigate,
  theme,
  sidebarCollapsed,
  setSidebarCollapsed,
  setShowUploadModal,
  setShowSignUpModal,
  setShowLoginModal,
  isAuthenticated,
  user
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Links that are always public
  const publicLinks = [
    { label: "Home", page: "/", icon: "🏠" },
    { label: "Contests", page: "/contests/all", icon: "🏆" },
    { label: "Marketplace", page: "/marketplace", icon: "🛒" },
  ];

  // Links only for authenticated users
  const privateLinks = [
    { label: "Creators", page: "/creators/all", icon: "👨‍🎨" },
    { label: "Explore", page: "/explore", icon: "🔍" },
    { label: "Polls", page: "/polls/all", icon: "🗳️" },
    { label: "Hire Creator", page: "/creators/hire", icon: "💼" },
    { label: "Create", page: "/user/create", icon: "✨" },
  ];
 
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-800/60 transition-all duration-300 ease-in-out ${sidebarCollapsed ? "w-16" : "w-80"
          } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div
            className={`border-b border-slate-200/60 dark:border-slate-800/60 transition-all duration-300 ${sidebarCollapsed ? "p-3" : "p-6"
              }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={
                    theme === "dark"
                      ? "/logo-blue-pink-removebg-preview.png"
                      : "/promptglory-logo-dark.png"
                  }
                  alt="PromptGlory Logo"
                  className="h-10 w-auto object-contain flex-shrink-0"
                />
                {!sidebarCollapsed && (
                  <button
                    onClick={() => onNavigate("home")}
                    className="text-xl font-bold tracking-tight hover:text-primary transition-colors gradient-text truncate"
                  >
                    PromptGlory
                  </button>
                )}
              </div>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
              >
                {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "p-3" : "p-6"}`}>
            <nav className="space-y-2">
              {/* Public links are always visible */}
              {publicLinks.map((link) => (
                <SidebarLink
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  active={currentPage === link.page}
                  icon={link.icon}
                  label={link.label}
                  collapsed={sidebarCollapsed}
                />
              ))}

              {/* Private links are only visible to authenticated users */}
              {isAuthenticated &&
                privateLinks.map((link) => (
                  <SidebarLink
                    key={link.page}
                    onClick={() => onNavigate(link.page)}
                    active={currentPage === link.page}
                    icon={link.icon}
                    label={link.label}
                    collapsed={sidebarCollapsed}
                  />
                ))}

              {/* Theme toggle */}
              <button
                onClick={onToggleTheme}
                className={`w-full flex items-center rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 relative group ${sidebarCollapsed ? "justify-center px-3 py-3" : "gap-3 px-4 py-3"
                  }`}
              >
                <span className="text-lg">{theme === "light" ? "🌙" : "☀️"}</span>
                {!sidebarCollapsed && (
                  <span className="font-medium">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                )}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                  </div>
                )}
              </button>
            </nav>
          </div>

          {/* Bottom Actions */}
          <div
            className={`border-t border-slate-200/60 dark:border-slate-800/60 space-y-3 transition-all duration-300 ${sidebarCollapsed ? "p-3" : "p-6"
              }`}
          >
            {isAuthenticated ? (
              <>
                {/* User Dashboard */}
                <button
                  onClick={() => onNavigate("/user/dashboard")}
                  className={`w-full flex items-center rounded-xl bg-violet-600/10 text-violet-600 hover:bg-violet-600/20 transition-all duration-200 font-medium relative group ${sidebarCollapsed ? "justify-center px-3 py-3" : "gap-3 px-4 py-3"
                    }`}
                >
                  <span className="text-lg">👤</span>
                  {!sidebarCollapsed && <span>User Dashboard</span>}
                </button>

                {/* Admin Dashboard 
                <button
                  onClick={() => onNavigate("admin")}
                  className={`w-full flex items-center rounded-xl bg-orange-600/10 text-orange-600 hover:bg-orange-600/20 transition-all duration-200 font-medium relative group ${sidebarCollapsed ? "justify-center px-3 py-3" : "gap-3 px-4 py-3"
                    }`}
                >
                  <span className="text-lg">⚙️</span>
                  {!sidebarCollapsed && <span>Admin Dashboard</span>}
                </button>*/}

                {/* Upload */}
                <button
                  onClick={() => setShowUploadModal(true)}
                  className={`w-full flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 font-bold relative group ${sidebarCollapsed ? "px-3 py-3" : "gap-2 px-4 py-3"
                    }`}
                >
                  <span className="text-lg">📤</span>
                  {!sidebarCollapsed && <span>Upload Artwork</span>}
                </button>
              </>
            ) : (
              <>
                {/* Only show login/signup for unauthenticated users */}
                <div className={sidebarCollapsed ? "space-y-2" : "grid grid-cols-2 gap-2"}>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className={`w-full flex items-center justify-center px-3 py-3 rounded-xl border border-slate-300/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 relative group`}
                   >
                    <span>🔑</span>
                    {!sidebarCollapsed && <span>Log In</span>}
                  </button>
                  
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Top Header Bar */}
      <header
        className={`relative z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 transition-all duration-300 ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-80"
          }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left - Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-3 lg:hidden">
              <img
                src={theme === "dark" ? "/logo-blue-pink-removebg-preview.png" : "/promptglory-logo-dark.png"}
                alt="PromptGlory Logo"
                className="h-8 w-auto object-contain"
              />
              <button
                onClick={() => onNavigate("home")}
                className="text-lg font-bold tracking-tight hover:text-primary transition-colors gradient-text"
              >
                PromptGlory
              </button>
            </div>
          </div>

          {/* Center - Search / AI Generation */}
          <div className="hidden xl:flex items-center flex-1 max-w-2xl mx-8">
            <div className="relative w-full prompt-bar">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-5 w-5 text-slate-400 transition-colors duration-300" />
              </div>
              <input
                type="text"
                placeholder="Generate AI artwork or search existing..."
                className="w-full rounded-full border border-slate-300/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 py-3 pl-12 pr-32 text-slate-900 dark:text-white placeholder-slate-400 backdrop-blur-sm focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-300 hover:border-primary/50"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                {isAuthenticated && (
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 text-sm font-bold">
                    <span>✨</span>
                    Create
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {isAuthenticated && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 font-medium text-sm"
              >
                <span>📤</span>
                <span className="hidden sm:inline">Upload</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setMobileMenuOpen(false);
          }}
        />
      )}
    </>
  );
}

