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
  X,
  Sparkles,
  Plus,
  Eye,
  CheckCircle2
} from 'lucide-react';

const resolveAssetUrl = (url: string | undefined): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
  const clean = url.replace(/^(\.\/|\/)/, '');

  if (typeof window !== 'undefined') {
    if (window.location.hostname.includes('github.io') || window.location.pathname.startsWith('/amit-portfolio')) {
      return `/amit-portfolio/${clean}`;
    }
  }

  const base = import.meta.env.BASE_URL || '/';
  if (base.startsWith('/')) {
    return `${base.endsWith('/') ? base : base + '/'}${clean}`;
  }
  return `/${clean}`;
};

export const EducationCertificationsSection: React.FC = () => {
  const { certificates, education, isOwner, setIsEditModalOpen } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: `All Certificates (${certificates.length})` },
    { id: 'competitions', label: 'Competitions & Hackathons' },
    { id: 'skills', label: 'Skill Assessments' },
    { id: 'bootcamps', label: 'Web, AI & Bootcamps' }
  ];

  const filteredCertificates = certificates.filter(cert => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'competitions') {
      return (
        cert.issuer.toLowerCase().includes('unstop') ||
        cert.issuer.toLowerCase().includes('xiaomi') ||
        cert.issuer.toLowerCase().includes('contentstack') ||
        cert.issuer.toLowerCase().includes('flipkart') ||
        cert.title.toLowerCase().includes('competition') ||
        cert.title.toLowerCase().includes('hackathon') ||
        cert.title.toLowerCase().includes('grid')
      );
    }
    if (filterCategory === 'skills') {
      return (
        cert.issuer.toLowerCase().includes('hackerrank') ||
        cert.issuer.toLowerCase().includes('cutshort') ||
        cert.title.toLowerCase().includes('skill')
      );
    }
    if (filterCategory === 'bootcamps') {
      return (
        cert.issuer.toLowerCase().includes('udemy') ||
        cert.issuer.toLowerCase().includes('givemycertificate') ||
        cert.issuer.toLowerCase().includes('internshala') ||
        cert.title.toLowerCase().includes('bootcamp') ||
        cert.title.toLowerCase().includes('course')
      );
    }
    return true;
  });

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
              Verified credentials, competitive hackathons, industry skill benchmarks, and academic foundation.
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
          <Card3D maxTilt={3}>
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

        {/* Certificates Heading Label & Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-lg font-bold text-slate-200 uppercase tracking-wider text-xs font-mono">
              Industry & Technical Certifications ({filteredCertificates.length})
            </h3>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  filterCategory === cat.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <Card3D key={cert.id} maxTilt={4}>
              <div className="h-full rounded-2xl bg-[#060b19]/90 border border-slate-800 hover:border-emerald-500/50 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_-8px_rgba(16,185,129,0.25)] backdrop-blur-xl group overflow-hidden">
                
                {/* Certificate Image Preview Banner */}
                {cert.certificateImage && (
                  <div
                    onClick={() => setSelectedCert(cert)}
                    className="relative w-full h-48 bg-slate-950/90 border-b border-slate-800/80 cursor-pointer overflow-hidden group/thumb flex items-center justify-center p-2"
                    title="Click to view full certificate"
                  >
                    <img
                      src={resolveAssetUrl(cert.certificateImage)}
                      alt={cert.title}
                      className="w-full h-full object-contain group-hover/thumb:scale-105 transition-transform duration-500 rounded-lg shadow-md"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.triedFallback) {
                          target.dataset.triedFallback = 'true';
                          const clean = cert.certificateImage?.replace(/^(\.\/|\/)/, '') || '';
                          target.src = `/amit-portfolio/${clean}`;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060b19]/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/95 border border-emerald-500/60 text-xs font-semibold text-emerald-300 shadow-xl backdrop-blur-md">
                        <Eye className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Inspect Certificate</span>
                      </span>
                    </div>

                    {/* Issuer Logo Watermark Badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900/90 border border-slate-800/80 backdrop-blur-md">
                      <img
                        src={resolveAssetUrl(cert.imageLogo)}
                        alt={cert.issuer}
                        className="w-4 h-4 object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span className="text-[11px] font-medium text-slate-300">{cert.issuer}</span>
                    </div>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header: Title and Actions */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                          {cert.title}
                        </h4>
                        <div className="text-xs font-medium text-emerald-400/90 mt-0.5">
                          {cert.issuer}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">
                      {cert.description}
                    </p>

                    {/* Skills Showcase */}
                    <div className="mb-4">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Validated Skills:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-800 text-[11px] text-emerald-300 font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Credential Info Footer */}
                  <div className="pt-3 border-t border-slate-800/80 mt-auto">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-3">
                      <div className="truncate mr-2">
                        <span className="text-slate-500">ID: </span>
                        <span className="text-slate-300">{cert.credentialId}</span>
                      </div>
                      <span className="shrink-0 text-emerald-400">{cert.issueDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
                        title="View certificate details & image"
                      >
                        <Eye className="w-3.5 h-3.5 text-emerald-400" />
                        <span>View Image</span>
                      </button>

                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-xs font-semibold text-emerald-300 hover:text-emerald-200 transition-all flex items-center justify-center gap-1.5"
                        title="Verify credential online"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Verify Link</span>
                      </a>
                    </div>
                  </div>

                </div>

              </div>
            </Card3D>
          ))}
        </div>

      </div>

      {/* Certificate Details & Image Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0b1226] border border-emerald-500/40 p-5 sm:p-7 shadow-2xl custom-scrollbar">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700 transition-all z-10"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 mb-5 pr-10">
              <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 p-2.5 flex items-center justify-center shrink-0">
                <img
                  src={resolveAssetUrl(selectedCert.imageLogo)}
                  alt={selectedCert.issuer}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400 mb-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Credential</span>
                </div>
                <h3 className="text-xl font-bold text-white leading-snug">
                  {selectedCert.title}
                </h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  Issued by <span className="text-emerald-400 font-semibold">{selectedCert.issuer}</span>
                </div>
              </div>
            </div>

            {/* Certificate High-Res Image Preview */}
            {selectedCert.certificateImage && (
              <div className="mb-5 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative group flex items-center justify-center p-2">
                <img
                  src={resolveAssetUrl(selectedCert.certificateImage)}
                  alt={selectedCert.title}
                  className="w-full max-h-[480px] object-contain mx-auto rounded-lg"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = 'true';
                      const clean = selectedCert.certificateImage?.replace(/^(\.\/|\/)/, '') || '';
                      target.src = `/amit-portfolio/${clean}`;
                    }
                  }}
                />
                <a
                  href={resolveAssetUrl(selectedCert.certificateImage)}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black border border-white/20 text-xs font-semibold text-white flex items-center gap-1.5 backdrop-blur-md transition-all shadow-lg"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Open Full Image</span>
                </a>
              </div>
            )}

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
              {selectedCert.description}
            </p>

            {/* Details Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
                <span className="text-slate-400 block mb-0.5">Credential ID:</span>
                <span className="text-emerald-300 font-semibold break-all">{selectedCert.credentialId}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
                <span className="text-slate-400 block mb-0.5">Issue Date:</span>
                <span className="text-slate-200">{selectedCert.issueDate}</span>
              </div>
            </div>

            {/* Competencies & Skills */}
            <div className="mb-6">
              <div className="text-xs uppercase font-mono text-slate-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Skills & Competencies:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedCert.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-800">
              <a
                href={selectedCert.verificationUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm text-center flex items-center justify-center gap-2 shadow-glow-emerald transition-all active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Verify on Official Portal</span>
              </a>
              <button
                onClick={() => setSelectedCert(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium transition-all"
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
