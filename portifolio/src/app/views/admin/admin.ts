import { ChangeDetectionStrategy, Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TitleCasePipe, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, TitleCasePipe, KeyValuePipe],
  templateUrl: './admin.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly dataService = inject(DataService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly currentFilter = signal<'projects' | 'skills' | 'experiences'>('projects');
  readonly isModalOpen = signal(false);
  readonly editingId = signal<string | null>(null);

  readonly projects = signal<any[]>([]);
  readonly skills = signal<any[]>([]);
  readonly experiences = signal<any[]>([]);

  readonly dynamicForm = this.fb.group({});

  async ngOnInit() {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/login']);
      return;
    }
    await this.refreshData();
    this.buildForm();
  }

  async refreshData() {
    this.projects.set(await this.dataService.getProjects());
    this.skills.set(await this.dataService.getSkills());
    this.experiences.set(await this.dataService.getExperiences());
  }

  setFilter(filter: 'projects' | 'skills' | 'experiences') {
    this.currentFilter.set(filter);
    this.buildForm();
  }

  buildForm(data?: any) {
    const filter = this.currentFilter();
    const group: any = {};

    if (filter === 'projects') {
      group.title = [data?.title || '', Validators.required];
      group.description = [data?.description || '', Validators.required];
      group.longDescription = [data?.longDescription || ''];
      group.repositoryLink = [data?.repositoryLink || ''];
      group.tecnosUsed = [data?.tecnosUsed?.join(',') || ''];
    } else if (filter === 'skills') {
      group.name = [data?.name || '', Validators.required];
      group.label = [data?.label || '', Validators.required];
      group.type = [data?.type || 'frontend', Validators.required];
    } else if (filter === 'experiences') {
      group.title = [data?.title || '', Validators.required];
      group.company = [data?.company || ''];
      group.description = [data?.description || '', Validators.required];
      group.isProfessional = [data?.isProfessional ?? true];
      group.skillsLearned = [data?.skillsLearned?.join(',') || ''];
    }

    // Resetting and rebuilding form
    Object.keys(this.dynamicForm.controls).forEach(key => this.dynamicForm.removeControl(key));
    Object.keys(group).forEach(key => this.dynamicForm.addControl(key, this.fb.control(group[key][0], group[key][1])));
    this.editingId.set(data?.id || null);
    this.isModalOpen.set(!!data);
  }

  openAddModal() {
    this.buildForm();
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.editingId.set(null);
  }

  async onSave() {
    if (this.dynamicForm.valid) {
      const val = this.dynamicForm.value;
      const filter = this.currentFilter();
      
      try {
        if (filter === 'projects') {
          const payload = { ...val, tecnosUsed: (val as any).tecnosUsed?.split(',') };
          await this.dataService.createProject(payload);
        } else if (filter === 'skills') {
          await this.dataService.createSkill(val as any);
        }
        
        await this.refreshData();
        this.closeModal();
        alert('Salvo com sucesso!');
      } catch (e) {
        alert('Erro ao salvar no Supabase.');
      }
    }
  }

  async onDelete(id: string) {
    if (confirm('Tem certeza que deseja apagar?')) {
      // Logic for delete would be added to DataService
      alert('Funcionalidade de delete requer permissão no Supabase!');
    }
  }
}
