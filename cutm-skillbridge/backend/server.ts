import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skillbridge';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Models
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['student', 'admin', 'trainer', 'recruiter'] },
  phone: String,
  department: String,
  year: Number,
  rollNumber: String,
  employeeNumber: String,
  placementCellId: String,
  trainerId: String,
  createdAt: { type: Date, default: Date.now }
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: String,
  category: String,
  duration: String,
  lessons: [{ title: String, videoUrl: String, content: String }],
  enrolledStudents: [mongoose.Schema.Types.ObjectId],
  createdAt: { type: Date, default: Date.now }
});

const internshipSchema = new mongoose.Schema({
  title: String,
  company: String,
  description: String,
  skills: [String],
  duration: String,
  stipend: String,
  openings: Number,
  deadline: Date,
  applications: [mongoose.Schema.Types.ObjectId],
  createdAt: { type: Date, default: Date.now }
});

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  description: String,
  location: String,
  salary: String,
  type: String,
  requirements: [String],
  deadline: Date,
  applications: [mongoose.Schema.Types.ObjectId],
  createdAt: { type: Date, default: Date.now }
});

const certificateSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  courseId: mongoose.Schema.Types.ObjectId,
  certificateUrl: String,
  qrCode: String,
  completionDate: Date,
  createdAt: { type: Date, default: Date.now }
});

const notificationSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  message: String,
  type: String,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);
const Internship = mongoose.model('Internship', internshipSchema);
const Job = mongoose.model('Job', jobSchema);
const Certificate = mongoose.model('Certificate', certificateSchema);
const Notification = mongoose.model('Notification', notificationSchema);

// Auth Routes
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // In production, use proper password hashing
    const token = 'sample-jwt-token-' + Date.now();
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
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
    } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Name, email, password, and role are required' });
    }

    if (role === 'student' && !rollNumber) {
      return res.status(400).json({ error: 'Roll Number / ERP Number is required for students' });
    }

    if (role === 'admin' && !employeeNumber) {
      return res.status(400).json({ error: 'Employee Number is required for admins' });
    }

    if (role === 'recruiter' && !placementCellId) {
      return res.status(400).json({ error: 'Placement Cell ID is required' });
    }

    if (role === 'trainer' && !trainerId) {
      return res.status(400).json({ error: 'Trainer Employee ID is required' });
    }
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password, // In production, hash this
      role,
      department,
      year,
      rollNumber,
      employeeNumber,
      placementCellId,
      trainerId
    });

    await user.save();

    const token = 'sample-jwt-token-' + Date.now();
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Course Routes
app.get('/api/courses', async (req: Request, res: Response) => {
  try {
    const courses = await Course.find().limit(50);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

app.get('/api/courses/:id', async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    res.json(course);
  } catch (error) {
    res.status(404).json({ error: 'Course not found' });
  }
});

app.post('/api/courses/:id/enroll', async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { enrolledStudents: req.body.userId } },
      { new: true }
    );
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Enrollment failed' });
  }
});

// Internship Routes
app.get('/api/internships', async (req: Request, res: Response) => {
  try {
    const internships = await Internship.find().limit(50);
    res.json(internships);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch internships' });
  }
});

app.post('/api/internships/:id/apply', async (req: Request, res: Response) => {
  try {
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { applications: req.body.userId } },
      { new: true }
    );
    res.json(internship);
  } catch (error) {
    res.status(500).json({ error: 'Application failed' });
  }
});

// Job Routes
app.get('/api/jobs', async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find().limit(50);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.post('/api/jobs/:id/apply', async (req: Request, res: Response) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { applications: req.body.userId } },
      { new: true }
    );
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Application failed' });
  }
});

// Certificate Routes
app.get('/api/certificates/my', async (req: Request, res: Response) => {
  try {
    const certificates = await Certificate.find({ studentId: req.body.userId });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
});

// Notification Routes
app.get('/api/notifications', async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find({ userId: req.body.userId });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
