import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Card3D } from './Card3D';
import { SKILL_ICONS } from '../data/skillIcons';
import {
  Code,
  LayoutGrid,
  Server,
  Database,
  Cloud,
  Cpu,
  Layers,
  Check
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { skillCategories } = usePortfolio();
  const [viewMode, setViewMode] = useState<'bento' | 'icons'>('icons');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const categories = [
    'All',
    'Languages',
    'Backend',
    'Frontend',
    'Databases',
    'Cloud & DevOps',
    'Core CS & AI',
  ];

  // List of all skills from SKILL_ICONS
  const allSkillsList = Object.values(SKILL_ICONS);

  const filteredSkills = allSkillsList.filter((item) => {
    if (activeCategoryFilter === 'All') return true;
    return item.category === activeCategoryFilter;
  });

  const getCategoryIcon = (catName: string) => {
    switch (catName) {
      case 'Programming Languages':
        return <Code className="w-5 h-5 text-emerald-400" />;
      case 'API & Backend Architecture':
        return <Server className="w-5 h-5 text-cyan-400" />;
      case 'Frontend & UI Design':
        return <Layers className="w-5 h-5 text-blue-400" />;
      case 'Databases':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Cloud & DevOps':
        return <Cloud className="w-5 h-5 text-amber-400" />;
      default:
        return <Cpu className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (matching Screenshot 5) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-emerald-400 rounded-full shadow-[0_0_12px_#10b981]" />
              <div className="flex items-center gap-2">
                <Code className="w-6 h-6 text-emerald-400" />
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                  &lt;/&gt; Technical Skills
                </h2>
              </div>
            </div>
            <p className="text-slate-400 text-sm sm:text-base ml-4 pl-3 border-l border-slate-800">
              A snapshot of the tools, frameworks, and technologies I work with.
            </p>
          </div>

          {/* View Mode Switcher & Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium">
              <button
                onClick={() => setViewMode('icons')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                  viewMode === 'icons'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="View every skill with logo on top and name below"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Icon Cards</span>
              </button>
              <button
                onClick={() => setViewMode('bento')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                  viewMode === 'bento'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="View categorized Bento grid like Screenshot 5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Bento Categories</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-slate-800/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategoryFilter === cat
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* VIEW 1: Icon Cards View (Image on Top, Name Below) */}
        {viewMode === 'icons' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
            {filteredSkills.map((skill) => (
              <Card3D key={skill.name} maxTilt={8}>
                <div className="h-full rounded-2xl bg-[#060b19]/90 border border-slate-800/90 hover:border-emerald-500/60 p-5 flex flex-col items-center justify-center text-center transition-all duration-300 shadow-md hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.3)] backdrop-blur-xl group cursor-default">
                  
                  {/* Skill Image / Official SVG Logo (ON TOP) */}
                  <div className="w-12 h-12 mb-3 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 text-slate-300 group-hover:text-emerald-400">
                    <div
                      className="w-10 h-10 flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: skill.svg }}
                      style={{ color: skill.color }}
                    />
                  </div>

                  {/* Skill Name (BELOW) */}
                  <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors tracking-wide">
                    {skill.name}
                  </span>

                  {/* Category Pill / Tag */}
                  <span className="mt-1.5 text-[10px] font-mono text-slate-500 group-hover:text-slate-400 transition-colors">
                    {skill.category}
                  </span>

                  {/* Proficient Badge indicator */}
                  <div className="mt-2.5 flex items-center gap-1 text-[10px] text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Check className="w-3 h-3" />
                    <span>Proficient</span>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        ) : (
          /* VIEW 2: Bento Grid Layout (matching Screenshot 5) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat, idx) => (
              <Card3D key={cat.id} maxTilt={6}>
                <div
                  className={`h-full rounded-2xl bg-[#060b19]/90 border p-6 flex flex-col justify-between transition-all duration-300 shadow-lg backdrop-blur-xl group ${
                    idx === 1
                      ? 'border-emerald-500/70 shadow-[0_0_30px_-8px_rgba(16,185,129,0.35)]' // Highlighted card matching Screenshot 5!
                      : 'border-slate-800/90 hover:border-emerald-500/50 hover:shadow-[0_0_25px_-8px_rgba(16,185,129,0.25)]'
                  }`}
                >
                  <div>
                    {/* Category Title with Icon */}
                    <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-800/80">
                      {getCategoryIcon(cat.name)}
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {cat.name}
                      </h3>
                    </div>

                    {/* Skill Pills inside category with mini logos & names */}
                    <div className="flex flex-wrap gap-2.5">
                      {cat.skills.map((skillName, sIdx) => {
                        const iconData = SKILL_ICONS[skillName];
                        return (
                          <div
                            key={sIdx}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-xs font-medium text-slate-200 transition-all cursor-default"
                          >
                            {iconData && (
                              <span
                                className="w-4 h-4 flex items-center justify-center shrink-0"
                                dangerouslySetInnerHTML={{ __html: iconData.svg }}
                                style={{ color: iconData.color }}
                              />
                            )}
                            <span>{skillName}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>{cat.skills.length} core technologies</span>
                    <span className="text-emerald-500/70">Verified</span>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
