import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex-1 overflow-y-auto bg-white">
      <!-- Hero Section -->
      <div class="relative bg-primary overflow-hidden">
        <div class="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" class="w-full h-full object-cover opacity-20" alt="University Campus">
          <div class="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80"></div>
        </div>
        
        <div class="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-4xl font-serif font-extrabold tracking-tight text-white sm:text-5xl mb-4">
            About <span class="text-primary-gold">CUTM SkillBridge</span>
          </h1>
          <p class="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Learn • Certify • Intern • Get Placed
          </p>
        </div>
      </div>

      <div class="py-16 bg-secondary-bg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Mission Section -->
        <div class="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 class="text-3xl font-bold text-primary mb-4">Our Mission</h2>
          <p class="text-gray-700 text-lg leading-relaxed">
            CUTM SkillBridge is dedicated to bridging the gap between academic learning and industry requirements. 
            We provide a comprehensive platform that empowers students to acquire industry-relevant skills, earn 
            certifications, gain practical experience through internships, and secure placements at top companies.
          </p>
        </div>

        <!-- What We Offer -->
        <div class="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 class="text-3xl font-bold text-primary mb-6">What We Offer</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="border-l-4 border-primary-gold pl-4">
              <h3 class="text-xl font-bold text-primary mb-2">📚 Learning Management System</h3>
              <p class="text-gray-700">
                Access to industry-standard courses with video lectures, assignments, and quizzes. 
                Track your progress and earn certificates upon completion.
              </p>
            </div>
            <div class="border-l-4 border-primary-gold pl-4">
              <h3 class="text-xl font-bold text-primary mb-2">💼 Internship Opportunities</h3>
              <p class="text-gray-700">
                Explore 50+ internship opportunities from leading companies. Gain hands-on 
                experience and build your professional portfolio.
              </p>
            </div>
            <div class="border-l-4 border-primary-gold pl-4">
              <h3 class="text-xl font-bold text-primary mb-2">🎯 Placement Support</h3>
              <p class="text-gray-700">
                Direct access to job listings and placement drives. Our placement cell works 
                with top companies to create opportunities for students.
              </p>
            </div>
            <div class="border-l-4 border-primary-gold pl-4">
              <h3 class="text-xl font-bold text-primary mb-2">📄 Resume Builder</h3>
              <p class="text-gray-700">
                Create ATS-friendly resumes with our built-in resume builder. Export to PDF 
                and stand out in your job applications.
              </p>
            </div>
          </div>
        </div>

        <!-- Statistics -->
        <div class="bg-gradient-to-r from-primary to-primary-gold text-white rounded-lg shadow-md p-8 mb-8">
          <h2 class="text-3xl font-bold mb-6 text-center">Our Impact</h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div class="text-4xl font-bold mb-2">1,200+</div>
              <div class="text-primary-gold/90">Active Students</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">50+</div>
              <div class="text-primary-gold/90">Courses Available</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">85%</div>
              <div class="text-primary-gold/90">Placement Rate</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">100+</div>
              <div class="text-primary-gold/90">Partner Companies</div>
            </div>
          </div>
        </div>

        <!-- Vision -->
        <div class="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 class="text-3xl font-bold text-primary mb-4">Our Vision</h2>
          <p class="text-gray-700 text-lg leading-relaxed mb-4">
            To become the leading skill development and placement platform that transforms students 
            into industry-ready professionals, creating a seamless transition from education to employment.
          </p>
          <p class="text-gray-700 text-lg leading-relaxed">
            We envision a future where every student has access to quality education, practical training, 
            and meaningful employment opportunities, regardless of their background or location.
          </p>
        </div>

        <!-- Core Values -->
        <div class="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 class="text-3xl font-bold text-primary mb-6">Our Core Values</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center p-6 bg-secondary-bg rounded-lg">
              <div class="text-4xl mb-4">🎯</div>
              <h3 class="text-xl font-bold text-primary mb-2">Excellence</h3>
              <p class="text-gray-700">Committed to providing high-quality education and training</p>
            </div>
            <div class="text-center p-6 bg-secondary-bg rounded-lg">
              <div class="text-4xl mb-4">🤝</div>
              <h3 class="text-xl font-bold text-primary mb-2">Collaboration</h3>
              <p class="text-gray-700">Building strong partnerships with industry and academia</p>
            </div>
            <div class="text-center p-6 bg-secondary-bg rounded-lg">
              <div class="text-4xl mb-4">💡</div>
              <h3 class="text-xl font-bold text-primary mb-2">Innovation</h3>
              <p class="text-gray-700">Continuously evolving to meet industry demands</p>
            </div>
          </div>
        </div>

        <!-- Contact CTA -->
        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 class="text-2xl font-bold text-primary mb-4">Ready to Start Your Journey?</h2>
          <p class="text-gray-700 mb-6">Join thousands of students who are building their careers with CUTM SkillBridge</p>
          <div class="flex gap-4 justify-center">
            <a routerLink="/register" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-bold transition">
              Register Now
            </a>
            <a routerLink="/contact" class="px-6 py-3 bg-primary-gold text-primary rounded-lg hover:bg-yellow-500 font-bold transition">
              Contact Us
            </a>
          </div>
        </div>

        <div class="mt-12 text-center">
          <a routerLink="/" class="inline-flex items-center text-primary hover:text-primary-gold font-semibold text-lg">
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </div>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {}
