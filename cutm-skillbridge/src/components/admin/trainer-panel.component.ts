import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-trainer-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="p-6 bg-secondary-bg min-h-screen">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold mb-2 text-primary">Trainer Management Panel</h1>
          <p class="text-gray-600">Manage your courses, students, and content</p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
            <h3 class="text-gray-600 text-sm font-medium">My Courses</h3>
            <p class="text-3xl font-bold mt-2 text-primary">{{ stats.totalCourses }}</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-gold">
            <h3 class="text-gray-600 text-sm font-medium">Total Students</h3>
            <p class="text-3xl font-bold mt-2 text-primary">{{ stats.totalStudents }}</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-accent-blue">
            <h3 class="text-gray-600 text-sm font-medium">Avg Rating</h3>
            <p class="text-3xl font-bold text-accent-blue mt-2">{{ stats.avgRating }}/5</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary-red">
            <h3 class="text-gray-600 text-sm font-medium">Pending Reviews</h3>
            <p class="text-3xl font-bold text-secondary-red mt-2">{{ stats.pendingReviews }}</p>
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
            <!-- Courses Management -->
            <ng-container *ngIf="activeTab === 'courses'">
              <div class="mb-6">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-2xl font-bold text-primary">My Courses</h2>
                  <button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium">
                    + Create Course
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div *ngFor="let course of courses" class="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow">
                  <div class="flex justify-between items-start mb-3">
                    <h3 class="font-bold text-primary">{{ course.title }}</h3>
                    <span [ngClass]="course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" 
                          class="px-2 py-1 rounded-full text-xs font-bold">
                      {{ course.status | titlecase }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 mb-4">{{ course.category }} • {{ course.duration }}</p>
                  <div class="flex justify-between text-xs text-gray-500 mb-4">
                    <span>👥 {{ course.enrolledStudents }} students</span>
                    <span>⭐ {{ course.rating }}/5</span>
                  </div>
                  <div class="flex gap-2">
                    <button class="flex-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm font-medium">Manage</button>
                    <button class="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium">Edit</button>
                  </div>
                </div>
              </div>
            </ng-container>

            <!-- Students Tab -->
            <ng-container *ngIf="activeTab === 'students'">
              <div class="mb-6">
                <h2 class="text-2xl font-bold text-primary mb-4">My Students</h2>
                <input
                  type="text"
                  placeholder="Search students..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="px-6 py-3 text-left font-semibold">Name</th>
                      <th class="px-6 py-3 text-left font-semibold">Course</th>
                      <th class="px-6 py-3 text-left font-semibold">Progress</th>
                      <th class="px-6 py-3 text-left font-semibold">Performance</th>
                      <th class="px-6 py-3 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let student of students" class="border-b hover:bg-gray-50">
                      <td class="px-6 py-4">{{ student.name }}</td>
                      <td class="px-6 py-4">{{ student.course }}</td>
                      <td class="px-6 py-4">
                        <div class="flex items-center gap-2">
                          <div class="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div class="bg-primary-gold h-2 rounded-full" [style.width.%]="student.progress"></div>
                          </div>
                          <span class="text-sm">{{ student.progress }}%</span>
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <span [ngClass]="student.performance >= 80 ? 'bg-green-100 text-green-800' : student.performance >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'" 
                              class="px-3 py-1 rounded-full text-sm font-medium">
                          {{ student.performance }}%
                        </span>
                      </td>
                      <td class="px-6 py-4">
                        <button class="text-primary hover:text-primary-gold font-medium">View Profile</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ng-container>

            <!-- Assignments Tab -->
            <ng-container *ngIf="activeTab === 'assignments'">
              <div class="mb-6">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-2xl font-bold text-primary">Assignments & Reviews</h2>
                  <button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium">
                    + Create Assignment
                  </button>
                </div>
              </div>

              <div class="space-y-4">
                <div *ngFor="let assignment of assignments" class="bg-white border border-gray-200 rounded-lg p-5">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="font-bold text-primary">{{ assignment.title }}</h3>
                      <p class="text-sm text-gray-600 mt-1">{{ assignment.course }} • Due: {{ assignment.dueDate }}</p>
                    </div>
                    <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
                      {{ assignment.pendingSubmissions }} Pending
                    </span>
                  </div>
                  <div class="flex gap-4 mt-4 text-sm text-gray-600">
                    <span>📄 {{ assignment.totalSubmissions }} Submitted</span>
                    <span>✅ {{ assignment.reviewed }} Reviewed</span>
                  </div>
                  <button class="mt-4 px-4 py-2 bg-primary-gold text-primary rounded-lg hover:bg-yellow-500 font-medium text-sm">
                    Review Submissions
                  </button>
                </div>
              </div>
            </ng-container>

            <!-- Analytics Tab -->
            <ng-container *ngIf="activeTab === 'analytics'">
              <div class="mb-6">
                <h2 class="text-2xl font-bold text-primary mb-4">Course Analytics</h2>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 class="font-bold text-gray-800 mb-4">Enrollment Trends</h3>
                  <div class="h-48 flex items-center justify-center bg-gray-50 rounded">
                    <p class="text-gray-500">Chart visualization would go here</p>
                  </div>
                </div>
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 class="font-bold text-gray-800 mb-4">Student Performance</h3>
                  <div class="h-48 flex items-center justify-center bg-gray-50 rounded">
                    <p class="text-gray-500">Chart visualization would go here</p>
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
export class TrainerPanelComponent {
  store = inject(StoreService);
  
  activeTab = 'courses';
  tabs = ['courses', 'students', 'assignments', 'analytics'];

  stats = {
    totalCourses: 4,
    totalStudents: 156,
    avgRating: 4.7,
    pendingReviews: 12
  };

  courses = [
    { id: 1, title: 'Full Stack Web Development', category: 'Web Dev', duration: '12 weeks', enrolledStudents: 45, rating: 4.8, status: 'active' },
    { id: 2, title: 'Python for Data Science', category: 'Data Science', duration: '10 weeks', enrolledStudents: 38, rating: 4.6, status: 'active' },
    { id: 3, title: 'Advanced React & Redux', category: 'Frontend', duration: '8 weeks', enrolledStudents: 32, rating: 4.9, status: 'active' },
    { id: 4, title: 'Database Design & SQL', category: 'Backend', duration: '6 weeks', enrolledStudents: 41, rating: 4.7, status: 'completed' }
  ];

  students = [
    { name: 'Rahul Sharma', course: 'Full Stack Web Dev', progress: 75, performance: 85 },
    { name: 'Priya Patel', course: 'Python for Data Science', progress: 60, performance: 78 },
    { name: 'Amit Kumar', course: 'Advanced React', progress: 45, performance: 72 },
    { name: 'Sneha Singh', course: 'Database Design', progress: 90, performance: 92 }
  ];

  assignments = [
    { id: 1, title: 'React Component Project', course: 'Full Stack Web Dev', dueDate: 'Oct 30', totalSubmissions: 40, reviewed: 28, pendingSubmissions: 12 },
    { id: 2, title: 'Data Analysis Case Study', course: 'Python for Data Science', dueDate: 'Nov 5', totalSubmissions: 35, reviewed: 30, pendingSubmissions: 5 },
    { id: 3, title: 'Redux Store Implementation', course: 'Advanced React', dueDate: 'Nov 10', totalSubmissions: 28, reviewed: 20, pendingSubmissions: 8 }
  ];
}
