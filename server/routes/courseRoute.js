import express from 'express';
import { addCourse, getCourse, listCourse, removeCourse, updateCourse } from '../controller/courseController.js';
import upload from '../middleware/multer.js';


const courseRouter = express.Router();

courseRouter.post("/add",addCourse);
courseRouter.get("/list",listCourse);
courseRouter.get("/list/:id",getCourse) 
courseRouter.put("/update/:id",updateCourse)
courseRouter.delete("/remove/:id",removeCourse)



export default courseRouter;