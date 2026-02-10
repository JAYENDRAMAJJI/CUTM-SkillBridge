import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../services/store.service';

interface TrainerCourse {
  id: number;
  title: string;
  category: string;
  duration: string;
  enrolledStudents: number;
  rating: number;
  status: string;
  videos?: string[];
  notes?: string[];
  quizQuestions?: { question: string; options: string[]; correctIndex: number }[];
}

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
                  <button (click)="startCreateCourse()" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium">
                    + Create Course
                  </button>
                </div>
                <div *ngIf="showCourseForm" class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 class="font-bold text-primary mb-3">{{ isEditing ? 'Edit Course' : 'Create Course' }}</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-semibold text-gray-600 mb-1">Title</label>
                      <input [(ngModel)]="courseForm.title" type="text" class="w-full px-3 py-2 border rounded-lg" placeholder="Course title" />
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-gray-600 mb-1">Category</label>
                      <input [(ngModel)]="courseForm.category" type="text" class="w-full px-3 py-2 border rounded-lg" placeholder="Category" />
                    </div>
                  </div>
                  <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-semibold text-gray-600 mb-1">Video Lectures</label>
                      <input type="file" multiple accept="video/*" (change)="onFileChange('videos', $event)" class="w-full text-sm" />
                      <div *ngIf="courseForm.videos.length" class="mt-2 text-xs text-gray-600">
                        {{ courseForm.videos.length }} video file(s) selected
                        <button type="button" (click)="clearFiles('videos')" class="ml-2 text-primary hover:text-primary-gold">Clear</button>
                        <div class="mt-1">Select again to add more files.</div>
                        <div class="mt-1 space-y-1">
                          <div *ngFor="let video of courseForm.videos">• {{ video }}</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-gray-600 mb-1">PDF Notes</label>
                      <input type="file" multiple accept="application/pdf" (change)="onFileChange('notes', $event)" class="w-full text-sm" />
                      <div *ngIf="courseForm.notes.length" class="mt-2 text-xs text-gray-600">
                        {{ courseForm.notes.length }} PDF file(s) selected
                        <button type="button" (click)="clearFiles('notes')" class="ml-2 text-primary hover:text-primary-gold">Clear</button>
                        <div class="mt-1">Select again to add more files.</div>
                        <div class="mt-1 space-y-1">
                          <div *ngFor="let note of courseForm.notes">• {{ note }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-4">
                    <div class="flex items-center justify-between mb-2">
                      <label class="block text-xs font-semibold text-gray-600">Quiz Questions</label>
                      <button type="button" (click)="addQuizQuestion($event)" class="text-xs text-primary font-semibold hover:text-primary-gold">+ Add Question</button>
                    </div>
                    <div class="space-y-3">
                      <div *ngFor="let quiz of courseForm.quizQuestions; let i = index" class="border border-gray-200 rounded-lg p-3">
                        <div class="flex gap-2 items-start">
                          <textarea [(ngModel)]="quiz.question" rows="2" class="flex-1 px-3 py-2 border rounded-lg" placeholder="Type your question"></textarea>
                          <button type="button" (click)="removeQuizQuestion(i)" class="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-xs">Remove</button>
                        </div>
                        <div class="mt-3 space-y-2">
                          <div *ngFor="let option of quiz.options; let oi = index" class="flex items-center gap-2">
                            <input
                              type="radio"
                              [name]="'correct-' + i"
                              [value]="oi"
                              [(ngModel)]="quiz.correctIndex"
                              class="mt-1"
                            />
                            <input
                              [(ngModel)]="quiz.options[oi]"
                              type="text"
                              class="flex-1 px-3 py-2 border rounded-lg"
                              placeholder="Answer option"
                            />
                            <button
                              type="button"
                              (click)="removeOption(i, oi)"
                              class="px-2 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-xs"
                            >
                              Remove
                            </button>
                          </div>
                          <button type="button" (click)="addOption(i)" class="text-xs text-primary font-semibold hover:text-primary-gold">+ Add Option</button>
                          <p class="text-xs text-gray-500">Select the correct answer with the radio button.</p>
                          <div class="mt-2">
                            <label class="block text-xs font-semibold text-gray-600 mb-1">Correct Answer</label>
                            <input
                              [value]="quiz.options[quiz.correctIndex] || ''"
                              type="text"
                              readonly
                              class="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-700"
                              placeholder="Select a correct answer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex gap-2 mt-4">
                    <button (click)="saveCourse()" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium">
                      {{ isEditing ? 'Save Changes' : 'Add Course' }}
                    </button>
                    <button (click)="cancelCourseForm()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">
                      Cancel
                    </button>
                  </div>
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
                    <button (click)="openManageCourse(course)" class="flex-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm font-medium">Manage</button>
                    <button (click)="startEditCourse(course)" class="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium">Edit</button>
                  </div>
                </div>
              </div>

              <div *ngIf="managedCourse" class="mt-6 bg-white border border-gray-200 rounded-lg p-5">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="font-bold text-primary">Manage: {{ managedCourse.title }}</h3>
                  <button (click)="closeManageCourse()" class="text-sm text-gray-500 hover:text-gray-700">Close</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-gray-600 mb-1">Title</label>
                    <input [(ngModel)]="manageForm.title" type="text" class="w-full px-3 py-2 border rounded-lg" placeholder="Course title" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-gray-600 mb-1">Category</label>
                    <input [(ngModel)]="manageForm.category" type="text" class="w-full px-3 py-2 border rounded-lg" placeholder="Category" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-gray-600 mb-1">Status</label>
                    <select [(ngModel)]="manageForm.status" class="w-full px-3 py-2 border rounded-lg">
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-gray-600 mb-1">Video Lectures</label>
                    <input type="file" multiple accept="video/*" (change)="onManageFileChange('videos', $event)" class="w-full text-sm" />
                    <div *ngIf="manageForm.videos.length" class="mt-2 text-xs text-gray-600">
                      {{ manageForm.videos.length }} video file(s) selected
                      <button type="button" (click)="clearManageFiles('videos')" class="ml-2 text-primary hover:text-primary-gold">Clear</button>
                      <div class="mt-1">Select again to add more files.</div>
                      <div class="mt-1 space-y-1">
                        <div *ngFor="let video of manageForm.videos">• {{ video }}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-gray-600 mb-1">PDF Notes</label>
                    <input type="file" multiple accept="application/pdf" (change)="onManageFileChange('notes', $event)" class="w-full text-sm" />
                    <div *ngIf="manageForm.notes.length" class="mt-2 text-xs text-gray-600">
                      {{ manageForm.notes.length }} PDF file(s) selected
                      <button type="button" (click)="clearManageFiles('notes')" class="ml-2 text-primary hover:text-primary-gold">Clear</button>
                      <div class="mt-1">Select again to add more files.</div>
                      <div class="mt-1 space-y-1">
                        <div *ngFor="let note of manageForm.notes">• {{ note }}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-4">
                  <div class="flex items-center justify-between mb-2">
                    <label class="block text-xs font-semibold text-gray-600">Quiz Questions</label>
                    <button type="button" (click)="addManageQuestion($event)" class="text-xs text-primary font-semibold hover:text-primary-gold">+ Add Question</button>
                  </div>
                  <div class="space-y-3">
                    <div *ngFor="let quiz of manageForm.quizQuestions; let i = index" class="border border-gray-200 rounded-lg p-3">
                      <div class="flex gap-2 items-start">
                        <textarea [(ngModel)]="quiz.question" rows="2" class="flex-1 px-3 py-2 border rounded-lg" placeholder="Type your question"></textarea>
                        <button type="button" (click)="removeManageQuestion(i)" class="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-xs">Remove</button>
                      </div>
                      <div class="mt-3 space-y-2">
                        <div *ngFor="let option of quiz.options; let oi = index" class="flex items-center gap-2">
                          <input
                            type="radio"
                            [name]="'manage-correct-' + i"
                            [value]="oi"
                            [(ngModel)]="quiz.correctIndex"
                            class="mt-1"
                          />
                          <input
                            [(ngModel)]="quiz.options[oi]"
                            type="text"
                            class="flex-1 px-3 py-2 border rounded-lg"
                            placeholder="Answer option"
                          />
                          <button
                            type="button"
                            (click)="removeManageOption(i, oi)"
                            class="px-2 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-xs"
                          >
                            Remove
                          </button>
                        </div>
                        <button type="button" (click)="addManageOption(i)" class="text-xs text-primary font-semibold hover:text-primary-gold">+ Add Option</button>
                        <p class="text-xs text-gray-500">Select the correct answer with the radio button.</p>
                        <div class="mt-2">
                          <label class="block text-xs font-semibold text-gray-600 mb-1">Correct Answer</label>
                          <input
                            [value]="quiz.options[quiz.correctIndex] || ''"
                            type="text"
                            readonly
                            class="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-700"
                            placeholder="Select a correct answer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex gap-2 mt-4">
                  <button (click)="applyManageChanges()" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium">Save Updates</button>
                  <button (click)="closeManageCourse()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">Cancel</button>
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

  showCourseForm = false;
  isEditing = false;
  editingCourseId: number | null = null;
  managedCourse: TrainerCourse | null = null;
  courseForm = this.getEmptyCourseForm();
  manageForm = this.getEmptyManageForm();

  stats = {
    totalCourses: 4,
    totalStudents: 156,
    avgRating: 4.7,
    pendingReviews: 12
  };

  courses: TrainerCourse[] = [
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

  constructor() {
    this.recalculateStats();
  }

  getEmptyCourseForm() {
    return {
      title: '',
      category: '',
      videos: [] as string[],
      notes: [] as string[],
      quizQuestions: [this.getEmptyQuestion()] as { question: string; options: string[]; correctIndex: number }[]
    };
  }

  getEmptyManageForm() {
    return {
      title: '',
      category: '',
      status: 'active',
      videos: [] as string[],
      notes: [] as string[],
      quizQuestions: [this.getEmptyQuestion()] as { question: string; options: string[]; correctIndex: number }[]
    };
  }

  startCreateCourse() {
    this.showCourseForm = true;
    this.isEditing = false;
    this.editingCourseId = null;
    this.courseForm = this.getEmptyCourseForm();
  }

  startEditCourse(course: any) {
    this.showCourseForm = true;
    this.isEditing = true;
    this.editingCourseId = course.id;
    this.courseForm = {
      title: course.title,
      category: course.category,
      videos: Array.isArray(course.videos) ? [...course.videos] : [],
      notes: Array.isArray(course.notes) ? [...course.notes] : [],
      quizQuestions: Array.isArray(course.quizQuestions) ? course.quizQuestions.map((quiz) => ({
        question: quiz.question || '',
        options: Array.isArray(quiz.options) && quiz.options.length ? [...quiz.options] : ['', ''],
        correctIndex: typeof quiz.correctIndex === 'number' ? quiz.correctIndex : 0
      })) : []
    };
    if (!this.courseForm.quizQuestions.length) {
      this.courseForm.quizQuestions = [this.getEmptyQuestion()];
    }
  }

  saveCourse() {
    if (!this.courseForm.title.trim()) {
      return;
    }

    if (this.isEditing && this.editingCourseId !== null) {
      this.courses = this.courses.map((course) =>
        course.id === this.editingCourseId
          ? {
              ...course,
              title: this.courseForm.title,
              category: this.courseForm.category,
              videos: [...this.courseForm.videos],
              notes: [...this.courseForm.notes],
              quizQuestions: [...this.courseForm.quizQuestions]
            }
          : course
      );
    } else {
      const nextId = this.courses.length ? Math.max(...this.courses.map((course) => course.id)) + 1 : 1;
      this.courses = [
        ...this.courses,
        {
          id: nextId,
          title: this.courseForm.title,
          category: this.courseForm.category,
          duration: 'Self-paced',
          enrolledStudents: 0,
          rating: 0,
          status: 'active',
          videos: [...this.courseForm.videos],
          notes: [...this.courseForm.notes],
          quizQuestions: [...this.courseForm.quizQuestions]
        }
      ];
    }

    this.showCourseForm = false;
    this.isEditing = false;
    this.editingCourseId = null;
    this.courseForm = this.getEmptyCourseForm();
    this.recalculateStats();
  }

  cancelCourseForm() {
    this.showCourseForm = false;
    this.isEditing = false;
    this.editingCourseId = null;
    this.courseForm = this.getEmptyCourseForm();
  }

  openManageCourse(course: any) {
    this.managedCourse = course;
    this.manageForm = {
      title: course.title,
      category: course.category,
      status: course.status,
      videos: Array.isArray(course.videos) ? [...course.videos] : [],
      notes: Array.isArray(course.notes) ? [...course.notes] : [],
      quizQuestions: Array.isArray(course.quizQuestions) ? course.quizQuestions.map((quiz) => ({
        question: quiz.question || '',
        options: Array.isArray(quiz.options) && quiz.options.length ? [...quiz.options] : ['', ''],
        correctIndex: typeof quiz.correctIndex === 'number' ? quiz.correctIndex : 0
      })) : [this.getEmptyQuestion()]
    };
  }

  closeManageCourse() {
    this.managedCourse = null;
    this.manageForm = this.getEmptyManageForm();
  }

  applyManageChanges() {
    if (!this.managedCourse) {
      return;
    }

    this.courses = this.courses.map((course) =>
      course.id === this.managedCourse.id
        ? {
            ...course,
            title: this.manageForm.title,
            category: this.manageForm.category,
            status: this.manageForm.status,
            videos: [...this.manageForm.videos],
            notes: [...this.manageForm.notes],
            quizQuestions: [...this.manageForm.quizQuestions]
          }
        : course
    );
    this.managedCourse = this.courses.find((course) => course.id === this.managedCourse.id) || null;
    this.recalculateStats();
  }

  onFileChange(type: 'videos' | 'notes', event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : [];
    const fileNames = files.map((file) => file.name);
    if (type === 'videos') {
      this.courseForm.videos = [...this.courseForm.videos, ...fileNames];
    } else {
      this.courseForm.notes = [...this.courseForm.notes, ...fileNames];
    }
    input.value = '';
  }

  clearFiles(type: 'videos' | 'notes') {
    if (type === 'videos') {
      this.courseForm.videos = [];
    } else {
      this.courseForm.notes = [];
    }
  }

  onManageFileChange(type: 'videos' | 'notes', event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : [];
    const fileNames = files.map((file) => file.name);
    if (type === 'videos') {
      this.manageForm.videos = [...this.manageForm.videos, ...fileNames];
    } else {
      this.manageForm.notes = [...this.manageForm.notes, ...fileNames];
    }
    input.value = '';
  }

  clearManageFiles(type: 'videos' | 'notes') {
    if (type === 'videos') {
      this.manageForm.videos = [];
    } else {
      this.manageForm.notes = [];
    }
  }

  addQuizQuestion(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    if (!Array.isArray(this.courseForm.quizQuestions)) {
      this.courseForm.quizQuestions = [];
    }
    this.courseForm.quizQuestions = [...this.courseForm.quizQuestions, this.getEmptyQuestion()];
  }

  removeQuizQuestion(index: number) {
    this.courseForm.quizQuestions = this.courseForm.quizQuestions.filter((_, i) => i !== index);
  }

  addManageQuestion(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    if (!Array.isArray(this.manageForm.quizQuestions)) {
      this.manageForm.quizQuestions = [];
    }
    this.manageForm.quizQuestions = [...this.manageForm.quizQuestions, this.getEmptyQuestion()];
  }

  removeManageQuestion(index: number) {
    this.manageForm.quizQuestions = this.manageForm.quizQuestions.filter((_, i) => i !== index);
  }

  getEmptyQuestion() {
    return { question: '', options: ['', ''], correctIndex: 0 };
  }

  addOption(questionIndex: number) {
    const question = this.courseForm.quizQuestions[questionIndex];
    if (!question) {
      return;
    }
    question.options = [...question.options, ''];
  }

  removeOption(questionIndex: number, optionIndex: number) {
    const question = this.courseForm.quizQuestions[questionIndex];
    if (!question || question.options.length <= 2) {
      return;
    }
    question.options = question.options.filter((_, i) => i !== optionIndex);
    if (question.correctIndex === optionIndex) {
      question.correctIndex = 0;
    } else if (question.correctIndex > optionIndex) {
      question.correctIndex -= 1;
    }
  }

  addManageOption(questionIndex: number) {
    const question = this.manageForm.quizQuestions[questionIndex];
    if (!question) {
      return;
    }
    question.options = [...question.options, ''];
  }

  removeManageOption(questionIndex: number, optionIndex: number) {
    const question = this.manageForm.quizQuestions[questionIndex];
    if (!question || question.options.length <= 2) {
      return;
    }
    question.options = question.options.filter((_, i) => i !== optionIndex);
    if (question.correctIndex === optionIndex) {
      question.correctIndex = 0;
    } else if (question.correctIndex > optionIndex) {
      question.correctIndex -= 1;
    }
  }

  recalculateStats() {
    const totalCourses = this.courses.length;
    const totalStudents = this.courses.reduce((sum, course) => sum + Number(course.enrolledStudents || 0), 0);
    const avgRating = totalCourses
      ? this.courses.reduce((sum, course) => sum + Number(course.rating || 0), 0) / totalCourses
      : 0;
    this.stats = {
      ...this.stats,
      totalCourses,
      totalStudents,
      avgRating: Number(avgRating.toFixed(1))
    };
  }
}
