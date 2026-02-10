import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService, Job } from '../../services/store.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold mb-2">Job & Placement Opportunities</h1>
          <p class="text-gray-600">Find your next career opportunity with top companies</p>
        </div>

        <div *ngIf="canManagePlacements()" class="bg-white rounded-lg shadow-md p-6 mb-8">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 class="text-xl font-bold">Placement Actions</h2>
              <p class="text-gray-600 text-sm">Add new jobs and internships for students.</p>
            </div>
            <div class="flex flex-wrap gap-3">
              <button
                (click)="openAddJobForm()"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Job
              </button>
              <button
                (click)="openAddInternshipForm()"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Internship
              </button>
            </div>
          </div>

          <div *ngIf="showAddJobForm" class="mt-6 border-t pt-6">
            <h3 class="text-lg font-semibold mb-4">New Job</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                [(ngModel)]="jobForm.title"
                placeholder="Job title"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                [(ngModel)]="jobForm.company"
                placeholder="Company name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                [(ngModel)]="jobForm.location"
                placeholder="Location"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <select
                [(ngModel)]="jobForm.type"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
              </select>
              <input
                type="text"
                [(ngModel)]="jobForm.stipend"
                placeholder="Stipend or salary"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="date"
                [(ngModel)]="jobForm.deadline"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <textarea
              [(ngModel)]="jobForm.requirements"
              placeholder="Requirements (comma-separated)"
              class="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg"
            ></textarea>
            <textarea
              [(ngModel)]="jobForm.description"
              placeholder="Short description"
              class="w-full mt-3 px-4 py-2 border border-gray-300 rounded-lg"
            ></textarea>
            <div class="mt-4 flex gap-3">
              <button (click)="saveJob()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Job
              </button>
              <button (click)="cancelAddJob()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                Cancel
              </button>
            </div>
          </div>

          <div *ngIf="showAddInternshipForm" class="mt-6 border-t pt-6">
            <h3 class="text-lg font-semibold mb-4">New Internship</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                [(ngModel)]="internshipForm.title"
                placeholder="Internship title"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                [(ngModel)]="internshipForm.company"
                placeholder="Company name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                [(ngModel)]="internshipForm.duration"
                placeholder="Duration (e.g., 3 months)"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                [(ngModel)]="internshipForm.stipend"
                placeholder="Stipend"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                [(ngModel)]="internshipForm.openings"
                placeholder="Openings"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="date"
                [(ngModel)]="internshipForm.deadline"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <textarea
              [(ngModel)]="internshipForm.skills"
              placeholder="Skills (comma-separated)"
              class="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg"
            ></textarea>
            <textarea
              [(ngModel)]="internshipForm.description"
              placeholder="Short description"
              class="w-full mt-3 px-4 py-2 border border-gray-300 rounded-lg"
            ></textarea>
            <div class="mt-4 flex gap-3">
              <button (click)="saveInternship()" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Save Internship
              </button>
              <button (click)="cancelAddInternship()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                Cancel
              </button>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="bg-white rounded-lg shadow-md mb-8 p-4">
          <div class="flex gap-4 border-b">
            <button
              (click)="activeTab = 'jobs'"
              [class.border-b-2]="activeTab === 'jobs'"
              [class.border-blue-600]="activeTab === 'jobs'"
              [class.text-blue-600]="activeTab === 'jobs'"
              class="px-4 py-2 font-medium transition"
            >
              All Jobs
            </button>
            <button
              (click)="activeTab = 'drives'"
              [class.border-b-2]="activeTab === 'drives'"
              [class.border-blue-600]="activeTab === 'drives'"
              [class.text-blue-600]="activeTab === 'drives'"
              class="px-4 py-2 font-medium transition"
            >
              On-Campus Drives
            </button>
            <button
              (click)="activeTab = 'offCampus'"
              [class.border-b-2]="activeTab === 'offCampus'"
              [class.border-blue-600]="activeTab === 'offCampus'"
              [class.text-blue-600]="activeTab === 'offCampus'"
              class="px-4 py-2 font-medium transition"
            >
              Off-Campus Drives
            </button>
            <button
              (click)="activeTab = 'myApplications'"
              [class.border-b-2]="activeTab === 'myApplications'"
              [class.border-blue-600]="activeTab === 'myApplications'"
              [class.text-blue-600]="activeTab === 'myApplications'"
              class="px-4 py-2 font-medium transition"
            >
              My Applications
            </button>
          </div>
        </div>

        <!-- Search & Filter (for Jobs Tab) -->
        <div *ngIf="activeTab === 'jobs'" class="bg-white rounded-lg shadow-md p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (input)="applyJobFilters()"
                placeholder="Search by job title or company..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
              <select
                [(ngModel)]="selectedJobType"
                (change)="applyJobFilters()"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                [(ngModel)]="selectedLocation"
                (input)="applyJobFilters()"
                placeholder="Enter location..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Jobs List -->
        <div *ngIf="activeTab === 'jobs'" class="space-y-4">
          <div
            *ngFor="let job of filteredJobs"
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
          >
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <!-- Left -->
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-gray-900">{{ job.title }}</h3>
                <p class="text-lg text-blue-600 font-semibold mt-1">{{ job.company }}</p>

                <!-- Requirements -->
                <div class="flex flex-wrap gap-2 mt-3">
                  <span
                    *ngFor="let req of job.requirements"
                    class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {{ req }}
                  </span>
                </div>

                <!-- Details -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                  <div>
                    <p class="text-gray-600">Location</p>
                    <p class="font-semibold">{{ job.location }}</p>
                  </div>
                  <div>
                    <p class="text-gray-600">Salary</p>
                    <p class="font-semibold text-green-600">{{ job.stipend }}</p>
                  </div>
                  <div>
                    <p class="text-gray-600">Type</p>
                    <p class="font-semibold">{{ job.type }}</p>
                  </div>
                  <div>
                    <p class="text-gray-600">Posted</p>
                    <p class="font-semibold">{{ job.postedDate }}</p>
                  </div>
                </div>

                <p class="text-gray-600 mt-3">{{ job.description }}</p>
              </div>

              <!-- Right -->
              <div class="w-full md:w-auto">
                <button
                  (click)="onApplyJob(job.id)"
                  class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          <div *ngIf="filteredJobs.length === 0" class="text-center py-12 bg-white rounded-lg shadow-md">
            <p class="text-gray-600 text-lg">No jobs found matching your criteria.</p>
          </div>
        </div>

        <!-- On-Campus Drives -->
        <div *ngIf="activeTab === 'drives'" class="space-y-4">
          <div
            *ngFor="let drive of drivesData"
            class="bg-white rounded-lg shadow-md p-6"
          >
            <h3 class="text-2xl font-bold text-gray-900">{{ drive.name }}</h3>
            <p class="text-gray-600 mt-2">Date: {{ drive.date }}</p>
            <p class="text-gray-600">Locations: {{ drive.locations.join(', ') }}</p>
            <p class="text-gray-600 mt-2">Salary: {{ drive.salary }}</p>

            <button
              (click)="onRegisterDrive(drive.id)"
              class="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Register for Drive
            </button>
          </div>
        </div>

        <!-- Off-Campus Drives -->
        <div *ngIf="activeTab === 'offCampus'" class="space-y-4">
          <div
            *ngFor="let drive of offCampusDrivesData"
            class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <h3 class="text-2xl font-bold text-gray-900">{{ drive.name }}</h3>
                  <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">OFF-CAMPUS</span>
                </div>
                <p class="text-gray-600 mt-2">📅 Date: {{ drive.date }}</p>
                <p class="text-gray-600">🏢 Company: {{ drive.company }}</p>
                <p class="text-gray-600">📍 Locations: {{ drive.locations.join(', ') }}</p>
                <p class="text-gray-600 mt-2">💰 Salary: {{ drive.salary }}</p>
                <p class="text-gray-600 mt-2">🎓 Eligibility: {{ drive.eligibility }}</p>
                <p class="text-gray-600 mt-2">📝 {{ drive.description }}</p>
              </div>
            </div>

            <div class="mt-4 flex gap-3">
              <button
                (click)="onRegisterOffCampusDrive(drive.id)"
                class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
              >
                Register Now
              </button>
              <button
                (click)="viewOffCampusDriveDetails(drive)"
                class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                View Details
              </button>
            </div>
          </div>

          <div *ngIf="offCampusDrivesData.length === 0" class="text-center py-12 bg-white rounded-lg shadow-md">
            <p class="text-gray-600 text-lg">No off-campus drives available at the moment.</p>
          </div>
        </div>

        <!-- My Applications -->
        <div *ngIf="activeTab === 'myApplications'" class="space-y-4">
          <div
            *ngFor="let app of myApplications"
            class="bg-white rounded-lg shadow-md p-6 border-l-4"
            [ngClass]="app.status === 'offer-received' ? 'border-green-500' : app.status === 'rejected' ? 'border-red-500' : app.status === 'shortlisted' ? 'border-blue-500' : 'border-gray-400'"
          >
            <h3 class="text-xl font-bold text-gray-900">{{ app.jobTitle }}</h3>
            <p class="text-gray-600">{{ app.company }}</p>

            <div class="mt-4 flex justify-between items-center">
              <div>
                <p class="text-sm text-gray-600">Status</p>
                <span
                  [ngClass]="getStatusClass(app.status)"
                  class="inline-block px-4 py-1 rounded-full text-sm font-semibold mt-1"
                >
                  {{ getStatusLabel(app.status) }}
                </span>
              </div>
              <p class="text-sm text-gray-600">Applied: {{ app.appliedDate }}</p>
            </div>

            <div *ngIf="app.status === 'offer-received'" class="mt-4 bg-green-50 border border-green-200 rounded p-4">
              <p class="text-green-800 font-semibold">🎉 Congratulations! You've received an offer.</p>
              <button (click)="downloadOfferLetter(app)" class="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Download Offer Letter
              </button>
            </div>
            
            <div *ngIf="app.status === 'shortlisted'" class="mt-4 bg-blue-50 border border-blue-200 rounded p-4">
              <p class="text-blue-800 font-semibold">✨ You've been shortlisted! Waiting for further updates.</p>
            </div>
            
            <div *ngIf="app.status === 'rejected'" class="mt-4 bg-red-50 border border-red-200 rounded p-4">
              <p class="text-red-800">Unfortunately, your application was not selected this time. Keep applying!</p>
            </div>
          </div>

          <div *ngIf="myApplications.length === 0" class="text-center py-12 bg-white rounded-lg shadow-md">
            <p class="text-gray-600 text-lg">You haven't applied to any jobs yet.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  searchQuery = '';
  selectedJobType = '';
  selectedLocation = '';
  activeTab: 'jobs' | 'drives' | 'offCampus' | 'myApplications' = 'jobs';
  showAddJobForm = false;
  showAddInternshipForm = false;
  jobForm = {
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    stipend: '',
    requirements: '',
    deadline: '',
    description: ''
  };
  internshipForm = {
    title: '',
    company: '',
    duration: '',
    stipend: '',
    openings: 1,
    deadline: '',
    skills: '',
    description: ''
  };
  
  drivesData = [
    {
      id: 'd1',
      name: 'TCS Campus Drive',
      date: '2026-02-20',
      locations: ['Bhubaneswar', 'Delhi', 'Bangalore'],
      salary: '₹4 - 6 LPA',
      roles: ['Software Engineer', 'System Engineer']
    },
    {
      id: 'd2',
      name: 'Infosys Recruitment Drive',
      date: '2026-02-25',
      locations: ['All Cities'],
      salary: '₹3.5 - 5 LPA',
      roles: ['Associate', 'Systems Engineer']
    },
    {
      id: 'd3',
      name: 'Accenture Campus Hiring',
      date: '2026-03-05',
      locations: ['Bhubaneswar', 'Pune'],
      salary: '₹5 - 7 LPA',
      roles: ['Associate Software Engineer']
    }
  ];

  offCampusDrivesData = [
    {
      id: 'oc1',
      name: 'Amazon Off-Campus Drive 2026',
      company: 'Amazon',
      date: '2026-02-28',
      locations: ['Bangalore', 'Hyderabad', 'Mumbai'],
      salary: '₹12 - 18 LPA',
      eligibility: '2023, 2024, 2025 pass-outs',
      description: 'Amazon is hiring for Software Development Engineer roles across multiple locations.',
      roles: ['SDE-1', 'SDE-2']
    },
    {
      id: 'oc2',
      name: 'Google Off-Campus Recruitment',
      company: 'Google',
      date: '2026-03-10',
      locations: ['Bangalore', 'Gurgaon'],
      salary: '₹18 - 25 LPA',
      eligibility: '2024, 2025 graduates with 70%+',
      description: 'Google is conducting off-campus hiring for Software Engineer and Associate Product Manager positions.',
      roles: ['Software Engineer', 'APM']
    },
    {
      id: 'oc3',
      name: 'Microsoft Off-Campus Drive',
      company: 'Microsoft',
      date: '2026-03-15',
      locations: ['Hyderabad', 'Bangalore', 'Noida'],
      salary: '₹15 - 22 LPA',
      eligibility: 'Fresh graduates and 1-2 years experience',
      description: 'Microsoft is hiring for various technical roles including Cloud Engineer, Full Stack Developer, and Data Scientist.',
      roles: ['Cloud Engineer', 'Full Stack Developer', 'Data Scientist']
    },
    {
      id: 'oc4',
      name: 'Flipkart Off-Campus Hiring',
      company: 'Flipkart',
      date: '2026-03-20',
      locations: ['Bangalore', 'Delhi NCR'],
      salary: '₹10 - 16 LPA',
      eligibility: '2024, 2025 batch with B.Tech/MCA',
      description: 'Flipkart is conducting off-campus drive for Software Development Engineer and Product roles.',
      roles: ['SDE', 'Product Manager']
    },
    {
      id: 'oc5',
      name: 'Goldman Sachs Off-Campus',
      company: 'Goldman Sachs',
      date: '2026-03-25',
      locations: ['Bangalore', 'Hyderabad'],
      salary: '₹20 - 30 LPA',
      eligibility: 'Top tier college graduates with 75%+',
      description: 'Goldman Sachs is hiring for Analyst and Associate positions in Engineering division.',
      roles: ['Analyst', 'Associate']
    }
  ];

  myApplications: Array<{
    id: string;
    jobTitle: string;
    company: string;
    status: 'submitted' | 'under-review' | 'shortlisted' | 'rejected' | 'offer-received';
    appliedDate: string;
  }> = [];

  constructor(
    private store: StoreService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.loadJobs();
    this.loadMyApplications();
  }

  loadJobs() {
    this.jobs = this.store.getJobsArray();
    this.filteredJobs = [...this.jobs];
  }

  loadMyApplications() {
    const currentUser = this.store.currentUser();
    if (currentUser) {
      const applications = this.store.getApplicationsByStudent(currentUser.email);
      this.myApplications = applications.map(app => ({
        id: app.id,
        jobTitle: app.jobTitle,
        company: app.company,
        status: app.status,
        appliedDate: app.appliedDate
      }));
    }
  }

  applyJobFilters() {
    let filtered = [...this.jobs];

    if (this.searchQuery) {
      filtered = filtered.filter(j =>
        j.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        j.company.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.selectedJobType) {
      filtered = filtered.filter(j => j.type === this.selectedJobType);
    }

    if (this.selectedLocation) {
      filtered = filtered.filter(j =>
        j.location.toLowerCase().includes(this.selectedLocation.toLowerCase())
      );
    }

    this.filteredJobs = filtered;
  }

  canManagePlacements(): boolean {
    const role = this.store.userRole();
    return role === 'admin' || role === 'recruiter';
  }

  openAddJobForm() {
    this.showAddJobForm = true;
    this.showAddInternshipForm = false;
  }

  openAddInternshipForm() {
    this.showAddInternshipForm = true;
    this.showAddJobForm = false;
  }

  cancelAddJob() {
    this.showAddJobForm = false;
    this.resetJobForm();
  }

  cancelAddInternship() {
    this.showAddInternshipForm = false;
    this.resetInternshipForm();
  }

  saveJob() {
    if (!this.jobForm.title || !this.jobForm.company || !this.jobForm.location || !this.jobForm.stipend) {
      alert('Please fill in title, company, location, and stipend.');
      return;
    }

    const requirements = this.jobForm.requirements
      ? this.jobForm.requirements.split(',').map(item => item.trim()).filter(Boolean)
      : [];

    this.store.addJob({
      id: `j-${Date.now()}`,
      title: this.jobForm.title,
      company: this.jobForm.company,
      location: this.jobForm.location,
      type: this.jobForm.type as 'Internship' | 'Full-time',
      stipend: this.jobForm.stipend,
      postedDate: 'Just now',
      requirements,
      applicationDeadline: this.jobForm.deadline || undefined,
      description: this.jobForm.description || undefined
    });

    this.loadJobs();
    this.applyJobFilters();
    this.resetJobForm();
    this.showAddJobForm = false;
    alert('Job added successfully.');
  }

  saveInternship() {
    if (!this.internshipForm.title || !this.internshipForm.company || !this.internshipForm.duration || !this.internshipForm.stipend) {
      alert('Please fill in title, company, duration, and stipend.');
      return;
    }

    const skills = this.internshipForm.skills
      ? this.internshipForm.skills.split(',').map(item => item.trim()).filter(Boolean)
      : [];

    this.store.addInternship({
      id: `i-${Date.now()}`,
      title: this.internshipForm.title,
      company: this.internshipForm.company,
      duration: this.internshipForm.duration,
      stipend: this.internshipForm.stipend,
      openings: Number(this.internshipForm.openings) || 1,
      deadline: this.internshipForm.deadline || undefined,
      skills: skills.length ? skills : undefined,
      description: this.internshipForm.description || undefined
    });

    this.resetInternshipForm();
    this.showAddInternshipForm = false;
    alert('Internship added successfully.');
  }

  resetJobForm() {
    this.jobForm = {
      title: '',
      company: '',
      location: '',
      type: 'Full-time',
      stipend: '',
      requirements: '',
      deadline: '',
      description: ''
    };
  }

  resetInternshipForm() {
    this.internshipForm = {
      title: '',
      company: '',
      duration: '',
      stipend: '',
      openings: 1,
      deadline: '',
      skills: '',
      description: ''
    };
  }

  onApplyJob(jobId: string) {
    const currentUser = this.store.currentUser();
    const job = this.store.getJobsArray().find(j => j.id === jobId);
    
    if (!currentUser || !job) {
      alert('Please login to apply for jobs');
      return;
    }

    const application = {
      id: `app-${Date.now()}`,
      jobId: jobId,
      jobTitle: job.title,
      company: job.company,
      applicantName: currentUser.name,
      applicantEmail: currentUser.email,
      status: 'submitted' as const,
      appliedDate: new Date().toISOString().split('T')[0]
    };

    this.store.submitApplication(application);
    alert(`✅ Successfully applied for ${job.title} at ${job.company}!\n\nWe'll notify you about the status.`);
  }

  onRegisterDrive(driveId: string) {
    this.api.registerForDrive(driveId).subscribe({
      next: () => alert('Successfully registered for drive!'),
      error: () => alert('Error registering for drive')
    });
  }

  onRegisterOffCampusDrive(driveId: string) {
    const drive = this.offCampusDrivesData.find(d => d.id === driveId);
    if (drive) {
      alert(`✅ Successfully registered for ${drive.name}!\n\nCompany: ${drive.company}\nDate: ${drive.date}\n\nYou will receive further instructions via email.`);
      // In real app, make API call
      // this.api.registerForOffCampusDrive(driveId).subscribe(...)
    }
  }

  viewOffCampusDriveDetails(drive: any) {
    const details = `
📋 Drive Details:
━━━━━━━━━━━━━━━━━━━━━━
🏢 Company: ${drive.company}
📅 Date: ${drive.date}
📍 Locations: ${drive.locations.join(', ')}
💰 Salary: ${drive.salary}
🎓 Eligibility: ${drive.eligibility}
👔 Roles: ${drive.roles.join(', ')}

📝 Description:
${drive.description}
━━━━━━━━━━━━━━━━━━━━━━
    `;
    alert(details);
  }

  downloadOfferLetter(application: any) {
    alert('Downloading offer letter for ' + application.jobTitle + ' from ' + application.company);
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'submitted': 'bg-gray-100 text-gray-800',
      'under-review': 'bg-yellow-100 text-yellow-800',
      'shortlisted': 'bg-blue-100 text-blue-800',
      'rejected': 'bg-red-100 text-red-800',
      'offer-received': 'bg-green-100 text-green-800'
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  }

  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      'submitted': 'Submitted',
      'under-review': 'Under Review',
      'shortlisted': 'Shortlisted',
      'rejected': 'Rejected',
      'offer-received': 'Offer Received'
    };
    return statusLabels[status] || status;
  }
}
