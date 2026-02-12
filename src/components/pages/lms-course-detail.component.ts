import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService, Course as StoreCourse } from '../../services/store.service';

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: number;
  notes: Array<{ id: number; title: string; content: string }>;
  quiz: Array<{ id: number; question: string; options: string[]; answer: string }>;
  resources: Array<{ id: number; name: string; size: string; dataUrl?: string }>;
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  rating: number;
  instructor: string;
  lessons: Lesson[];
}

@Component({
  selector: 'app-lms-course-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-secondary-bg p-6">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-6">
          <button (click)="goBack()" class="text-primary hover:underline mb-4 font-semibold">← Back to Courses</button>
          <div class="bg-white rounded-lg shadow p-6">
            <h1 class="text-3xl font-bold text-primary mb-2">{{ course.title }}</h1>
            <p class="text-gray-600 mb-4">{{ course.description }}</p>
            <div class="flex gap-4 text-sm">
              <span class="text-primary-gold">⭐ {{ course.rating }} Rating</span>
              <span class="text-accent-blue">👨‍🏫 {{ course.instructor }}</span>
              <span class="text-gray-600">⏱ {{ course.duration }} hours</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-6">
          <!-- Main Content -->
          <div class="col-span-2">
            <!-- Tabs -->
            <div class="bg-white rounded-lg shadow mb-6">
              <div class="flex border-b">
                <button (click)="activeTab = 'video'" 
                        [class.border-b-2]="activeTab === 'video'" 
                        [class.border-primary]="activeTab === 'video'"
                        [class.text-primary]="activeTab === 'video'"
                        class="px-6 py-3 font-semibold text-gray-600 hover:text-primary transition">
                  📹 Video Lecture
                </button>
                <button (click)="activeTab = 'notes'" 
                        [class.border-b-2]="activeTab === 'notes'" 
                        [class.border-primary]="activeTab === 'notes'"
                        [class.text-primary]="activeTab === 'notes'"
                        class="px-6 py-3 font-semibold text-gray-600 hover:text-primary transition">
                  📝 Notes
                </button>
                <button (click)="activeTab = 'quiz'" 
                        [class.border-b-2]="activeTab === 'quiz'" 
                        [class.border-primary]="activeTab === 'quiz'"
                        [class.text-primary]="activeTab === 'quiz'"
                        class="px-6 py-3 font-semibold text-gray-600 hover:text-primary transition">
                  ❓ Quiz
                </button>
                <button (click)="activeTab = 'resources'" 
                        [class.border-b-2]="activeTab === 'resources'" 
                        [class.border-primary]="activeTab === 'resources'"
                        [class.text-primary]="activeTab === 'resources'"
                        class="px-6 py-3 font-semibold text-gray-600 hover:text-primary transition">
                  📚 Resources
                </button>
              </div>

              <!-- Video Lecture Tab -->
              @if (activeTab === 'video') {
                <div class="p-6">
                  <div class="bg-gray-900 rounded-lg aspect-video flex items-center justify-center mb-4 relative group overflow-hidden">
                    @if (currentLesson.resources?.[0]?.dataUrl) {
                      <!-- Video Player with actual video -->
                      <video 
                        [src]="currentLesson.resources[0].dataUrl" 
                        controls 
                        class="w-full h-full"
                        style="background: #000;">
                      </video>
                    } @else {
                      <!-- Fallback placeholder -->
                      <div class="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                        <button (click)="playVideo()" 
                                class="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl transform transition hover:scale-110 active:scale-95">
                          <svg class="w-12 h-12 text-primary ml-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </button>
                      </div>
                      <div class="absolute bottom-4 left-4 text-white">
                        <p class="text-sm font-semibold">{{ currentLesson.title }}</p>
                        <p class="text-xs text-gray-300">Duration: {{ currentLesson.duration }} minutes</p>
                      </div>
                    }
                  </div>
                  <h3 class="text-xl font-bold text-primary mb-2">{{ currentLesson.title }}</h3>
                  <p class="text-gray-600 mb-4">{{ currentLesson.description }}</p>
                  <p class="text-sm text-gray-500 mb-4">⏱ Duration: {{ currentLesson.duration }} minutes</p>
                  <button (click)="markLessonComplete()" 
                          class="bg-primary-gold text-white px-6 py-2 rounded hover:bg-opacity-90 transition">
                    ✓ Mark as Complete
                  </button>
                </div>
              }

              <!-- Notes Tab -->
              @if (activeTab === 'notes') {
                <div class="p-6 space-y-4">
                  @for (note of currentLesson.notes; track note.id) {
                    <div class="border border-gray-200 rounded-lg p-4">
                      <div class="flex justify-between items-start mb-2">
                        <h4 class="font-semibold text-primary">{{ note.title }}</h4>
                        <button (click)="downloadNote(note)" class="text-primary-gold hover:underline text-sm">
                          📥 Download PDF
                        </button>
                      </div>
                      <p class="text-gray-600 text-sm">{{ note.content }}</p>
                    </div>
                  }
                </div>
              }

              <!-- Quiz Tab -->
              @if (activeTab === 'quiz') {
                <div class="p-6">
                  @if (!quizSubmitted) {
                    <div class="space-y-4">
                      @for (question of currentLesson.quiz; track question.id) {
                        <div class="border border-gray-200 rounded-lg p-4">
                          <p class="font-semibold text-primary mb-3">{{ question.question }}</p>
                          <div class="space-y-2">
                            @for (option of question.options; track option) {
                              <label class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                                <input type="radio" 
                                       [name]="'question-' + question.id" 
                                       [value]="option"
                                       [(ngModel)]="quizAnswers[question.id]"
                                       class="cursor-pointer">
                                <span class="text-gray-700">{{ option }}</span>
                              </label>
                            }
                          </div>
                        </div>
                      }
                      <button (click)="submitQuiz()" 
                              class="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition w-full">
                        Submit Quiz
                      </button>
                    </div>
                  } @else {
                    <div class="text-center p-6 bg-blue-50 rounded-lg">
                      <h3 class="text-2xl font-bold text-primary mb-2">Quiz Results</h3>
                      <p class="text-4xl font-bold text-primary-gold mb-2">{{ quizScore }}%</p>
                      @if (quizScore >= 70) {
                        <p class="text-green-600 font-semibold mb-4">✓ Passed! Great job!</p>
                      } @else {
                        <p class="text-secondary-red font-semibold mb-4">Try Again</p>
                      }
                      <button (click)="resetQuiz()" 
                              class="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition">
                        Retake Quiz
                      </button>
                    </div>
                  }
                </div>
              }

              <!-- Resources Tab -->
              @if (activeTab === 'resources') {
                <div class="p-6 space-y-3">
                  @for (resource of currentLesson.resources; track resource.id) {
                    <div class="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div class="flex items-center gap-3">
                        <span class="text-2xl">📄</span>
                        <div>
                          <p class="font-semibold text-gray-700">{{ resource.name }}</p>
                          <p class="text-sm text-gray-500">{{ resource.size }}</p>
                        </div>
                      </div>
                      <button (click)="downloadResource(resource)" class="text-primary-gold hover:underline font-semibold">
                        ⬇ Download
                      </button>
                    </div>
                  }
                </div>
              }
            </div>
          </div>

          <!-- Sidebar -->
          <div class="col-span-1">
            <!-- Progress Card -->
            <div class="bg-white rounded-lg shadow p-6 mb-6 sticky top-6">
              <h3 class="text-lg font-bold text-primary mb-4">📊 Progress</h3>
              <div class="mb-4">
                <div class="flex justify-between mb-2">
                  <span class="text-gray-600">Overall</span>
                  <span class="font-bold text-primary">{{ getProgress() }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div class="bg-primary-gold h-3 rounded-full transition-all" [style.width.%]="getProgress()"></div>
                </div>
              </div>

              <div class="text-sm text-gray-600">
                <p>{{ getCompletedLessons() }} of 3 lessons completed</p>
                @if (getProgress() === 100) {
                  <p class="mt-2 text-green-600">✓ Course Completed!</p>
                } @else {
                  <p class="mt-2 text-gray-600">{{ 100 - getProgress() }}% remaining</p>
                }
              </div>
            </div>

            <!-- Lessons List -->
            <div class="bg-white rounded-lg shadow p-6 sticky top-80">
              <h3 class="text-lg font-bold text-primary mb-4">📚 Lessons</h3>
              <div class="space-y-2">
                @for (lesson of course.lessons; track lesson.id) {
                  <button (click)="selectLesson(lesson)"
                          [class.bg-primary]="currentLesson.id === lesson.id"
                          [class.text-white]="currentLesson.id === lesson.id"
                          [class.text-primary]="currentLesson.id !== lesson.id"
                          class="w-full text-left p-3 rounded border border-gray-200 hover:bg-gray-50 transition">
                    <div class="flex items-center justify-between">
                      <span class="font-semibold">{{ lesson.title }}</span>
                      @if (isLessonCompleted(lesson.id)) {
                        <span class="text-green-600">✓</span>
                      }
                    </div>
                  </button>
                }
              </div>
            </div>

            <!-- Instructor Card -->
            <div class="bg-white rounded-lg shadow p-6 mt-6 sticky top-96">
              <h3 class="text-lg font-bold text-primary mb-4">👨‍🏫 Instructor</h3>
              <div class="text-center">
                <div class="w-16 h-16 bg-primary-gold rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                  {{ (course.instructor || 'I').charAt(0) }}
                </div>
                <p class="font-semibold text-gray-700">{{ course.instructor || 'Instructor' }}</p>
                <button class="mt-4 w-full bg-primary text-white py-2 rounded hover:bg-opacity-90 transition">
                  💬 Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LmsCourtDetailComponent implements OnInit {
  course: Course = this.getDefaultCourse('default');
  courseId = 'default';

  currentLesson: Lesson = this.course.lessons[0];
  activeTab: 'video' | 'notes' | 'quiz' | 'resources' = 'video';
  
  quizSubmitted = false;
  quizScore = 0;
  quizAnswers: { [key: number]: string } = {};
  
  completedLessons: Set<number> = new Set();
  
  // Video player state
  isVideoPlaying = false;
  videoProgress = 0;
  currentTime = 0;
  private videoInterval: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: StoreService
  ) {}

  ngOnInit() {
    // Get courseId from route params
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.courseId = params['id'];
        this.loadCourseFromStore();
        this.restoreProgress();
      }
    });
    if (!this.courseId) {
      this.restoreProgress();
    }
  }

  ngOnDestroy() {
    if (this.videoInterval) {
      clearInterval(this.videoInterval);
    }
  }

  playVideo() {
    this.isVideoPlaying = true;
    this.currentTime = 0;
    this.videoProgress = 0;
    
    // Simulate video progress
    this.videoInterval = setInterval(() => {
      if (this.currentTime < this.currentLesson.duration * 60) {
        this.currentTime += 1;
        this.videoProgress = (this.currentTime / (this.currentLesson.duration * 60)) * 100;
      } else {
        this.pauseVideo();
        this.markLessonComplete();
      }
    }, 1000);
  }

  pauseVideo() {
    this.isVideoPlaying = false;
    if (this.videoInterval) {
      clearInterval(this.videoInterval);
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  selectLesson(lesson: Lesson) {
    this.currentLesson = lesson;
    this.activeTab = 'video';
    this.quizSubmitted = false;
    this.pauseVideo();
    this.videoProgress = 0;
    this.currentTime = 0;
  }

  markLessonComplete() {
    this.completedLessons.add(this.currentLesson.id);
    this.saveProgress();
    alert('Lesson marked as complete!');
  }

  submitQuiz() {
    let correct = 0;
    for (const question of this.currentLesson.quiz) {
      if (this.quizAnswers[question.id] === question.answer) {
        correct++;
      }
    }
    this.quizScore = Math.round((correct / this.currentLesson.quiz.length) * 100);
    this.quizSubmitted = true;

    if (this.quizScore >= 70) {
      this.markLessonComplete();
    }
  }

  resetQuiz() {
    this.quizAnswers = {};
    this.quizSubmitted = false;
    this.quizScore = 0;
  }

  downloadNote(note: { id: number; title: string; content: string }) {
    alert(`Downloading: ${note.title}`);
  }

  downloadResource(resource: { id: number; name: string; size: string }) {
    alert(`Downloading: ${resource.name}`);
  }

  getProgress(): number {
    return Math.round((this.completedLessons.size / this.course.lessons.length) * 100);
  }

  getCompletedLessons(): number {
    return this.completedLessons.size;
  }

  isLessonCompleted(lessonId: number): boolean {
    return this.completedLessons.has(lessonId);
  }

  goBack() {
    this.router.navigate(['/lms-courses']);
  }

  private loadCourseFromStore() {
    const storeCourse = this.findStoreCourse(this.courseId);
    if (!storeCourse) {
      this.course = this.getDefaultCourse(this.courseId);
      this.currentLesson = this.course.lessons[0];
      return;
    }

    this.course = this.mapStoreCourse(storeCourse);
    this.currentLesson = this.course.lessons[0];
  }

  private findStoreCourse(courseId: string): StoreCourse | undefined {
    return this.store.getCoursesArray().find(course => course.id === courseId);
  }

  private mapStoreCourse(storeCourse: StoreCourse): Course {
    const materials = this.getCourseMaterials(storeCourse.id);
    const baseLessons = this.getDefaultLessons();
    
    if (materials && materials.videos && materials.videos.length > 0) {
      return {
        id: storeCourse.id,
        title: storeCourse.title,
        description: storeCourse.description || 'Course description is coming soon.',
        duration: Number.parseInt(storeCourse.duration || '0', 10) || 10,
        rating: 4.8,
        instructor: storeCourse.instructor,
        lessons: this.createLessonsFromMaterials(materials, baseLessons)
      };
    }

    return {
      id: storeCourse.id,
      title: storeCourse.title,
      description: storeCourse.description || 'Course description is coming soon.',
      duration: Number.parseInt(storeCourse.duration || '0', 10) || 10,
      rating: 4.8,
      instructor: storeCourse.instructor,
      lessons: baseLessons
    };
  }

  private getDefaultCourse(courseId: string): Course {
    return {
      id: courseId,
      title: 'Full MERN Stack Development',
      description: 'Learn to build complete web applications with MongoDB, Express, React, and Node.js',
      duration: 40,
      rating: 4.8,
      instructor: 'John Developer',
      lessons: this.getDefaultLessons()
    };
  }

  private getDefaultLessons(): Lesson[] {
    return [
      {
        id: 1,
        title: 'Course Introduction & Setup',
        description: 'Get started with the course and set up your environment',
        duration: 45,
        notes: [
          { id: 1, title: 'Setup Guide', content: 'Complete guide to set up the tools on your system.' }
        ],
        quiz: [
          { id: 1, question: 'What will you set up in this lesson?', options: ['Tools', 'Database', 'Deployment'], answer: 'Tools' }
        ],
        resources: [
          { id: 1, name: 'Setup Checklist', size: '2.5 MB' }
        ]
      },
      {
        id: 2,
        title: 'Core Concepts',
        description: 'Understand the core concepts and architecture',
        duration: 50,
        notes: [
          { id: 2, title: 'Core Concepts', content: 'Key ideas and architecture overview.' }
        ],
        quiz: [
          { id: 2, question: 'What is the focus of this lesson?', options: ['Architecture', 'Testing', 'Deployment'], answer: 'Architecture' }
        ],
        resources: [
          { id: 2, name: 'Architecture Diagram', size: '1.8 MB' }
        ]
      },
      {
        id: 3,
        title: 'Hands-on Practice',
        description: 'Apply what you learned with hands-on tasks',
        duration: 55,
        notes: [
          { id: 3, title: 'Practice Tasks', content: 'Follow these steps to complete the exercises.' }
        ],
        quiz: [
          { id: 3, question: 'Why practice?', options: ['Apply learning', 'Skip steps', 'Memorize only'], answer: 'Apply learning' }
        ],
        resources: [
          { id: 3, name: 'Practice Workbook', size: '2.1 MB' }
        ]
      }
    ];
  }

  private saveProgress() {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(this.getProgressKey(), JSON.stringify([...this.completedLessons]));
  }

  private restoreProgress() {
    if (typeof localStorage === 'undefined') return;
    const saved = localStorage.getItem(this.getProgressKey());
    if (saved) {
      this.completedLessons = new Set(JSON.parse(saved));
    }
  }

  private getProgressKey(): string {
    return `courseProgress_${this.courseId}`;
  }

  private getCourseMaterials(courseId: string): any {
    if (typeof localStorage === 'undefined') return null;
    const stored = localStorage.getItem(`courseMaterials_${courseId}`);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  }

  private createLessonsFromMaterials(materials: any, baseLessons: Lesson[]): Lesson[] {
    const videos = Array.isArray(materials.videos) ? materials.videos : [];
    const notes = Array.isArray(materials.notes) ? materials.notes : [];
    const quizQuestions = Array.isArray(materials.quizQuestions) ? materials.quizQuestions : [];

    if (videos.length === 0) {
      return baseLessons;
    }

    return videos.map((video: { name: string; data: string }, index: number) => {
      const lessonIndex = index + 1;
      const noteForLesson = notes[index] || null;
      const quizForLesson = quizQuestions[index] || null;
      const videoName = video.name || `Video ${lessonIndex}`;

      return {
        id: lessonIndex,
        title: `Lesson ${lessonIndex}: ${videoName.replace(/\.[^.]*$/, '')}`,
        description: `Video lecture: ${videoName}`,
        duration: 45,
        notes: noteForLesson ? [
          {
            id: index + 1,
            title: noteForLesson.replace(/\.[^.]*$/, ''),
            content: `Notes for: ${noteForLesson}`
          }
        ] : [
          {
            id: 1,
            title: 'Lesson Notes',
            content: 'Notes for this lesson are coming soon.'
          }
        ],
        quiz: quizForLesson
          ? [
              {
                id: 1,
                question: quizForLesson.question || 'Test your understanding',
                options: Array.isArray(quizForLesson.options) ? quizForLesson.options : ['Option 1', 'Option 2'],
                answer: Array.isArray(quizForLesson.options)
                  ? quizForLesson.options[quizForLesson.correctIndex || 0] || ''
                  : ''
              }
            ]
          : [
              {
                id: 1,
                question: 'Did you understand this lesson?',
                options: ['Yes', 'Partially', 'Need Help'],
                answer: 'Yes'
              }
            ],
        resources: video.data ? [
          {
            id: 1,
            name: videoName,
            size: '1.5 MB',
            dataUrl: video.data
          }
        ] : [
          {
            id: 1,
            name: videoName,
            size: '1.5 MB'
          }
        ]
      };
    });
  }
}
