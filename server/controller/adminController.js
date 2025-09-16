import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transporter from '../config/nodemailer.js';
import adminModel from '../model/adminModel.js';


export const register = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "Missing Details" })
    }

    try {

        const existingUser = await adminModel.findOne({ email })

        if (existingUser) {
            return res.json({ success: false, message: "user already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new adminModel({ name, email, password: hashedPassword })
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

// user Login 

export const login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Missing Details.." })
    }

    try {

        const user = await  adminModel.findOne({email})

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


// logout


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

// send verificatin 

export const sendVerifyOtp = async (req, res) => {
    try {

        // const { userId } = req.body;

        // console.log(userId);


        const user = await  adminModel.findById(req.userId)

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

// verify Email 

export const verifyEmail = async (req, res) => {

    const { userId, otp } = req.body

    console.log(req.userId);
    

    console.log(req.body);
    
    

    if (!(req.userId) || !otp) {
        return res.json({ success: false, message: "Missing Details" })
    }

    try {
        const user = await  adminModel.findById(req.userId)

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

// is Authenticated

export const isAuthenticated = async (req, res) => {

    try {
        return res.json({ success: true })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// reset OTP

export const sendResetOtp = async (req, res) => {

    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: "Email is required" })
    }

    try {

        const user = await  adminModel.findOne({ email });
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

        const user = await  adminModel.findOne({ email })

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