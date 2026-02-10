import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlacementChartComponent } from './admin/placement-chart.component';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [CommonModule, PlacementChartComponent],
  template: `
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-5 rounded-lg shadow-sm border-t-4 border-primary">
        <div class="text-2xl font-bold text-gray-800">1,240</div>
        <div class="text-xs text-gray-500 uppercase font-bold mt-1">Total Students</div>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-t-4 border-primary-gold">
        <div class="text-2xl font-bold text-gray-800">85%</div>
        <div class="text-xs text-gray-500 uppercase font-bold mt-1">Placement Rate</div>
      </div>
      <div class="bg-white p-5 rounded-lg shadow-sm border-t-4 border-secondary-red">
        <div class="text-2xl font-bold text-gray-800">42</div>
        <div class="text-xs text-gray-500 uppercase font-bold mt-1">Active Companies</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Chart Section -->
      <div class="lg:col-span-2">
        <app-placement-chart></app-placement-chart>
        
        <div class="bg-white mt-8 rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 class="font-bold text-gray-800">Recent Applications</h3>
            <button class="text-xs text-primary font-bold hover:underline">View All</button>
          </div>
          <table class="w-full text-sm text-left">
            <thead class="bg-gray-50 text-gray-500">
              <tr>
                <th class="px-6 py-3 font-medium">Student</th>
                <th class="px-6 py-3 font-medium">Company</th>
                <th class="px-6 py-3 font-medium">Status</th>
                <th class="px-6 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr>
                <td class="px-6 py-3">Rahul Sharma</td>
                <td class="px-6 py-3">Deloitte</td>
                <td class="px-6 py-3"><span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">Pending</span></td>
                <td class="px-6 py-3 text-gray-500">Oct 24</td>
              </tr>
              <tr>
                <td class="px-6 py-3">Priya Patel</td>
                <td class="px-6 py-3">TCS</td>
                <td class="px-6 py-3"><span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">Shortlisted</span></td>
                <td class="px-6 py-3 text-gray-500">Oct 23</td>
              </tr>
              <tr>
                <td class="px-6 py-3">Amit Singh</td>
                <td class="px-6 py-3">Wipro</td>
                <td class="px-6 py-3"><span class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold">Rejected</span></td>
                <td class="px-6 py-3 text-gray-500">Oct 22</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="space-y-6">
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
           <h3 class="font-bold text-gray-800 mb-4">Quick Actions</h3>
           <div class="space-y-3">
             <button 
               (click)="postNewJob()"
               class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-colors group cursor-pointer">
               <span class="font-medium text-sm">Post New Job</span>
               <span class="text-gray-400 group-hover:text-white">→</span>
             </button>
             <button 
               (click)="verifyCertificates()"
               class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-colors group cursor-pointer">
               <span class="font-medium text-sm">Verify Certificates</span>
               <span class="text-gray-400 group-hover:text-white">→</span>
             </button>
             <button 
               (click)="addStudent()"
               class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-colors group cursor-pointer">
               <span class="font-medium text-sm">Add Student</span>
               <span class="text-gray-400 group-hover:text-white">→</span>
             </button>
           </div>
        </div>
      </div>
    </div>
  `
})
export class AdminViewComponent {
  constructor(private router: Router) {}

  postNewJob() {
    this.router.navigate(['/admin'], { queryParams: { tab: 'internships-jobs' } });
    console.log('Navigating to Post New Job');
  }

  verifyCertificates() {
    this.router.navigate(['/admin'], { queryParams: { tab: 'certificates' } });
    console.log('Opening Certificate Verification');
  }

  addStudent() {
    this.router.navigate(['/admin'], { queryParams: { tab: 'students' } });
    console.log('Opening Add Student Form');
  }
}