import React, { useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperienceSection } from './components/Experience';
import { ProjectsSection } from './components/Projects';
import { AwardsBountiesSection } from './components/AwardsBounties';
import { SkillsSection } from './components/Skills';
import { EducationCertificationsSection } from './components/EducationCertifications';
import { FullStackBuilderSection } from './components/FullStackBuilder';
import { ContactReferralSection } from './components/ContactReferral';
import { Footer } from './components/Footer';

// Modals
import { ATSResumeModal } from './components/ATSResumeModal';
import { OwnerAuthModal } from './components/OwnerAuthModal';
import { EditPortfolioModal } from './components/EditPortfolioModal';
import { ResumeUploadModal } from './components/ResumeUploadModal';

export const AppContent: React.FC = () => {
  useEffect(() => {
    document.title = 'Amit Portfolio';
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-200 overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Ambient Clean Background (No 3D WebGL overhead) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', 
            backgroundSize: '32px 32px' 
          }} 
        />
      </div>

      {/* Main Navigation */}
      <Navbar />

      {/* Content Sections */}
      <main className="relative z-10">
        <Hero />
        <ExperienceSection />
        <ProjectsSection />
        <AwardsBountiesSection />
        <SkillsSection />
        <EducationCertificationsSection />
        <FullStackBuilderSection />
        <ContactReferralSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <ATSResumeModal />
      <OwnerAuthModal />
      <EditPortfolioModal />
      <ResumeUploadModal />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}
