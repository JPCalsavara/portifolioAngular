export interface ProjectCardData {
  id: string;
  title: string;
  tecnosUsed?: string[];
  description: string;
  longDescription?: string;
  urlName: string;
  produtionLink?: string;
  repositoryLink?: string;
}

export interface SkillCardData {
  name: string;
  link?: string;
  type: string;
  label: string;
}

export interface ExperienceCardData {
  id: string;
  title: string;
  imageName: string;
  description: string;
  longDescription?: string;
  skillsLearned: string[];
  link?: string;
  isProfessional?: boolean;
}

export interface LegendItem {
  label: string;
  color: string;
  type: string;
}

export interface TechnologyInfo {
  category: string;
  link?: string;
  realName?: string;
}
