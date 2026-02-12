import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-trainer-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-5 rounded-lg shadow-sm border-t-4 border-primary">
        <div class="text-2xl font-bold text-gray-800">{{ myCourses.length }}</div>
        <div class="text-xs text-gray-500 uppercase font-bold mt-1">My Courses</div>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-t-4 border-primary-gold">
        <div class="text-2xl font-bold text-gray-800">{{ totalStudents }}</div>
        <div class="text-xs text-gray-500 uppercase font-bold mt-1">Total Students</div>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-t-4 border-accent-blue">
        <div class="text-2xl font-bold text-gray-800">{{ pendingAssignments }}</div>
        <div class="text-xs text-gray-500 uppercase font-bold mt-1">Pending Reviews</div>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-t-4 border-secondary-red">
        <div class="text-2xl font-bold text-gray-800">{{ upcomingClasses }}</div>
        <div class="text-xs text-gray-500 uppercase font-bold mt-1">Classes Today</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content Area -->
      <div class="lg:col-span-2 space-y-6">
        <!-- My Courses Section -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100">
          <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 class="font-bold text-gray-800 font-serif">My Courses</h3>
            <button (click)="createCourse()" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-medium">
              + Create Course
            </button>
          </div>
          <div class="p-6 space-y-4">
            @for (course of myCourses; track course.id) {
              <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h4 class="font-bold text-primary">{{ course.title }}</h4>
                    <p class="text-xs text-gray-500 mt-1">{{ course.category }} • {{ course.duration }}</p>
                  </div>
                  <span class="px-3 py-1 rounded-full text-xs font-bold"
                    [ngClass]="course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                    {{ course.status | titlecase }}
                  </span>
                </div>
                <div class="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <div class="flex gap-4 text-xs text-gray-600">
                    <span>👥 {{ course.enrolledStudents }} students</span>
                    <span>📚 {{ course.totalLessons }} lessons</span>
                    <span>⭐ {{ course.rating }}/5</span>
                  </div>
                  <div class="flex gap-2">
                    <button (click)="manageCourse(course)" class="text-xs text-accent-blue hover:text-primary font-bold">Manage</button>
                    <button (click)="editCourse(course)" class="text-xs text-primary-gold hover:text-primary font-bold">Edit</button>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Student Assignments to Review -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100">
          <div class="px-6 py-4 border-b border-gray-100">
            <h3 class="font-bold text-gray-800 font-serif">Pending Reviews</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 text-gray-500">
                <tr>
                  <th class="px-6 py-3 text-left font-medium">Student</th>
                  <th class="px-6 py-3 text-left font-medium">Assignment</th>
                  <th class="px-6 py-3 text-left font-medium">Course</th>
                  <th class="px-6 py-3 text-left font-medium">Submitted</th>
                  <th class="px-6 py-3 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                @for (assignment of pendingReviews; track assignment.id) {
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-3">{{ assignment.studentName }}</td>
                    <td class="px-6 py-3">{{ assignment.title }}</td>
                    <td class="px-6 py-3 text-gray-500">{{ assignment.courseName }}</td>
                    <td class="px-6 py-3 text-gray-500">{{ assignment.submittedDate }}</td>
                    <td class="px-6 py-3">
                      <button (click)="reviewAssignment(assignment)" class="text-primary-gold hover:text-primary font-bold">Review</button>
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
        <!-- Today's Schedule -->
        <div class="bg-primary text-white p-6 rounded-lg shadow-lg">
          <h3 class="font-bold font-serif mb-4 text-primary-gold">Today's Schedule</h3>
          <div class="space-y-4">
            @for (schedule of todaySchedule; track schedule.id) {
              <div class="flex gap-3 pb-3 border-b border-primary-gold/20">
                <div class="flex-shrink-0 w-12 text-center">
                  <div class="text-xs font-bold uppercase text-gray-400">{{ schedule.time }}</div>
                </div>
                <div>
                  <div class="text-sm font-bold">{{ schedule.className }}</div>
                  <div class="text-xs text-gray-400">{{ schedule.room }} • {{ schedule.students }} students</div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 class="font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <button 
              (click)="uploadContent()"
              class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-colors group cursor-pointer">
              <span class="font-medium text-sm">Upload Content</span>
              <span class="text-gray-400 group-hover:text-white">→</span>
            </button>
            <button 
              (click)="createAssignment()"
              class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-colors group cursor-pointer">
              <span class="font-medium text-sm">Create Assignment</span>
              <span class="text-gray-400 group-hover:text-white">→</span>
            </button>
            <button 
              (click)="viewAnalytics()"
              class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-colors group cursor-pointer">
              <span class="font-medium text-sm">View Analytics</span>
              <span class="text-gray-400 group-hover:text-white">→</span>
            </button>
            <button 
              (click)="messageStudents()"
              class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-colors group cursor-pointer">
              <span class="font-medium text-sm">Message Students</span>
              <span class="text-gray-400 group-hover:text-white">→</span>
            </button>
          </div>
        </div>

        <!-- Performance Stats -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 class="font-bold text-gray-800 mb-4">Course Performance</h3>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-600">Completion Rate</span>
                <span class="font-bold text-primary">{{ completionRate }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-primary-gold h-2 rounded-full" [style.width.%]="completionRate"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-600">Average Rating</span>
                <span class="font-bold text-primary">{{ avgRating }}/5.0</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-accent-blue h-2 rounded-full" [style.width.%]="(avgRating/5)*100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TrainerViewComponent {
  store = inject(StoreService);
  router = inject(Router);

  totalStudents = 156;
  pendingAssignments = 12;
  upcomingClasses = 3;
  completionRate = 78;
  avgRating = 4.5;

  myCourses = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      category: 'Web Development',
      duration: '12 weeks',
      enrolledStudents: 45,
      totalLessons: 48,
      rating: 4.8,
      status: 'active'
    },
    {
      id: 2,
      title: 'Python for Data Science',
      category: 'Data Science',
      duration: '10 weeks',
      enrolledStudents: 38,
      totalLessons: 36,
      rating: 4.6,
      status: 'active'
    },
    {
      id: 3,
      title: 'Advanced React & Redux',
      category: 'Frontend',
      duration: '8 weeks',
      enrolledStudents: 32,
      totalLessons: 28,
      rating: 4.9,
      status: 'active'
    },
    {
      id: 4,
      title: 'Database Design & SQL',
      category: 'Backend',
      duration: '6 weeks',
      enrolledStudents: 41,
      totalLessons: 24,
      rating: 4.7,
      status: 'completed'
    }
  ];

  pendingReviews = [
    {
      id: 1,
      studentName: 'Rahul Sharma',
      title: 'React Component Project',
      courseName: 'Full Stack Web Dev',
      submittedDate: 'Today'
    },
    {
      id: 2,
      studentName: 'Priya Patel',
      title: 'Data Analysis Assignment',
      courseName: 'Python for Data Science',
      submittedDate: 'Yesterday'
    },
    {
      id: 3,
      studentName: 'Amit Kumar',
      title: 'Redux Store Implementation',
      courseName: 'Advanced React',
      submittedDate: '2 days ago'
    }
  ];

  todaySchedule = [
    {
      id: 1,
      time: '10:00',
      className: 'Full Stack Dev - Lecture',
      room: 'Lab 301',
      students: 45
    },
    {
      id: 2,
      time: '14:00',
      className: 'Python DS - Workshop',
      room: 'Lab 205',
      students: 38
    },
    {
      id: 3,
      time: '16:30',
      className: 'React - Code Review',
      room: 'Online',
      students: 32
    }
  ];

  uploadContent() {
    this.router.navigate(['/trainer'], { queryParams: { tab: 'courses' } });
  }

  createAssignment() {
    this.router.navigate(['/trainer'], { queryParams: { tab: 'assignments' } });
  }

  viewAnalytics() {
    this.router.navigate(['/trainer'], { queryParams: { tab: 'analytics' } });
  }

  messageStudents() {
    this.router.navigate(['/trainer'], { queryParams: { tab: 'students' } });
  }

  createCourse() {
    this.router.navigate(['/trainer']);
    alert('Create Course feature - Opening course creation form');
  }

  manageCourse(course: any) {
    this.router.navigate(['/trainer'], { queryParams: { courseId: course.id } });
    alert('Manage course: ' + course.title);
  }

  editCourse(course: any) {
    this.router.navigate(['/trainer'], { queryParams: { edit: course.id } });
    alert('Edit course: ' + course.title);
  }

  reviewAssignment(assignment: any) {
    this.router.navigate(['/trainer'], { queryParams: { reviewId: assignment.id } });
    alert('Review assignment: ' + assignment.title + ' from ' + assignment.studentName);
  }
}
