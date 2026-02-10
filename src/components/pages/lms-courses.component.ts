import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';

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
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <option value="web-development">Web Development</option>
                <option value="data-science">Data Science</option>
                <option value="mobile-dev">Mobile Development</option>
                <option value="cloud-computing">Cloud Computing</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Level</label>
              <select 
                [(ngModel)]="selectedLevel"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
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
              <!-- Course Image Header -->
              <div class="relative h-40 bg-gradient-to-br from-primary to-primary-gold flex items-center justify-center">
                <div class="text-white text-center">
                  <div class="text-5xl mb-2">{{ course.icon }}</div>
                  <div class="text-sm font-bold">{{ course.category }}</div>
                </div>
                @if (isEnrolled(course.id)) {
                  <div class="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold">
                    ✓ Enrolled
                  </div>
                }
              </div>

              <!-- Course Details -->
              <div class="p-5">
                <h3 class="font-bold text-primary text-lg mb-2">{{ course.title }}</h3>
                <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ course.description }}</p>

                <!-- Metadata -->
                <div class="flex justify-between text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                  <span>📚 {{ course.lessons }} lessons</span>
                  <span>⏱️ {{ course.duration }}</span>
                  <span>⭐ {{ course.rating }}/5</span>
                </div>

                <!-- Instructor & Level -->
                <div class="flex justify-between text-xs mb-4">
                  <span class="text-gray-600">By {{ course.instructor }}</span>
                  <span [ngClass]="{
                    'bg-green-100 text-green-800': course.level === 'beginner',
                    'bg-blue-100 text-blue-800': course.level === 'intermediate',
                    'bg-red-100 text-red-800': course.level === 'advanced'
                  }" class="px-2 py-1 rounded text-xs font-bold">
                    {{ course.level | titlecase }}
                  </span>
                </div>

                <!-- Progress Bar (if enrolled) -->
                @if (isEnrolled(course.id)) {
                  <div class="mb-4">
                    <div class="flex justify-between text-xs mb-1">
                      <span class="text-gray-600">Progress</span>
                      <span class="font-bold text-primary">{{ getProgress(course.id) }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-primary-gold h-2 rounded-full transition-all" [style.width.%]="getProgress(course.id)"></div>
                    </div>
                  </div>
                }

                <!-- Action Button -->
                @if (!isEnrolled(course.id)) {
                  <button
                    (click)="enrollCourse(course)"
                    class="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-bold text-sm">
                    Enroll Now
                  </button>
                }
                @if (isEnrolled(course.id)) {
                  <button
                    (click)="viewCourse(course)"
                    class="w-full px-4 py-2 bg-primary-gold text-primary rounded-lg hover:bg-yellow-500 transition font-bold text-sm">
                    Continue Learning
                  </button>
                }
              </div>
            </div>
          }
        </div>

        @if (getFilteredCourses().length === 0) {
          <div class="text-center py-12 bg-white rounded-lg">
            <p class="text-gray-500 text-lg">No courses found matching your criteria</p>
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
  selectedLevel = '';
  enrolledCourses: any[] = [];

  allCourses = [
    {
      id: 1,
      title: 'Full Stack Web Development with MERN',
      description: 'Learn to build complete web applications using MongoDB, Express, React, and Node.js',
      category: 'web-development',
      level: 'intermediate',
      icon: '🌐',
      lessons: 48,
      duration: '12 weeks',
      rating: 4.8,
      instructor: 'John Smith',
      progress: 0
    },
    {
      id: 2,
      title: 'Python for Data Science',
      description: 'Master data analysis and visualization with Python, Pandas, and Matplotlib',
      category: 'data-science',
      level: 'beginner',
      icon: '📊',
      lessons: 36,
      duration: '10 weeks',
      rating: 4.9,
      instructor: 'Dr. Sarah Johnson',
      progress: 0
    },
    {
      id: 3,
      title: 'Advanced React & Redux',
      description: 'Deep dive into React hooks, state management, and advanced patterns',
      category: 'web-development',
      level: 'advanced',
      icon: '⚛️',
      lessons: 28,
      duration: '8 weeks',
      rating: 4.7,
      instructor: 'Mike Chen',
      progress: 0
    },
    {
      id: 4,
      title: 'Mobile App Development with Flutter',
      description: 'Build beautiful native mobile apps for iOS and Android with Flutter',
      category: 'mobile-dev',
      level: 'intermediate',
      icon: '📱',
      lessons: 32,
      duration: '10 weeks',
      rating: 4.6,
      instructor: 'Emma Wilson',
      progress: 0
    },
    {
      id: 5,
      title: 'AWS Cloud Computing Fundamentals',
      description: 'Learn cloud computing basics and AWS services for scalable applications',
      category: 'cloud-computing',
      level: 'beginner',
      icon: '☁️',
      lessons: 24,
      duration: '6 weeks',
      rating: 4.5,
      instructor: 'David Brown',
      progress: 0
    },
    {
      id: 6,
      title: 'Machine Learning with TensorFlow',
      description: 'Build machine learning models using TensorFlow and Python',
      category: 'data-science',
      level: 'advanced',
      icon: '🤖',
      lessons: 42,
      duration: '14 weeks',
      rating: 4.8,
      instructor: 'Prof. Lisa Anderson',
      progress: 0
    }
  ];

  ngOnInit() {
    this.loadEnrolledCourses();
  }

  loadEnrolledCourses() {
    const stored = localStorage.getItem('enrolledCourses');
    if (stored) {
      try {
        const enrolledIds = JSON.parse(stored);
        this.enrolledCourses = this.allCourses
          .filter(c => enrolledIds.includes(c.id))
          .map(c => ({
            ...c,
            progress: this.getCourseProgress(c.id)
          }));
      } catch (error) {
        console.error('Error loading enrolled courses:', error);
        this.enrolledCourses = [];
      }
    }
  }

  getCourseProgress(courseId: number): number {
    // Check if course has completed lessons in localStorage
    const progressKey = `courseProgress_${courseId}`;
    const saved = localStorage.getItem(progressKey);
    if (saved) {
      try {
        const completedLessons = JSON.parse(saved);
        // Assuming average 3 lessons per course for demo
        const totalLessons = 3;
        return Math.round((completedLessons.length / totalLessons) * 100);
      } catch {
        return 0;
      }
    }
    return 0;
  }

  getFilteredCourses() {
    return this.allCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = !this.selectedCategory || course.category === this.selectedCategory;
      const matchesLevel = !this.selectedLevel || course.level === this.selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourses.some(c => c.id === courseId);
  }

  getProgress(courseId: number): number {
    const course = this.enrolledCourses.find(c => c.id === courseId);
    return course?.progress || 0;
  }

  getInProgressCount(): number {
    return this.enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length;
  }

  getCompletedCount(): number {
    return this.enrolledCourses.filter(c => c.progress === 100).length;
  }

  enrollCourse(course: any) {
    if (this.isEnrolled(course.id)) {
      alert('You are already enrolled in this course!');
      return;
    }
    
    const newCourse = { ...course, progress: 0, enrolledDate: new Date().toISOString() };
    this.enrolledCourses.push(newCourse);
    
    // Save to localStorage
    const enrolledIds = this.enrolledCourses.map(c => c.id);
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledIds));
    
    alert(`✅ Successfully enrolled in "${course.title}"!\n\nYou can now start learning. 🎓`);
  }

  viewCourse(course: any) {
    if (!this.isEnrolled(course.id)) {
      alert('Please enroll in this course first!');
      return;
    }
    this.router.navigate(['/lms-course-detail', course.id]);
  }
}
