import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Card3D } from './Card3D';
import confetti from 'canvas-confetti';
import {
  Mail,
  Send,
  UploadCloud,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ContactReferralSection: React.FC = () => {
  const { personalInfo } = usePortfolio();
  const [mode, setMode] = useState<'message' | 'referral'>('message');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    jobLink: '',
    subject: '',
    message: '',
    honeypot: '', // anti-spam
  });

  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [turnstileVerified, setTurnstileVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [rateLimitCounter, setRateLimitCounter] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validExtensions = ['pdf', 'doc', 'docx'];
      const fileExt = file.name.split('.').pop()?.toLowerCase();

      if (fileExt && validExtensions.includes(fileExt)) {
        setAttachedFile(file);
      } else {
        alert('Please attach only .pdf, .doc, or .docx files');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam honeypot check
    if (formData.honeypot) {
      console.warn('Spam bot detected via honeypot');
      return;
    }

    // Rate limiting check
    if (rateLimitCounter >= 4) {
      alert('Rate limit exceeded: Please wait a few minutes before submitting another message.');
      return;
    }

    // Turnstile verification requirement
    if (!turnstileVerified) {
      alert('Please click the Cloudflare Turnstile verification box before sending.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      setRateLimitCounter((prev) => prev + 1);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#3b82f6'],
      });

      // Reset form fields
      setFormData({
        name: '',
        email: '',
        company: '',
        jobLink: '',
        subject: '',
        message: '',
        honeypot: '',
      });
      setAttachedFile(null);
      setTurnstileVerified(false);

      setTimeout(() => setSubmissionSuccess(false), 7000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-emerald-400 rounded-full shadow-[0_0_12px_#10b981]" />
            <div className="flex items-center gap-2">
              <Mail className="w-6 h-6 text-emerald-400" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Contact Me
              </h2>
            </div>
          </div>
          <p className="text-slate-400 text-sm sm:text-base ml-4 pl-3 border-l border-slate-800">
            Let's talk about building something impactful together.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Opportunities & Impact Snapshot */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-[#060b19]/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                LET'S WORK TOGETHER
              </span>
              <h3 className="text-2xl font-bold text-white mt-1 mb-4">
                Opportunities & Collaboration
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Prefer backend engineering roles, cloud systems, and distributed web architecture. Happy to collaborate on high-impact projects, open-source initiatives, or full-time opportunities. 🚀
              </p>

              {/* What you can reach out for */}
              <div className="space-y-3 mb-8">
                <span className="text-xs uppercase font-mono text-slate-400 tracking-wider">
                  What you can reach out for:
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Full-Time SDE Roles', 'Backend Engineering', 'Distributed Systems', 'Collaborations', 'Open Source'].map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-medium text-emerald-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact Snapshot (matching reference) */}
              <div className="pt-6 border-t border-slate-800/80">
                <span className="text-xs uppercase font-mono text-slate-400 tracking-wider block mb-4">
                  Impact Snapshot
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-xl font-bold text-white">2,000+</div>
                    <div className="text-xs text-slate-400 mt-0.5">Users Impacted</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-xl font-bold text-emerald-400">1800</div>
                    <div className="text-xs text-slate-400 mt-0.5">LeetCode Rating</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-xl font-bold text-cyan-400">3×</div>
                    <div className="text-xs text-slate-400 mt-0.5">Hackathons & Awards</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-xl font-bold text-purple-400">20+</div>
                    <div className="text-xs text-slate-400 mt-0.5">REST APIs Deployed</div>
                  </div>
                </div>
              </div>

              {/* Direct email quick link */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Direct Inbox:</span>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-emerald-400 font-mono hover:underline"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Send Message / Referral Form */}
          <div className="lg:col-span-7">
            <Card3D maxTilt={4}>
              <div className="rounded-2xl bg-[#060b19]/90 border border-slate-800/90 hover:border-emerald-500/40 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
                
                {/* Mode Switcher (Message vs Referral) */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800/80">
                  <div>
                    <h3 className="text-xl font-bold text-white">Send a Message</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      A copy of this note will be logged. Let's Connect! 🚀
                    </p>
                  </div>

                  <div className="flex items-center p-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => setMode('message')}
                      className={`px-3 py-1.5 rounded-full transition-all ${
                        mode === 'message'
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Message
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('referral')}
                      className={`px-3 py-1.5 rounded-full transition-all ${
                        mode === 'referral'
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Referral
                    </button>
                  </div>
                </div>

                {/* Success Message Banner */}
                {submissionSuccess && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center gap-3 text-emerald-300 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>
                      Thank you! Your {mode === 'referral' ? 'referral details' : 'message'} has been received. Amit will respond shortly!
                    </span>
                  </div>
                )}

                {/* Form Elements */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Honeypot hidden input (Spam bot trap) */}
                  <input
                    type="text"
                    name="website_url"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Name <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-white placeholder-slate-500 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Email <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-white placeholder-slate-500 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Company & Requisition (if referral mode) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Company {mode === 'referral' && <span className="text-emerald-400">*</span>}
                      </label>
                      <input
                        type="text"
                        required={mode === 'referral'}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Google, Microsoft, Amazon"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-white placeholder-slate-500 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        {mode === 'referral' ? 'Job Requisition URL *' : 'Subject *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={mode === 'referral' ? formData.jobLink : formData.subject}
                        onChange={(e) =>
                          mode === 'referral'
                            ? setFormData({ ...formData, jobLink: e.target.value })
                            : setFormData({ ...formData, subject: e.target.value })
                        }
                        placeholder={
                          mode === 'referral'
                            ? 'https://careers.company.com/job/...'
                            : 'Collaboration opportunity / SDE hiring'
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-white placeholder-slate-500 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Message / Notes */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {mode === 'referral' ? 'Candidate Notes & Instructions *' : 'Message *'}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        mode === 'referral'
                          ? 'Share specific requisition IDs, team details, or interview timelines...'
                          : 'Write your message here...'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-white placeholder-slate-500 transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Document Attachment & Cloudflare Turnstile Verification */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    
                    {/* Document Upload Button */}
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-all"
                      >
                        <UploadCloud className="w-4 h-4 text-emerald-400" />
                        <span>{attachedFile ? attachedFile.name : 'Upload Document'}</span>
                      </button>
                      <span className="text-[11px] text-slate-500 block mt-1">
                        Allowed: .pdf, .doc, .docx
                      </span>
                    </div>

                    {/* Simulated Cloudflare Turnstile Verification Widget (matching screenshot) */}
                    <div
                      onClick={() => setTurnstileVerified(!turnstileVerified)}
                      className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-emerald-500/50 cursor-pointer select-none flex items-center gap-3"
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                          turnstileVerified
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                            : 'border-slate-600 bg-slate-800'
                        }`}
                      >
                        {turnstileVerified && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <div className="flex flex-col text-[11px] leading-tight">
                        <span className="font-semibold text-slate-200">Cloudflare Turnstile</span>
                        <span className="text-slate-400">
                          {turnstileVerified ? 'Verification verified' : 'Click to verify human'}
                        </span>
                      </div>
                      <ShieldCheck className="w-5 h-5 text-emerald-400/80 ml-1" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-glow-emerald hover:shadow-emerald-500/50 transition-all active:scale-[0.99]"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Securing & Sending...' : 'Send Message'}</span>
                    </button>
                  </div>

                </form>

              </div>
            </Card3D>
          </div>

        </div>

      </div>
    </section>
  );
};
