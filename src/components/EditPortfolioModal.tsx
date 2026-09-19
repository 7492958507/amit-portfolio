import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import type { Project, Experience } from '../types/portfolio';
import {
  X,
  Save,
  Plus,
  Trash2,
  RefreshCw,
  FolderGit2,
  Briefcase,
  Code,
  Award,
  User,
  CheckCircle2
} from 'lucide-react';

export const EditPortfolioModal: React.FC = () => {
  const {
    isEditModalOpen,
    setIsEditModalOpen,
    personalInfo,
    setPersonalInfo,
    projects,
    setProjects,
    experiences,
    setExperiences,
    skillCategories,
    setSkillCategories,
    certificates,
    resetToDefaults,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'experience' | 'skills' | 'certificates'>('profile');
  const [successMsg, setSuccessMsg] = useState('');

  // Project form state
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    date: '2026',
    description: '',
    bullets: [''],
    tech: ['React.js', 'Node.js'],
    githubUrl: 'https://github.com/7492958507',
    liveUrl: '',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  });

  // Experience form state
  const [newExp, setNewExp] = useState<Partial<Experience>>({
    role: '',
    company: '',
    location: 'Remote',
    period: '2026 – Present',
    highlights: [''],
    skills: ['React.js', 'Node.js', 'PostgreSQL'],
  });

  // Skill form state
  const [newSkillName, setNewSkillName] = useState('');
  const [targetCategory, setTargetCategory] = useState(skillCategories[0]?.id || 'languages');

  if (!isEditModalOpen) return null;

  const showSavedNotification = () => {
    setSuccessMsg('Changes saved and applied live!');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;

    const projectToAdd: Project = {
      id: `proj-${Date.now()}`,
      title: newProject.title || 'Untitled Project',
      date: newProject.date || '2026',
      description: newProject.description || '',
      bullets: newProject.bullets?.filter((b) => b.trim()) || ['Built robust production features.'],
      tech: newProject.tech || ['React.js'],
      githubUrl: newProject.githubUrl || 'https://github.com/7492958507',
      liveUrl: newProject.liveUrl,
      image: newProject.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    };

    setProjects([projectToAdd, ...projects]);
    showSavedNotification();
    setNewProject({
      title: '',
      date: '2026',
      description: '',
      bullets: [''],
      tech: ['React.js'],
      githubUrl: 'https://github.com/7492958507',
    });
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    showSavedNotification();
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExp.role || !newExp.company) return;

    const expToAdd: Experience = {
      id: `exp-${Date.now()}`,
      role: newExp.role || 'Software Engineer',
      company: newExp.company || 'Tech Corp',
      location: newExp.location || 'Remote',
      period: newExp.period || '2026 – Present',
      highlights: newExp.highlights?.filter((h) => h.trim()) || ['Delivered key business metrics.'],
      skills: newExp.skills || ['Java', 'Spring Boot'],
    };

    setExperiences([expToAdd, ...experiences]);
    showSavedNotification();
    setNewExp({
      role: '',
      company: '',
      location: 'Remote',
      period: '2026 – Present',
      highlights: [''],
    });
  };

  const handleDeleteExperience = (id: string) => {
    setExperiences(experiences.filter((e) => e.id !== id));
    showSavedNotification();
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    setSkillCategories(
      skillCategories.map((cat) => {
        if (cat.id === targetCategory) {
          return {
            ...cat,
            skills: [...cat.skills, newSkillName.trim()],
          };
        }
        return cat;
      })
    );
    showSavedNotification();
    setNewSkillName('');
  };

  const handleRemoveSkill = (categoryId: string, skillNameToRemove: string) => {
    setSkillCategories(
      skillCategories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            skills: cat.skills.filter((s) => s !== skillNameToRemove),
          };
        }
        return cat;
      })
    );
    showSavedNotification();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#0b1226] border border-emerald-500/40 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#060b19]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Portfolio Content Manager</h3>
              <p className="text-xs text-slate-400">Owner control center for Amit Kumar</p>
            </div>
          </div>

          <button
            onClick={() => setIsEditModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-slate-800 bg-[#080e22] text-xs font-medium overflow-x-auto">
          {[
            { id: 'profile', label: 'Profile Info', icon: <User className="w-3.5 h-3.5" /> },
            { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-3.5 h-3.5" /> },
            { id: 'experience', label: 'Experience', icon: <Briefcase className="w-3.5 h-3.5" /> },
            { id: 'skills', label: 'Skills', icon: <Code className="w-3.5 h-3.5" /> },
            { id: 'certificates', label: 'Certificates', icon: <Award className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Success Banner */}
        {successMsg && (
          <div className="px-6 py-2 bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#040817] space-y-6">
          
          {/* TAB 1: PROFILE INFO */}
          {activeTab === 'profile' && (
            <div className="space-y-4 max-w-2xl">
              <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                Personal Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Headline Role</label>
                  <input
                    type="text"
                    value={personalInfo.headlineRole}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, headlineRole: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Current Company</label>
                  <input
                    type="text"
                    value={personalInfo.currentCompany}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, currentCompany: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Phone</label>
                  <input
                    type="text"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Bio Description</label>
                <textarea
                  rows={3}
                  value={personalInfo.bio}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={showSavedNotification}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Profile Info</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <form onSubmit={handleAddProject} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-emerald-400 uppercase font-mono block">Add New Project</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Project Title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Date (e.g. March 2026)"
                    value={newProject.date}
                    onChange={(e) => setNewProject({ ...newProject, date: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="GitHub Repo URL"
                    value={newProject.githubUrl}
                    onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Live URL (optional)"
                    value={newProject.liveUrl}
                    onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Project Summary Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white resize-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Insert Project</span>
                </button>
              </form>

              {/* Current Projects List */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-slate-400 uppercase block">Active Projects ({projects.length})</span>
                {projects.map((proj) => (
                  <div key={proj.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">{proj.title}</div>
                      <div className="text-xs text-slate-400">{proj.date} • {proj.tech.slice(0, 4).join(', ')}</div>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <form onSubmit={handleAddExperience} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-emerald-400 uppercase font-mono block">Add Work Experience</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Role Title"
                    value={newExp.role}
                    onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Company Name"
                    value={newExp.company}
                    onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Period (e.g. Aug 2026 – Present)"
                    value={newExp.period}
                    onChange={(e) => setNewExp({ ...newExp, period: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Location (e.g. Remote / Bangalore)"
                    value={newExp.location}
                    onChange={(e) => setNewExp({ ...newExp, location: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Insert Role</span>
                </button>
              </form>

              <div className="space-y-3">
                <span className="text-xs font-mono text-slate-400 uppercase block">Existing Roles ({experiences.length})</span>
                {experiences.map((exp) => (
                  <div key={exp.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">{exp.role} @ {exp.company}</div>
                      <div className="text-xs text-slate-400">{exp.period} • {exp.location}</div>
                    </div>
                    <button
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <form onSubmit={handleAddSkill} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center gap-3">
                <select
                  value={targetCategory}
                  onChange={(e) => setTargetCategory(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                >
                  {skillCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  required
                  placeholder="New Skill Name (e.g. Next.js, Go)"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="flex-1 min-w-[180px] px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                >
                  Add Skill
                </button>
              </form>

              <div className="space-y-4">
                {skillCategories.map((cat) => (
                  <div key={cat.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-xs font-bold text-emerald-400 mb-2 font-mono">{cat.name}</div>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5"
                        >
                          <span>{s}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(cat.id, s)}
                            className="text-slate-500 hover:text-rose-400"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase block">Registered Credentials ({certificates.length})</span>
              {certificates.map((cert) => (
                <div key={cert.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-white">{cert.title}</div>
                    <div className="text-xs text-emerald-400">{cert.issuer} • ID: {cert.credentialId}</div>
                    <p className="text-xs text-slate-400 mt-1">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-[#060b19]">
          <button
            onClick={() => {
              if (confirm('Reset all content and restore default ATS data?')) {
                resetToDefaults();
                showSavedNotification();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-400 font-mono"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Default Data</span>
          </button>

          <button
            onClick={() => setIsEditModalOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Close Manager
          </button>
        </div>

      </div>
    </div>
  );
};
