# CUTM SKILL BRIDGE 🎓

> **Learn • Certify • Intern • Get Placed**

A comprehensive all-in-one platform for students to learn new skills, get certified, find internships, and secure placements at top companies.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Documentation](#-documentation)

---

## ✨ Features

### 🔐 Authentication & Security
- Secure user registration and login
- Role-based access control (RBAC)
- JWT token-based authentication
- Password encryption and reset

### 📚 Learning Management System (LMS)
- Course catalog with search
- Video lectures and materials
- Assignments and quizzes
- Progress tracking
- Certificates

### 💼 Internship & Jobs
- 50+ internship opportunities
- Job listings and placement drives
- Application tracking
- Offer letter management

### 📄 Resume Builder
- ATS-friendly resume creation
- PDF export
- Multiple sections
- Real-time preview

### 👤 Student Profile & Dashboard
- Personal information management
- Academic details
- Skills and interests
- Resume storage

### 📊 Admin Dashboard
- Student management
- Course management
- Placement tracking
- Analytics and reports

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Angular 21+ (Standalone Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Angular Signals
- **HTTP**: Angular HttpClient

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Auth**: JWT + bcryptjs

---

## 🚀 Quick Start

### 1. Install & Run Frontend
```bash
npm install
npm run dev
```
Frontend: `http://localhost:4200`

### 2. Test with Demo Login
- Click role button (Student, Admin, Trainer, or Placement Cell)
- No backend or database needed!

### 3. Setup Backend (Optional)
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
Backend: `http://localhost:3000`

---

## 📁 Key Features

✅ Complete Authentication System
✅ Learning Management System  
✅ Course Catalog  
✅ Internship Module  
✅ Jobs & Placement Module  
✅ Resume Builder  
✅ Student Profile Management  
✅ Admin Dashboard  
✅ Role-Based Access Control  
✅ Responsive UI  
✅ Mock Data (no backend needed)  

---

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 5 minutes
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed setup and deployment
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Architecture and code structure

---

## 🔗 Project Structure

```
src/
├── components/          # UI components
│   ├── pages/          # All pages
│   ├── dashboard/      # Dashboard
│   ├── admin/          # Admin panel
│   └── layout/         # Navigation
└── services/           # Business logic
    ├── auth.service.ts
    ├── api.service.ts
    └── store.service.ts

backend/                # Express server
├── server.ts
├── models/
└── routes/
```

---

## 📡 API Endpoints

All endpoints start with `/api`

**Auth**: `/auth/login`, `/auth/register`, `/auth/forgot-password`  
**Courses**: `/courses`, `/courses/:id`, `/courses/:id/enroll`  
**Jobs**: `/jobs`, `/jobs/:id/apply`, `/placement-drives`  
**Internships**: `/internships`, `/internships/:id/apply`  
**Certs**: `/certificates/my`, `/certificates/:id/download`  
**Admin**: `/admin/students`, `/admin/analytics`  

---

## 🎯 Demo Users

No password needed! Use demo login buttons:
- **Student** - Access courses, jobs, internships
- **Admin** - Access admin dashboard
- **Trainer** - Manage courses
- **Recruiter** - Post jobs

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

---

## 📞 Support

- **Email**: support@cutm.ac.in
- **GitHub Issues**: Create an issue
- **Docs**: Check documentation files

---

## 📄 License

MIT License - see LICENSE file for details

---

<div align="center">

**Made with ❤️ by CUTM Development Team**

[View Full Documentation](./SETUP_GUIDE.md) • [Quick Start](./QUICKSTART.md)

</div>

