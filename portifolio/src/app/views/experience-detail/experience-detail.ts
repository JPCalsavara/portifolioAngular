import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NgOptimizedImage } from '@angular/common';
import { ExperienceCardData } from '../../models/data.models';

@Component({
  selector: 'app-experience-detail',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './experience-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly dataService = inject(DataService);

  readonly experience = signal<ExperienceCardData | null>(null);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const e = await this.dataService.getExperienceById(id);
      this.experience.set(e || null);
    }
  }

  getTechInfo(tech: string) {
    return this.dataService.getTechnologyInfo(tech);
  }
}
