import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home';
import { ProjectDetailComponent } from './views/project-detail/project-detail';
import { ExperienceDetailComponent } from './views/experience-detail/experience-detail';
import { LoginComponent } from './views/login/login';
import { AdminComponent } from './views/admin/admin';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'project/:id', component: ProjectDetailComponent },
  { path: 'experience/:id', component: ExperienceDetailComponent },
  { path: '**', redirectTo: '' },
];
