import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home.component';
import { LoginComponent } from './components/pages/login.component';
import { RegisterComponent } from './components/pages/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentProfileComponent } from './components/pages/student-profile.component';
import { CoursesComponent } from './components/pages/courses.component';
import { CourseDetailComponent } from './components/pages/course-detail.component';
import { InternshipsComponent } from './components/pages/internships.component';
import { JobsComponent } from './components/pages/jobs.component';
import { ResumeBuilderComponent } from './components/pages/resume-builder.component';
import { AdminPanelComponent } from './components/admin/admin-panel.component';
import { TrainerPanelComponent } from './components/admin/trainer-panel.component';
import { RecruiterPanelComponent } from './components/admin/recruiter-panel.component';
import { LmsCoursesComponent } from './components/pages/lms-courses.component';
import { LmsCourtDetailComponent } from './components/pages/lms-course-detail.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions.component';
import { AboutComponent } from './components/pages/about.component';
import { ContactComponent } from './components/pages/contact.component';
import { authGuard, adminGuard, studentGuard, trainerGuard, recruiterGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'profile', component: StudentProfileComponent, canActivate: [studentGuard] },
  { path: 'courses', component: CoursesComponent, canActivate: [authGuard] },
  { path: 'courses/:id', component: CourseDetailComponent, canActivate: [authGuard] },
  { path: 'internships', component: InternshipsComponent, canActivate: [authGuard] },
  { path: 'jobs', component: JobsComponent, canActivate: [authGuard] },
  { path: 'resume-builder', component: ResumeBuilderComponent, canActivate: [studentGuard] },
  { path: 'lms-courses', component: LmsCoursesComponent, canActivate: [studentGuard] },
  { path: 'lms-course-detail/:id', component: LmsCourtDetailComponent, canActivate: [studentGuard] },
  { path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard] },
  { path: 'trainer', component: TrainerPanelComponent, canActivate: [trainerGuard] },
  { path: 'recruiter', component: RecruiterPanelComponent, canActivate: [recruiterGuard] },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];