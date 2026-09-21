import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  FileText,
  Lock,
  Unlock,
  Menu,
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    personalInfo,
    theme,
    toggleTheme,
    setIsResumeModalOpen,
    isOwner,
    setIsAuthModalOpen,
    setIsEditModalOpen,
  } = usePortfolio();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Full-Stack Studio', href: '#fullstack-builder' },
    { name: 'Contact', href: '#contact' },
    { name: 'Referral', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/90 backdrop-blur-md border-b border-emerald-500/15 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo (matching TT screenshot 1 with AK) */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#0b1329] border border-emerald-500/40 text-emerald-400 font-bold text-sm tracking-wider shadow-glow-emerald group-hover:border-emerald-400 transition-all">
            AK
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#030712]" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-semibold text-sm sm:text-base tracking-tight group-hover:text-emerald-300 transition-colors">
              {personalInfo.name}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              {personalInfo.headlineRole} · {personalInfo.location}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme toggle pill matching Screenshot 1 (Dark pill with green dot) */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 hover:border-emerald-500/40 text-xs font-medium text-slate-200 transition-all"
            title="Toggle theme"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
          </button>

          {/* Resume Trigger Modal Button */}
          <button
            onClick={() => setIsResumeModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-xs font-semibold text-emerald-300 transition-all shadow-sm active:scale-95"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Resume</span>
          </button>

          {/* Owner Protected Edit/Admin Button */}
          {isOwner ? (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/50 text-xs font-semibold text-amber-300 transition-all"
              title="Open Portfolio Content Manager"
            >
              <Unlock className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Owner Edit</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-400 hover:text-slate-200 transition-all"
              title="Restricted: Owner Access"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Owner</span>
            </button>
          )}

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#060b19]/95 border-b border-emerald-500/20 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl mt-2 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-emerald-500/10 hover:text-emerald-400"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                setIsResumeModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 text-sm font-medium"
            >
              <FileText className="w-4 h-4" />
              <span>View ATS Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
