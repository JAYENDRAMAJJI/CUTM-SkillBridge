import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex-1 overflow-y-auto bg-white">
      <!-- Hero Section -->
      <div class="relative bg-primary overflow-hidden">
        <div class="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" class="w-full h-full object-cover opacity-20" alt="University Campus">
          <div class="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80"></div>
        </div>
        
        <div class="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 class="text-4xl font-serif font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
            Connecting Talent to <span class="text-primary-gold">Opportunity</span>
          </h1>
          <p class="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            The official digital ecosystem of Centurion University. Learn new skills, earn verified certificates, secure internships, and get placed at top companies.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-4 text-sm sm:text-base font-medium text-white/90">
            <span class="flex items-center"><span class="w-2 h-2 rounded-full bg-primary-gold mr-2"></span>Learn</span>
            <span class="flex items-center"><span class="w-2 h-2 rounded-full bg-primary-gold mr-2"></span>Certify</span>
            <span class="flex items-center"><span class="w-2 h-2 rounded-full bg-primary-gold mr-2"></span>Intern</span>
            <span class="flex items-center"><span class="w-2 h-2 rounded-full bg-primary-gold mr-2"></span>Get Placed</span>
          </div>
          
          <div class="mt-10 flex gap-4">
            <a routerLink="/login" class="px-8 py-3 border border-transparent text-base font-bold rounded-md text-primary bg-primary-gold hover:bg-yellow-400 md:py-4 md:text-lg md:px-10 transition-transform hover:scale-105 shadow-xl">
              Get Started
            </a>
            <a routerLink="/register" class="px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 md:py-4 md:text-lg md:px-10 transition-colors">
              Register
            </a>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="py-16 bg-secondary-bg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-base text-secondary-red font-semibold tracking-wide uppercase">Why SkillBridge?</h2>
            <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-primary font-serif sm:text-4xl">
              A Complete Career Ecosystem
            </p>
          </div>

          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <!-- Feature 1 -->
            <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow border-t-4 border-primary-gold">
              <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">LMS & Learning</h3>
              <p class="text-gray-600 text-sm">Access world-class course content, video lectures, and notes tailored for your curriculum.</p>
            </div>

            <!-- Feature 2 -->
            <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow border-t-4 border-secondary-red">
              <div class="w-12 h-12 bg-secondary-red/10 rounded-lg flex items-center justify-center mb-4">
                 <svg class="w-6 h-6 text-secondary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Verified Certificates</h3>
              <p class="text-gray-600 text-sm">Earn verified certificates with QR codes for every course and internship you complete.</p>
            </div>

            <!-- Feature 3 -->
            <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow border-t-4 border-accent-blue">
              <div class="w-12 h-12 bg-accent-blue/10 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Internships</h3>
              <p class="text-gray-600 text-sm">Find paid and unpaid internships relevant to your field of study and gain real experience.</p>
            </div>

            <!-- Feature 4 -->
            <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow border-t-4 border-primary">
              <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Placements</h3>
              <p class="text-gray-600 text-sm">Direct access to on-campus and off-campus recruitment drives from top companies.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {}