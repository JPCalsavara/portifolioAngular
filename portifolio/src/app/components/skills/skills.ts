import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { SkillCardData } from '../../models/data.models';
import { SkillCard } from '../skill-card/skill-card';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-skills',
  imports: [SkillCard],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  private readonly dataService = inject(DataService);
  
  readonly allSkills = input.required<SkillCardData[]>();
  readonly legendItems = signal(this.dataService.getLegendItems());
  readonly activeLegendType = signal<string | null>(null);

  setHoverType(type: string | null) {
    this.activeLegendType.set(type);
  }

  readonly groupedSkills = computed(() => {
    const groups: Record<string, SkillCardData[]> = {
      'Front-end': [],
      'Back-end': [],
      'Infra & DB': [],
      'Full Stack / Outros': [],
    };

    this.allSkills().forEach((skill) => {
      if (skill.type === 'frontend') {
        groups['Front-end'].push(skill);
      } else if (skill.type === 'backend') {
        groups['Back-end'].push(skill);
      } else if (skill.type === 'database' || skill.type === 'infra') {
        groups['Infra & DB'].push(skill);
      } else {
        groups['Full Stack / Outros'].push(skill);
      }
    });

    return groups;
  });

  readonly categories = computed(() => Object.keys(this.groupedSkills()));
}
