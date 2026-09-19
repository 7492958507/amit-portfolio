import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Card3D } from './Card3D';
import { Briefcase, Calendar, MapPin, Plus } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { experiences, isOwner, setIsEditModalOpen } = usePortfolio();

  return (
    <section id="experience" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (matching Screenshot 2) */}
        <div className="flex items-start justify-between mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              {/* Vertical green accent bar */}
              <div className="w-1 h-8 bg-emerald-400 rounded-full shadow-[0_0_12px_#10b981]" />
              <div className="flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-emerald-400" />
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Experience
                </h2>
              </div>
            </div>
            <p className="text-slate-400 text-sm sm:text-base ml-4 pl-3 border-l border-slate-800">
              Roles where I've built production systems at scale
            </p>
          </div>

          {/* Owner Quick Add Button */}
          {isOwner && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-300 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Role</span>
            </button>
          )}
        </div>

        {/* Experience Cards Grid (2-column layout matching Screenshot 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {experiences.map((exp) => (
            <Card3D key={exp.id} maxTilt={5}>
              <div className="h-full rounded-2xl bg-[#060b19]/90 border border-slate-800/90 hover:border-emerald-500/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_-8px_rgba(16,185,129,0.25)] backdrop-blur-xl group">
                
                {/* Header Information */}
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="text-base font-semibold text-emerald-400 mt-0.5">
                        {exp.company}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center justify-end gap-1.5 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights with Triangular Bullets (▷) matching Screenshot 2 */}
                  <div className="space-y-3.5 my-6 text-sm sm:text-base text-slate-300 leading-relaxed">
                    {exp.highlights.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-emerald-400 text-lg leading-none select-none font-bold mt-0.5">
                          ▷
                        </span>
                        <p className="flex-1 text-slate-300">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Pills at bottom of card (matching Screenshot 2) */}
                <div className="pt-6 border-t border-slate-800/80 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-medium text-slate-300 group-hover:border-emerald-500/30 group-hover:text-emerald-200 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </Card3D>
          ))}
        </div>

      </div>
    </section>
  );
};
