import express from 'express';
import { addPayment, getPayment, listPayment, removePayment } from '../controller/paymentController.js';


const paymentRouter = express.Router();

paymentRouter.post("/add-payment",addPayment)
paymentRouter.get("/list",listPayment)
paymentRouter.get("/list/:id",getPayment)
paymentRouter.delete("/remove/:id",removePayment)

export default paymentRouter;