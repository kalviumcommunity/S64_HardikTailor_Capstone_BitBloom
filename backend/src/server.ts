import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import resourceRoutes from './routes/resourceRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Hi , BitBloom Backend is live! 🚀');
});

app.use('/api/resources', resourceRoutes);
app.use("/api/auth", userRoutes);


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});


