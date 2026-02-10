import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <nav class="bg-primary text-white sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          
          <!-- Logo Section -->
          <div class="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity" routerLink="/" (click)="scrollToTop()">
            <!-- Official Logo -->
            <div class="w-14 h-14 flex-shrink-0 bg-white rounded-full p-0.5 shadow-md flex items-center justify-center">
              <img src="assets/CUTM SKILL BRIDGE-logo.png" alt="CUTM SkillBridge" class="w-full h-full rounded-full object-contain" />
            </div>
            
            <!-- Brand Text -->
            <div class="hidden md:block">
              <div class="font-bold text-white text-base leading-tight">
                CUTM <span class="text-primary-gold">SKILL BRIDGE</span>
              </div>
              <p class="text-xs text-primary-gold font-medium">Learn • Certify • Intern • Get Placed</p>
            </div>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center gap-1">
            @if (!store.isAuthenticated()) {
              <a routerLink="/" (click)="scrollToTop()" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition">Home</a>
              <a routerLink="/login" class="ml-4 px-6 py-2 bg-primary-gold text-primary font-bold rounded-lg hover:bg-yellow-400 transition">
                Login
              </a>
            } @else {
              <!-- Authenticated Menu -->
              <div class="flex items-center gap-4">
                <a routerLink="/dashboard" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition">Dashboard</a>
                
                @switch(store.userRole()) {
                  @case('student') {
                    <a routerLink="/lms-courses" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition">Learning</a>
                    <a routerLink="/courses" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition">Courses</a>
                    <a routerLink="/internships" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition">Internships</a>
                    <a routerLink="/jobs" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition">Jobs</a>
                    <a routerLink="/resume-builder" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition">Resume</a>
                    <a routerLink="/profile" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition">Profile</a>
                  }
                  @case('admin') {
                    <a routerLink="/admin" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition">Management</a>
                    <a routerLink="/courses" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition">Courses</a>
                    <a routerLink="/jobs" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition">Jobs</a>
                  }
                  @case('trainer') {
                    <a routerLink="/trainer" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition">My Panel</a>
                    <a routerLink="/courses" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition">Courses</a>
                  }
                  @case('recruiter') {
                    <a routerLink="/recruiter" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition">My Panel</a>
                    <a routerLink="/jobs" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition">Jobs</a>
                    <a routerLink="/courses" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition">Courses</a>
                  }
                }

                <!-- User Menu -->
                <div class="flex items-center gap-2 ml-4 pl-4 border-l border-primary-gold/40">
                  <div class="flex flex-col text-right">
                    <span class="text-xs font-bold">{{ store.userName() }}</span>
                    <span class="text-[10px] text-primary-gold/80">{{ store.userRole() | titlecase }}</span>
                  </div>
                  <button (click)="logout()" class="px-4 py-2 bg-secondary-red rounded-lg text-sm font-medium hover:bg-secondary-red/90 transition">
                    Logout
                  </button>
                </div>
              </div>
            }
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center gap-2">
            @if (store.isAuthenticated()) {
              <button (click)="logout()" class="px-3 py-2 rounded-md text-sm font-medium bg-secondary-red hover:bg-secondary-red/90">
                Logout
              </button>
            } @else {
              <a routerLink="/login" class="px-4 py-2 bg-primary-gold text-primary font-bold rounded-lg text-sm">
                Login
              </a>
            }
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NavbarComponent {
  store = inject(StoreService);
  router = inject(Router);

  logout() {
    this.store.logout();
    this.router.navigate(['/']);
  }

  scrollToTop() {
    const main = document.querySelector('main');
    if (main) {
      main.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}