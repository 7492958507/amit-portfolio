import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Card3D } from './Card3D';
import { GithubIcon } from './Icons';
import {
  FolderGit2,
  ExternalLink,
  Calendar,
  Plus
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { projects, isOwner, setIsEditModalOpen } = usePortfolio();
  const [filter, setFilter] = useState<'all' | 'ai' | 'fullstack'>('all');

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'ai') return p.tech.some(t => /AI|Claude|NLP|Python/i.test(t));
    if (filter === 'fullstack') return p.tech.some(t => /React|Node|Express|Django|Next/i.test(t));
    return true;
  });

  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (matching Screenshot 3) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-emerald-400 rounded-full shadow-[0_0_12px_#10b981]" />
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-6 h-6 text-emerald-400" />
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Projects
                </h2>
              </div>
            </div>
            <p className="text-slate-400 text-sm sm:text-base ml-4 pl-3 border-l border-slate-800">
              Selected work spanning AI, backend, and full-stack systems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter tags */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full transition-all ${
                  filter === 'all'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({projects.length})
              </button>
              <button
                onClick={() => setFilter('ai')}
                className={`px-3 py-1 rounded-full transition-all ${
                  filter === 'ai'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                AI / ML
              </button>
              <button
                onClick={() => setFilter('fullstack')}
                className={`px-3 py-1 rounded-full transition-all ${
                  filter === 'fullstack'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Full-Stack
              </button>
            </div>

            {/* Owner Add Button */}
            {isOwner && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-300 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            )}
          </div>
        </div>

        {/* Project Cards Grid (2-column layout matching Screenshot 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <Card3D key={project.id} maxTilt={5}>
              <div className="h-full rounded-2xl bg-[#060b19]/90 border border-slate-800/90 hover:border-emerald-500/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_-8px_rgba(16,185,129,0.25)] backdrop-blur-xl group">
                
                <div>
                  {/* Title and Top-Right Icons (matching Screenshot 3) */}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{project.date}</span>
                      </div>
                    </div>

                    {/* GitHub & Live Action Icons */}
                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-white transition-all"
                        title="View Source Code on GitHub"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-emerald-400 transition-all"
                          title="View Live Platform"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project UI Visual Screenshot */}
                  <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden my-4 border border-slate-800 group-hover:border-emerald-500/30 transition-all">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060b19] via-transparent to-transparent opacity-60" />
                    
                    {/* Live Preview Button overlay on hover */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 rounded-md bg-slate-950/80 border border-slate-700 text-xs font-medium text-slate-200 hover:text-white backdrop-blur-md flex items-center gap-1.5"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target={project.liveUrl.startsWith('#') ? '_self' : '_blank'}
                          rel="noreferrer"
                          className="px-3 py-1 rounded-md bg-emerald-500/90 hover:bg-emerald-400 text-xs font-semibold text-slate-950 backdrop-blur-md flex items-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>{project.id === 'proj-1' || project.title.toLowerCase().includes('portfolio') ? 'Amit Portfolio' : 'Demo'}</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Paragraph Description */}
                  <p className="text-sm sm:text-base text-slate-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Checkmark Bullets (matching Screenshot 3 with ✔) */}
                  <div className="space-y-2.5 my-4">
                    {project.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <span className="text-purple-400 font-bold select-none mt-0.5">
                          ✔
                        </span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Badges at Bottom (matching Screenshot 3) */}
                <div className="pt-6 border-t border-slate-800/80 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-medium text-slate-300 group-hover:border-emerald-500/30 group-hover:text-emerald-200 transition-colors"
                      >
                        {tech}
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
