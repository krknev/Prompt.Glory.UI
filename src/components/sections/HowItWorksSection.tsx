import React from 'react';
import { FileText, Trophy, DollarSign, Briefcase } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      icon: FileText,
      title: 'Generate & Upload',
      description: 'Use our AI art generator to create stunning visuals and upload them to your profile.',
      glowClass: 'card-glow-1'
    },
    {
      icon: Trophy,
      title: 'Join Contests',
      description: 'Participate in daily contests to showcase your skills and win exclusive prizes.',
      glowClass: 'card-glow-2'
    },
    {
      icon: DollarSign,
      title: 'Sell & Earn',
      description: 'List your AI art in our marketplace and earn royalties from every single sale.',
      glowClass: 'card-glow-3'
    },
    {
      icon: Briefcase,
      title: 'Get Hired',
      description: 'Connect with clients looking for talented AI art creators for unique projects.',
      glowClass: 'card-glow-4'
    }
  ];

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 dark:text-white">
            How <span className="text-primary">PromptGlory</span> Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            A simple, streamlined process to unleash your creativity and start earning.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={index}
                className={`card-glow ${step.glowClass} group relative rounded-xl bg-background-light/50 dark:bg-background-dark/50 p-4 sm:p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20`}
              >
                <div className="relative z-10">
                  <div className="mb-4 flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <IconComponent size={24} className="sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="mb-2 text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}