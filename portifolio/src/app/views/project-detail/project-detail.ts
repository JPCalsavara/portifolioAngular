import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NgOptimizedImage } from '@angular/common';
import { ProjectCardData } from '../../models/data.models';

@Component({
  selector: 'app-project-detail',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './project-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly dataService = inject(DataService);

  readonly project = signal<ProjectCardData | null>(null);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const p = await this.dataService.getProjectById(id);
      this.project.set(p || null);
    }
  }

  getTechInfo(tech: string) {
    return this.dataService.getTechnologyInfo(tech);
  }
}
