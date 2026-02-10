import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavbarComponent } from './components/layout/navbar.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-navbar></app-navbar>
      <main class="flex-1 overflow-y-auto">
        <router-outlet></router-outlet>
      </main>
      <footer class="bg-primary text-white py-8 mt-12 border-t border-primary-gold/30">
        <div class="max-w-7xl mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 class="font-semibold mb-4">Quick Links</h4>
              <ul class="space-y-2 text-primary-gold/80">
                <li><a routerLink="/" (click)="scrollToTop()" class="hover:text-primary-gold cursor-pointer">Home</a></li>
                <li><a routerLink="/about" (click)="scrollToTop()" class="hover:text-primary-gold cursor-pointer">About</a></li>
                <li><a routerLink="/contact" (click)="scrollToTop()" class="hover:text-primary-gold cursor-pointer">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-4">Modules</h4>
              <ul class="space-y-2 text-primary-gold/80">
                <li><a routerLink="/courses" (click)="scrollToTop()" class="hover:text-primary-gold cursor-pointer">Courses</a></li>
                <li><a routerLink="/internships" (click)="scrollToTop()" class="hover:text-primary-gold cursor-pointer">Internships</a></li>
                <li><a routerLink="/jobs" (click)="scrollToTop()" class="hover:text-primary-gold cursor-pointer">Jobs</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-4">Legal</h4>
              <ul class="space-y-2 text-primary-gold/80">
                <li><a routerLink="/privacy-policy" (click)="scrollToTop()" class="hover:text-primary-gold cursor-pointer">Privacy Policy</a></li>
                <li><a routerLink="/terms-conditions" (click)="scrollToTop()" class="hover:text-primary-gold cursor-pointer">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
          <div class="mt-8 pt-4 border-t border-primary-gold/20">
            <p class="text-center text-primary-gold/70">&copy; 2026 CUTM SkillBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  `
})
export class AppComponent {
  scrollToTop() {
    const main = document.querySelector('main');
    if (main) {
      main.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}