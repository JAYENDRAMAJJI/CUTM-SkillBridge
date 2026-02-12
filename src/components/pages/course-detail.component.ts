import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StoreService, Course } from '../../services/store.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-gray-50 min-h-screen py-8">
      <div class="max-w-6xl mx-auto px-4">
        <!-- Back Button -->
        <button
          routerLink="/courses"
          class="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          ← Back to Courses
        </button>

        <!-- Course Header -->
        <div class="bg-white rounded-lg shadow-md p-8 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Left: Video/Image -->
            <div class="md:col-span-2">
              <div class="w-full aspect-video bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg overflow-hidden">
                <img
                  [src]="course?.thumbnail"
                  [alt]="course?.title"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>

            <!-- Right: Course Info -->
            <div class="space-y-4">
              <div class="bg-blue-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600">Instructor</p>
                <p class="text-lg font-semibold text-gray-900">{{ course?.instructor }}</p>
              </div>

              <div class="bg-blue-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600">Duration</p>
                <p class="text-lg font-semibold text-gray-900">{{ course?.duration }}</p>
              </div>

              <div class="bg-blue-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600">Students Enrolled</p>
                <p class="text-lg font-semibold text-gray-900">{{ course?.enrollmentCount }}</p>
              </div>

              <div class="bg-blue-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600">Category</p>
                <p class="text-lg font-semibold text-gray-900">{{ course?.category }}</p>
              </div>

              <button
                (click)="onEnroll()"
                [disabled]="isEnrolled"
                class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition"
              >
                {{ isEnrolled ? 'Already Enrolled' : 'Enroll Now' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Course Content -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="md:col-span-2 space-y-6">
            <!-- About Section -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-2xl font-bold mb-4">{{ course?.title }}</h2>
              <p class="text-gray-600 mb-4">
                {{ course?.description || 'Master the latest technologies and frameworks with this comprehensive course.' }}
              </p>
            </div>

            <!-- Progress Section (if enrolled) -->
            <div *ngIf="isEnrolled" class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-xl font-bold mb-4">Your Progress</h3>
              <div class="mb-4">
                <div class="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span class="font-semibold">{{ course?.progress }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div
                    class="bg-blue-600 h-3 rounded-full transition-all"
                    [style.width.%]="course?.progress"
                  ></div>
                </div>
              </div>
              <p class="text-sm text-gray-600">
                {{ course?.completedLessons }} of {{ course?.totalLessons }} lessons completed
              </p>
            </div>

            <!-- Lessons Section -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-xl font-bold mb-4">Course Content</h3>
              <div class="space-y-3">
                <div
                  *ngFor="let i of [1,2,3,4,5]"
                  class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                >
                  <div
                    *ngIf="i <= (course?.completedLessons || 0)"
                    class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white"
                  >
                    ✓
                  </div>
                  <div
                    *ngIf="i > (course?.completedLessons || 0)"
                    class="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600"
                  >
                    {{ i }}
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-gray-900">Lesson {{ i }}: Core Concepts</p>
                    <p class="text-sm text-gray-600">20 minutes</p>
                  </div>
                  <span class="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Video</span>
                </div>
              </div>
            </div>

            <!-- Requirements Section -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-xl font-bold mb-4">Requirements</h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Basic understanding of web technologies
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Familiarity with programming concepts
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Commitment to learn and practice
                </li>
              </ul>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Skills Card -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-bold mb-4">Skills You'll Learn</h3>
              <div class="space-y-2">
                <div class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  {{ course?.category }}
                </div>
                <div class="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  Hands-on Projects
                </div>
                <div class="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  Best Practices
                </div>
                <div class="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  Certification
                </div>
              </div>
            </div>

            <!-- Instructor Card -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-bold mb-4">About the Instructor</h3>
              <div class="text-center">
                <div class="w-16 h-16 mx-auto bg-blue-600 rounded-full mb-4"></div>
                <p class="font-semibold">{{ course?.instructor }}</p>
                <p class="text-sm text-gray-600 mt-2">Expert in software development with 15+ years of experience</p>
              </div>
            </div>

            <!-- FAQ Card -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-bold mb-4">FAQ</h3>
              <div class="space-y-3">
                <div>
                  <p class="font-medium text-sm text-gray-900">Can I access course materials offline?</p>
                  <p class="text-sm text-gray-600 mt-1">Yes, you can download materials for offline access.</p>
                </div>
                <div>
                  <p class="font-medium text-sm text-gray-900">Is there a certificate?</p>
                  <p class="text-sm text-gray-600 mt-1">Yes, upon completion you'll receive a verified certificate.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;
  isEnrolled = false;
  courseId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private store: StoreService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id');
      if (this.courseId) {
        this.loadCourse();
      }
    });
  }

  loadCourse() {
    const courses = this.store.getCoursesArray();
    this.course = courses.find(c => c.id === this.courseId);
    this.isEnrolled = this.courseId ? this.store.isCourseEnrolled(this.courseId) : false;
  }

  onEnroll() {
    if (this.courseId && !this.isEnrolled) {
      this.store.enrollCourse(this.courseId);
      this.isEnrolled = true;
      if (this.course) {
        this.course.progress = this.course.progress || 0;
        this.course.completedLessons = this.course.completedLessons || 0;
      }

      this.api.enrollCourse(this.courseId).subscribe({
        next: () => {},
        error: () => {}
      });
    }
  }
}
