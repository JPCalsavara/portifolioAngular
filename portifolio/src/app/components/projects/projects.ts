import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ProjectCardData } from '../../models/data.models';
import { ProjectCard } from '../project-card/project-card';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly authService = inject(AuthService);
  readonly projects = input.required<ProjectCardData[]>();
}
