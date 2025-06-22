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

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://bit-bloom.netlify.app',
    'https://bitbloom-1zw8.onrender.com'
  ],
  credentials: true
}));



app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Hi , BitBloom Backend is live! 🚀');
});

app.use('/api/resources', resourceRoutes);
app.use("/api/auth", userRoutes);
app.use('/api/project' , projectRoutes);


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});


