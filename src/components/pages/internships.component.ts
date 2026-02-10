import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService, Internship } from '../../services/store.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-internships',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold mb-2">Internship Opportunities</h1>
          <p class="text-gray-600">Gain real-world experience with top companies</p>
        </div>

        <!-- Search & Filter -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (input)="applyFilters()"
                placeholder="Search by company or role..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <select
                [(ngModel)]="selectedDuration"
                (change)="applyFilters()"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">All Durations</option>
                <option value="1 month">1 Month</option>
                <option value="2 months">2 Months</option>
                <option value="3 months">3 Months</option>
                <option value="6 months">6 Months</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Minimum Stipend</label>
              <input
                type="number"
                [(ngModel)]="minStipend"
                (input)="applyFilters()"
                placeholder="Enter minimum..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Internship Cards -->
        <div class="space-y-4">
          <div
            *ngFor="let internship of filteredInternships"
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
          >
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <!-- Left -->
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-gray-900">{{ internship.title }}</h3>
                <p class="text-lg text-blue-600 font-semibold mt-1">{{ internship.company }}</p>

                <!-- Skills -->
                <div class="flex flex-wrap gap-2 mt-3">
                  <span
                    *ngFor="let skill of internship.skills"
                    class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {{ skill }}
                  </span>
                </div>

                <!-- Details -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                  <div>
                    <p class="text-gray-600">Duration</p>
                    <p class="font-semibold">{{ internship.duration }}</p>
                  </div>
                  <div>
                    <p class="text-gray-600">Stipend</p>
                    <p class="font-semibold text-green-600">{{ internship.stipend }}</p>
                  </div>
                  <div>
                    <p class="text-gray-600">Openings</p>
                    <p class="font-semibold">{{ internship.openings }}</p>
                  </div>
                  <div>
                    <p class="text-gray-600">Deadline</p>
                    <p class="font-semibold">{{ internship.deadline }}</p>
                  </div>
                </div>

                <p class="text-gray-600 mt-3">{{ internship.description }}</p>
              </div>

              <!-- Right -->
              <div class="w-full md:w-auto flex flex-col gap-2">
                <button
                  (click)="onApply(internship.id)"
                  class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold whitespace-nowrap"
                >
                  Apply Now
                </button>
                <button
                  class="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div *ngIf="filteredInternships.length === 0" class="text-center py-12 bg-white rounded-lg shadow-md">
          <p class="text-gray-600 text-lg">No internships found matching your criteria.</p>
          <button
            (click)="resetFilters()"
            class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>

        <!-- Stats -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <p class="text-3xl font-bold text-blue-600">{{ totalInternships }}</p>
            <p class="text-gray-600 mt-2">Total Internships</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <p class="text-3xl font-bold text-green-600">{{ totalOpenings }}</p>
            <p class="text-gray-600 mt-2">Total Openings</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <p class="text-3xl font-bold text-purple-600">500+</p>
            <p class="text-gray-600 mt-2">Students Placed</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class InternshipsComponent implements OnInit {
  internships: Internship[] = [];
  filteredInternships: Internship[] = [];
  searchQuery = '';
  selectedDuration = '';
  minStipend: number | null = null;
  totalInternships = 0;
  totalOpenings = 0;

  constructor(
    private store: StoreService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.loadInternships();
  }

  loadInternships() {
    this.internships = this.store.getInternshipsArray();
    this.filteredInternships = [...this.internships];
    this.totalInternships = this.internships.length;
    this.totalOpenings = this.internships.reduce((sum, i) => sum + (i.openings || 0), 0);
  }

  applyFilters() {
    let filtered = [...this.internships];

    // Search filter
    if (this.searchQuery) {
      filtered = filtered.filter(i =>
        i.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        i.company.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Duration filter
    if (this.selectedDuration) {
      filtered = filtered.filter(i => i.duration === this.selectedDuration);
    }

    // Stipend filter
    if (this.minStipend) {
      filtered = filtered.filter(i => {
        const stipendValue = parseInt(i.stipend.replace(/\D/g, '')) || 0;
        return stipendValue >= this.minStipend;
      });
    }

    this.filteredInternships = filtered;
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedDuration = '';
    this.minStipend = null;
    this.loadInternships();
  }

  onApply(internshipId: string) {
    const currentUser = this.store.currentUser();
    const internship = this.store.getInternshipsArray().find(i => i.id === internshipId);
    
    if (!currentUser || !internship) {
      alert('Please login to apply for internships');
      return;
    }

    const application = {
      id: `app-${Date.now()}`,
      jobId: internshipId,
      jobTitle: internship.title,
      company: internship.company,
      applicantName: currentUser.name,
      applicantEmail: currentUser.email,
      status: 'submitted' as const,
      appliedDate: new Date().toISOString().split('T')[0]
    };

    this.store.submitApplication(application);
    alert(`✅ Successfully applied for ${internship.title} at ${internship.company}!\n\nDuration: ${internship.duration}\nStipend: ${internship.stipend}`);
  }
}
