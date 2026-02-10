import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex-1 overflow-y-auto bg-white">
      <!-- Hero Section -->
      <div class="relative bg-primary overflow-hidden">
        <div class="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" class="w-full h-full object-cover opacity-20" alt="Terms and Conditions">
          <div class="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80"></div>
        </div>
        
        <div class="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-4xl font-serif font-extrabold tracking-tight text-white sm:text-5xl mb-4">
            <span class="text-primary-gold">Terms &</span> Conditions
          </h1>
        </div>
      </div>

      <div class="py-16 bg-secondary-bg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="bg-white rounded-lg shadow-md p-8 mb-8">
        <div class="space-y-8">
          <section>
            <h2 class="text-3xl font-bold text-primary mb-4">1. Acceptance of Terms</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              By accessing and using CUTM SkillBridge, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use this platform.
            </p>
          </section>

          <section>
            <h2 class="text-3xl font-bold text-primary mb-4">2. User Accounts</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              To access certain features of the platform, you must register for an account. You agree to:
            </p>
            <ul class="list-disc list-inside space-y-2 ml-4 text-gray-700 text-lg">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain the security of your password and account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Be responsible for all activities that occur under your account</li>
            </ul>
          </section>

          <section>
            <h2 class="text-3xl font-bold text-primary mb-4">3. User Conduct</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">You agree not to:</p>
            <ul class="list-disc list-inside space-y-2 ml-4 text-gray-700 text-lg">
              <li>Use the platform for any unlawful purpose</li>
              <li>Impersonate any person or entity</li>
              <li>Upload or transmit viruses or malicious code</li>
              <li>Attempt to gain unauthorized access to any portion of the platform</li>
              <li>Interfere with or disrupt the platform's operation</li>
              <li>Harass, abuse, or harm other users</li>
            </ul>
          </section>

          <section>
            <h2 class="text-3xl font-bold text-primary mb-4">4. Course Enrollment and Certification</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              When you enroll in a course:
            </p>
            <ul class="list-disc list-inside space-y-2 ml-4 text-gray-700 text-lg">
              <li>You agree to participate actively and complete assignments on time</li>
              <li>Certificates are awarded based on successful completion criteria</li>
              <li>You must maintain academic integrity and honesty</li>
              <li>Plagiarism or cheating may result in account termination</li>
            </ul>
          </section>

          <section>
            <h2 class="text-3xl font-bold text-primary mb-4">5. Internships and Job Placements</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              The platform facilitates connections between students and employers. We do not guarantee:
            </p>
            <ul class="list-disc list-inside space-y-2 ml-4 text-gray-700 text-lg">
              <li>Placement in any specific company or position</li>
              <li>Specific salary or compensation packages</li>
              <li>Employment outcomes</li>
            </ul>
            <p class="text-gray-700 text-lg leading-relaxed mt-4">
              All employment decisions are made solely by the hiring companies.
            </p>
          </section>

          <section>
            <h2 class="text-3xl font-bold text-primary mb-4">6. Intellectual Property</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              All content on CUTM SkillBridge, including text, graphics, logos, and software, is the property of CUTM or its content suppliers and is protected by copyright and intellectual property laws.
            </p>
          </section>

          <section>
            <h2 class="text-3xl font-bold text-primary mb-4">7. Content Uploaded by Users</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              By uploading content (resumes, assignments, etc.), you grant us a license to use, modify, and display that content for platform operations. You retain ownership of your content.
            </p>
          </section>

          <section>
            <h2 class="text-3xl font-bold text-primary mb-4">8. Limitation of Liability</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              CUTM SkillBridge is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the platform, including but not limited to direct, indirect, incidental, or consequential damages.
            </p>
          </section>

          <section>
            <h2 class="text-3xl font-bold text-primary mb-4">9. Termination</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              We reserve the right to terminate or suspend your account at any time for violation of these terms or for any other reason at our sole discretion.
            </p>
          </section>

          <section>
            <h2 class="text-3xl font-bold text-primary mb-4">10. Changes to Terms</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 class="text-3xl font-bold text-primary mb-4">11. Governing Law</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bhubaneswar, Odisha.
            </p>
          </section>

          <section>
            <h2 class="text-3xl font-bold text-primary mb-4">12. Contact Information</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              For questions about these Terms & Conditions, contact us at:
            </p>
            <p class="ml-4 text-gray-700 text-lg">
              Email: support@cutm.ac.in<br>
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
export class TermsConditionsComponent {}
