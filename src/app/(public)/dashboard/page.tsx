'use client';
 import { HeroSection } from '@/components/sections/HeroSection';
 import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
 import { WeeklyWinnersSection } from '@/components/sections/WeeklyWinnersSection';

 

export default function Home() {
    
  
    return ( 
      <div className="flex flex-col">
      <HeroSection />
      <HowItWorksSection />
      <WeeklyWinnersSection />
      </div>
    );
  }