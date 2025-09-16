import express from 'express';

import { addNewDatatoStudent, deleteCourse, deletePaidAmount, deletePayment, deleteStdCourse, getStdDetails, getStudent, isAuthenticated, listStudent, login, logout, removeStudent, resetPassword, sendResetOtp, sendVerifyOtp, updateStudent, verifyEmail } from '../controller/studentController.js';
import { register } from '../controller/studentController.js'
import userAuth from '../middleware/userAuth.js';
import upload from '../middleware/multer.js';

const studentRouter = express.Router();

studentRouter.post("/register",register);
studentRouter.post("/login",login);
studentRouter.post("/logout",logout);
studentRouter.post("/send-verify-otp",userAuth,sendVerifyOtp)
studentRouter.post("/verify-account",userAuth,verifyEmail)
studentRouter.get("/is-auth",userAuth,isAuthenticated)
studentRouter.post("/send-reset-otp",sendResetOtp)
studentRouter.post("/reset-password",resetPassword)

// studentRouter.post("/add",addStudent);
studentRouter.get("/list",listStudent)
studentRouter.get("/list/:id",getStudent)
studentRouter.get("/:studentId/course/:courseId/details",getStdDetails)
studentRouter.delete("/:studentId/course/:courseId/paidfee/:paidId",deletePaidAmount)
studentRouter.delete("/:studentId/course/:courseId",deleteStdCourse)

studentRouter.delete("/remove/:id",removeStudent)
studentRouter.put("/update/:id", upload.single("studentpic"), updateStudent)
studentRouter.put("/addnew/:id",addNewDatatoStudent)

// studentRouter.post("/create-payment-intent", createPaymentIntent)

studentRouter.delete("/payment/:id",deletePayment)
studentRouter.delete("/:studentId/course/:courseId",deleteCourse)

export default studentRouter;