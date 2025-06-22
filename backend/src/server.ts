import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import resourceRoutes from './routes/resourceRoutes';
import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS middleware must be first
app.use(cors({
  origin: ['http://localhost:5173', 'https://bit-bloom.netlify.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ✅ Log all incoming requests
app.use((req, res, next) => {
  console.log(`📩 [${req.method}] ${req.url}`);
  next();
});

app.use(express.json());

// ✅ Test route to confirm backend is live
app.get('/test', (req: Request, res: Response) => {
  res.json({ message: 'Test route working 🚀' });
});

// ✅ Main API routes
app.use('/api/resources', resourceRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/project', projectRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hi , BitBloom Backend is live! 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
