import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex-1 overflow-y-auto bg-secondary-bg">
      <!-- Hero Section -->
      <div class="relative bg-primary overflow-hidden py-12">
        <div class="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" class="w-full h-full object-cover opacity-10" alt="Campus">
          <div class="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80"></div>
        </div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-4xl font-serif font-extrabold tracking-tight text-white sm:text-5xl mb-4">
            Student <span class="text-primary-gold">Profile</span>
          </h1>
          <p class="text-xl text-gray-300">Manage your academic and professional information</p>
        </div>
      </div>

      <div class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Profile Form -->
          <form [formGroup]="profileForm" (ngSubmit)="onSaveProfile()" class="space-y-6">
            
            <!-- Personal Information Section -->
            <div class="bg-white rounded-lg shadow-md p-8 border-l-4 border-primary-gold">
              <h2 class="text-2xl font-bold text-primary mb-6">Personal Information</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    formControlName="name"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    formControlName="email"
                    disabled
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    formControlName="phone"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    formControlName="dob"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    formControlName="gender"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    formControlName="address"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
              </div>
            </div>

            <!-- Academic Information Section -->
            <div class="bg-white rounded-lg shadow-md p-8 border-l-4 border-accent-blue">
              <h2 class="text-2xl font-bold text-primary mb-6">Academic Information</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    formControlName="department"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <select
                    formControlName="year"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Roll No</label>
                  <input
                    type="text"
                    formControlName="rollNo"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">CGPA</label>
                  <input
                    type="number"
                    formControlName="cgpa"
                    step="0.01"
                    min="0"
                    max="10"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
              </div>
            </div>

            <!-- Skills Section -->
            <div class="bg-white rounded-lg shadow-md p-8 border-l-4 border-secondary-red">
              <h2 class="text-2xl font-bold text-primary mb-6">Skills & Expertise</h2>
              <div class="grid grid-cols-1 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Technical Skills (comma-separated)</label>
                  <textarea
                    formControlName="skills"
                    rows="3"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="e.g., JavaScript, React, Node.js, MongoDB, Python"
                  ></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Professional Interests (comma-separated)</label>
                  <textarea
                    formControlName="interests"
                    rows="3"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="e.g., Web Development, AI/ML, Cloud Computing, Data Science"
                  ></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Languages Known (comma-separated)</label>
                  <input
                    type="text"
                    formControlName="languages"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="e.g., English, Hindi, Odia"
                  />
                </div>
              </div>
            </div>

            <!-- Professional Experience Section -->
            <div class="bg-white rounded-lg shadow-md p-8 border-l-4 border-primary-gold">
              <h2 class="text-2xl font-bold text-primary mb-6">Professional Experience</h2>
              <div class="grid grid-cols-1 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Previous Work Experience</label>
                  <textarea
                    formControlName="experience"
                    rows="3"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="Describe your previous internships or work experience"
                  ></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Achievements & Certifications</label>
                  <textarea
                    formControlName="achievements"
                    rows="3"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="List your achievements, awards, certifications, etc."
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Social Links Section -->
            <div class="bg-white rounded-lg shadow-md p-8 border-l-4 border-accent-blue">
              <h2 class="text-2xl font-bold text-primary mb-6">Social Links & Portfolio</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
                  <input
                    type="url"
                    formControlName="github"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                  <input
                    type="url"
                    formControlName="linkedin"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Portfolio Website</label>
                  <input
                    type="url"
                    formControlName="portfolio"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Twitter/X Handle</label>
                  <input
                    type="url"
                    formControlName="twitter"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="https://twitter.com/username"
                  />
                </div>
              </div>
            </div>

            <!-- Bio Section -->
            <div class="bg-white rounded-lg shadow-md p-8 border-l-4 border-secondary-red">
              <h2 class="text-2xl font-bold text-primary mb-6">About You</h2>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Professional Bio (max 500 characters)</label>
                <textarea
                  formControlName="bio"
                  rows="4"
                  maxlength="500"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="Write a brief bio about yourself, your goals, and what you're looking for..."
                ></textarea>
                <p class="text-sm text-gray-500 mt-2">{{ profileForm.get('bio')?.value?.length || 0 }}/500 characters</p>
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex gap-4 sticky bottom-0 bg-secondary-bg p-4 rounded-lg shadow-md">
              <button
                type="submit"
                [disabled]="loading()"
                class="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 font-bold transition"
              >
                {{ loading() ? 'Saving...' : 'Save Profile' }}
              </button>
              <button
                type="button"
                (click)="onCancel()"
                class="px-8 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-bold transition"
              >
                Cancel
              </button>
            </div>

            <!-- Success/Error Messages -->
            <div *ngIf="successMessage" class="bg-green-50 border-2 border-green-400 text-green-700 px-6 py-4 rounded-lg">
              ✓ {{ successMessage }}
            </div>
            <div *ngIf="error()" class="bg-red-50 border-2 border-red-400 text-red-700 px-6 py-4 rounded-lg">
              ✕ {{ error() }}
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class StudentProfileComponent implements OnInit {
  profileForm!: FormGroup;
  loading = this.store.loading;
  error = this.store.error;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private store: StoreService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadProfile();
  }

  initForm() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      phone: [''],
      dob: [''],
      gender: [''],
      address: [''],
      department: [''],
      year: [''],
      rollNo: [''],
      cgpa: [''],
      skills: [''],
      interests: [''],
      languages: [''],
      experience: [''],
      achievements: [''],
      github: [''],
      linkedin: [''],
      portfolio: [''],
      twitter: [''],
      bio: ['']
    });
  }

  loadProfile() {
    const user = this.store.currentUser();
    if (user) {
      this.profileForm.patchValue({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        department: user.dept || ''
      });
    }
  }

  onSaveProfile() {
    if (this.profileForm.valid) {
      this.store.setLoading(true);
      this.api.updateStudentProfile(this.profileForm.value).subscribe({
        next: (response) => {
          this.store.setLoading(false);
          this.successMessage = 'Profile updated successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          this.store.setLoading(false);
          this.store.setError('Failed to update profile');
        }
      });
    }
  }

  onCancel() {
    this.loadProfile();
    this.successMessage = '';
  }
}
