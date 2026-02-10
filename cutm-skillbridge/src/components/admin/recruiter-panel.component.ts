import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService, Interview } from '../../services/store.service';

@Component({
  selector: 'app-recruiter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="p-6 bg-secondary-bg min-h-screen">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold mb-2 text-primary">Placement Cell Dashboard</h1>
          <p class="text-gray-600">Manage job postings, applications, and candidates</p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
            <h3 class="text-gray-600 text-sm font-medium">Active Jobs</h3>
            <p class="text-3xl font-bold mt-2 text-primary">{{ stats.activeJobs }}</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-gold">
            <h3 class="text-gray-600 text-sm font-medium">Applications</h3>
            <p class="text-3xl font-bold mt-2 text-primary">{{ stats.totalApplications }}</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-accent-blue">
            <h3 class="text-gray-600 text-sm font-medium">Shortlisted</h3>
            <p class="text-3xl font-bold text-accent-blue mt-2">{{ stats.shortlisted }}</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary-red">
            <h3 class="text-gray-600 text-sm font-medium">Hired (Month)</h3>
            <p class="text-3xl font-bold text-green-600 mt-2">{{ stats.hired }}</p>
          </div>
        </div>

        <!-- Tabs -->
        <div class="bg-white rounded-lg shadow-md mb-8">
          <div class="flex border-b overflow-x-auto">
            <button
              *ngFor="let tab of tabs"
              (click)="activeTab = tab"
              [class.border-b-2]="activeTab === tab"
              [class.border-primary]="activeTab === tab"
              [class.text-primary]="activeTab === tab"
              class="px-6 py-4 font-medium transition whitespace-nowrap"
            >
              {{ tab | titlecase }}
            </button>
          </div>

          <!-- Tab Content -->
          <div class="p-6">
            <!-- Jobs Management -->
            <ng-container *ngIf="activeTab === 'jobs'">
              <div class="mb-6">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-2xl font-bold text-primary">Job Postings</h2>
                  <button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium">
                    + Post New Job
                  </button>
                </div>
              </div>

              <div class="space-y-4">
                <div *ngFor="let job of jobs" class="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow">
                  <div class="flex justify-between items-start mb-3">
                    <div>
                      <h3 class="font-bold text-primary">{{ job.title }}</h3>
                      <p class="text-sm text-gray-600 mt-1">{{ job.location }} • {{ job.type }}</p>
                    </div>
                    <span [ngClass]="{
                      'bg-green-100 text-green-800': job.status === 'active',
                      'bg-gray-100 text-gray-800': job.status === 'closed',
                      'bg-yellow-100 text-yellow-800': job.status === 'draft'
                    }" class="px-3 py-1 rounded-full text-xs font-bold">
                      {{ job.status | titlecase }}
                    </span>
                  </div>
                  <div class="flex gap-4 text-sm text-gray-600 mb-4">
                    <span>💼 {{ job.applications }} applications</span>
                    <span>👥 {{ job.shortlisted }} shortlisted</span>
                    <span>📅 {{ job.postedDate }}</span>
                  </div>
                  <div class="flex gap-2">
                    <button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm font-medium">View Applications</button>
                    <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium">Edit</button>
                    <button class="px-4 py-2 bg-secondary-red text-white rounded-lg hover:bg-secondary-red/90 text-sm font-medium">Close</button>
                  </div>
                </div>
              </div>
            </ng-container>

            <!-- Applications Tab -->
            <ng-container *ngIf="activeTab === 'applications'">
              <div class="mb-6">
                <h2 class="text-2xl font-bold text-primary mb-4">Applications</h2>
                <div class="flex gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Search candidates..."
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                  <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="px-6 py-3 text-left font-semibold">Candidate</th>
                      <th class="px-6 py-3 text-left font-semibold">Position</th>
                      <th class="px-6 py-3 text-left font-semibold">Experience</th>
                      <th class="px-6 py-3 text-left font-semibold">Skills</th>
                      <th class="px-6 py-3 text-left font-semibold">Status</th>
                      <th class="px-6 py-3 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let application of applications" class="border-b hover:bg-gray-50">
                      <td class="px-6 py-4">
                        <div>
                          <div class="font-medium">{{ application.candidateName }}</div>
                          <div class="text-xs text-gray-500">{{ application.email }}</div>
                        </div>
                      </td>
                      <td class="px-6 py-4">{{ application.position }}</td>
                      <td class="px-6 py-4">{{ application.experience }}</td>
                      <td class="px-6 py-4">
                        <div class="flex flex-wrap gap-1">
                          <span *ngFor="let skill of application.skills.slice(0, 2)" 
                                class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            {{ skill }}
                          </span>
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <span [ngClass]="{
                          'bg-yellow-100 text-yellow-800': application.status === 'pending',
                          'bg-green-100 text-green-800': application.status === 'shortlisted',
                          'bg-red-100 text-red-800': application.status === 'rejected'
                        }" class="px-3 py-1 rounded-full text-sm font-medium">
                          {{ application.status | titlecase }}
                        </span>
                      </td>
                      <td class="px-6 py-4">
                        <button class="text-primary hover:text-primary-gold font-medium">Review</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ng-container>

            <!-- Interviews Tab -->
            <ng-container *ngIf="activeTab === 'interviews'">
              <div class="mb-6">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-2xl font-bold text-primary">Interviews</h2>
                  <button 
                    (click)="showScheduleInterviewModal = true" 
                    class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium">
                    + Schedule Interview
                  </button>
                </div>
              </div>

              <div class="space-y-4">
                <div *ngFor="let interview of getRecruiterInterviews()" class="bg-white border border-gray-200 rounded-lg p-5">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="font-bold text-primary">{{ interview.candidateName }}</h3>
                      <p class="text-sm text-gray-600 mt-1">Job ID: {{ interview.jobId }}</p>
                    </div>
                    <span [ngClass]="{
                      'bg-blue-100 text-blue-800': interview.status === 'scheduled',
                      'bg-green-100 text-green-800': interview.status === 'completed',
                      'bg-gray-100 text-gray-800': interview.status === 'cancelled',
                      'bg-yellow-100 text-yellow-800': interview.status === 'rescheduled'
                    }" class="px-3 py-1 rounded-full text-xs font-bold">
                      {{ interview.status | titlecase }}
                    </span>
                  </div>
                  <div class="flex gap-4 mt-4 text-sm text-gray-600">
                    <span>📅 {{ interview.date }}</span>
                    <span>🕐 {{ interview.time }}</span>
                    <span>💻 {{ interview.mode | titlecase }}</span>
                  </div>
                  @if (interview.meetingLink && interview.status === 'scheduled') {
                    <div class="mt-3">
                      <a [href]="interview.meetingLink" target="_blank" class="text-primary hover:text-primary-gold text-sm font-medium">
                        🔗 Join Meeting Link
                      </a>
                    </div>
                  }
                  @if (interview.status === 'scheduled') {
                    <div class="flex gap-2 mt-4">
                      <button (click)="updateInterviewStatus(interview.id, 'completed')" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">Mark Complete</button>
                      <button (click)="openRescheduleModal(interview)" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium">Reschedule</button>
                      <button (click)="updateInterviewStatus(interview.id, 'cancelled')" class="px-4 py-2 bg-secondary-red text-white rounded-lg hover:bg-secondary-red/90 text-sm font-medium">Cancel</button>
                    </div>
                  }
                  @if (interview.feedback && interview.status === 'completed') {
                    <div class="mt-3 p-3 bg-gray-50 rounded border border-gray-200">
                      <p class="text-sm text-gray-700"><strong>Feedback:</strong> {{ interview.feedback }}</p>
                    </div>
                  }
                </div>
                
                <div *ngIf="getRecruiterInterviews().length === 0" class="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <p class="text-gray-600">No interviews scheduled yet.</p>
                </div>
              </div>
            </ng-container>

            <!-- Candidates Tab -->
            <ng-container *ngIf="activeTab === 'candidates'">
              <div class="mb-6">
                <h2 class="text-2xl font-bold text-primary mb-4">Candidate Database</h2>
                <input
                  type="text"
                  placeholder="Search by name, skills, or experience..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div *ngFor="let candidate of candidatePool" class="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow">
                  <h3 class="font-bold text-primary">{{ candidate.name }}</h3>
                  <p class="text-sm text-gray-600 mt-1">{{ candidate.title }}</p>
                  <p class="text-xs text-gray-500 mt-2">{{ candidate.experience }} • {{ candidate.location }}</p>
                  <div class="flex flex-wrap gap-2 mt-3">
                    <span *ngFor="let skill of candidate.skills.slice(0, 3)" 
                          class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {{ skill }}
                    </span>
                  </div>
                  <button class="w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm font-medium">
                    View Profile
                  </button>
                </div>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RecruiterPanelComponent {
  store = inject(StoreService);
  
  activeTab = 'jobs';
  tabs = ['jobs', 'applications', 'interviews', 'candidates'];
  showScheduleInterviewModal = false;
  selectedInterviewForReschedule: any = null;

  stats = {
    activeJobs: 8,
    totalApplications: 127,
    shortlisted: 23,
    hired: 5
  };

  jobs = [
    { id: 1, title: 'Senior Full Stack Developer', location: 'Bangalore', type: 'Full-time', status: 'active', applications: 45, shortlisted: 8, postedDate: '5 days ago' },
    { id: 2, title: 'Frontend Developer', location: 'Remote', type: 'Full-time', status: 'active', applications: 38, shortlisted: 6, postedDate: '1 week ago' },
    { id: 3, title: 'Data Analyst Intern', location: 'Hyderabad', type: 'Internship', status: 'active', applications: 28, shortlisted: 5, postedDate: '3 days ago' },
    { id: 4, title: 'DevOps Engineer', location: 'Mumbai', type: 'Full-time', status: 'draft', applications: 0, shortlisted: 0, postedDate: 'Draft' }
  ];

  applications = [
    { id: 1, candidateName: 'Rahul Sharma', email: 'rahul@email.com', position: 'Full Stack Developer', experience: '3 years', skills: ['React', 'Node.js', 'MongoDB', 'AWS'], status: 'shortlisted' },
    { id: 2, candidateName: 'Priya Patel', email: 'priya@email.com', position: 'Frontend Developer', experience: '2 years', skills: ['Vue.js', 'TypeScript', 'CSS'], status: 'pending' },
    { id: 3, candidateName: 'Amit Kumar', email: 'amit@email.com', position: 'Data Analyst Intern', experience: 'Fresher', skills: ['Python', 'SQL', 'Excel'], status: 'shortlisted' },
    { id: 4, candidateName: 'Sneha Singh', email: 'sneha@email.com', position: 'DevOps Engineer', experience: '4 years', skills: ['Docker', 'Kubernetes', 'Jenkins'], status: 'pending' }
  ];

  candidatePool = [
    { name: 'John Doe', title: 'Full Stack Developer', experience: '5 years', location: 'Bangalore', skills: ['React', 'Node.js', 'Python', 'AWS'] },
    { name: 'Jane Smith', title: 'UI/UX Designer', experience: '3 years', location: 'Mumbai', skills: ['Figma', 'Adobe XD', 'HTML/CSS'] },
    { name: 'Robert Brown', title: 'Data Scientist', experience: '4 years', location: 'Pune', skills: ['Python', 'ML', 'TensorFlow', 'SQL'] }
  ];

  getRecruiterInterviews() {
    return this.store.interviews();
  }

  updateInterviewStatus(interviewId: string, status: Interview['status']) {
    this.store.updateInterviewStatus(interviewId, status);
  }

  openRescheduleModal(interview: any) {
    const newDate = prompt('Enter new date (YYYY-MM-DD):', interview.date);
    const newTime = prompt('Enter new time (HH:MM AM/PM):', interview.time);
    
    if (newDate && newTime) {
      this.store.rescheduleInterview(interview.id, newDate, newTime);
    }
  }
}
