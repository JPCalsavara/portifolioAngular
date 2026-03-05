import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExperienceCardData } from '../../models/data.models';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-experience-card',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './experience-card.html',
  styleUrl: './experience-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceCard {
  private readonly dataService = inject(DataService);
  
  readonly experience = input.required<ExperienceCardData>();

  getTechInfo(tech: string) {
    return this.dataService.getTechnologyInfo(tech);
  }
}
