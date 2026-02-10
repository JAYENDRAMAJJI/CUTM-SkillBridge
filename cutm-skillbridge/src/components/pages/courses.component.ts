import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreService, Course } from '../../services/store.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <p class="text-gray-600">Learn new skills with our comprehensive course catalog</p>
        </div>

        <!-- Search & Filter -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Search Courses</label>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (input)="onSearch()"
                placeholder="Search by course name..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                [(ngModel)]="selectedCategory"
                (change)="onFilterChange()"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">All Categories</option>
                <option value="Web Development">Web Development</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Backend">Backend</option>
                <option value="Mobile">Mobile Development</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                [(ngModel)]="sortBy"
                (change)="onSortChange()"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="recent">Recently Added</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Courses Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div
            *ngFor="let course of filteredCourses"
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <!-- Course Image -->
            <div class="w-full h-40 bg-gradient-to-br from-blue-400 to-blue-600 relative">
              <img
                [src]="course.thumbnail"
                [alt]="course.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {{ course.category }}
              </div>
            </div>

            <!-- Course Info -->
            <div class="p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-2">{{ course.title }}</h3>
              <p class="text-sm text-gray-600 mb-4">by {{ course.instructor }}</p>

              <!-- Course Stats -->
              <div class="flex justify-between text-sm text-gray-600 mb-4">
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5M10.5 1.5v6h6M10.5 1.5a2.25 2.25 0 012.25 2.25v3.75h3.75"></path>
                  </svg>
                  {{ course.totalLessons }} Lessons
                </div>
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"></path>
                  </svg>
                  {{ course.enrollmentCount }} Students
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="mb-4" *ngIf="course.progress > 0">
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600">Progress</span>
                  <span class="text-blue-600 font-semibold">{{ course.progress }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-blue-600 h-2 rounded-full"
                    [style.width.%]="course.progress"
                  ></div>
                </div>
              </div>

              <!-- Duration -->
              <p class="text-sm text-gray-600 mb-4">⏱️ {{ course.duration }}</p>

              <!-- Button -->
              <button
                (click)="viewCourseDetail(course)"
                class="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                {{ course.progress > 0 ? 'Continue Learning' : 'View Course' }}
              </button>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div *ngIf="filteredCourses.length === 0" class="text-center py-12 bg-white rounded-lg shadow-md">
          <p class="text-gray-600 text-lg">No courses found matching your criteria.</p>
          <button
            (click)="resetFilters()"
            class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center gap-2" *ngIf="filteredCourses.length > 0">
          <button
            *ngFor="let page of [1,2,3,4,5]"
            [class.bg-blue-600]="currentPage === page"
            [class.text-white]="currentPage === page"
            [class.bg-white]="currentPage !== page"
            (click)="goToPage(page)"
            class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-50 transition"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  `
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchQuery = '';
  selectedCategory = '';
  sortBy = 'popular';
  currentPage = 1;

  constructor(
    private store: StoreService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courses = this.store.getCoursesArray();
    this.filteredCourses = [...this.courses];
  }

  onSearch() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  onSortChange() {
    this.applySorting();
  }

  applyFilters() {
    let filtered = [...this.courses];

    // Search filter
    if (this.searchQuery) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        c.instructor.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(c => c.category === this.selectedCategory);
    }

    this.filteredCourses = filtered;
    this.applySorting();
    this.currentPage = 1;
  }

  applySorting() {
    switch (this.sortBy) {
      case 'recent':
        this.filteredCourses.sort((a, b) => (b.id?.localeCompare(a.id) || 0));
        break;
      case 'trending':
        this.filteredCourses.sort((a, b) => (b.enrollmentCount || 0) - (a.enrollmentCount || 0));
        break;
      case 'popular':
      default:
        this.filteredCourses.sort((a, b) => (b.progress || 0) - (a.progress || 0));
    }
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.sortBy = 'popular';
    this.currentPage = 1;
    this.loadCourses();
  }

  goToPage(page: number) {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  viewCourseDetail(course: Course) {
    this.router.navigate(['/courses', course.id]);
  }
}
