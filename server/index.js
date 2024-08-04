import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes.js';
import profileRoutes from './routes/ProfileRoutes.js';
import ConnectionRoutes from './routes/ConnectionRoutes.js';

dotenv.config();
const app=express();
const PORT=process.env.PORT || 5000;
const dataBase_URL=process.env.MONGO_URI;
const origin=process.env.ORIGIN || 'http://localhost:3000';


app.use(cors(
    {
        origin:origin,
        credentials:true
    }
));
app.use(cookieParser());
app.use(express.json());
app.use("/image", express.static("/uploades/profile-image"));


app.get('/',(req,res)=>{
    res.send('Server is running');
})

/* Routes*/
app.use('/api/auth',authRoutes);
app.use('/api/profile',profileRoutes);
app.use('/api/connection',ConnectionRoutes);





/* DataBase Connection*/ 
mongoose.connect(dataBase_URL).then(()=>{
    console.log('Database Connected');
}).catch((error)=>{
    console.log('Error:',error.message);
})


/* Server Start*/ 
app.listen(PORT,()=>{
    console.log('Server is running on port',PORT);
});





