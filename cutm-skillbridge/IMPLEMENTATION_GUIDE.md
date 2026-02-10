# CUTM SkillBridge Implementation Guide

## Project Overview

CUTM SkillBridge is a **complete ed-tech and career platform** with the following modules:

### ✅ Fully Implemented Features

#### 1. **Authentication & Authorization**
- User registration and login
- Role-based access control (RBAC) - Student, Admin, Trainer, Recruiter
- JWT token-based authentication
- Auth guards for route protection
- HTTP interceptor for automatic token injection

#### 2. **Learning Management System (LMS)**
- Course catalog with search and filters
- Course details page
- Progress tracking
- Lesson management
- Quiz and assignments support

#### 3. **Student Features**
- Student profile management
- Resume builder with PDF export
- Course enrollment
- Progress tracking
- Skill and interest management

#### 4. **Internship Module**
- Browse internship opportunities
- Search and filter internships
- Apply for internships
- Track application status
- Duration and stipend filtering

#### 5. **Jobs & Placement Module**
- Job listings
- On-campus placement drives
- Job applications
- Application status tracking
- Offer letter management

#### 6. **Admin Dashboard**
- Student management
- Course management
- Placement tracking
- Analytics and reports
- Department-wise statistics

#### 7. **Public Pages**
- Home page
- Course catalog
- Internship listings
- Job listings
- About page
- Footer with legal links

---

## Architecture Overview

### Frontend Architecture
```
Angular 21+ (Standalone Components)
├── Services (Business Logic)
│   ├── AuthService
│   ├── ApiService
│   ├── StoreService
│   └── Guards
├── Components (UI)
│   ├── Pages
│   ├── Dashboard
│   ├── Admin
│   └── Layout
└── Interceptors
    └── AuthInterceptor
```

### State Management
Uses Angular **Signals** for reactive state:
```typescript
courses = signal<Course[]>([]);
currentUser = signal<User | null>(null);
notifications = signal<Notification[]>([]);
```

### Key Services

#### 1. **AuthService**
- Handles user login/registration
- Token management
- Session handling
- Role checking

#### 2. **ApiService**
- All API calls to backend
- HTTP requests for courses, jobs, internships
- Certificate and notification endpoints

#### 3. **StoreService**
- Global state management
- User data
- Course, job, internship data
- Notifications

#### 4. **Auth Guards**
- `authGuard` - General authentication
- `adminGuard` - Admin only routes
- `studentGuard` - Student only routes
- `trainerGuard` - Trainer only routes
- `recruiterGuard` - Recruiter only routes

---

## Component Structure

### Pages (Student Facing)
1. **Home** (`home.component.ts`) - Landing page
2. **Login** (`login.component.ts`) - Authentication
3. **Register** (`register.component.ts`) - User registration
4. **Dashboard** (`dashboard.component.ts`) - Main dashboard
5. **Courses** (`courses.component.ts`) - Course listing
6. **Course Detail** (`course-detail.component.ts`) - Single course view
7. **Internships** (`internships.component.ts`) - Internship listings
8. **Jobs** (`jobs.component.ts`) - Job listings and drives
9. **Student Profile** (`student-profile.component.ts`) - Profile management
10. **Resume Builder** (`resume-builder.component.ts`) - Resume creation

### Admin Component
- **Admin Panel** (`admin-panel.component.ts`) - Student management, courses, placements, analytics

### Layout
- **Navbar** (`navbar.component.ts`) - Navigation with role-based menu

---

## API Endpoints Structure

### Authentication
```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
```

### Courses
```
GET    /api/courses
GET    /api/courses/:id
POST   /api/courses/:id/enroll
GET    /api/courses/:id/progress
```

### Jobs
```
GET    /api/jobs
POST   /api/jobs/:id/apply
GET    /api/placement-drives
POST   /api/placement-drives/:id/register
```

### Internships
```
GET    /api/internships
POST   /api/internships/:id/apply
GET    /api/internships/applications/my
```

### Certificates
```
GET    /api/certificates/my
GET    /api/certificates/:id/download
GET    /api/certificates/:id/verify
```

### Admin
```
GET    /api/admin/students
GET    /api/admin/courses
GET    /api/admin/analytics
POST   /api/admin/courses (create)
PUT    /api/admin/courses/:id (update)
DELETE /api/admin/courses/:id (delete)
```

---

## Implementation Details

### 1. Authentication Flow
```
User Login
    ↓
AuthService.login()
    ↓
POST /api/auth/login
    ↓
Store token & user in localStorage
    ↓
Update StoreService state
    ↓
Redirect to dashboard
```

### 2. Role-Based Access
```typescript
// In routes
{
  path: 'admin',
  component: AdminPanelComponent,
  canActivate: [adminGuard]
}

// In component
if (this.auth.hasRole('admin')) {
  // Show admin features
}
```

