import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Card3D } from './Card3D';
import type { Certificate } from '../types/portfolio';
import {
  GraduationCap,
  Award,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Info,
  X,
  Sparkles,
  Plus
} from 'lucide-react';

export const EducationCertificationsSection: React.FC = () => {
  const { certificates, education, isOwner, setIsEditModalOpen } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-emerald-400 rounded-full shadow-[0_0_12px_#10b981]" />
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-emerald-400" />
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Certificates & Education
                </h2>
              </div>
            </div>
            <p className="text-slate-400 text-sm sm:text-base ml-4 pl-3 border-l border-slate-800">
              Verified professional credentials, specialized courses, and academic foundation.
            </p>
          </div>

          {isOwner && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-300 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Certificate</span>
            </button>
          )}
        </div>

        {/* Top: Academic Degree Card */}
        <div className="mb-12">
          <Card3D maxTilt={4}>
            <div className="rounded-2xl bg-[#060b19]/90 border border-slate-800 hover:border-emerald-500/50 p-6 sm:p-8 transition-all duration-300 shadow-lg backdrop-blur-xl group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-300 mb-1.5">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Bachelor of Technology (B.Tech)</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {education.degree}
                    </h3>
                    <div className="text-base text-slate-300 font-medium mt-1">
                      {education.institution}
                    </div>
                    <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-400 mt-2">
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        {education.period}
                      </span>
                      <span>•</span>
                      <span>{education.location}</span>
                    </div>
                  </div>
                </div>

                {/* CGPA Badge */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center p-4 rounded-xl bg-slate-900/80 border border-slate-800 md:min-w-[160px]">
                  <span className="text-xs uppercase font-mono text-slate-400">Cumulative Grade</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
                    {education.cgpa}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-0.5">First Class Honors</span>
                </div>

              </div>
            </div>
          </Card3D>
        </div>

        {/* Certificates Heading Label */}
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <h3 className="text-lg font-bold text-slate-200 uppercase tracking-wider text-xs font-mono">
            Industry & Technical Certifications
          </h3>
        </div>

        {/* Certificates Grid (4 cards matching user's certificates) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <Card3D key={cert.id} maxTilt={5}>
              <div className="h-full rounded-2xl bg-[#060b19]/90 border border-slate-800 hover:border-emerald-500/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_-8px_rgba(16,185,129,0.25)] backdrop-blur-xl group">
                
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    {/* Issuer Logo Container */}
                    <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 p-2.5 flex items-center justify-center shrink-0 group-hover:border-emerald-500/40 transition-colors">
                      <img
                        src={cert.imageLogo}
                        alt={cert.issuer}
                        className="max-w-full max-h-full object-contain filter brightness-95"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-all flex items-center gap-1"
                        title="View Full Certificate Details"
                      >
                        <Info className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Details</span>
                      </button>
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-xs font-semibold text-emerald-300 transition-all flex items-center gap-1"
                        title="Verify Official Credential"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Verify</span>
                      </a>
                    </div>
                  </div>

                  {/* Title & Issuer */}
                  <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {cert.title}
                  </h4>
                  <div className="text-xs font-medium text-emerald-400 mt-1 mb-3">
                    {cert.issuer}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed line-clamp-3">
                    {cert.description}
                  </p>

                  {/* Skills Covered */}
                  <div className="flex flex-wrap gap-1.5 my-3">
                    {cert.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer with Credential ID and Date */}
                <div className="pt-4 border-t border-slate-800/80 mt-auto flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="truncate mr-2">
                    <span className="text-slate-500">ID: </span>
                    <span className="text-slate-300">{cert.credentialId}</span>
                  </div>
                  <span className="shrink-0 text-emerald-400/90">{cert.issueDate}</span>
                </div>

              </div>
            </Card3D>
          ))}
        </div>

      </div>

      {/* Certificate Details Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0b1226] border border-emerald-500/40 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 p-3 flex items-center justify-center">
                <img
                  src={selectedCert.imageLogo}
                  alt={selectedCert.issuer}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xs font-mono text-emerald-400">Verified Certificate</span>
                <h3 className="text-xl font-bold text-white">{selectedCert.title}</h3>
                <div className="text-xs text-slate-400">{selectedCert.issuer}</div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {selectedCert.description}
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Credential ID:</span>
                <span className="text-emerald-300 font-semibold">{selectedCert.credentialId}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Issue Date:</span>
                <span className="text-slate-200">{selectedCert.issueDate}</span>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase font-mono text-slate-400 mb-2">Competencies & Skills:</div>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCert.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={selectedCert.verificationUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm text-center flex items-center justify-center gap-2 shadow-glow-emerald"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Verify on Official Portal</span>
              </a>
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
