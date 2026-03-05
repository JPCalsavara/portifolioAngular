import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import {
  ProjectCardData,
  SkillCardData,
  ExperienceCardData,
  LegendItem,
  TechnologyInfo,
} from '../models/data.models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private supabase: SupabaseClient;

  // --- Fallback Data ---
  private readonly fallbackProjects: ProjectCardData[] = [
    {
      id: '1',
      title: 'InterceptorSystem (Local Fallback)',
      tecnosUsed: ['dotnet', 'angular', 'csharp', 'postgresql', 'docker', 'cleanarch', 'ddd', 'efcore'],
      description: 'Plataforma completa de gestão de segurança patrimonial com .NET 8 e Angular 18.',
      longDescription: 'O InterceptorSystem é uma solução robusta para gestão de segurança patrimonial...',
      urlName: '',
      repositoryLink: 'https://github.com/JPCalsavara',
    },
    {
      id: '2',
      title: 'Ju Decoração de Natal (Local Fallback)',
      tecnosUsed: ['typescript', 'tailwind', 'react'],
      description: 'Plataforma web para presença digital e captação de leads.',
      longDescription: 'Foco total em SEO e performance utilizando React e Tailwind CSS...',
      urlName: '',
      repositoryLink: 'https://github.com/JPCalsavara',
    }
  ];

  private readonly fallbackSkills: SkillCardData[] = [
    { name: 'csharp', type: 'backend', label: 'C#' },
    { name: 'typescript', type: 'all', label: 'TypeScript' },
    { name: 'react', type: 'frontend', label: 'React' },
    { name: 'tailwind', type: 'frontend', label: 'Tailwind' },
    { name: 'angular', type: 'frontend', label: 'Angular' },
    { name: 'dotnet', type: 'backend', label: '.NET' },
    { name: 'postgresql', type: 'database', label: 'PostgreSQL' },
  ];

  private readonly fallbackExperiences: ExperienceCardData[] = [
    {
      id: '1',
      title: 'Mottu (Local Fallback)',
      imageName: 'atria',
      description: 'Atuação no Squad de Infrações e Multas.',
      longDescription: 'Responsável por microsserviços .NET 8 e arquitetura orientada a eventos...',
      skillsLearned: ['dotnet', 'csharp', 'kubernetes', 'docker', 'cleanarch'],
      link: 'https://mottu.com.br/',
      isProfessional: true
    }
  ];

  constructor() {
    console.log('Iniciando Supabase com URL:', environment.supabaseUrl);
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // --- Projects CRUD ---
  async getProjects(): Promise<ProjectCardData[]> {
    try {
      console.log('Buscando projetos no Supabase...');
      const { data, error } = await this.supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) {
        console.error('Erro Supabase (Projects):', error.message, error.details, error.hint);
        return this.fallbackProjects;
      }

      if (!data || data.length === 0) {
        console.warn('Nenhum projeto encontrado no Supabase, usando fallback.');
        return this.fallbackProjects;
      }

      console.log('Projetos carregados com sucesso do Supabase.');
      return data.map(p => ({
        id: String(p.id),
        title: p.title,
        description: p.description,
        longDescription: p.long_description,
        tecnosUsed: p.tecnos_used,
        urlName: p.url_name,
        produtionLink: p.prodution_link,
        repositoryLink: p.repository_link
      }));
    } catch (err) {
      console.error('Erro inesperado ao conectar ao Supabase:', err);
      return this.fallbackProjects;
    }
  }

  async createProject(project: Partial<ProjectCardData>) {
    const { data, error } = await this.supabase
      .from('projects')
      .insert([{
        title: project.title,
        description: project.description,
        long_description: project.longDescription,
        tecnos_used: project.tecnosUsed,
        repository_link: project.repositoryLink,
        prodution_link: project.produtionLink,
      }])
      .select();
    if (error) throw error;
    return data;
  }

  // --- Skills CRUD ---
  async getSkills(): Promise<SkillCardData[]> {
    try {
      console.log('Buscando skills no Supabase...');
      const { data, error } = await this.supabase
        .from('skills')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) {
        console.error('Erro Supabase (Skills):', error.message);
        return this.fallbackSkills;
      }

      if (!data || data.length === 0) return this.fallbackSkills;
      return data;
    } catch {
      return this.fallbackSkills;
    }
  }

  async createSkill(skill: SkillCardData) {
    const { data, error } = await this.supabase
      .from('skills')
      .insert([skill])
      .select();
    if (error) throw error;
    return data;
  }

  // --- Experiences CRUD ---
  async getExperiences(): Promise<ExperienceCardData[]> {
    try {
      console.log('Buscando experiências no Supabase...');
      const { data, error } = await this.supabase
        .from('experiences')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) {
        console.error('Erro Supabase (Experiences):', error.message);
        return this.fallbackExperiences;
      }

      if (!data || data.length === 0) return this.fallbackExperiences;

      return data.map(e => ({
        id: String(e.id),
        title: e.title,
        imageName: e.image_name,
        description: e.description,
        longDescription: e.long_description,
        skillsLearned: e.skills_learned,
        link: e.link,
        isProfessional: e.is_professional
      }));
    } catch {
      return this.fallbackExperiences;
    }
  }

  // --- Helper Methods ---
  getLegendItems(): LegendItem[] {
    return [
      { label: 'Back-end', color: 'bg-lime-600', type: 'backend' },
      { label: 'Front-end', color: 'bg-rose-600', type: 'frontend' },
      { label: 'Data Base', color: 'bg-amber-600', type: 'database' },
      { label: 'Infra', color: 'bg-blue-600', type: 'infra' },
      { label: 'Full Stack', color: 'bg-purple-700', type: 'all' },
    ];
  }

  getTechnologyInfo(name: string): TechnologyInfo | undefined {
    const techs: Record<string, TechnologyInfo> = {
      csharp: { category: 'backend', realName: 'C#' },
      typescript: { category: 'all', realName: 'TypeScript' },
      html: { category: 'frontend', realName: 'HTML5' },
      css: { category: 'frontend', realName: 'CSS3' },
      react: { category: 'frontend', realName: 'React' },
      tailwind: { category: 'frontend', realName: 'Tailwind' },
      angular: { category: 'frontend', realName: 'Angular' },
      dotnet: { category: 'backend', realName: '.NET 8' },
      postgresql: { category: 'database', realName: 'PostgreSQL' },
      kubernetes: { category: 'infra', realName: 'Kubernetes' },
      docker: { category: 'infra', realName: 'Docker' },
    };
    return techs[name.toLowerCase()];
  }

  async getProjectById(id: string): Promise<ProjectCardData | undefined> {
    const projects = await this.getProjects();
    return projects.find(p => p.id === id);
  }

  async getExperienceById(id: string): Promise<ExperienceCardData | undefined> {
    const experiences = await this.getExperiences();
    return experiences.find(e => e.id === id);
  }
}
