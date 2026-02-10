import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-resume-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-6xl mx-auto p-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Form Section -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h1 class="text-3xl font-bold mb-6">Resume Builder</h1>

          <form [formGroup]="resumeForm" (ngSubmit)="onGenerateResume()" class="space-y-6">
            <!-- Personal Information -->
            <div class="border-b pb-6">
              <h2 class="text-xl font-semibold mb-4">Personal Information</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    formControlName="fullName"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    formControlName="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    formControlName="phone"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    formControlName="location"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
                <textarea
                  formControlName="summary"
                  rows="3"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Brief overview of your professional background"
                ></textarea>
              </div>
            </div>

            <!-- Education -->
            <div class="border-b pb-6">
              <h2 class="text-xl font-semibold mb-4">Education</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">School/College</label>
                  <input
                    type="text"
                    formControlName="education"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value="CUTM, Bhubaneswar"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                  <input
                    type="text"
                    formControlName="degree"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="B.Tech in Computer Science"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">CGPA</label>
                  <input
                    type="number"
                    formControlName="cgpa"
                    step="0.01"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                  <input
                    type="number"
                    formControlName="graduationYear"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <!-- Work Experience -->
            <div class="border-b pb-6">
              <h2 class="text-xl font-semibold mb-4">Work Experience</h2>
              <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                    <input
                      type="text"
                      formControlName="jobTitle"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      formControlName="company"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    formControlName="jobDescription"
                    rows="2"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Skills -->
            <div class="border-b pb-6">
              <h2 class="text-xl font-semibold mb-4">Skills</h2>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
                <textarea
                  formControlName="skills"
                  rows="2"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="JavaScript, React, Node.js, MongoDB, etc."
                ></textarea>
              </div>
            </div>

            <!-- Projects -->
            <div class="pb-6">
              <h2 class="text-xl font-semibold mb-4">Projects</h2>
              <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                    <input
                      type="text"
                      formControlName="projectTitle"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                    <input
                      type="text"
                      formControlName="projectTech"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    formControlName="projectDescription"
                    rows="2"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4">
              <button
                type="submit"
                class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Generate Resume (PDF)
              </button>
              <button
                type="button"
                (click)="onPreview()"
                class="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Preview
              </button>
            </div>
          </form>
        </div>

        <!-- Preview Section -->
        <div class="bg-white rounded-lg shadow-md p-8" [class.sticky]="true" [style.top.px]="20">
          <h2 class="text-2xl font-bold mb-6">Preview</h2>

          <div class="resume-preview text-sm">
            <!-- Header -->
            <div class="text-center border-b pb-4 mb-4">
              <h1 class="text-2xl font-bold">{{ resumeForm.get('fullName')?.value || 'Your Name' }}</h1>
              <p class="text-gray-600">
                {{ resumeForm.get('email')?.value }} | {{ resumeForm.get('phone')?.value }} | {{ resumeForm.get('location')?.value }}
              </p>
            </div>

            <!-- Summary -->
            <div *ngIf="resumeForm.get('summary')?.value" class="mb-4">
              <h3 class="font-bold text-lg mb-2">Professional Summary</h3>
              <p class="text-gray-700">{{ resumeForm.get('summary')?.value }}</p>
            </div>

            <!-- Education -->
            <div class="mb-4">
              <h3 class="font-bold text-lg mb-2">Education</h3>
              <div class="mb-2">
                <p class="font-semibold">{{ resumeForm.get('degree')?.value || 'B.Tech' }}</p>
                <p class="text-gray-600">{{ resumeForm.get('education')?.value || 'CUTM' }} | CGPA: {{ resumeForm.get('cgpa')?.value || '0' }}</p>
                <p class="text-gray-600">{{ resumeForm.get('graduationYear')?.value || 'Year' }}</p>
              </div>
            </div>

            <!-- Experience -->
            <div *ngIf="resumeForm.get('jobTitle')?.value" class="mb-4">
              <h3 class="font-bold text-lg mb-2">Experience</h3>
              <div>
                <p class="font-semibold">{{ resumeForm.get('jobTitle')?.value }}</p>
                <p class="text-gray-600">{{ resumeForm.get('company')?.value }}</p>
                <p class="text-gray-700">{{ resumeForm.get('jobDescription')?.value }}</p>
              </div>
            </div>

            <!-- Skills -->
            <div *ngIf="resumeForm.get('skills')?.value" class="mb-4">
              <h3 class="font-bold text-lg mb-2">Skills</h3>
              <p class="text-gray-700">{{ resumeForm.get('skills')?.value }}</p>
            </div>

            <!-- Projects -->
            <div *ngIf="resumeForm.get('projectTitle')?.value" class="mb-4">
              <h3 class="font-bold text-lg mb-2">Projects</h3>
              <div>
                <p class="font-semibold">{{ resumeForm.get('projectTitle')?.value }}</p>
                <p class="text-gray-600">{{ resumeForm.get('projectTech')?.value }}</p>
                <p class="text-gray-700">{{ resumeForm.get('projectDescription')?.value }}</p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="mt-8 flex gap-4 flex-wrap">
            <button 
              (click)="downloadPDF()"
              class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-bold transition flex items-center gap-2">
              📥 Download PDF
            </button>
            <button 
              (click)="saveResume()"
              class="px-6 py-3 bg-primary-gold text-primary rounded-lg hover:bg-yellow-400 font-bold transition flex items-center gap-2">
              💾 Save Resume
            </button>
            <button 
              (click)="onPreview()"
              class="px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-blue-700 font-bold transition flex items-center gap-2">
              👁️ Preview
            </button>
          </div>

          @if (successMessage) {
            <div class="mt-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
              ✅ {{ successMessage }}
            </div>
          }

          @if (errorMessage) {
            <div class="mt-4 p-4 bg-red-50 border-l-4 border-secondary-red text-secondary-red rounded">
              ❌ {{ errorMessage }}
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .resume-preview {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
    }
  `]
})
export class ResumeBuilderComponent implements OnInit {
  resumeForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private store: StoreService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadSavedResume();
  }

  initForm() {
    this.resumeForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      location: [''],
      summary: [''],
      education: ['CUTM, Bhubaneswar'],
      degree: [''],
      cgpa: [''],
      graduationYear: [''],
      jobTitle: [''],
      company: [''],
      jobDescription: [''],
      skills: [''],
      projectTitle: [''],
      projectTech: [''],
      projectDescription: ['']
    });
  }

  loadSavedResume() {
    const currentUser = this.store.currentUser();
    if (currentUser) {
      const savedResume = this.store.getResumeByStudent(currentUser.id);
      if (savedResume) {
        this.resumeForm.patchValue({
          fullName: savedResume.fullName,
          email: savedResume.email,
          phone: savedResume.phone,
          location: savedResume.location,
          summary: savedResume.summary
        });
      }
    }
  }

  downloadPDF() {
    if (!this.resumeForm.valid) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    const fullName = this.resumeForm.get('fullName')?.value || 'Resume';
    const filename = `${fullName.replace(/\s+/g, '-')}-Resume.pdf`;
    
    // Create a canvas element for PDF generation (simplified)
    const content = this.generatePDFContent();
    
    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);

    this.successMessage = `Resume downloaded as ${filename}`;
    setTimeout(() => this.successMessage = '', 3000);
  }

  saveResume() {
    if (!this.resumeForm.valid) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    const currentUser = this.store.currentUser();
    if (!currentUser) {
      this.errorMessage = 'Please login to save resume';
      return;
    }

    const resume = {
      id: `resume-${Date.now()}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      fullName: this.resumeForm.get('fullName')?.value,
      email: this.resumeForm.get('email')?.value,
      phone: this.resumeForm.get('phone')?.value,
      location: this.resumeForm.get('location')?.value,
      summary: this.resumeForm.get('summary')?.value,
      education: [{
        school: 'CUTM, Bhubaneswar',
        degree: this.resumeForm.get('degree')?.value || '',
        cgpa: parseFloat(this.resumeForm.get('cgpa')?.value) || 0,
        year: this.resumeForm.get('graduationYear')?.value || ''
      }],
      skills: this.resumeForm.get('skills')?.value?.split(',').map((s: string) => s.trim()) || [],
      experience: this.resumeForm.get('company')?.value ? [{
        company: this.resumeForm.get('company')?.value,
        role: this.resumeForm.get('jobTitle')?.value || '',
        duration: '',
        description: this.resumeForm.get('jobDescription')?.value || ''
      }] : [],
      projects: this.resumeForm.get('projectTitle')?.value ? [{
        name: this.resumeForm.get('projectTitle')?.value,
        description: this.resumeForm.get('projectDescription')?.value || '',
        techStack: this.resumeForm.get('projectTech')?.value?.split(',').map((t: string) => t.trim()) || [],
      }] : [],
      certifications: []
    };

    this.store.saveResume(resume);
    this.successMessage = 'Resume saved successfully!';
    setTimeout(() => this.successMessage = '', 3000);
  }

  private generatePDFContent(): string {
    const form = this.resumeForm.value;
    return `
${form.fullName}
${form.email} | ${form.phone} | ${form.location}

PROFESSIONAL SUMMARY
${form.summary || 'N/A'}

EDUCATION
${form.education}
${form.degree} (CGPA: ${form.cgpa})
Graduation: ${form.graduationYear}

EXPERIENCE
${form.company || 'N/A'}
${form.jobTitle || 'N/A'}
${form.jobDescription || 'N/A'}

SKILLS
${form.skills || 'N/A'}

PROJECTS
${form.projectTitle || 'N/A'}
Tech: ${form.projectTech || 'N/A'}
${form.projectDescription || 'N/A'}
    `.trim();
  }

  onGenerateResume() {
    this.downloadPDF();
  }

  onPreview() {
    // Scroll to preview
    const previewElement = document.querySelector('.resume-preview');
    previewElement?.scrollIntoView({ behavior: 'smooth' });
  }
}
