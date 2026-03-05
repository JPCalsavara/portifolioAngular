import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ExperienceCardData } from '../../models/data.models';
import { ExperienceCard } from '../experience-card/experience-card';

@Component({
  selector: 'app-experiences',
  imports: [ExperienceCard],
  templateUrl: './experiences.html',
  styleUrl: './experiences.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experiences {
  readonly experiences = input.required<ExperienceCardData[]>();
  readonly isProfessional = computed(() => this.experiences()[0]?.isProfessional ?? false);
}
