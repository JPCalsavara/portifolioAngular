import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectCardData } from '../../models/data.models';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-project-card',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  private readonly dataService = inject(DataService);
  
  readonly project = input.required<ProjectCardData>();

  getTechInfo(tech: string) {
    return this.dataService.getTechnologyInfo(tech);
  }
}
