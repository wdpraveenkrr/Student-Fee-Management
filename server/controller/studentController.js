import studentModel from "../model/studentModel.js";
import jwt from 'jsonwebtoken'
import transporter from "../config/nodemailer.js";
import bcrypt from 'bcrypt'

//


export const register = async (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" })
  }



  try {

    const existingUser = await studentModel.findOne({ email })

    if (existingUser) {
      return res.json({ success: false, message: "user already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const randomId = "PI" + Math.floor(100000 + Math.random() * 900000);

    const user = new studentModel({ studid: randomId, name, email, password: hashedPassword })
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    const mailOptions = {
      from: 'wdpraveenkrr@gmail.com',
      to: email,
      subject: 'Welcome to Prince Institution',
      text: `Welcome to Prince Institution. Your account has been created with email id ${email}`

    }

    await transporter.sendMail(mailOptions);

    return res.json({ success: true })

  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}


// user login


export const login = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Missing Details.." })
  }

  try {

    const user = await studentModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: "Invalid Email.." })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password.." })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })



    return res.json({ success: true })


  } catch (error) {
    res.json({ success: false, message: error.message })
  }

}


// user logout

export const logout = async (req, res) => {

  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
    })

    return res.json({ success: true, message: "Logged Out" })

  } catch (error) {
    res.json({ success: false, message: error.message })
  }

}


export const sendVerifyOtp = async (req, res) => {
  try {

    // const { userId } = req.body;

    // console.log(userId);


    const user = await studentModel.findById(req.userId)

    // console.log(user);


    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account Already Verified" })
    }

    const otp = String(Math.floor(100000 + (Math.random() * 900000)));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + (24 * 60 * 60 * 1000)

    await user.save();

    const mailOption = {
      from: 'wdpraveenkrr@gmail.com',
      to: user.email,
      subject: 'Account Verification OTP',
      text: `Your OTP is ${otp}. your account using this OTP`

    }

    await transporter.sendMail(mailOption)

    return res.json({
      success: true,
      message: "OTP sent successfully to your email",
    });

  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}


