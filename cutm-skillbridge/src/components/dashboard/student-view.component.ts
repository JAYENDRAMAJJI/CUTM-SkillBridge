import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-student-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-primary-gold">
        <div class="text-sm text-gray-500 font-medium uppercase">Enrolled Courses</div>
        <div class="text-2xl font-bold text-primary mt-1">{{store.courses().length}}</div>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-secondary-red">
        <div class="text-sm text-gray-500 font-medium uppercase">Attendance</div>
        <div class="text-2xl font-bold text-primary mt-1">87%</div>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-accent-blue">
        <div class="text-sm text-gray-500 font-medium uppercase">Active Applications</div>
        <div class="text-2xl font-bold text-primary mt-1">{{getApplicationCount()}}</div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Courses Column (Span 2) -->
      <div class="lg:col-span-2 space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-800 font-serif">Continue Learning</h2>
          <a href="#" class="text-sm text-accent-blue hover:text-primary font-medium">View All</a>
        </div>

        <div class="space-y-4">
          @for (course of store.courses(); track course.id) {
            <button (click)="continueCourse(course)" class="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex gap-4 transition-all hover:shadow-md hover:border-accent-blue cursor-pointer text-left">
              <img [src]="course.thumbnail" class="w-24 h-24 object-cover rounded-md flex-shrink-0" alt="Course">
              <div class="flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="font-bold text-gray-800 line-clamp-1">{{course.title}}</h3>
                  <p class="text-xs text-gray-500 mt-1">By {{course.instructor}}</p>
                </div>
                <div class="mt-3">
                  <div class="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{{course.progress}}% Complete</span>
                    <span>{{course.completedLessons}}/{{course.totalLessons}} Lessons</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-primary h-2 rounded-full transition-all duration-500" [style.width.%]="course.progress"></div>
                  </div>
                </div>
              </div>
            </button>
          }
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Job Alerts -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-gray-800 font-serif">New Openings</h2>
          </div>
          <div class="bg-white rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-100">
            @for (job of store.jobs(); track job.id) {
              <div class="p-4 hover:bg-gray-50 transition-colors">
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="text-sm font-bold text-primary">{{job.title}}</h4>
                    <p class="text-xs text-gray-500 mt-0.5">{{job.company}} • {{job.location}}</p>
                  </div>
                  <span class="px-2 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded-full uppercase">{{job.type}}</span>
                </div>
                <div class="mt-2 flex justify-between items-center">
                  <span class="text-xs font-medium text-gray-600">{{job.stipend}}</span>
                  <button (click)="applyForJob(job.id)" class="text-xs text-primary-gold hover:text-primary font-bold">Apply Now</button>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Upcoming Schedule -->
        <div class="bg-primary text-white p-5 rounded-lg shadow-lg">
          <h3 class="font-bold font-serif mb-4 text-primary-gold">Upcoming Events</h3>
          <ul class="space-y-4">
             <li class="flex gap-3">
               <div class="flex-shrink-0 w-10 text-center">
                 <div class="text-xs font-bold uppercase text-gray-400">Oct</div>
                 <div class="text-lg font-bold">24</div>
               </div>
               <div>
                 <div class="text-sm font-bold">TCS Recruitment Drive</div>
                 <div class="text-xs text-gray-400">9:00 AM • Auditorium</div>
               </div>
             </li>
             <li class="flex gap-3">
               <div class="flex-shrink-0 w-10 text-center">
                 <div class="text-xs font-bold uppercase text-gray-400">Oct</div>
                 <div class="text-lg font-bold">28</div>
               </div>
               <div>
                 <div class="text-sm font-bold">Full Stack Hackathon</div>
                 <div class="text-xs text-gray-400">All Day • Online</div>
               </div>
             </li>
          </ul>
        </div>

      </div>
    </div>
  `
})
export class StudentViewComponent {
  store = inject(StoreService);
  private router = inject(Router);

  getApplicationCount(): number {
    const currentUser = this.store.currentUser();
    if (!currentUser) return 0;
    const applications = this.store.getApplicationsByStudent(currentUser.email);
    return applications.filter(app => 
      app.status === 'submitted' || 
      app.status === 'under-review' || 
      app.status === 'shortlisted'
    ).length;
  }

  applyForJob(jobId: string) {
    this.router.navigate(['/jobs'], { queryParams: { apply: jobId } });
    alert('Redirecting to job application. Job ID: ' + jobId);
  }

  continueCourse(course: any) {
    this.router.navigate(['/lms-course-detail', course.id]);
  }
}