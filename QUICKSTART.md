# Quick Start Guide - CUTM SkillBridge

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js v18+
- MongoDB (local or cloud)
- Git

---

## Step 1: Clone & Install

```bash
# Clone repository
git clone https://github.com/cutm/skillbridge.git
cd cutm-skillbridge

# Install dependencies
npm install
```

---

## Step 2: Start Frontend (No Backend Required)

```bash
# Development server
npm run dev

# Open browser
# http://localhost:4200
```

✅ **Frontend works without backend!** Click "Demo Login" button to test.

---

## Step 3 (Optional): Setup Backend

```bash
# Open new terminal
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB connection
MONGODB_URI=mongodb://localhost:27017/skillbridge

# Start server
npm run dev

# Server runs on http://localhost:3000
```

---

## Step 4 (Optional): Setup MongoDB

### Option A: Local MongoDB
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Linux
sudo apt-get install -y mongodb

# Windows
# Download from https://www.mongodb.com/try/download/community
```

### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Copy connection string
5. Update `MONGODB_URI` in `.env`

---

## Testing the Application

### Demo Credentials

**No password needed!** Just use the demo login:

1. **Student Account**
   - Click "Demo Student" button
   - Access: Courses, Jobs, Internships, Resume Builder

2. **Admin Account**
   - Click "Demo Admin" button
   - Access: Admin Dashboard, Analytics

3. **Trainer Account**
   - Select "Trainer" and click demo

4. **Recruiter Account**
   - Select "Recruiter" and click demo

---

## Key Pages to Test

### Public Pages
- `http://localhost:4200/#/` - Home page
- `http://localhost:4200/#/courses` - Courses
- `http://localhost:4200/#/internships` - Internships
- `http://localhost:4200/#/jobs` - Jobs

### After Login (Student)
- `http://localhost:4200/#/dashboard` - Dashboard
- `http://localhost:4200/#/profile` - Student Profile
- `http://localhost:4200/#/resume-builder` - Resume Builder
- `http://localhost:4200/#/courses` - Course Listing

### Admin Only
- `http://localhost:4200/#/admin` - Admin Dashboard

---

## Project Structure

```
cutm-skillbridge/
├── src/
│   ├── components/
│   │   ├── pages/        # All pages
│   │   ├── dashboard/    # Dashboard components
│   │   ├── admin/        # Admin components
│   │   └── layout/       # Navigation
│   └── services/         # Business logic
├── backend/              # Express server
├── angular.json          # Angular config
├── tsconfig.json         # TypeScript config
└── package.json          # Dependencies
```

---

## Development Workflow

### Make Changes

1. **Add a new page**
   ```typescript
   // Create src/components/pages/my-page.component.ts
   
   // Add route in src/app.routes.ts
   { path: 'my-page', component: MyPageComponent }
   ```

2. **Add a service**
   ```typescript
   // Create src/services/my.service.ts
   
   // Inject in component
   constructor(private myService: MyService) {}
   ```

3. **Update styles**
   - Uses Tailwind CSS
   - Customize in component template

### Live Reload
- Changes auto-reload on save
- Check terminal for errors
- Open browser DevTools (F12)

---

## Useful Commands

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Format code
npm run format

# Lint code
npm run lint
```

---

## Environment Variables

### Frontend (.env not needed - uses localhost:3000)

### Backend (.env file required)
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/skillbridge
JWT_SECRET=your_secret_key
NODE_ENV=development
CORS_ORIGIN=http://localhost:4200
```

---

## Common Issues & Solutions

### Issue: Port 4200 already in use
```bash
# Kill process on port 4200
# macOS/Linux
lsof -i :4200 | grep LISTEN | awk '{print $2}' | xargs kill

# Windows
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

### Issue: npm install fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: API requests failing
- Check backend is running: http://localhost:3000/api/health
- Verify CORS settings in backend
- Check network tab in DevTools

---

## Next Steps

1. **Read Documentation**
   - [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Detailed setup
   - [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Architecture details

2. **Explore Code**
   - Start with `src/services/auth.service.ts`
   - Check `src/components/pages/login.component.ts`
   - Review `src/services/store.service.ts`

3. **Customize**
   - Update colors in Tailwind config
   - Modify API endpoints
   - Add new features

4. **Deploy**
   - Frontend: Vercel/Netlify
   - Backend: Render/Railway
   - Database: MongoDB Atlas

---

## Get Help

- 📖 Read docs
- 🐛 Check GitHub issues
- 📧 Email support@cutm.ac.in
- 💬 Create GitHub discussion

---

## What's Included

✅ Complete Authentication System
✅ Learning Management System
✅ Course Catalog with Details
✅ Internship Module
✅ Jobs & Placement Module
✅ Resume Builder
✅ Student Profile Management
✅ Admin Dashboard
✅ Notifications System
✅ Responsive UI
✅ Mock Data (no backend needed)
✅ Role-Based Access Control

---

## Technologies Used

- **Frontend**: Angular 21+, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Auth**: JWT, bcryptjs
- **Tools**: Vite, Docker (optional)

---

**You're all set! Happy coding! 🎉**
