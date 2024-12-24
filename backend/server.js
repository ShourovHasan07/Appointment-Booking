import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// App configuration
const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()

// Middlewares
app.use(express.json()); // Parses incoming JSON requests
app.use(cors());         // Enables Cross-Origin Resource Sharing (CORS)

// API endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

//localhost : 4000/api/admin/add-doctor 

app.get('/', (req, res) => {
  res.send('API IS WORKING GREAT ');
});

// Server listening
app.listen(port, () => console.log('server started', port));
