import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex-1 overflow-y-auto bg-white">
      <!-- Hero Section -->
      <div class="relative bg-primary overflow-hidden">
        <div class="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" class="w-full h-full object-cover opacity-20" alt="Privacy Policy">
          <div class="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80"></div>
        </div>
        
        <div class="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-4xl font-serif font-extrabold tracking-tight text-white sm:text-5xl mb-4">
            <span class="text-primary-gold">Privacy</span> Policy
          </h1>
        </div>
      </div>

      <div class="py-16 bg-secondary-bg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="bg-white rounded-lg shadow-md p-8 mb-8">
        <div class="space-y-8">
          <section>
            <h2 class="text-3xl font-bold text-primary mb-4">1. Information We Collect</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              CUTM SkillBridge collects information that you provide directly to us when you:
            </p>
            <ul class="list-disc list-inside space-y-2 ml-4 text-gray-700 text-lg">
              <li>Create an account and complete your profile</li>
              <li>Enroll in courses or apply for internships and jobs</li>
              <li>Upload your resume or other documents</li>
              <li>Communicate with us or other users through the platform</li>
              <li>Participate in surveys or feedback forms</li>
            </ul>
          </section>

          <section>
            <h2 class="text-3xl font-bold text-primary mb-4">2. How We Use Your Information</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">We use the information we collect to:</p>
            <ul class="list-disc list-inside space-y-2 ml-4 text-gray-700 text-lg">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your enrollment in courses and applications for jobs/internships</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Match you with relevant opportunities based on your profile</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent fraudulent activities</li>
            </ul>
          </section>

          <section>
            <h2 class="text-3xl font-bold text-primary mb-4">3. Information Sharing</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              We may share your information with:
            </p>
            <ul class="list-disc list-inside space-y-2 ml-4 text-gray-700 text-lg">
              <li><strong>Educational institutions:</strong> To facilitate your learning and certification</li>
              <li><strong>Employers and recruiters:</strong> When you apply for internships or jobs</li>
              <li><strong>Service providers:</strong> Who help us operate our platform</li>
              <li><strong>Legal authorities:</strong> When required by law or to protect our rights</li>
            </ul>
          </section>

          <section>
            <h2 class="text-3xl font-bold text-primary mb-4">4. Data Security</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 class="text-3xl font-bold text-primary mb-4">5. Your Rights</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">You have the right to:</p>
            <ul class="list-disc list-inside space-y-2 ml-4 text-gray-700 text-lg">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify inaccurate or incomplete information</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict the processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 class="text-3xl font-bold text-primary mb-4">6. Cookies and Tracking</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              We use cookies and similar tracking technologies to collect information about your browsing activities and to personalize your experience on our platform.
            </p>
          </section>

          <section>
            <h2 class="text-3xl font-bold text-primary mb-4">7. Contact Us</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p class="ml-4 text-gray-700 text-lg">
              Email: privacy@cutm.ac.in<br>
              Phone: +91-9999999999<br>
              Address: CUTM, Bhubaneswar, Odisha
            </p>
          </section>
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
    </div>
  `
})
export class PrivacyPolicyComponent {}
