import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type UserRole = 'student' | 'admin' | 'recruiter' | 'trainer';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar: string;
  dept?: string;
  year?: string;
  phone?: string;
  address?: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  thumbnail: string;
  description?: string;
  category?: string;
  duration?: string;
  enrollmentCount?: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Internship' | 'Full-time';
  stipend: string;
  postedDate: string;
  description?: string;
  requirements?: string[];
  applicationDeadline?: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseName: string;
  studentName: string;
  completionDate: string;
  certificateUrl: string;
  qrCode?: string;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  duration: string;
  stipend: string;
  skills?: string[];
  description?: string;
  openings?: number;
  deadline?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  applicantName: string;
  applicantEmail: string;
  status: 'submitted' | 'under-review' | 'shortlisted' | 'rejected' | 'offer-received';
  appliedDate: string;
  resumeUrl?: string;
  coverLetter?: string;
}

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  jobId: string;
  jobTitle: string;
  date: string;
  time: string;
  mode: 'in-person' | 'video-call' | 'phone';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  meetingLink?: string;
  feedback?: string;
}

export interface Resume {
  id: string;
  studentId: string;
  studentName: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  education: {
    school: string;
    degree: string;
    cgpa: number;
    year: string;
  }[];
  skills: string[];
  experience: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  projects: {
    name: string;
    description: string;
    techStack: string[];
    link?: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // Signals for reactive state
  currentUser = signal<User | null>(null);
  notifications = signal<Notification[]>([]);
  unreadCount = signal<number>(0);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  enrolledCourseIds = signal<string[]>([]);
  
  // Mock Data
  courses = signal<Course[]>([
    {
      id: 'c1',
      title: 'Full Stack Development with MERN',
      instructor: 'Dr. A. Kumar',
      progress: 65,
      totalLessons: 40,
      completedLessons: 26,
      thumbnail: 'https://picsum.photos/seed/mern/300/200',
      category: 'Web Development',
      duration: '8 weeks',
      enrollmentCount: 245
    },
    {
      id: 'c2',
      title: 'Data Science & Machine Learning',
      instructor: 'Prof. S. Mishra',
      progress: 10,
      totalLessons: 55,
      completedLessons: 5,
      thumbnail: 'https://picsum.photos/seed/ml/300/200',
      category: 'AI/ML',
      duration: '12 weeks',
      enrollmentCount: 189
    },
    {
      id: 'c3',
      title: 'Enterprise Java Programming',
      instructor: 'Mrs. P. Das',
      progress: 0,
      totalLessons: 30,
      completedLessons: 0,
      thumbnail: 'https://picsum.photos/seed/java/300/200',
      category: 'Backend',
      duration: '6 weeks',
      enrollmentCount: 156
    }
  ]);

  jobs = signal<Job[]>([
    {
      id: 'j1',
      title: 'React Frontend Developer',
      company: 'TechMahindra',
      location: 'Bangalore (Hybrid)',
      type: 'Full-time',
      stipend: '₹4.5 - 6 LPA',
      postedDate: '2 days ago',
      requirements: ['React', 'TypeScript', 'REST APIs'],
      applicationDeadline: '2026-02-28'
    },
    {
      id: 'j2',
      title: 'Data Analyst Intern',
      company: 'Deloitte',
      location: 'Hyderabad',
      type: 'Internship',
      stipend: '₹25,000 / mo',
      postedDate: '5 days ago',
      requirements: ['Python', 'SQL', 'Excel'],
      applicationDeadline: '2026-02-20'
    },
    {
      id: 'j3',
      title: 'Cloud Engineer Trainee',
      company: 'AWS',
      location: 'Remote',
      type: 'Full-time',
      stipend: '₹8 - 12 LPA',
      postedDate: '1 week ago',
      requirements: ['AWS', 'Docker', 'Linux'],
      applicationDeadline: '2026-03-05'
    }
  ]);

  internships = signal<Internship[]>([
    {
      id: 'i1',
      title: 'Full Stack Development Intern',
      company: 'Flipkart',
      duration: '3 months',
      stipend: '₹20,000 / month',
      skills: ['React', 'Node.js', 'MongoDB'],
      openings: 5,
      deadline: '2026-02-15'
    },
    {
      id: 'i2',
      title: 'UI/UX Design Intern',
      company: 'Zomato',
      duration: '2 months',
      stipend: '₹15,000 / month',
      skills: ['Figma', 'UI Design', 'Prototyping'],
      openings: 3,
      deadline: '2026-02-20'
    }
  ]);

  certificates = signal<Certificate[]>([]);
  applications = signal<Application[]>([
    { id: 'a1', jobId: 'j1', jobTitle: 'React Frontend Developer', company: 'TechMahindra', applicantName: 'Rahul Sharma', applicantEmail: 'rahul@cutm.ac.in', status: 'shortlisted', appliedDate: '2026-01-20' },
    { id: 'a2', jobId: 'j2', jobTitle: 'Data Analyst Intern', company: 'Deloitte', applicantName: 'Rahul Sharma', applicantEmail: 'rahul@cutm.ac.in', status: 'under-review', appliedDate: '2026-01-25' }
  ]);
  interviews = signal<Interview[]>([
    { id: 'int1', candidateId: 'u1', candidateName: 'Rahul Sharma', candidateEmail: 'rahul@cutm.ac.in', jobId: 'j1', jobTitle: 'React Frontend Developer', date: '2026-02-10', time: '2:00 PM', mode: 'video-call', status: 'scheduled', meetingLink: 'https://meet.google.com/abc-xyz-123' }
  ]);
  resumes = signal<Resume[]>([]);

  // Derived state
  isAuthenticated = computed(() => !!this.currentUser());
  userName = computed(() => this.currentUser()?.name || 'Guest');
  userRole = computed(() => this.currentUser()?.role);
  hasUnread = computed(() => this.unreadCount() > 0);
  enrolledCourses = computed(() => this.courses().filter(course => this.enrolledCourseIds().includes(course.id)));
  availableCourses = computed(() => this.courses().filter(course => !this.enrolledCourseIds().includes(course.id)));

  constructor() {
    this.enrolledCourseIds.set(this.loadEnrolledCourseIds());
  }

  private loadEnrolledCourseIds(): string[] {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('enrolledCourseIds');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            return parsed.filter(id => typeof id === 'string');
          }
        } catch {
          return [];
        }
      }
    }
    return [];
  }

  private persistEnrolledCourseIds(ids: string[]) {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('enrolledCourseIds', JSON.stringify(ids));
  }

  // User Management
  login(role: UserRole, user?: Partial<User>) {
    const mockUsers: Record<UserRole, User> = {
      student: {
        id: 'u1',
        name: 'Rahul Sharma',
        role: 'student',
        email: 'rahul.s@cutm.ac.in',
        avatar: 'https://picsum.photos/seed/rahul/100/100',
        dept: 'Computer Science',
        year: '3rd Year',
        phone: '+91-9876543210',
        address: 'Bhubaneswar, Odisha'
      },
      admin: {
        id: 'a1',
        name: 'Placement Cell',
        role: 'admin',
        email: 'careers@cutm.ac.in',
        avatar: 'https://picsum.photos/seed/admin/100/100',
        phone: '+91-9999999999'
      },
      recruiter: {
        id: 'r1',
        name: 'HR Team - TCS',
        role: 'recruiter',
        email: 'hr@tcs.com',
        avatar: 'https://picsum.photos/seed/tcs/100/100'
      },
      trainer: {
        id: 't1',
        name: 'Prof. Anjali',
        role: 'trainer',
        email: 'anjali@cutm.ac.in',
        avatar: 'https://picsum.photos/seed/anjali/100/100'
      }
    };
    
    const userData = user ? { ...mockUsers[role], ...user } : mockUsers[role];
    this.currentUser.set(userData);
  }

  logout() {
    this.currentUser.set(null);
    this.notifications.set([]);
    this.unreadCount.set(0);
  }

  updateUser(user: Partial<User>) {
    const current = this.currentUser();
    if (current) {
      this.currentUser.set({ ...current, ...user });
    }
  }

  // Notification Management
  addNotification(notification: Notification) {
    const current = this.notifications();
    this.notifications.set([notification, ...current]);
    if (!notification.read) {
      this.unreadCount.set(this.unreadCount() + 1);
    }
  }

  markAsRead(notificationId: string) {
    const updated = this.notifications().map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    this.notifications.set(updated);
    const unread = updated.filter(n => !n.read).length;
    this.unreadCount.set(unread);
  }

  clearNotifications() {
    this.notifications.set([]);
    this.unreadCount.set(0);
  }

  // Loading & Error State
  setLoading(loading: boolean) {
    this.loading.set(loading);
  }

  setError(error: string | null) {
    this.error.set(error);
  }

  // Course Management
  addCourse(course: Course) {
    this.courses.update(courses => [...courses, course]);
  }

  isCourseEnrolled(courseId: string): boolean {
    return this.enrolledCourseIds().includes(courseId);
  }

  enrollCourse(courseId: string): void {
    if (this.isCourseEnrolled(courseId)) return;
    const updated = [...this.enrolledCourseIds(), courseId];
    this.enrolledCourseIds.set(updated);
    this.persistEnrolledCourseIds(updated);
  }

  getEnrolledCoursesArray(): Course[] {
    return this.enrolledCourses();
  }

  getAvailableCoursesArray(): Course[] {
    return this.availableCourses();
  }

  updateCourse(courseId: string, updates: Partial<Course>) {
    this.courses.update(courses =>
      courses.map(c => c.id === courseId ? { ...c, ...updates } : c)
    );
  }

  deleteCourse(courseId: string) {
    this.courses.update(courses => courses.filter(c => c.id !== courseId));
  }

  // Job Management
  addJob(job: Job) {
    this.jobs.update(jobs => [...jobs, job]);
  }

  updateJob(jobId: string, updates: Partial<Job>) {
    this.jobs.update(jobs =>
      jobs.map(j => j.id === jobId ? { ...j, ...updates } : j)
    );
  }

  deleteJob(jobId: string) {
    this.jobs.update(jobs => jobs.filter(j => j.id !== jobId));
  }

  // Internship Management
  addInternship(internship: Internship) {
    this.internships.update(internships => [...internships, internship]);
  }

  updateInternship(internshipId: string, updates: Partial<Internship>) {
    this.internships.update(internships =>
      internships.map(i => i.id === internshipId ? { ...i, ...updates } : i)
    );
  }

  deleteInternship(internshipId: string) {
    this.internships.update(internships => internships.filter(i => i.id !== internshipId));
  }

  // Certificate Management
  addCertificate(certificate: Certificate) {
    this.certificates.update(certs => [...certs, certificate]);
  }

  getCertificates$(): Observable<Certificate[]> {
    return new Observable(observer => {
      observer.next(this.certificates());
    });
  }

  // Getters
  getCoursesArray(): Course[] {
    return this.courses();
  }

  getJobsArray(): Job[] {
    return this.jobs();
  }

  getInternshipsArray(): Internship[] {
    return this.internships();
  }

  getNotificationsArray(): Notification[] {
    return this.notifications();
  }

  // Application Management
  submitApplication(application: Application) {
    this.applications.update(apps => [...apps, application]);
    this.addNotification({
      id: `notif-${Date.now()}`,
      title: 'Application Submitted',
      message: `Your application for ${application.jobTitle} at ${application.company} has been submitted.`,
      type: 'success',
      read: false,
      createdAt: new Date().toISOString()
    });
  }

  updateApplicationStatus(applicationId: string, status: Application['status']) {
    this.applications.update(apps =>
      apps.map(a => a.id === applicationId ? { ...a, status } : a)
    );
  }

  getApplicationsByStudent(studentEmail: string): Application[] {
    return this.applications().filter(a => a.applicantEmail === studentEmail);
  }

  getApplicationsForJob(jobId: string): Application[] {
    return this.applications().filter(a => a.jobId === jobId);
  }

  // Interview Management
  scheduleInterview(interview: Interview) {
    this.interviews.update(interviews => [...interviews, interview]);
    this.addNotification({
      id: `notif-${Date.now()}`,
      title: 'Interview Scheduled',
      message: `Interview scheduled for ${interview.candidateName} on ${interview.date}`,
      type: 'success',
      read: false,
      createdAt: new Date().toISOString()
    });
  }

  updateInterviewStatus(interviewId: string, status: Interview['status'], feedback?: string) {
    this.interviews.update(interviews =>
      interviews.map(i => 
        i.id === interviewId 
          ? { ...i, status, ...(feedback && { feedback }) } 
          : i
      )
    );
  }

  rescheduleInterview(interviewId: string, newDate: string, newTime: string) {
    this.interviews.update(interviews =>
      interviews.map(i => 
        i.id === interviewId 
          ? { ...i, date: newDate, time: newTime } 
          : i
      )
    );
  }

  getInterviewsByCandidate(candidateEmail: string): Interview[] {
    return this.interviews().filter(i => i.candidateEmail === candidateEmail);
  }

  getInterviewsByRecruiter(jobId?: string): Interview[] {
    return jobId 
      ? this.interviews().filter(i => i.jobId === jobId)
      : this.interviews();
  }

  // Resume Management
  saveResume(resume: Resume) {
    const existing = this.resumes().findIndex(r => r.studentId === resume.studentId);
    if (existing >= 0) {
      const updated = [...this.resumes()];
      updated[existing] = resume;
      this.resumes.set(updated);
    } else {
      this.resumes.update(resumes => [...resumes, resume]);
    }
    this.addNotification({
      id: `notif-${Date.now()}`,
      title: 'Resume Saved',
      message: 'Your resume has been saved successfully',
      type: 'success',
      read: false,
      createdAt: new Date().toISOString()
    });
  }

  getResumeByStudent(studentId: string): Resume | undefined {
    return this.resumes().find(r => r.studentId === studentId);
  }

  downloadResume(resumeId: string): string {
    const resume = this.resumes().find(r => r.id === resumeId);
    if (!resume) return '';
    // In a real app, this would generate a PDF
    return `resume-${resume.studentName.replace(/\s+/g, '-')}.pdf`;
  }

  // Status tracking
  getApplicationStatus(applicationId: string): Application['status'] | undefined {
    return this.applications().find(a => a.id === applicationId)?.status;
  }

  getInterviewStatus(interviewId: string): Interview['status'] | undefined {
    return this.interviews().find(i => i.id === interviewId)?.status;
  }
}