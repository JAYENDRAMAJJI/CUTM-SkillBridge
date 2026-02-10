import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-secondary-bg flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 sm:p-10 border-t-4 border-primary-gold">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-serif font-extrabold text-primary">Create Your Account</h1>
          <p class="text-gray-600 mt-2">Join the CUTM SkillBridge ecosystem</p>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onRegister()" class="space-y-4">
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              formControlName="name"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              placeholder="Your full name"
            />
            <p class="text-red-500 text-sm mt-1" *ngIf="isFieldInvalid('name')">
              Name is required
            </p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              formControlName="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              placeholder="you@example.com"
            />
            <p class="text-red-500 text-sm mt-1" *ngIf="isFieldInvalid('email')">
              Please enter a valid email
            </p>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              formControlName="password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              placeholder="At least 6 characters"
            />
            <p class="text-red-500 text-sm mt-1" *ngIf="isFieldInvalid('password')">
              Password must be at least 6 characters
            </p>
          </div>

          <!-- Role Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Register As</label>
            <select
              formControlName="role"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="trainer">Trainer / Instructor</option>
              <option value="recruiter">Placement Cell</option>
            </select>
          </div>

          <!-- Student-specific fields -->
          <ng-container *ngIf="registerForm.get('role')?.value === 'student'">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Roll Number / ERP Number</label>
              <input
                type="text"
                formControlName="rollNumber"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                placeholder="e.g., 22CS1234"
              />
              <p class="text-red-500 text-sm mt-1" *ngIf="isFieldInvalid('rollNumber')">
                Roll Number / ERP Number is required
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                formControlName="department"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="">Select Department</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="Mechanical">Mechanical</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <select
                formControlName="year"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </ng-container>

          <!-- Admin-specific fields -->
          <ng-container *ngIf="registerForm.get('role')?.value === 'admin'">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Employee Number</label>
              <input
                type="text"
                formControlName="employeeNumber"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                placeholder="e.g., EMP-0012"
              />
              <p class="text-red-500 text-sm mt-1" *ngIf="isFieldInvalid('employeeNumber')">
                Employee Number is required
              </p>
            </div>
          </ng-container>

          <!-- Placement Cell-specific fields -->
          <ng-container *ngIf="registerForm.get('role')?.value === 'recruiter'">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Placement Cell ID</label>
              <input
                type="text"
                formControlName="placementCellId"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                placeholder="e.g., PCC-009"
              />
              <p class="text-red-500 text-sm mt-1" *ngIf="isFieldInvalid('placementCellId')">
                Placement Cell ID is required
              </p>
            </div>
          </ng-container>

          <!-- Trainer-specific fields -->
          <ng-container *ngIf="registerForm.get('role')?.value === 'trainer'">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Trainer Employee ID</label>
              <input
                type="text"
                formControlName="trainerId"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                placeholder="e.g., TR-451"
              />
              <p class="text-red-500 text-sm mt-1" *ngIf="isFieldInvalid('trainerId')">
                Trainer Employee ID is required
              </p>
            </div>
          </ng-container>

          <!-- Terms Checkbox -->
          <div class="flex items-center">
            <input
              type="checkbox"
              formControlName="terms"
              id="terms"
              class="rounded text-primary"
            />
            <label for="terms" class="ml-2 text-sm text-gray-600">
              I agree to the
              <a routerLink="/terms-conditions" class="text-primary hover:text-primary-gold underline">Terms & Conditions</a>
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="loading()"
            class="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 font-semibold transition"
          >
            {{ loading() ? 'Creating account...' : 'Register' }}
          </button>
        </form>

        <!-- Links -->
        <div class="mt-6 text-center text-sm">
          <p class="text-gray-600">
            Already have an account?
            <a routerLink="/login" class="text-primary hover:text-primary-gold font-medium">Login here</a>
          </p>
        </div>

        <!-- Error Message -->
        <div *ngIf="error()" class="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {{ error() }}
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = this.store.loading;
  error = this.store.error;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private store: StoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['student'],
      department: [''],
      year: [''],
      rollNumber: [''],
      employeeNumber: [''],
      placementCellId: [''],
      trainerId: [''],
      terms: [false, [Validators.requiredTrue]]
    });

    this.updateRoleValidators();
    this.registerForm.get('role')?.valueChanges.subscribe(() => {
      this.updateRoleValidators();
    });
  }

  private updateRoleValidators() {
    const role = this.registerForm.get('role')?.value;
    const roleFields = ['rollNumber', 'employeeNumber', 'placementCellId', 'trainerId'];

    roleFields.forEach((field) => {
      const control = this.registerForm.get(field);
      if (control) {
        control.clearValidators();
        control.setValue('');
        control.markAsUntouched();
      }
    });

    if (role === 'student') {
      this.registerForm.get('rollNumber')?.setValidators([Validators.required]);
    }

    if (role === 'admin') {
      this.registerForm.get('employeeNumber')?.setValidators([Validators.required]);
    }

    if (role === 'recruiter') {
      this.registerForm.get('placementCellId')?.setValidators([Validators.required]);
    }

    if (role === 'trainer') {
      this.registerForm.get('trainerId')?.setValidators([Validators.required]);
    }

    roleFields.forEach((field) => {
      this.registerForm.get(field)?.updateValueAndValidity();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.store.setLoading(true);
      const {
        name,
        email,
        password,
        role,
        department,
        year,
        rollNumber,
        employeeNumber,
        placementCellId,
        trainerId
      } = this.registerForm.value;

      this.auth.register({
        name,
        email,
        password,
        role,
        department,
        year: year ? parseInt(year) : undefined,
        rollNumber,
        employeeNumber,
        placementCellId,
        trainerId
      }).subscribe({
        next: (response) => {
          this.store.login(role, response.user);
          this.store.setLoading(false);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.store.setLoading(false);
          const message = err?.error?.error || err?.error?.message || 'Registration failed. Please try again.';
          this.store.setError(message);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
