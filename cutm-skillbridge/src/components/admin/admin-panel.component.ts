import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p class="text-gray-600">Manage platform, students, courses, and placements</p>
        </div>


        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-gray-600 text-sm font-medium">Total Students</h3>
            <p class="text-3xl font-bold mt-2">{{ stats.totalStudents || 0 }}</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-gray-600 text-sm font-medium">Active Courses</h3>
            <p class="text-3xl font-bold mt-2">{{ stats.activeCourses || 0 }}</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-gray-600 text-sm font-medium">Job Openings</h3>
            <p class="text-3xl font-bold mt-2">{{ stats.jobOpenings || 0 }}</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-gray-600 text-sm font-medium">Placement Rate</h3>
            <p class="text-3xl font-bold text-green-600 mt-2">{{ stats.placementRate || 0 }}%</p>
          </div>
        </div>

        <!-- Tabs -->
        <div class="bg-white rounded-lg shadow-md mb-8">
          <div class="flex border-b flex-wrap">
            <button
              *ngFor="let tab of tabs"
              (click)="activeTab = tab"
              [class.border-b-2]="activeTab === tab"
              [class.border-blue-600]="activeTab === tab"
              [class.text-blue-600]="activeTab === tab"
              class="px-6 py-4 font-medium transition"
            >
              {{ tab | titlecase }}
            </button>
          </div>

          <!-- Tab Content -->
          <div class="p-6">
            <!-- Students Management -->
            <ng-container *ngIf="activeTab === 'students'">
              <div class="mb-6">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-2xl font-bold">Manage Students</h2>
                  <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    + Add Student
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Search students..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="px-6 py-3 text-left font-semibold">Name</th>
                      <th class="px-6 py-3 text-left font-semibold">Email</th>
                      <th class="px-6 py-3 text-left font-semibold">Department</th>
                      <th class="px-6 py-3 text-left font-semibold">Placement</th>
                      <th class="px-6 py-3 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let student of students" class="border-b hover:bg-gray-50">
                      <td class="px-6 py-4">{{ student.name }}</td>
                      <td class="px-6 py-4">{{ student.email }}</td>
                      <td class="px-6 py-4">{{ student.department }}</td>
                      <td class="px-6 py-4">
                        <span [ngClass]="student.placed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="px-3 py-1 rounded-full text-sm">
                          {{ student.placed ? 'Placed' : 'Pending' }}
                        </span>
                      </td>
                      <td class="px-6 py-4">
                        <button class="text-blue-600 hover:underline mr-4">View</button>
                        <button class="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ng-container>


            <!-- Trainer Management -->
            <ng-container *ngIf="activeTab === 'trainers'">
              <div class="mb-6">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-2xl font-bold">Manage Trainers</h2>
                  <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    + Add Trainer
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Search trainers..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div *ngFor="let trainer of trainers" class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 class="font-bold text-lg mb-1">{{ trainer.name }}</h3>
                  <p class="text-sm text-gray-600 mb-2">{{ trainer.email }}</p>
                  <p class="text-sm text-gray-600 mb-4">Courses: {{ trainer.courses }}</p>
                  <div class="flex gap-2">
                    <button class="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">View</button>
                    <button class="flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600">Remove</button>
                  </div>
                </div>
              </div>
            </ng-container>

            <!-- Internship and Job Management -->
            <ng-container *ngIf="activeTab === 'internships-jobs'">
              <div class="mb-6">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-2xl font-bold">Manage Internships and Jobs</h2>
                  <div class="flex gap-2">
                    <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      + Add Internship
                    </button>
                    <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      + Add Job
                    </button>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 class="font-bold text-lg mb-2">Internship Approvals</h3>
                  <p class="text-sm text-gray-600 mb-4">Approve company-posted internships and monitor applications.</p>
                  <button class="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">View Internships</button>
                </div>
                <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 class="font-bold text-lg mb-2">Job Postings</h3>
                  <p class="text-sm text-gray-600 mb-4">Approve job postings and track offers received.</p>
                  <button class="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600">View Jobs</button>
                </div>
              </div>
            </ng-container>

            <!-- Certificate Management -->
            <ng-container *ngIf="activeTab === 'certificates'">
              <div class="mb-6">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-2xl font-bold">Manage Certificates</h2>
                  <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    + Approve Certificate
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Search certificates..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 class="font-bold text-lg mb-2">Certificate Verification</h3>
                  <p class="text-sm text-gray-600 mb-4">Verify authenticity and revoke misuse when required.</p>
                  <button class="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">Open Verification</button>
                </div>
                <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 class="font-bold text-lg mb-2">Issued Certificates</h3>
                  <p class="text-sm text-gray-600 mb-4">Track and manage issued certificates.</p>
                  <button class="px-4 py-2 bg-gray-700 text-white text-sm rounded hover:bg-gray-800">View Issued</button>
                </div>
              </div>
            </ng-container>

            <!-- Placements Management -->
            <ng-container *ngIf="activeTab === 'placements'">
              <div class="mb-6">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-2xl font-bold">Manage Placements</h2>
                  <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    + Add Placement Drive
                  </button>
                </div>
              </div>

              <div class="space-y-4">
                <div *ngFor="let placement of placements" class="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div class="flex justify-between items-start">
                    <div class="flex-1">
                      <h3 class="text-xl font-bold">{{ placement.company }}</h3>
                      <p class="text-gray-600 mt-1">{{ placement.date | date }}</p>
                      <p class="text-sm text-gray-600 mt-2">{{ placement.positions }} positions available</p>
                    </div>
                    <span [ngClass]="placement.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'" class="px-4 py-2 rounded-full text-sm font-semibold">
                      {{ placement.status | titlecase }}
                    </span>
                  </div>
                  <div class="mt-4 flex gap-2">
                    <button class="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">Edit</button>
                    <button class="px-4 py-2 bg-purple-500 text-white text-sm rounded hover:bg-purple-600">View Applications</button>
                  </div>
                </div>
              </div>
            </ng-container>

            <!-- Reports and Analytics -->
            <ng-container *ngIf="activeTab === 'reports'">
              <div class="space-y-6">
                <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
                  <h3 class="text-2xl font-bold mb-4">Placement Reports and Analytics</h3>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p class="text-blue-100">Course Completion Rate</p>
                      <p class="text-3xl font-bold mt-2">{{ analytics.courseCompletion || 0 }}%</p>
                    </div>
                    <div>
                      <p class="text-blue-100">Avg Course Rating</p>
                      <p class="text-3xl font-bold mt-2">{{ analytics.avgRating || 0 }}/5</p>
                    </div>
                    <div>
                      <p class="text-blue-100">Active Learners</p>
                      <p class="text-3xl font-bold mt-2">{{ analytics.activeLearners || 0 }}</p>
                    </div>
                    <div>
                      <p class="text-blue-100">Total Certifications</p>
                      <p class="text-3xl font-bold mt-2">{{ analytics.totalCerts || 0 }}</p>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="bg-white rounded-lg p-6 border border-gray-200">
                    <h4 class="font-bold text-lg mb-4">Enrollment by Department</h4>
                    <div class="space-y-2">
                      <div>
                        <div class="flex justify-between text-sm mb-1">
                          <span>Computer Science</span>
                          <span>45%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                          <div class="bg-blue-600 h-2 rounded-full" style="width: 45%"></div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm mb-1">
                          <span>Electronics</span>
                          <span>30%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                          <div class="bg-purple-600 h-2 rounded-full" style="width: 30%"></div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm mb-1">
                          <span>Mechanical</span>
                          <span>25%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                          <div class="bg-green-600 h-2 rounded-full" style="width: 25%"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="bg-white rounded-lg p-6 border border-gray-200">
                    <h4 class="font-bold text-lg mb-4">Top Performing Courses</h4>
                    <div class="space-y-3">
                      <div *ngFor="let course of topCourses" class="flex justify-between items-center">
                        <span class="text-sm">{{ course.title }}</span>
                        <span class="font-semibold">{{ course.enrollment }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminPanelComponent implements OnInit {
  activeTab = 'students';
  tabs = ['students', 'trainers', 'internships-jobs', 'certificates', 'placements', 'reports'];

  stats = {
    totalStudents: 342,
    activeCourses: 18,
    jobOpenings: 45,
    placementRate: 88
  };

  students = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@cutm.ac.in', department: 'CSE', placed: true },
    { id: 2, name: 'Priya Singh', email: 'priya@cutm.ac.in', department: 'ECE', placed: false },
    { id: 3, name: 'Amit Kumar', email: 'amit@cutm.ac.in', department: 'Mechanical', placed: true }
  ];

  trainers = [
    { id: 1, name: 'Dr. Ananya Das', email: 'ananya@cutm.ac.in', courses: 'Data Science & ML' },
    { id: 2, name: 'Mr. Ritesh Kumar', email: 'ritesh@cutm.ac.in', courses: 'Full Stack Development' },
    { id: 3, name: 'Ms. Sneha Patra', email: 'sneha@cutm.ac.in', courses: 'Cloud Computing' }
  ];

  placements = [
    { id: 1, company: 'TCS', date: new Date('2026-02-20'), positions: 10, status: 'completed' },
    { id: 2, company: 'Infosys', date: new Date('2026-02-25'), positions: 15, status: 'ongoing' },
    { id: 3, company: 'Accenture', date: new Date('2026-03-05'), positions: 8, status: 'scheduled' }
  ];

  analytics = {
    courseCompletion: 78,
    avgRating: 4.5,
    activeLearners: 245,
    totalCerts: 156
  };

  topCourses = [
    { title: 'Full Stack Development', enrollment: 245 },
    { title: 'Data Science & ML', enrollment: 189 },
    { title: 'Cloud Computing', enrollment: 167 }
  ];

  constructor(
    private store: StoreService,
    private api: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const tab = params.get('tab');
      if (tab && this.tabs.includes(tab)) {
        this.activeTab = tab;
      }
    });
  }
}
