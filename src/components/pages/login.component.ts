import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService, UserRole } from '../../services/store.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-[calc(100vh-80px)] bg-secondary-bg flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-4xl flex overflow-hidden">
        
        <!-- Left Side: Branding -->
        <div class="hidden md:flex w-1/2 bg-primary flex-col justify-center items-center p-12 text-white relative">
          <div class="absolute inset-0 bg-primary opacity-90">
             <!-- Pattern overlay could go here -->
          </div>
          <div class="relative z-10 w-full flex flex-col items-center">
            <!-- Logo -->
            <div class="w-28 h-28 mb-8 flex items-center justify-center">
              <img src="assets/CUTM SKILL BRIDGE-logo.png" alt="CUTM Skill Bridge" class="w-full h-full" />
            </div>
            
            <h2 class="text-3xl font-serif font-bold mb-4">Welcome Back!</h2>
            <p class="text-gray-300 mb-8">Access the CUTM SKILL BRIDGE portal to manage your learning journey, internships, and career opportunities.</p>
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <span class="text-primary-gold text-2xl">•</span>
                <span>Login with your credentials</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-primary-gold text-2xl">•</span>
                <span>Update your profile & resume</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-primary-gold text-2xl">•</span>
                <span>Apply for jobs & internships</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side: Form -->
        <div class="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-gray-900">Sign In</h3>
            <p class="text-sm text-gray-500 mt-2">Choose your role to continue</p>
          </div>

          <div class="space-y-4">
            <!-- Role Selector Buttons -->
             <div class="grid grid-cols-2 gap-3">
               <button 
                 type="button"
                 (click)="selectRole('student')"
                 [class]="selectedRole === 'student' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-primary-gold'"
                 class="p-4 border rounded-lg text-center transition-all flex flex-col items-center gap-2">
                 <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                 </svg>
                 <div class="font-bold text-sm text-gray-800">Student</div>
               </button>
               <button 
                 type="button"
                 (click)="selectRole('admin')"
                 [class]="selectedRole === 'admin' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-primary-gold'"
                 class="p-4 border rounded-lg text-center transition-all flex flex-col items-center gap-2">
                 <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 8.646 4 4 0 010-8.646M12 17c-3.866 0-7-1.343-7-3s3.134-3 7-3 7 1.343 7 3-3.134 3-7 3z" />
                 </svg>
                 <div class="font-bold text-sm text-gray-800">Admin</div>
               </button>
               <button 
                 type="button"
                 (click)="selectRole('recruiter')"
                 [class]="selectedRole === 'recruiter' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-primary-gold'"
                 class="p-4 border rounded-lg text-center transition-all flex flex-col items-center gap-2">
                 <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                 </svg>
                 <div class="font-bold text-sm text-gray-800">Placement Cell</div>
               </button>
               <button 
                 type="button"
                 (click)="selectRole('trainer')"
                 [class]="selectedRole === 'trainer' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-primary-gold'"
                 class="p-4 border rounded-lg text-center transition-all flex flex-col items-center gap-2">
                 <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                 </svg>
                 <div class="font-bold text-sm text-gray-800">Trainer</div>
               </button>
             </div>

             <!-- Mock Form Fields -->
             <div>
               <label class="block text-sm font-medium text-gray-700">Email ID</label>
               <input type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 border p-2 bg-gray-50" placeholder="user@cutm.ac.in">
             </div>
             
             <div>
               <label class="block text-sm font-medium text-gray-700">Password</label>
               <input type="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 border p-2 bg-gray-50" value="password">
             </div>

             <button (click)="handleLogin()" class="w-full py-3 px-4 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
               Login as {{getRoleName()}}
             </button>
          </div>
          
          <div class="mt-6 text-center text-xs text-gray-400">
            For demo purposes, password check is disabled.
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  store = inject(StoreService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  selectedRole: UserRole = 'student';

  selectRole(role: UserRole) {
    this.selectedRole = role;
  }

  getRoleName() {
    if (this.selectedRole === 'recruiter') {
      return 'Placement Cell';
    }
    return this.selectedRole.charAt(0).toUpperCase() + this.selectedRole.slice(1);
  }

  handleLogin() {
    this.store.login(this.selectedRole);
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
    this.router.navigateByUrl(returnUrl);
  }
}