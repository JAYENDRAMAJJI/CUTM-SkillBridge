# CUTM SkillBridge - Complete Platform

**Learn • Certify • Intern • Get Placed**

A comprehensive ed-tech and placement platform for CUTM (Chandigarh University of Technology and Management) that combines online learning, skill certification, internship opportunities, and job placements.

## Features Overview

### 1. Platform-Level Features
- **Authentication & Security**
  - Secure login/logout
  - User registration with role-based access control
  - JWT token-based authentication
  - Password reset/forgot functionality
  - Session management

### 2. Learning Management System (LMS)
- **Course Catalog**
  - Browse and search courses by category
  - Course details with instructor info
  - Video lectures and downloadable materials
  - Assignments and quizzes

- **Progress Tracking**
  - Course enrollment and progress tracking
  - Assignment submission
  - Quiz attempts and scoring
  - Completion status

### 3. Certification System
- Auto-generated certificates
- QR code for verification
- Certificate download (PDF)
- Public certificate verification

### 4. Internship Module
- Browse internship opportunities
- Filter by skills, duration, and stipend
- Apply for internships
- Track application status
- Internship completion certificates

### 5. Jobs & Placement Module
- On-campus placement drives
- Off-campus job listings
- Job eligibility checks
- Application management
- Offer letter downloads

### 6. Resume Builder
- ATS-friendly resume generation
- PDF export
- Multiple sections (education, experience, skills, projects)
- Resume versioning

### 7. Admin Dashboard
- Student management
- Course management
- Placement tracking
- Analytics and reports
- Department-wise statistics

### 8. Student Profile
- Personal information
- Academic details (CGPA, department, year)
- Skills and interests
- Social links (GitHub, LinkedIn)
- Resume upload

## Tech Stack

### Frontend
- **Framework**: Angular 21+ (Standalone Components)
- **Styling**: Tailwind CSS
- **State Management**: Angular Signals
- **HTTP**: Angular HttpClient
- **Forms**: Reactive Forms & Template-driven Forms
- **Routing**: Angular Router with Guards

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Security**: CORS, Password Hashing (bcryptjs)
- **File Upload**: Multer
- **Email**: Nodemailer

### Additional Libraries
- **PDF Generation**: PDFKit
- **QR Code**: qrcode
- **HTTP Client**: Axios
- **WebSockets**: Socket.io (for real-time notifications)

## Project Structure

```
cutm-skillbridge/
├── src/
│   ├── app.component.ts           # Main app component
│   ├── app.routes.ts              # Route configuration
│   ├── components/
│   │   ├── pages/
│   │   │   ├── home.component.ts
│   │   │   ├── login.component.ts
│   │   │   ├── register.component.ts
│   │   │   ├── student-profile.component.ts
│   │   │   ├── courses.component.ts
│   │   │   ├── course-detail.component.ts
│   │   │   ├── internships.component.ts
│   │   │   ├── jobs.component.ts
│   │   │   └── resume-builder.component.ts
│   │   ├── dashboard/
│   │   │   ├── dashboard.component.ts
│   │   │   ├── admin-view.component.ts
│   │   │   ├── student-view.component.ts
│   │   │   └── placement-chart.component.ts
│   │   ├── admin/
│   │   │   └── admin-panel.component.ts
│   │   └── layout/
│   │       └── navbar.component.ts
│   └── services/
│       ├── auth.service.ts
│       ├── auth.guard.ts
│       ├── auth.interceptor.ts
│       ├── api.service.ts
│       └── store.service.ts
├── backend/
│   ├── server.ts                  # Express server
│   ├── models/
│   │   ├── User.ts
│   │   ├── Course.ts
│   │   ├── Job.ts
│   │   ├── Internship.ts
│   │   ├── Certificate.ts
│   │   └── Notification.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── courses.ts
│   │   ├── jobs.ts
│   │   ├── internships.ts
│   │   └── admin.ts
│   └── .env.example
├── angular.json
├── tsconfig.json
├── package.json
├── tailwind.config.js
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Frontend Setup

1. **Clone the repository**
```bash
git clone https://github.com/cutm/skillbridge.git
cd cutm-skillbridge
```

2. **Install dependencies**
```bash
npm install
```

3. **Update API endpoints**
Edit `src/services/api.service.ts` and update the base URL:
```typescript
private baseUrl = 'http://localhost:3000/api';
```

4. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:4200`

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Create .env file**
```bash
cp .env.example .env
```

