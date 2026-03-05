import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Hero } from '../../components/hero/hero';
import { Projects } from '../../components/projects/projects';
import { Skills } from '../../components/skills/skills';
import { Experiences } from '../../components/experiences/experiences';
import { Contact } from '../../components/contact/contact';
import { ProjectCardData, SkillCardData, ExperienceCardData } from '../../models/data.models';

@Component({
  selector: 'app-home',
  imports: [Hero, Projects, Skills, Experiences, Contact],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly dataService = inject(DataService);

  readonly allProjects = signal<ProjectCardData[]>([]);
  readonly allSkills = signal<SkillCardData[]>([]);
  readonly professionalExperiences = signal<ExperienceCardData[]>([]);
  readonly academicExperiences = signal<ExperienceCardData[]>([]);

  async ngOnInit() {
    try {
      const projects = await this.dataService.getProjects();
      this.allProjects.set(projects);

      const skills = await this.dataService.getSkills();
      this.allSkills.set(skills);

      const experiences = await this.dataService.getExperiences();
      this.professionalExperiences.set(experiences.filter(e => e.isProfessional));
      this.academicExperiences.set(experiences.filter(e => !e.isProfessional));
    } catch (e) {
      console.error('Erro ao carregar dados do Supabase:', e);
    }
  }
}
