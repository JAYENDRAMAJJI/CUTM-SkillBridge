import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Courses
  getAllCourses(filter?: any): Observable<any> {
    let params = new HttpParams();
    if (filter?.search) params = params.set('search', filter.search);
    if (filter?.page) params = params.set('page', filter.page);
    if (filter?.limit) params = params.set('limit', filter.limit);
    
    return this.http.get(`${this.baseUrl}/courses`, { params });
  }

  getCourseById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/courses/${id}`);
  }

  enrollCourse(courseId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/courses/${courseId}/enroll`, {});
  }

  getCourseProgress(courseId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/courses/${courseId}/progress`);
  }

  // Student
  getStudentProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/students/profile`);
  }

  updateStudentProfile(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/students/profile`, data);
  }

  getStudentEnrollments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/students/enrollments`);
  }

  uploadResume(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('resume', file);
    return this.http.post(`${this.baseUrl}/students/resume`, formData);
  }

  // Internships
  getInternships(filter?: any): Observable<any> {
    let params = new HttpParams();
    if (filter?.search) params = params.set('search', filter.search);
    if (filter?.page) params = params.set('page', filter.page);
    
    return this.http.get(`${this.baseUrl}/internships`, { params });
  }

  applyForInternship(internshipId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/internships/${internshipId}/apply`, {});
  }

  getInternshipApplications(): Observable<any> {
    return this.http.get(`${this.baseUrl}/internships/applications/my`);
  }

  // Jobs & Placements
  getJobs(filter?: any): Observable<any> {
    let params = new HttpParams();
    if (filter?.search) params = params.set('search', filter.search);
    
    return this.http.get(`${this.baseUrl}/jobs`, { params });
  }

  getPlacementDrives(): Observable<any> {
    return this.http.get(`${this.baseUrl}/placement-drives`);
  }

  registerForDrive(driveId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/placement-drives/${driveId}/register`, {});
  }

  applyForJob(jobId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/jobs/${jobId}/apply`, {});
  }

  // Certificates
  getMyCertificates(): Observable<any> {
    return this.http.get(`${this.baseUrl}/certificates/my`);
  }

  downloadCertificate(certificateId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/certificates/${certificateId}/download`, {
      responseType: 'blob'
    });
  }

  verifyCertificate(certificateId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/certificates/${certificateId}/verify`);
  }

  // Admin - Students
  getAllStudents(filter?: any): Observable<any> {
    let params = new HttpParams();
    if (filter?.search) params = params.set('search', filter.search);
    if (filter?.page) params = params.set('page', filter.page);
    
    return this.http.get(`${this.baseUrl}/admin/students`, { params });
  }

  getStudentById(studentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/students/${studentId}`);
  }

  // Admin - Courses
  createCourse(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/courses`, data);
  }

  updateCourse(courseId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/courses/${courseId}`, data);
  }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/courses/${courseId}`);
  }

  uploadCourseMaterial(courseId: string, file: File, type: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    return this.http.post(`${this.baseUrl}/admin/courses/${courseId}/materials`, formData);
  }

  // Admin - Analytics
  getAnalytics(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/analytics`);
  }

  getPlacementStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/analytics/placements`);
  }

  getCourseStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/analytics/courses`);
  }

  // Notifications
  getNotifications(): Observable<any> {
    return this.http.get(`${this.baseUrl}/notifications`);
  }

  markNotificationAsRead(notificationId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/notifications/${notificationId}/read`, {});
  }

  // Search
  search(query: string, type?: string): Observable<any> {
    let params = new HttpParams().set('q', query);
    if (type) params = params.set('type', type);
    return this.http.get(`${this.baseUrl}/search`, { params });
  }
}
