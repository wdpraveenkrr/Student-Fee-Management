import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    studentpic: { type: String, default:''},
    name: { type: String, required: true },
    studid: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyOtp: { type: String, default: '' },
    verifyOtpExpireAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: '' },
    resetOtpExpireAt: { type: Number, default: 0 },  
    studentdob: { type: Date, default: '' },
    studentgender: { type: String, default: '' },
    studenteducation: { type: String, default: '' },
    studentbloodgroup: { type: String, default: ''},
    studentmobileno: { type: Number, default: ''},
    studentaddress: { type: String, default: ''},
    studentCourseDetails: [
        {
            coursename: { type: String },
            courseduration: { type: Number },
            coursefee: { type: Number },
            paidfee: [{
                paid: {
                    type: Number,
                    default: 0

                },
                paiddate: {
                    type: Date,
                }
            }]
        }
    ]
})

const studentModel = mongoose.models.student || mongoose.model("student", studentSchema);
export default studentModel;