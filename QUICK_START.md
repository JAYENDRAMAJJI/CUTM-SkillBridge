# Quick Start Guide

## ⚡ Get Started in 30 Seconds

### 1. Start Frontend
Open a terminal in the cloned repository folder first, then run:
```bash
git clone https://github.com/cutm/skillbridge.git
cd cutm-skillbridge
npm install
npm run dev
```

If you get `ENOENT` or `Could not read package.json`, your terminal is not inside the project directory yet.

### 2. Test Demo Login
1. Go to http://localhost:4200
2. Click **Login** button in navbar
3. Select a role: **Student**, **Admin**, **Trainer**, or **Recruiter**
4. Click **"Login as [Role]"**
5. Explore the dashboard!

### 3. Try Different Roles
- **Student**: Full course access, internships, jobs, resume builder
- **Admin**: Student management, placements, analytics
- **Trainer**: Course management
- **Placement Cell**: Job postings and applications

---

## 📊 Available Pages

### Everyone Can See
- ✅ Home page (`/`)
- ✅ Courses page (`/courses`)
- ✅ Course details (`/courses/:id`)
- ✅ Internships page (`/internships`)
- ✅ Jobs page (`/jobs`)
- ✅ Login/Register pages

### Authenticated Users
- ✅ Dashboard (`/dashboard`) - Role-specific
- ✅ Student Profile (`/profile`)
- ✅ Resume Builder (`/resume-builder`)
- ✅ Admin Panel (`/admin`)

---

## 🔧 Common Commands

### Development
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend (Optional)
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install --legacy-peer-deps

# Start backend server
npm run dev
```

---

## 📂 Key Files to Know

| File | Purpose |
|------|---------|
| `src/app.component.ts` | Root component with layout |
| `src/app.routes.ts` | All route definitions |
| `src/services/store.service.ts` | Demo data & state management |
| `src/services/auth.guard.ts` | Route protection |
| `src/components/pages/login.component.ts` | Demo login |
| `src/components/dashboard/` | Role-specific dashboards |

---

## 🎨 Styling

- **Framework**: Tailwind CSS (via CDN)
- **Colors**: Custom theme in `index.html`
- **Responsive**: Mobile-first design
- **Icons**: SVG inline

---

## ❓ FAQ

**Q: Do I need MongoDB?**
A: No for demo mode. Yes if you want persistent data.

**Q: Can I customize the demo users?**
A: Yes! Edit `src/services/store.service.ts` → `mockUsers` object

**Q: How do I add new routes?**
A: Edit `src/app.routes.ts` and add components to `src/components/pages/`

**Q: How do I deploy?**
A: Run `npm run build` and deploy the `dist/` folder to any static host

---

## 🎯 Next Steps

1. **Explore**: Test all features with different user roles
2. **Customize**: Edit components to match your design
3. **Backend**: Connect to MongoDB for real data (optional)
4. **Deploy**: Build and deploy to production

---

**Status**: ✅ Fully Operational
**Last Updated**: February 4, 2026
**Frontend Port**: 4200
**Backend Port**: 3000 (when running)
