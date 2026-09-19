import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { InteractiveBoyAvatar } from './InteractiveBoyAvatar';
import { QuantumGyroscope } from './QuantumGyroscope';
import { Card3D } from './Card3D';
import { GithubIcon, LinkedinIcon } from './Icons';
import {
  Download,
  ArrowRight,
  Code2,
  Layers,
  Sparkles,
  Mail,
  Cpu
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { personalInfo, setIsResumeModalOpen } = usePortfolio();
  const [activeVisual, setActiveVisual] = useState<'avatar' | 'gyro'>('avatar');
  const [slideKey, setSlideKey] = useState<number>(0);
  const [currentTagIndex, setCurrentTagIndex] = useState<number>(0);
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [typingSpeed, setTypingSpeed] = useState<number>(120);

  // Replay sliding entrance for Amit Kumar
  const handleReplaySlide = () => {
    setSlideKey((prev) => prev + 1);
  };

  // Typist effect for dynamic roles
  useEffect(() => {
    const roles = personalInfo.roleTaglines && personalInfo.roleTaglines.length > 0
      ? personalInfo.roleTaglines
      : ["Full Stack Developer", "Software Engineer", "Backend & Cloud Specialist", "AI Systems Enthusiast"];

    const currentRole = roles[currentTagIndex % roles.length];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        setTypingSpeed(90);

        if (displayedText.length === currentRole.length) {
          // Pause before starting deletion
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        setTypingSpeed(45);

        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentTagIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTagIndex, typingSpeed, personalInfo.roleTaglines]);

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Details */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Status Pill (matching screenshot 1) */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {personalInfo.headlineRole} {personalInfo.currentCompany ? `@${personalInfo.currentCompany.split(' ')[0]}` : ''}
              </span>
              <span className="text-emerald-500/50">•</span>
              <span className="text-slate-300">
                {personalInfo.location.split(',')[0]}, India
              </span>
            </div>

            {/* Greeting & Sliding Amit Kumar Entrance */}
            <div className="space-y-1">
              <span className="text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold text-emerald-400 font-mono">
                HELLO, I'M
              </span>
              
              {/* Sliding Entrance with Spring physics and gradient glow */}
              <div
                key={slideKey}
                onClick={handleReplaySlide}
                className="group cursor-pointer inline-block transform transition-transform"
                title="Click to replay sliding entrance"
              >
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white flex items-center gap-3">
                  <span className="inline-block animate-[slideRight_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] bg-gradient-to-r from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent hover:to-emerald-400 transition-colors">
                    {personalInfo.name}
                  </span>
                  <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981] animate-pulse" />
                </h1>
              </div>

              {/* Dynamic Typist Role */}
              <div className="h-10 sm:h-12 flex items-center text-xl sm:text-2xl lg:text-3xl font-bold text-slate-200">
                <span className="text-emerald-400 font-mono">
                  {displayedText}
                </span>
                <span className="w-0.5 h-6 sm:h-8 bg-emerald-400 ml-1 animate-pulse" />
              </div>
            </div>

            {/* Subtext description */}
            <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
              {personalInfo.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* Download / View Resume Button */}
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm sm:text-base shadow-glow-emerald hover:shadow-emerald-500/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>Download Resume</span>
              </button>

              {/* Explore Projects Button */}
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-600 font-medium text-sm sm:text-base transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>

              {/* Full-Stack Studio Option */}
              <a
                href="#fullstack-builder"
                className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs sm:text-sm font-medium transition-all"
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Build Studio</span>
              </a>
            </div>

            {/* Social Links Row (matching Screenshot 1) */}
            <div className="flex items-center gap-4 text-sm text-slate-400 pt-3">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <span>•</span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span>•</span>
              <a
                href={personalInfo.leetcode}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
              >
                <Code2 className="w-4 h-4" />
                <span>LeetCode</span>
              </a>
              <span>•</span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Card Container (matching Screenshot 1) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Card3D maxTilt={6} className="w-full max-w-sm sm:max-w-md">
              <div className="relative rounded-3xl bg-[#060b19]/90 border-2 border-emerald-500/30 p-6 shadow-[0_0_50px_-10px_rgba(16,185,129,0.25)] backdrop-blur-xl flex flex-col items-center">
                
                {/* Visual Mode Switcher (Figure Boy Avatar vs 3D Quantum Core) */}
                <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-900/90 border border-slate-700/80 mb-6 text-xs font-medium">
                  <button
                    onClick={() => setActiveVisual('avatar')}
                    className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                      activeVisual === 'avatar'
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Figure Boy</span>
                  </button>
                  <button
                    onClick={() => setActiveVisual('gyro')}
                    className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                      activeVisual === 'gyro'
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>3D Quantum Core</span>
                  </button>
                </div>

                {/* Visual Render Canvas */}
                <div className="w-full flex items-center justify-center min-h-[300px]">
                  {activeVisual === 'avatar' ? (
                    <InteractiveBoyAvatar />
                  ) : (
                    <QuantumGyroscope />
                  )}
                </div>

                {/* Subtitle / status */}
                <div className="w-full mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-slate-300 font-mono">Available for SDE Roles</span>
                  </div>
                  <span className="text-emerald-400 font-semibold">2026 Batch</span>
                </div>
              </div>
            </Card3D>
          </div>
        </div>

        {/* Bottom Scroll Prompt */}
        <div className="w-full flex flex-col items-center justify-center pt-16 pb-4">
          <a
            href="#experience"
            className="flex flex-col items-center gap-2 text-xs font-mono text-slate-500 hover:text-emerald-400 transition-colors"
          >
            <span>Scroll to explore</span>
            <span className="text-base animate-bounce">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};
