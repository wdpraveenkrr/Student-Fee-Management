import express from 'express'
import adminAuth from '../middleware/adminAuth.js';
import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from '../controller/adminController.js';


const  adminRouter = express.Router();

  adminRouter.post("/register",register)
  adminRouter.post("/login",login)
  adminRouter.post("/logout",logout)
  adminRouter.post("/send-verify-otp",adminAuth,sendVerifyOtp)
  adminRouter.post("/verify-account",adminAuth,verifyEmail)
  adminRouter.get("/is-auth",adminAuth,isAuthenticated)
  adminRouter.post("/send-reset-otp",sendResetOtp)
  adminRouter.post("/reset-password",resetPassword)

export default  adminRouter

