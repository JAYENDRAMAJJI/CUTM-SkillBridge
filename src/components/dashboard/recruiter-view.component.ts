import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-recruiter-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-5 rounded-lg shadow-sm border-t-4 border-primary">
        <div class="text-2xl font-bold text-gray-800">{{ activeJobs }}</div>
        <div class="text-xs text-gray-500 uppercase font-bold mt-1">Active Jobs</div>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-t-4 border-primary-gold">
        <div class="text-2xl font-bold text-gray-800">{{ totalApplications }}</div>
        <div class="text-xs text-gray-500 uppercase font-bold mt-1">Applications</div>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-t-4 border-accent-blue">
        <div class="text-2xl font-bold text-gray-800">{{ shortlisted }}</div>
        <div class="text-xs text-gray-500 uppercase font-bold mt-1">Shortlisted</div>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-t-4 border-secondary-red">
        <div class="text-2xl font-bold text-gray-800">{{ hired }}</div>
        <div class="text-xs text-gray-500 uppercase font-bold mt-1">Hired (Month)</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content Area -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Posted Jobs Section -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100">
          <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 class="font-bold text-gray-800 font-serif">My Job Postings</h3>
            <button (click)="postNewJob()" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-medium">
              + Post New Job
            </button>
          </div>
          <div class="p-6 space-y-4">
            @for (job of myJobs; track job.id) {
              <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h4 class="font-bold text-primary">{{ job.title }}</h4>
                    <p class="text-xs text-gray-500 mt-1">{{ job.location }} • {{ job.type }}</p>
                  </div>
                  <span class="px-3 py-1 rounded-full text-xs font-bold"
                    [ngClass]="job.status === 'active' ? 'bg-green-100 text-green-800' : job.status === 'closed' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'">
                    {{ job.status | titlecase }}
                  </span>
                </div>
                <div class="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <div class="flex gap-4 text-xs text-gray-600">
                    <span>📄 {{ job.applications }} applications</span>
                    <span>👥 {{ job.shortlisted }} shortlisted</span>
                    <span>📅 Posted {{ job.postedDate }}</span>
                  </div>
                  <div class="flex gap-2">
                    <button (click)="viewJobDetails(job)" class="text-xs text-accent-blue hover:text-primary font-bold">View</button>
                    <button (click)="editJob(job)" class="text-xs text-primary-gold hover:text-primary font-bold">Edit</button>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Recent Applications -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100">
          <div class="px-6 py-4 border-b border-gray-100">
            <h3 class="font-bold text-gray-800 font-serif">Recent Applications</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 text-gray-500">
                <tr>
                  <th class="px-6 py-3 text-left font-medium">Candidate</th>
                  <th class="px-6 py-3 text-left font-medium">Position</th>
                  <th class="px-6 py-3 text-left font-medium">Skills</th>
                  <th class="px-6 py-3 text-left font-medium">Status</th>
                  <th class="px-6 py-3 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                @for (application of recentApplications; track application.id) {
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-3">
                      <div>
                        <div class="font-medium text-gray-800">{{ application.candidateName }}</div>
                        <div class="text-xs text-gray-500">{{ application.experience }}</div>
                      </div>
                    </td>
                    <td class="px-6 py-3">{{ application.position }}</td>
                    <td class="px-6 py-3">
                      <div class="flex flex-wrap gap-1">
                        @for (skill of application.skills.slice(0, 2); track skill) {
                          <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-[10px] font-medium">{{ skill }}</span>
                        }
                      </div>
                    </td>
                    <td class="px-6 py-3">
                      <span class="px-2 py-1 rounded-full text-xs font-bold"
                        [ngClass]="{
                          'bg-yellow-100 text-yellow-800': application.status === 'pending',
                          'bg-green-100 text-green-800': application.status === 'shortlisted',
                          'bg-red-100 text-red-800': application.status === 'rejected'
                        }">
                        {{ application.status | titlecase }}
                      </span>
                    </td>
                    <td class="px-6 py-3">
                      <button (click)="reviewApplication(application)" class="text-primary-gold hover:text-primary font-bold">Review</button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="space-y-6">
        <!-- Upcoming Interviews -->
        <div class="bg-primary text-white p-6 rounded-lg shadow-lg">
          <h3 class="font-bold font-serif mb-4 text-primary-gold">Upcoming Interviews</h3>
          <div class="space-y-4">
            @for (interview of upcomingInterviews; track interview.id) {
              <div class="pb-3 border-b border-primary-gold/20">
                <div class="flex justify-between items-start mb-2">
                  <div class="text-sm font-bold">{{ interview.candidateName }}</div>
                  <div class="text-xs text-gray-400">{{ interview.time }}</div>
                </div>
                <div class="text-xs text-gray-400">
                  {{ interview.position }} • {{ interview.mode }}
                </div>
              </div>
            }
          </div>
          <button (click)="scheduleInterview()" class="w-full mt-4 px-4 py-2 bg-primary-gold text-primary rounded-lg hover:bg-yellow-500 transition text-sm font-medium">
            Schedule Interview
          </button>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 class="font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <button 
              (click)="searchCandidates()"
              class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-colors group cursor-pointer">
              <span class="font-medium text-sm">Search Candidates</span>
              <span class="text-gray-400 group-hover:text-white">→</span>
            </button>
            <button 
              (click)="postJob()"
              class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-colors group cursor-pointer">
              <span class="font-medium text-sm">Post Job</span>
              <span class="text-gray-400 group-hover:text-white">→</span>
            </button>
            <button 
              (click)="viewAnalytics()"
              class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-colors group cursor-pointer">
              <span class="font-medium text-sm">View Analytics</span>
              <span class="text-gray-400 group-hover:text-white">→</span>
            </button>
            <button 
              (click)="messageCandidates()"
              class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-colors group cursor-pointer">
              <span class="font-medium text-sm">Message Candidates</span>
              <span class="text-gray-400 group-hover:text-white">→</span>
            </button>
          </div>
        </div>

        <!-- Hiring Pipeline -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 class="font-bold text-gray-800 mb-4">Hiring Pipeline</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center pb-2 border-b border-gray-100">
              <span class="text-sm text-gray-600">Applied</span>
              <span class="font-bold text-primary">{{ pipelineStats.applied }}</span>
            </div>
            <div class="flex justify-between items-center pb-2 border-b border-gray-100">
              <span class="text-sm text-gray-600">Screening</span>
              <span class="font-bold text-primary">{{ pipelineStats.screening }}</span>
            </div>
            <div class="flex justify-between items-center pb-2 border-b border-gray-100">
              <span class="text-sm text-gray-600">Interview</span>
              <span class="font-bold text-primary">{{ pipelineStats.interview }}</span>
            </div>
            <div class="flex justify-between items-center pb-2 border-b border-gray-100">
              <span class="text-sm text-gray-600">Offer</span>
              <span class="font-bold text-primary">{{ pipelineStats.offer }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Hired</span>
              <span class="font-bold text-green-600">{{ pipelineStats.hired }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RecruiterViewComponent {
  store = inject(StoreService);
  router = inject(Router);

  activeJobs = 8;
  totalApplications = 127;
  shortlisted = 23;
  hired = 5;

  myJobs = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      location: 'Bangalore',
      type: 'Full-time',
      status: 'active',
      applications: 45,
      shortlisted: 8,
      postedDate: '5 days ago'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      location: 'Remote',
      type: 'Full-time',
      status: 'active',
      applications: 38,
      shortlisted: 6,
      postedDate: '1 week ago'
    },
    {
      id: 3,
      title: 'Data Analyst Intern',
      location: 'Hyderabad',
      type: 'Internship',
      status: 'active',
      applications: 28,
      shortlisted: 5,
      postedDate: '3 days ago'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      location: 'Mumbai',
      type: 'Full-time',
      status: 'draft',
      applications: 0,
      shortlisted: 0,
      postedDate: 'Draft'
    }
  ];

  recentApplications = [
    {
      id: 1,
      candidateName: 'Rahul Sharma',
      experience: '3 years exp',
      position: 'Full Stack Developer',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      status: 'shortlisted'
    },
    {
      id: 2,
      candidateName: 'Priya Patel',
      experience: '2 years exp',
      position: 'Frontend Developer',
      skills: ['Vue.js', 'TypeScript', 'CSS', 'Figma'],
      status: 'pending'
    },
    {
      id: 3,
      candidateName: 'Amit Kumar',
      experience: 'Fresher',
      position: 'Data Analyst Intern',
      skills: ['Python', 'SQL', 'Excel', 'PowerBI'],
      status: 'shortlisted'
    },
    {
      id: 4,
      candidateName: 'Sneha Singh',
      experience: '4 years exp',
      position: 'DevOps Engineer',
      skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS'],
      status: 'pending'
    }
  ];

  upcomingInterviews = [
    {
      id: 1,
      candidateName: 'Rahul Sharma',
      position: 'Full Stack Dev',
      time: '2:00 PM',
      mode: 'Video Call'
    },
    {
      id: 2,
      candidateName: 'Priya Patel',
      position: 'Frontend Dev',
      time: '4:30 PM',
      mode: 'In-person'
    },
    {
      id: 3,
      candidateName: 'Amit Kumar',
      position: 'Data Analyst',
      time: 'Tomorrow 10 AM',
      mode: 'Video Call'
    }
  ];

  pipelineStats = {
    applied: 127,
    screening: 45,
    interview: 23,
    offer: 8,
    hired: 5
  };

  searchCandidates() {
    this.router.navigate(['/recruiter']);
    alert('Search Candidates feature - Opening candidate search');
  }

  postJob() {
    this.router.navigate(['/jobs']);
    alert('Post Job feature - Opening job posting form');
  }

  viewAnalytics() {
    this.router.navigate(['/recruiter']);
    alert('View Analytics feature - Showing recruitment analytics');
  }

  messageCandidates() {
    alert('Message Candidates feature - Opening messaging system');
  }

  postNewJob() {
    this.router.navigate(['/jobs'], { queryParams: { newJob: true } });
    alert('Post New Job feature - Opening job creation form');
  }

  viewJobDetails(job: any) {
    this.router.navigate(['/jobs'], { queryParams: { jobId: job.id } });
    alert('View job details: ' + job.title);
  }

  editJob(job: any) {
    this.router.navigate(['/jobs'], { queryParams: { edit: job.id } });
    alert('Edit job: ' + job.title);
  }

  reviewApplication(application: any) {
    this.router.navigate(['/recruiter'], { queryParams: { reviewId: application.id } });
    alert('Review application from ' + application.candidateName + ' for ' + application.position);
  }

  scheduleInterview() {
    this.router.navigate(['/recruiter'], { queryParams: { scheduleInterview: true } });
    alert('Schedule Interview feature - Opening interview scheduler');
  }
}
