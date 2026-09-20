import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Project, Experience, Award, Certificate, Education, PersonalInfo } from '../types/portfolio';
import {
  INITIAL_PERSONAL_INFO,
  INITIAL_EXPERIENCES,
  INITIAL_PROJECTS,
  INITIAL_AWARDS,
  INITIAL_CERTIFICATES,
  INITIAL_EDUCATION,
  INITIAL_SKILL_CATEGORIES,
  RAW_LATEX_RESUME
} from '../data/portfolioData';

export interface UploadedResumeData {
  name: string;
  url: string;
  size: string;
  uploadDate: string;
  fileType: string;
}

interface PortfolioContextType {
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  experiences: Experience[];
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  awards: Award[];
  setAwards: React.Dispatch<React.SetStateAction<Award[]>>;
  certificates: Certificate[];
  setCertificates: React.Dispatch<React.SetStateAction<Certificate[]>>;
  education: Education;
  setEducation: React.Dispatch<React.SetStateAction<Education>>;
  skillCategories: { id: string; name: string; skills: string[] }[];
  setSkillCategories: React.Dispatch<React.SetStateAction<{ id: string; name: string; skills: string[] }[]>>;
  
  // Owner Authentication
  isOwner: boolean;
  ownerPin: string;
  authenticateOwner: (pin: string) => boolean;
  logoutOwner: () => void;
  changeOwnerPin: (oldPin: string, newPin: string) => boolean;
  requireOwnerAuth: (callback: () => void) => void;
  
  // Custom Resume Upload
  uploadedResume: UploadedResumeData | null;
  setUploadedResume: (data: UploadedResumeData | null) => void;
  rawLatexResume: string;

  // Modals state
  isResumeModalOpen: boolean;
  setIsResumeModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;

  // Utilities
  resetToDefaults: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage keys
  const STORAGE_KEY_INFO = 'amit_portfolio_info_v11';
  const STORAGE_KEY_EXP = 'amit_portfolio_exp_v9';
  const STORAGE_KEY_PROJ = 'amit_portfolio_proj_v9';
  const STORAGE_KEY_AWARDS = 'amit_portfolio_awards_v9';
  const STORAGE_KEY_CERTS = 'amit_portfolio_certs_v10';
  const STORAGE_KEY_SKILLS = 'amit_portfolio_skills_v9';
  const STORAGE_KEY_RESUME = 'amit_portfolio_uploaded_resume_v9';
  const STORAGE_KEY_PIN = 'amit_portfolio_owner_pin_v9';

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_INFO);
    return saved ? JSON.parse(saved) : INITIAL_PERSONAL_INFO;
  });

  const [experiences, setExperiences] = useState<Experience[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_EXP);
    return saved ? JSON.parse(saved) : INITIAL_EXPERIENCES;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PROJ);
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [awards, setAwards] = useState<Award[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_AWARDS);
    return saved ? JSON.parse(saved) : INITIAL_AWARDS;
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CERTS);
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [education, setEducation] = useState<Education>(INITIAL_EDUCATION);

  const [skillCategories, setSkillCategories] = useState<{ id: string; name: string; skills: string[] }[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SKILLS);
    return saved ? JSON.parse(saved) : INITIAL_SKILL_CATEGORIES;
  });

  const [uploadedResume, setUploadedResumeState] = useState<UploadedResumeData | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_RESUME);
    return saved ? JSON.parse(saved) : null;
  });

  const [ownerPin, setOwnerPin] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_PIN) || '1234';
  });

  const [isOwner, setIsOwner] = useState<boolean>(() => {
    return sessionStorage.getItem('amit_is_owner_authenticated') === 'true';
  });

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Modals
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_INFO, JSON.stringify(personalInfo));
  }, [personalInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_EXP, JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROJ, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_AWARDS, JSON.stringify(awards));
  }, [awards]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CERTS, JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SKILLS, JSON.stringify(skillCategories));
  }, [skillCategories]);

  const setUploadedResume = (data: UploadedResumeData | null) => {
    setUploadedResumeState(data);
    if (data) {
      localStorage.setItem(STORAGE_KEY_RESUME, JSON.stringify(data));
    } else {
      localStorage.removeItem(STORAGE_KEY_RESUME);
    }
  };

  const authenticateOwner = (pin: string): boolean => {
    if (pin.trim() === ownerPin.trim()) {
      setIsOwner(true);
      sessionStorage.setItem('amit_is_owner_authenticated', 'true');
      if (pendingCallback) {
        pendingCallback();
        setPendingCallback(null);
      }
      return true;
    }
    return false;
  };

  const logoutOwner = () => {
    setIsOwner(false);
    sessionStorage.removeItem('amit_is_owner_authenticated');
  };

  const changeOwnerPin = (oldPin: string, newPin: string): boolean => {
    if (oldPin.trim() === ownerPin.trim() && newPin.trim().length >= 4) {
      setOwnerPin(newPin.trim());
      localStorage.setItem(STORAGE_KEY_PIN, newPin.trim());
      return true;
    }
    return false;
  };

  const requireOwnerAuth = (callback: () => void) => {
    if (isOwner) {
      callback();
    } else {
      setPendingCallback(() => callback);
      setIsAuthModalOpen(true);
    }
  };

  const resetToDefaults = () => {
    setPersonalInfo(INITIAL_PERSONAL_INFO);
    setExperiences(INITIAL_EXPERIENCES);
    setProjects(INITIAL_PROJECTS);
    setAwards(INITIAL_AWARDS);
    setCertificates(INITIAL_CERTIFICATES);
    setSkillCategories(INITIAL_SKILL_CATEGORIES);
    setUploadedResume(null);
    setOwnerPin('1234');
    localStorage.removeItem(STORAGE_KEY_INFO);
    localStorage.removeItem(STORAGE_KEY_EXP);
    localStorage.removeItem(STORAGE_KEY_PROJ);
    localStorage.removeItem(STORAGE_KEY_AWARDS);
    localStorage.removeItem(STORAGE_KEY_CERTS);
    localStorage.removeItem(STORAGE_KEY_SKILLS);
    localStorage.removeItem(STORAGE_KEY_RESUME);
    localStorage.removeItem(STORAGE_KEY_PIN);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,
        experiences,
        setExperiences,
        projects,
        setProjects,
        awards,
        setAwards,
        certificates,
        setCertificates,
        education,
        setEducation,
        skillCategories,
        setSkillCategories,
        isOwner,
        ownerPin,
        authenticateOwner,
        logoutOwner,
        changeOwnerPin,
        requireOwnerAuth,
        uploadedResume,
        setUploadedResume,
        rawLatexResume: RAW_LATEX_RESUME,
        isResumeModalOpen,
        setIsResumeModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        isUploadModalOpen,
        setIsUploadModalOpen,
        resetToDefaults,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