### 3. Data Flow
```
Component
    ↓
ApiService (HTTP call)
    ↓
Backend API
    ↓
Database
    ↓
StoreService (State)
    ↓
Component (Signals)
```

---

## Database Schema (MongoDB)

### User
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String,
  phone: String,
  department: String,
  year: Number,
  createdAt: Date
}
```

### Course
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  instructor: String,
  category: String,
  duration: String,
  lessons: Array,
  enrolledStudents: Array<ObjectId>,
  createdAt: Date
}
```

### Job
```javascript
{
  _id: ObjectId,
  title: String,
  company: String,
  description: String,
  location: String,
  salary: String,
  type: String,
  requirements: Array,
  deadline: Date,
  applications: Array<ObjectId>,
  createdAt: Date
}
```

### Internship
```javascript
{
  _id: ObjectId,
  title: String,
  company: String,
  description: String,
  skills: Array,
  duration: String,
  stipend: String,
  openings: Number,
  deadline: Date,
  applications: Array<ObjectId>,
  createdAt: Date
}
```

### Certificate
```javascript
{
  _id: ObjectId,
  studentId: ObjectId,
  courseId: ObjectId,
  certificateUrl: String,
  qrCode: String,
  completionDate: Date,
  createdAt: Date
}
```

---

## Setup & Running

### Frontend
```bash
npm install
npm run dev    # Development server on localhost:4200
npm run build  # Production build
```

### Backend
```bash
cd backend
npm install
npm run dev    # Server on localhost:3000
```

### Database
```bash
# MongoDB (local)
mongod

# Or use MongoDB Atlas (cloud)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/skillbridge
```

---

## Key Features Implementation

### 1. Search & Filter
All listing pages (courses, jobs, internships) have:
- Text search
- Category/type filters
- Sorting options
- Pagination

### 2. Progress Tracking
- Course progress with percentage
- Assignment tracking
- Quiz attempts and scores
- Certificate generation

### 3. Notifications
- Real-time course updates
- Application status changes
- Deadline reminders
- Placement updates

### 4. Dashboard Analytics
- Student enrollment stats
- Course completion rates
- Placement statistics
- Department-wise breakdown

---

## Responsive Design

All components are built with **Tailwind CSS** for:
- Mobile-first approach
- Tablet and desktop layouts
- Touch-friendly buttons
- Optimized images

---

## Security Features

1. **Authentication**
   - JWT tokens
   - Secure password hashing (bcryptjs)
   - Token expiration checks

2. **Authorization**
   - Role-based access control
   - Route guards
   - API permission checks

3. **Data Protection**
   - HTTPS encryption
   - CORS policy
   - Input validation
   - SQL injection prevention

---

## Performance Optimizations

1. **Frontend**
   - Lazy loading routes
   - Standalone components
   - Signal-based change detection
   - Image optimization

2. **Backend**
   - Database indexing
   - Pagination for large datasets
   - Caching strategies
   - Efficient queries

---

## Testing Approach

### Unit Testing (with Jasmine/Karma)
```typescript
// Example
it('should login user', () => {
  const result = authService.login(credentials);
  expect(result).toBeTruthy();
});
```

### Integration Testing
Test API endpoints and database interactions

### E2E Testing
Test complete user workflows

---

## Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy dist folder
3. Set environment variables

### Backend (Render/Railway/Heroku)
1. Set up MongoDB Atlas
2. Configure environment variables
3. Deploy from GitHub

### Database
- Use MongoDB Atlas for cloud hosting
- Set up backup strategy
- Monitor performance

---

## Future Enhancements

- [ ] Live chat support
- [ ] Video conferencing for interviews
- [ ] AI-powered resume analyzer
- [ ] Skill gap analysis
- [ ] Discussion forums
- [ ] Mobile app
- [ ] Blockchain certificates
- [ ] Social networking
- [ ] Advanced analytics
- [ ] Payment integration

---

## Troubleshooting

### Common Issues

1. **CORS Error**
   - Check backend CORS configuration
   - Update API URL in ApiService

2. **Authentication Issues**
   - Check token storage in localStorage
   - Verify JWT secret
   - Check token expiration

3. **Database Connection**
   - Verify MongoDB URI
   - Check connection string
   - Ensure network access

4. **API Not Working**
   - Check backend server is running
   - Verify endpoints match routes
   - Check request/response format

---

## Code Quality Standards

- Use TypeScript strict mode
- Follow Angular style guide
- Use Reactive Forms
- Implement proper error handling
- Add loading states
- Use consistent naming conventions
- Document complex logic

---

## Contact & Support

For issues or questions:
- Email: support@cutm.ac.in
- GitHub Issues: Create an issue in the repository
- Documentation: Check README.md and this guide

---

**Happy Coding! 🚀**