3. **Update .env with your configuration**
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/skillbridge
JWT_SECRET=your_secure_secret_key
NODE_ENV=development
CORS_ORIGIN=http://localhost:4200
```

4. **Install dependencies**
```bash
npm install
```

5. **Start the backend server**
```bash
npm run dev
```

The API will be available at `http://localhost:3000/api`

## Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'student' | 'admin' | 'trainer' | 'recruiter',
  phone: String,
  department: String,
  year: Number,
  createdAt: Date
}
```

### Courses Collection
```javascript
{
  title: String,
  description: String,
  instructor: String,
  category: String,
  duration: String,
  lessons: [{ title, videoUrl, content }],
  enrolledStudents: [ObjectId],
  createdAt: Date
}
```

### Jobs Collection
```javascript
{
  title: String,
  company: String,
  description: String,
  location: String,
  salary: String,
  type: 'Full-time' | 'Internship',
  requirements: [String],
  deadline: Date,
  applications: [ObjectId],
  createdAt: Date
}
```

### Internships Collection
```javascript
{
  title: String,
  company: String,
  description: String,
  skills: [String],
  duration: String,
  stipend: String,
  openings: Number,
  deadline: Date,
  applications: [ObjectId],
  createdAt: Date
}
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses/:id/enroll` - Enroll in course
- `GET /api/courses/:id/progress` - Get course progress

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs/:id/apply` - Apply for job
- `GET /api/placement-drives` - Get placement drives
- `POST /api/placement-drives/:id/register` - Register for drive

### Internships
- `GET /api/internships` - Get all internships
- `POST /api/internships/:id/apply` - Apply for internship

### Certificates
- `GET /api/certificates/my` - Get user certificates
- `GET /api/certificates/:id/download` - Download certificate
- `GET /api/certificates/:id/verify` - Verify certificate

### Admin
- `GET /api/admin/students` - Get all students
- `GET /api/admin/analytics` - Get platform analytics

## Key Features Implementation

### Role-Based Access Control
```typescript
// Protected routes using guards
{
  path: 'admin',
  component: AdminPanelComponent,
  canActivate: [adminGuard]
}
```

### State Management
```typescript
// Using Angular Signals for reactive state
courses = signal<Course[]>([]);
currentUser = signal<User | null>(null);
```

### Form Validation
```typescript
// Reactive forms with custom validators
registrationForm = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]]
});
```

### HTTP Interceptors
```typescript
// Automatic JWT token injection
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken$();
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next.handle(req);
  }
}
```

## Demo Credentials

For testing without backend:
- **Student**: Login with any email, use "demo" login button
- **Admin**: Select "Admin" role and use demo button
- **Trainer**: Select "Trainer" role and use demo button
- **Recruiter**: Select "Recruiter" role and use demo button

## Production Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
```

### Backend (Render/Railway)
1. Set up MongoDB Atlas
2. Configure environment variables
3. Deploy using platform's GitHub integration

## Future Enhancements

- [ ] Discussion forums
- [ ] Live class integration
- [ ] AI-powered resume analyzer
- [ ] Skill recommendations
- [ ] Mock interview platform
- [ ] Video call for interviews
- [ ] Mobile app
- [ ] Blockchain certificates
- [ ] Social networking features

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@cutm.ac.in or create an issue in the repository.

## Acknowledgments

- CUTM Administration
- All contributors and testers
- Open-source community

---

**Made with ❤️ for CUTM Students**
