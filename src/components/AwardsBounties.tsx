import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Card3D } from './Card3D';
import { Trophy, Award as AwardIcon, Star, Code2, Plus } from 'lucide-react';

export const AwardsBountiesSection: React.FC = () => {
  const { awards, isOwner, setIsEditModalOpen } = usePortfolio();

  const getIcon = (type: string) => {
    switch (type) {
      case 'trophy':
        return <Trophy className="w-5 h-5 text-emerald-400" />;
      case 'code':
        return <Code2 className="w-5 h-5 text-amber-400" />;
      case 'star':
        return <Star className="w-5 h-5 text-cyan-400" />;
      default:
        return <AwardIcon className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="awards" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (matching Screenshot 4) */}
        <div className="flex items-start justify-between mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-emerald-400 rounded-full shadow-[0_0_12px_#10b981]" />
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-emerald-400" />
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Awards & Bounties
                </h2>
              </div>
            </div>
            <p className="text-slate-400 text-sm sm:text-base ml-4 pl-3 border-l border-slate-800">
              Recognition for impact, innovation, and delivery.
            </p>
          </div>

          {isOwner && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-300 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Award</span>
            </button>
          )}
        </div>

        {/* Awards Cards Grid (matching Screenshot 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((award) => (
            <Card3D key={award.id} maxTilt={6}>
              <div className="h-full rounded-2xl bg-[#060b19]/90 border border-slate-800/90 hover:border-emerald-500/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_-8px_rgba(16,185,129,0.2)] backdrop-blur-xl group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-emerald-500/30 transition-colors">
                      {getIcon(award.iconType)}
                    </div>
                    {award.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-semibold text-emerald-300">
                        {award.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-1">
                    {award.title}
                  </h3>
                  
                  <div className="text-xs font-medium text-emerald-400 mb-3 font-mono">
                    {award.issuer}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {award.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Verified Impact</span>
                  <span className="text-emerald-500/80">★ Verified</span>
                </div>
              </div>
            </Card3D>
          ))}
        </div>

      </div>
    </section>
  );
};
