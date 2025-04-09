import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import resourceRoutes from '../routes/resourceRoutes';

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Hi , BitBloom Backend is live! 🚀');
});

app.use('/api/resources', resourceRoutes);


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
