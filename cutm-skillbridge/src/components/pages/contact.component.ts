import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="flex-1 overflow-y-auto bg-white">
      <!-- Hero Section -->
      <div class="relative bg-primary overflow-hidden">
        <div class="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" class="w-full h-full object-cover opacity-20" alt="Contact Us">
          <div class="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80"></div>
        </div>
        
        <div class="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-4xl font-serif font-extrabold tracking-tight text-white sm:text-5xl mb-4">
            <span class="text-primary-gold">Contact</span> Us
          </h1>
          <p class="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            We'd love to hear from you! Get in touch with our team.
          </p>
        </div>
      </div>

      <div class="py-16 bg-secondary-bg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Contact Form -->
          <div class="bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-bold text-primary mb-6">Send us a Message</h2>
            <form (submit)="onSubmit($event)" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input 
                  type="text" 
                  [(ngModel)]="formData.name"
                  name="name"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="Your full name">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input 
                  type="email" 
                  [(ngModel)]="formData.email"
                  name="email"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="your.email@example.com">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  [(ngModel)]="formData.phone"
                  name="phone"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="+91-9876543210">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input 
                  type="text" 
                  [(ngModel)]="formData.subject"
                  name="subject"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="How can we help you?">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea 
                  [(ngModel)]="formData.message"
                  name="message"
                  required
                  rows="5"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="Tell us more about your inquiry..."></textarea>
              </div>

              <button 
                type="submit"
                class="w-full py-3 px-6 bg-primary text-white rounded-lg hover:bg-primary/90 font-bold transition">
                Send Message
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="space-y-6">
            <div class="bg-white rounded-lg shadow-md p-8">
              <h2 class="text-2xl font-bold text-primary mb-6">Get in Touch</h2>
              
              <div class="space-y-4">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900 mb-1">Address</h3>
                    <p class="text-gray-600">
                      Centurion University of Technology and Management (CUTM)<br>
                      Vizianagaram District<br>
                      Andhra Pradesh - 535003<br>
                      India
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900 mb-1">Email</h3>
                    <p class="text-gray-600">
                      General Inquiries: info@cutm.ac.in<br>
                      Placement Cell: careers@cutm.ac.in<br>
                      Support: support@cutm.ac.in
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900 mb-1">Phone</h3>
                    <p class="text-gray-600">
                      Main Office: +91-674-2462552<br>
                      Placement Cell: +91-9999999999<br>
                      Mon-Fri: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-primary to-primary-gold text-white rounded-lg shadow-md p-8">
              <h2 class="text-2xl font-bold mb-4">Office Hours</h2>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span class="font-bold">9:00 AM - 6:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span>Saturday:</span>
                  <span class="font-bold">10:00 AM - 2:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span>Sunday:</span>
                  <span class="font-bold">Closed</span>
                </div>
              </div>
            </div>
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
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  onSubmit(event: Event) {
    event.preventDefault();
    alert(`Thank you for contacting us, ${this.formData.name}!\n\nWe have received your message and will get back to you within 24-48 hours at ${this.formData.email}.\n\nSubject: ${this.formData.subject}`);
    this.formData = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }
}
