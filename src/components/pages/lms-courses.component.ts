import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService, Course } from '../../services/store.service';

@Component({
  selector: 'app-lms-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-secondary-bg">
      <!-- Header Section -->
      <div class="bg-gradient-to-r from-primary to-primary/80 text-white py-12 px-6">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-4xl font-bold mb-3">📚 Learning Management System</h1>
          <p class="text-primary-gold/90 text-lg">Master new skills with our comprehensive courses</p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 py-12">
        <!-- Filters & Search Section -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Search Courses</label>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                placeholder="Search by course name..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Category</label>
              <select 
                [(ngModel)]="selectedCategory"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                <option value="">All Categories</option>
                <option value="Web Development">Web Development</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Backend">Backend</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-primary">
            <div class="text-sm text-gray-500 uppercase font-bold">Total Courses</div>
            <div class="text-3xl font-bold text-primary mt-2">{{ allCourses.length }}</div>
          </div>
          <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-primary-gold">
            <div class="text-sm text-gray-500 uppercase font-bold">Enrolled</div>
            <div class="text-3xl font-bold text-primary mt-2">{{ enrolledCourses.length }}</div>
          </div>
          <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-accent-blue">
            <div class="text-sm text-gray-500 uppercase font-bold">In Progress</div>
            <div class="text-3xl font-bold text-primary mt-2">{{ getInProgressCount() }}</div>
          </div>
          <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-secondary-red">
            <div class="text-sm text-gray-500 uppercase font-bold">Completed</div>
            <div class="text-3xl font-bold text-primary mt-2">{{ getCompletedCount() }}</div>
          </div>
        </div>

        <!-- Course Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (course of getFilteredCourses(); track course.id) {
            <div class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
              <div class="relative h-40 bg-gradient-to-br from-primary to-primary-gold">
                <img
                  [src]="course.thumbnail"
                  [alt]="course.title"
                  class="w-full h-full object-cover"
                />
                <div class="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold">
                  ✓ Enrolled
                </div>
                <div class="absolute bottom-3 left-3 px-3 py-1 bg-primary/80 text-white rounded-full text-xs font-bold">
                  {{ course.category || 'Course' }}
                </div>
              </div>

              <div class="p-5">
                <h3 class="font-bold text-primary text-lg mb-1">{{ course.title }}</h3>
                <p class="text-sm text-gray-600 mb-3">By {{ course.instructor }}</p>

                <div class="flex justify-between text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                  <span>📚 {{ course.totalLessons }} lessons</span>
                  <span>⏱️ {{ course.duration }}</span>
                </div>

                <div class="mb-4">
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-gray-600">Progress</span>
                    <span class="font-bold text-primary">{{ getProgress(course) }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-primary-gold h-2 rounded-full transition-all" [style.width.%]="getProgress(course)"></div>
                  </div>
                </div>

                <button
                  (click)="viewCourse(course)"
                  class="w-full px-4 py-2 bg-primary-gold text-primary rounded-lg hover:bg-yellow-500 transition font-bold text-sm">
                  Continue Learning
                </button>
              </div>
            </div>
          }
        </div>

        @if (getFilteredCourses().length === 0) {
          <div class="text-center py-12 bg-white rounded-lg">
            <p class="text-gray-500 text-lg">No enrolled courses yet</p>
            <button
              (click)="goToCourses()"
              class="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
              Browse Courses
            </button>
          </div>
        }
      </div>
    </div>
  `
})
export class LmsCoursesComponent implements OnInit {
  store = inject(StoreService);
  router = inject(Router);

  searchQuery = '';
  selectedCategory = '';
  enrolledCourses: Course[] = [];
  allCourses: Course[] = [];

  ngOnInit() {
    this.refreshCourses();
  }

  refreshCourses() {
    this.allCourses = this.store.getCoursesArray();
    this.enrolledCourses = this.store.getEnrolledCoursesArray();
  }

  getFilteredCourses() {
    return this.enrolledCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (course.description || '').toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = !this.selectedCategory || course.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  getProgress(course: Course): number {
    return course.progress || 0;
  }

  getInProgressCount(): number {
    return this.enrolledCourses.filter(c => (c.progress || 0) > 0 && (c.progress || 0) < 100).length;
  }

  getCompletedCount(): number {
    return this.enrolledCourses.filter(c => (c.progress || 0) === 100).length;
  }

  viewCourse(course: Course) {
    this.router.navigate(['/lms-course-detail', course.id]);
  }

  goToCourses() {
    this.router.navigate(['/courses']);
  }
}
