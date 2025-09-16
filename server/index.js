import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import studentRouter from './routes/studentRoute.js';
import courseRouter from './routes/courseRoute.js';
import paymentRouter from './routes/paymentRoute.js';
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoute.js';
import path from 'path'
import adminRouter from './routes/adminRoute.js';


dotenv.config();

const app = express();
const port = 4000;
const url = process.env.MONGOURL;   




// ⬇️ Increase body size limit (example: 10 MB)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser())

const corsOptions = {
  origin: /\.onrender\.com$/,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
 credentials: true  };
app.use(cors(corsOptions));


// db connection

mongoose.connect(url).then(()=>{
    console.log("DB Connected");    
})

app.use("/api/student",studentRouter)
app.use("/api/course",courseRouter)
app.use("/api/payment",paymentRouter)
app.use("/api/admin",adminRouter)
app.use("/api/user",userRouter)

app.use("/uploads", express.static(path.join(process.cwd(), "Uploads")));

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`);
    
})

app.get("/",(req,res)=>{
    res.send("Api Working...")
})
