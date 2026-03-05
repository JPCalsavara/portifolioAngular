import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  readonly user = signal<User | null>(null);
  readonly isAdmin = signal(false);

  constructor(private router: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    
    // Check current session
    this.supabase.auth.getSession().then(({ data: { session } }) => {
      this.user.set(session?.user ?? null);
      this.isAdmin.set(!!session?.user);
    });

    // Listen for auth changes
    this.supabase.auth.onAuthStateChange((_event, session) => {
      this.user.set(session?.user ?? null);
      this.isAdmin.set(!!session?.user);
    });
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    this.router.navigate(['/admin']);
    return data;
  }

  async logout() {
    await this.supabase.auth.signOut();
    this.isAdmin.set(false);
    this.router.navigate(['/']);
  }
}
