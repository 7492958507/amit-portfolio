export interface Project {
  id: string;
  title: string;
  date: string;
  description: string;
  bullets: string[];
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  skills: string[];
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  iconType: 'trophy' | 'award' | 'star' | 'code';
  badge?: string;
}

export interface SkillItem {
  name: string;
  category: string;
  iconSvg?: string;
  level?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  credentialId: string;
  issueDate: string;
  verificationUrl: string;
  skills: string[];
  imageLogo: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  cgpa: string;
  location: string;
  coursework?: string[];
}

export interface PersonalInfo {
  name: string;
  headlineRole: string;
  currentCompany: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  leetcode: string;
  bio: string;
  roleTaglines: string[];
}