export const verifyEmail = async (req, res) => {

  const { userId, otp } = req.body

  console.log(req.userId);


  console.log(req.body);



  if (!(req.userId) || !otp) {
    return res.json({ success: false, message: "Missing Details" })
  }

  try {
    const user = await studentModel.findById(req.userId)

    if (!user) {
      return res.json({ success: false, message: "User not found" })
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid Otp" })
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP is Expired" })
    }

    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;
    await user.save()

    return res.json({ success: true, message: "Email verified Successfully" })

  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}


export const isAuthenticated = async (req, res) => {

  try {
    return res.json({ success: true })

  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}


export const sendResetOtp = async (req, res) => {

  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" })
  }

  try {

    const user = await studentModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not  fount" })
    }

    const otp = String(Math.floor(100000 + (Math.random() * 900000)));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + (15 * 60 * 1000)

    await user.save()


    const mailOption = {
      from: 'wdpraveenkrr@gmail.com',
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP for resetting your password is ${otp}. use this OTP to proceed with resetting your password`

    }

    await transporter.sendMail(mailOption)

    return res.json({
      success: true,
      message: "OTP sent to your email",
    });



  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// reset user Password

export const resetPassword = async (req, res) => {

  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({ success: false, message: "Email, OTP and New Password are required" })
  }

  try {

    const user = await studentModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: "User not found" })
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid Otp" })
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashedPassword;
    user.resetOtp = '';
    user.resetOtpExpireAt = 0;

    await user.save()

    return res.json({ success: true, message: "Password has been reset successfully" })


  } catch (error) {
    res.json({ success: false, message: error.message })
  }

}




// const addStudent = async (req, res) => {

//   try {

//     const { studentpic, studentId, studentname, studentemail, studentpassword,
//       studentdob, studentgender, studenteducation, studentbloodgroup,
//       studentmobileno, studentaddress } = req.body;


//     if (!studentpic || !studentId || !studentname || !studentemail || !studentpassword ||
//       !studentdob || !studentgender || !studenteducation ||
//       !studentbloodgroup || !studentmobileno || !studentaddress
//     ) {
//       return res.json({ success: false, message: "Missing Details.." })
//     }

//     const studentData = {
//       studentpic, studentId, studentname, studentemail, studentpassword,
//       studentdob, studentgender, studenteducation, studentbloodgroup,
//       studentmobileno, studentaddress
//     };

//     const newStudent = new studentModel(studentData);
//     await newStudent.save();

//     res.json({ success: true, message: "Student Added" })

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, error: error.message })
//   }

// }

// export { addStudent }


const listStudent = async (req, res) => {
  try {
    const student = await studentModel.find({});
    res.json({ success: true, data: student })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

export { listStudent }



// getParticular course

const getStudent = async (req, res) => {

  try {
    const { id } = req.params; // Get ID from URL
    const astudent = await studentModel.findById(id); // Find user

    if (!astudent) {
      return res.json({ success: false, message: "Course not found" });
    }

    res.json({ success: true, data: astudent });
  } catch (err) {
    res.json({ success: false, message: "Invalid ID format", error: err.message });
  }
}
export { getStudent }

// get particular student's course details  

const getStdDetails = async (req, res) => {

  try {
    const { studentId, courseId } = req.params; // Get ID from URL
    const student = await studentModel.findById(studentId).select("studentCourseDetails"); // Find user

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    const course = student.studentCourseDetails.id(courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const totalPaid = course.paidfee.reduce((sum, fee) => sum + fee.paid, 0);

    res.json({
      success: true, data: {
        ...course.toObject(),
        totalPaid
      }
    });


  } catch (err) {
    res.json({ success: false, message: "Invalid ID format", error: err.message });
  }
}
export { getStdDetails }

// delete student particular course

const deleteStdCourse = async (req, res) => {

  try {
    const { studentId, courseId, paidId } = req.params; // Get ID from URL
    const student = await studentModel.findById(studentId).select("studentCourseDetails"); // Find user

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    const course = student.studentCourseDetails.id(courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    course.deleteOne(); // ✅ remove subdocument
    await student.save();

    res.json({
      success: true,
      message: "Course deleted successfully",
      updatedCourse: student
    });


  } catch (err) {
    res.json({ success: false, message: "Invalid ID format", error: err.message });
  }
}
export { deleteStdCourse }




// delete paid amount

const deletePaidAmount = async (req, res) => {

  try {
    const { studentId, courseId, paidId } = req.params; // Get ID from URL
    const student = await studentModel.findById(studentId).select("studentCourseDetails"); // Find user

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    const course = student.studentCourseDetails.id(courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const paidFee = course.paidfee.id(paidId);
    if (!paidFee) {
      return res.status(404).json({ success: false, message: "Paid amount not found" });
    }

    paidFee.deleteOne(); // ✅ remove subdocument
    await student.save();

    res.json({
      success: true,
      message: "Paid amount deleted successfully",
      updatedCourse: course
    });


  } catch (err) {
    res.json({ success: false, message: "Invalid ID format", error: err.message });
  }
}
export { deletePaidAmount }




const removeStudent = async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.id);
    await studentModel.findByIdAndDelete(student);
    res.json({ success: true, message: "Course Removed" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })

  }
}

export { removeStudent }




// update the course list

const updateStudent = async (req, res) => {

  try {

    const id = req.params.id;

    const studentExist = await studentModel.findOne({ _id: id })
    if (!studentExist) {
      return res.json({ message: "Course not found" });
    }

    const updateData = {...req.body}

    if(req.file){
      updateData.studentpic = req.file.filename;
    }

    const updatedStudent = await studentModel.findByIdAndUpdate(
      id,   // which course to update
      updateData,        // new data
      { new: true }    // return updated object  );
    )

    res.json({ success: true, updatedStudent });

  } catch (error) {
    res.json({ message: "Error updating course", error });
  }

}
export { updateStudent }




const addNewDatatoStudent = async (req, res) => {
  try {

    const id = req.params.id;
    const newfield = req.body;

    const studentExist = await studentModel.findOne({ _id: id })
    if (!studentExist) {
      return res.json({ message: "Course not found" });
    }

    const updatedStudent = await studentModel.findByIdAndUpdate(
      id,   // which course to update
      { $push: { studentCourseDetails: newfield } },        // new data
      { new: true }    // return updated object  );
    )

    res.json({ updatedStudent });

  } catch (error) {
    res.json({ message: "Error updating course", error });
  }
}

export { addNewDatatoStudent }



const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;  // get payment id from URL

    const deletedPayment = await studentModel.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    res.json({ success: true, message: "Payment deleted successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { deletePayment }



const deleteCourse = async (req, res) => {


  try {
    const { studentId, courseId } = req.params;

    // Pull the course by its _id
    const updatedStudent = await studentModel.findOneAndUpdate(
      { studentId },
      { $pull: { studentCourseDetails: { _id: courseId } } },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: "Student or course not found" });
    }

    res.json({
      success: true,
      message: "Course deleted successfully",
      data: updatedStudent
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { deleteCourse }