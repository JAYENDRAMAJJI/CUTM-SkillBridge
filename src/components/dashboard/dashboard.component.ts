import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { CommonModule } from '@angular/common';
import { StudentViewComponent } from './student-view.component';
import { AdminViewComponent } from './admin-view.component';
import { TrainerViewComponent } from './trainer-view.component';
import { RecruiterViewComponent } from './recruiter-view.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StudentViewComponent, AdminViewComponent, TrainerViewComponent, RecruiterViewComponent],
  template: `
    <div class="flex h-[calc(100vh-80px)] overflow-hidden bg-secondary-bg">
      
      <!-- Sidebar (Simplified) -->
      <aside class="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div class="p-6">
          <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Menu</h2>
          <nav class="space-y-1">
            <button (click)="navigateTo('dashboard')" class="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary/10 text-primary w-full text-left">
              <span class="truncate">Overview</span>
            </button>
            @if (store.userRole() === 'student') {
              <button (click)="navigateTo('lms-courses')" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full text-left">
                <span class="truncate">My Courses</span>
              </button>
              <button (click)="navigateTo('internships')" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full text-left">
                 <span class="truncate">Internships</span>
              </button>
              <button (click)="navigateTo('jobs')" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full text-left">
                 <span class="truncate">Placements</span>
              </button>
            }
            @if (store.userRole() === 'admin') {
              <button (click)="navigateTo('admin')" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full text-left">
                <span class="truncate">Manage Students</span>
              </button>
               <button (click)="navigateTo('admin')" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full text-left">
                <span class="truncate">Approvals</span>
              </button>
              <button (click)="navigateTo('admin')" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full text-left">
                <span class="truncate">Analytics</span>
              </button>
            }
            @if (store.userRole() === 'trainer') {
              <button (click)="navigateTo('trainer')" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full text-left">
                <span class="truncate">My Courses</span>
              </button>
              <button (click)="navigateTo('trainer')" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full text-left">
                <span class="truncate">Students</span>
              </button>
              <button (click)="navigateTo('trainer')" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full text-left">
                <span class="truncate">Assignments</span>
              </button>
            }
            @if (store.userRole() === 'recruiter') {
              <button (click)="navigateTo('recruiter')" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full text-left">
                <span class="truncate">Job Postings</span>
              </button>
              <button (click)="navigateTo('recruiter')" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full text-left">
                <span class="truncate">Applications</span>
              </button>
              <button (click)="navigateTo('recruiter')" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full text-left">
                <span class="truncate">Interviews</span>
              </button>
            }
          </nav>
        </div>
        
        <div class="mt-auto p-6 border-t border-gray-100">
          <div class="bg-primary-gold/10 p-4 rounded-lg">
             <h4 class="text-xs font-bold text-primary-gold uppercase mb-1">Status</h4>
             <p class="text-xs text-gray-600">Profile: 80% Complete</p>
             <div class="w-full bg-gray-200 rounded-full h-1.5 mt-2">
               <div class="bg-primary-gold h-1.5 rounded-full" style="width: 80%"></div>
             </div>
          </div>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto p-6">
        <div class="max-w-7xl mx-auto">
          
          <header class="mb-8">
            <h1 class="text-2xl font-serif font-bold text-primary">
              {{ getWelcomeMessage() }}
            </h1>
            <p class="text-gray-500 text-sm mt-1">Here is what's happening today.</p>
          </header>

          @switch (store.userRole()) {
            @case ('student') {
              <app-student-view></app-student-view>
            }
            @case ('admin') {
              <app-admin-view></app-admin-view>
            }
            @case ('trainer') {
              <app-trainer-view></app-trainer-view>
            }
            @case ('recruiter') {
              <app-recruiter-view></app-recruiter-view>
            }
            @default {
              <div class="p-8 text-center bg-white rounded-lg shadow-sm">
                <p class="text-gray-500">Dashboard for {{store.userRole()}} is under construction.</p>
              </div>
            }
          }
        </div>
      </main>
    </div>
  `
})
export class DashboardComponent {
  store = inject(StoreService);
  router = inject(Router);

  getWelcomeMessage() {
    const hours = new Date().getHours();
    const greeting = hours < 12 ? 'Good morning' : hours < 18 ? 'Good afternoon' : 'Good evening';
    return `${greeting}, ${this.store.userName()}`;
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}