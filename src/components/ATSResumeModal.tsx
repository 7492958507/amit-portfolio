import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  Printer,
  Copy,
  Download,
  FileCode,
  FileText,
  Upload,
  Check
} from 'lucide-react';

export const ATSResumeModal: React.FC = () => {
  const {
    isResumeModalOpen,
    setIsResumeModalOpen,
    personalInfo,
    experiences,
    projects,
    awards,
    education,
    rawLatexResume,
    uploadedResume,
    requireOwnerAuth,
    setIsUploadModalOpen,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'formatted' | 'latex' | 'uploaded'>('formatted');
  const [copiedLatex, setCopiedLatex] = useState(false);

  if (!isResumeModalOpen) return null;

  const handleCopyLatex = () => {
    navigator.clipboard.writeText(rawLatexResume);
    setCopiedLatex(true);
    setTimeout(() => setCopiedLatex(false), 2000);
  };

  const handleDownloadLatex = () => {
    const element = document.createElement('a');
    const file = new Blob([rawLatexResume], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Amit_Kumar_Resume.tex';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleTriggerUpload = () => {
    requireOwnerAuth(() => {
      setIsResumeModalOpen(false);
      setIsUploadModalOpen(true);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#0b1226] border border-emerald-500/40 shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#060b19]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Amit Kumar — ATS Resume</h3>
              <p className="text-xs text-slate-400">
                Standard 1-Page ATS-Optimized Technical Resume
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={() => setIsResumeModalOpen(false)}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-6 py-2.5 border-b border-slate-800 bg-[#080e22] text-xs font-medium">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('formatted')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'formatted'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Formatted ATS View
            </button>
            <button
              onClick={() => setActiveTab('latex')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'latex'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>LaTeX Code (.tex)</span>
            </button>
            <button
              onClick={() => setActiveTab('uploaded')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'uploaded'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Custom File {uploadedResume && '✓'}</span>
            </button>
          </div>

          <button
            onClick={handleTriggerUpload}
            className="hidden md:flex items-center gap-1 text-slate-400 hover:text-emerald-400 text-xs font-mono"
            title="Upload your own custom resume file (Owner PIN protected)"
          >
            <span>Upload New Resume</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#040817]">
          
          {/* TAB 1: FORMATTED ATS RESUME */}
          {activeTab === 'formatted' && (
            <div
              id="printable-resume"
              className="max-w-3xl mx-auto bg-white text-slate-900 p-8 sm:p-10 rounded-lg shadow-xl font-sans text-xs sm:text-sm leading-normal selection:bg-blue-100 selection:text-blue-900"
            >
              {/* Header */}
              <div className="text-center pb-3 border-b border-slate-300">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 uppercase">
                  {personalInfo.name}
                </h1>
                <div className="mt-1 text-xs text-slate-700 flex flex-wrap items-center justify-center gap-2">
                  <span>{personalInfo.location}</span>
                  <span>|</span>
                  <span>{personalInfo.phone}</span>
                  <span>|</span>
                  <a href={`mailto:${personalInfo.email}`} className="text-blue-600 underline">
                    {personalInfo.email}
                  </a>
                  <span>|</span>
                  <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                    LinkedIn
                  </a>
                  <span>|</span>
                  <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                    GitHub
                  </a>
                  <span>|</span>
                  <a href={personalInfo.leetcode} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                    LeetCode
                  </a>
                </div>
              </div>

              {/* Education */}
              <div className="mt-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-1.5">
                  Education
                </h2>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-slate-900">{education.institution}</div>
                    <div className="italic text-slate-700">{education.degree}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-800 font-medium">{education.period}</div>
                    <div className="font-semibold text-slate-900">CGPA: {education.cgpa}</div>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="mt-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-1.5">
                  Experience
                </h2>
                <div className="space-y-3">
                  {experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start">
                        <div className="font-bold text-slate-900">{exp.company}</div>
                        <div className="text-slate-800 font-medium">{exp.period}</div>
                      </div>
                      <div className="flex justify-between items-start italic text-slate-700 mb-1">
                        <div>{exp.role}</div>
                        <div>{exp.location}</div>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-slate-800 pl-1">
                        {exp.highlights.map((h, idx) => (
                          <li key={idx} className="leading-snug">
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Skills */}
              <div className="mt-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-1.5">
                  Technical Skills
                </h2>
                <div className="text-xs space-y-1 text-slate-800">
                  <div><strong>Languages:</strong> Java, JavaScript, Python, SQL, C++</div>
                  <div><strong>Frontend:</strong> React.js, Redux, HTML5, CSS3, Responsive Design</div>
                  <div><strong>Backend:</strong> Node.js, Express.js, Django REST Framework, RESTful APIs, Client-Server Architecture, Microservices</div>
                  <div><strong>Databases:</strong> MongoDB, PostgreSQL</div>
                  <div><strong>Cloud & DevOps:</strong> AWS, Microsoft Azure, Docker, Git, GitHub, CI/CD, Linux</div>
                  <div><strong>Core Concepts:</strong> DSA, Operating Systems, Computer Networks, DBMS, OOP, System Design Basics, Machine Learning, Generative AI, Agile</div>
                </div>
              </div>

              {/* Projects */}
              <div className="mt-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-1.5">
                  Projects
                </h2>
                <div className="space-y-3">
                  {projects.map((proj) => (
                    <div key={proj.id}>
                      <div className="flex justify-between items-start">
                        <div className="font-bold text-slate-900">
                          {proj.title} <span className="font-normal text-blue-600">| <a href={proj.githubUrl} target="_blank" rel="noreferrer">GitHub</a></span>
                        </div>
                        <div className="text-slate-800 font-medium">{proj.date}</div>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-slate-800 pl-1 mt-1">
                        {proj.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="leading-snug">
                            {b}
                          </li>
                        ))}
                        <li className="leading-snug list-none mt-1">
                          <strong>Tech Stack:</strong> {proj.tech.join(', ')}
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="mt-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-1.5">
                  Achievements
                </h2>
                <ul className="list-disc list-inside space-y-1 text-slate-800 pl-1">
                  {awards.map((award) => (
                    <li key={award.id} className="leading-snug">
                      <strong>{award.title}</strong> — {award.description}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

          {/* TAB 2: RAW LATEX CODE */}
          {activeTab === 'latex' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-300 font-mono">
                  Amit_Kumar_Resume.tex (ATS-Friendly Overleaf/TeX Compatible)
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLatex}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 text-xs font-semibold"
                  >
                    {copiedLatex ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLatex ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                  <button
                    onClick={handleDownloadLatex}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white text-xs font-medium"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .tex</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono overflow-x-auto select-all leading-relaxed max-h-[500px]">
                {rawLatexResume}
              </pre>
            </div>
          )}

          {/* TAB 3: CUSTOM UPLOADED RESUME FILE */}
          {activeTab === 'uploaded' && (
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-6">
              {uploadedResume ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{uploadedResume.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Size: {uploadedResume.size} • Uploaded on {uploadedResume.uploadDate}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <a
                      href={uploadedResume.url}
                      download={uploadedResume.name}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-glow-emerald"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download File</span>
                    </a>
                    <button
                      onClick={handleTriggerUpload}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium"
                    >
                      Replace Resume
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 py-8">
                  <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">No Custom File Uploaded Yet</h4>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                      Default ATS resume is active. The owner (Amit Kumar) can upload a custom PDF/DOCX document anytime.
                    </p>
                  </div>
                  <button
                    onClick={handleTriggerUpload}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-sm font-semibold inline-flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Custom PDF / DOCX</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-[#060b19] text-xs text-slate-400">
          <span>Target Batch: 2026 Grad • Immediate Availability</span>
          <button
            onClick={() => setIsResumeModalOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
