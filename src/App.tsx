import React, { useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { ThreeBackground } from './components/ThreeBackground';
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
      {/* 3D Interactive WebGL Particle & Geometric Field */}
      <ThreeBackground />

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
