import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { GlassButton } from '../elements/GlassButton';

interface HeroSectionProps {
  onNavigate?: (page: string, prompt?: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim() && onNavigate) {
      onNavigate('create', searchValue.trim());
    }
  };

  return (
    <section className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 sm:px-6 text-center">
      <div className="flex max-w-4xl flex-col items-center gap-8 relative">
        <div className={`flex flex-col gap-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter gradient-text animate-pulse-slow">
            Where Prompts Become Glory
          </h1>
          <h2 className={`text-base sm:text-lg lg:text-xl text-gray-300 ${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
            AI contests, marketplace, hire creators
          </h2>
        </div>

        {/* Search / Prompt bar */}
        <div className={`w-full max-w-2xl px-4 sm:px-0 ${isVisible ? 'animate-fade-in-scale delay-300' : 'opacity-0'}`}>
          <form onSubmit={handlePromptSubmit} className="relative prompt-bar">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-5 w-5 text-gray-400 transition-colors duration-300" />
            </div>
            <input
              type="text"
              placeholder="Describe your vision..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full rounded-full border border-primary/30 glass py-3 sm:py-4 pl-10 sm:pl-12 pr-4 text-white placeholder-gray-400 backdrop-blur-sm focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-300 hover:border-primary/50 text-sm sm:text-base"
            />
          </form>
        </div>

        {/* CTAs */}
        <div className={`flex flex-col gap-3 sm:gap-4 sm:flex-row w-full sm:w-auto px-4 sm:px-0 ${isVisible ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
          <GlassButton className="px-4 sm:px-6 py-3 text-sm sm:text-base">
            Join Contest
          </GlassButton>
          <GlassButton className="px-4 sm:px-6 py-3 text-sm sm:text-base">
            Upload & Sell Art
          </GlassButton>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl animate-pulse-slow delay-500"></div>
        <div className="absolute top-1/2 -right-20 w-16 h-16 bg-pink-400/10 rounded-full blur-xl animate-pulse-slow delay-300"></div>
      </div>
    </section>
  );
}