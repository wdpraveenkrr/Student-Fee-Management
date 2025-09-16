import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  stdId:{ type: String , required: true },
  items:{type:Array,required:true},
  studentname: { type: String, required: true}, // just for display, not unique
  courseId: { type: String, required: true},
  courseName: { type: String , required: true },
  paidAmount: { type: Number, required: true }
  
}, { timestamps: true, versionKey: false });


const paymentModel = mongoose.models.payment || mongoose.model("payment",paymentSchema);
export default paymentModel;
