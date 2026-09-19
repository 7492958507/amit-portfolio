import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GithubIcon, LinkedinIcon } from './Icons';
import { ArrowUp, Mail, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { personalInfo } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-slate-800/80 bg-[#02050f] z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Copyright & Title */}
        <div className="flex flex-col sm:items-start text-center sm:text-left space-y-1">
          <div className="text-sm font-semibold text-white">
            © 2026 {personalInfo.name}. All rights reserved.
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Data Engineer · Software Engineer · Full Stack Developer
          </div>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-4 text-slate-400">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.leetcode}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
            aria-label="LeetCode"
          >
            <Code2 className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Scroll to top floating button (matching Screenshot 2 bottom right) */}
        <div>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-slate-900 border border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-500/10 text-emerald-400 flex items-center justify-center shadow-glow-emerald transition-all active:scale-95"
            title="Scroll to Top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
