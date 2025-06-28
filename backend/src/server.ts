import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import resourceRoutes from './routes/resourceRoutes';
import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';
import questionRoutes from './routes/questionRoutes';
import paymentRoutes from './routes/paymentRoutes';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;


const allowedOrigins = ['http://localhost:5173', 'https://bit-bloom.netlify.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.options('*', cors());


app.use((req, res, next) => {
  console.log(`📩 [${req.method}] ${req.url} | Origin: ${req.headers.origin}`);
  next();
});

app.use(express.json());


app.use('/api/resources', resourceRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/coding' , questionRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/test', (req: Request, res: Response) => {
  res.json({ message: 'BitBloom backend working fine ✅' });
});


app.get('/', (req: Request, res: Response) => {
  res.send('Hi, BitBloom Backend is live! 🚀');
});


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
