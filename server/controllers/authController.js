// Import bcryptjs to hash passwords
import bcrypt from 'bcryptjs';
// Import jsonwebtoken to create tokens for authentication
import jwt from 'jsonwebtoken';
// Import the user model to interact with the database
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

// Controller to handle user registration
export const register = async (req, res) => {
    // Destructure name, email, and password from request body
    const { name, email, password } = req.body;

    // Check if any field is missing
    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing Details' });
    }

    try {
        // Check if a user already exists with the provided email
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        // If user doesn't exist, hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object with hashed password
        const user = new userModel({ name, email, password: hashedPassword });

        // Save the new user to the database
        await user.save();

        // Create a JWT token with the user's ID and secret key, valid for 7 days
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set the token in a cookie to maintain user session
        res.cookie('token', token, {
            httpOnly: true, // Cookie can't be accessed via JavaScript
            secure: process.env.NODE_ENV === 'production', // Send cookie over HTTPS in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Cookie policy depending on environment
            maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expires in 7 days
        });
        async function sendEmail() {
            try {
              const mailOptions ={
                from: `sanikkarmacharya1000@gmail.com <${process.env.EMAIL_USER}>`,  // Sender's email
                to: 'sanik001002@gmail.com',  // Recipient's email
                subject: 'Welcome To My Project',  // Subject
                text:`Welcome to my personal Project.Your account has been created with email id: ${email}`
               
              };
              const info=await transporter.sendMail(mailOptions);
          
              console.log('Email sent successfully:', info.messageId);
            } catch (error) {
              console.error('Error sending email:', error);
            }
          }
          
          sendEmail();

        // Respond with success message
        return res.json({ success: true });

    } catch (err) {
        // If there is any server error, return the error message
        res.json({ success: false, message: err.message });
    }
}

// Controller to handle user login
export const login = async (req, res) => {
    // Destructure email and password from request body
    const { email, password } = req.body;

    // Check if any field is missing
    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are required' });
    }

    try {
        // Find the user by email
        const user = await userModel.findOne({ email });

        // If user is not found, return error
        if (!user) {
            return res.json({ success: false, message: 'Invalid email' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        // If password doesn't match, return error
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' });
        }

        // If password matches, create a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set the token in a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Respond with success message
        return res.json({ success: true });

    } catch (err) {
        // If there is any server error, return the error message
        res.json({ success: false, message: err.message });
    }
}

// Controller to handle user logout
export const logout = async (req, res) => {
    try {
        // Clear the token cookie to log the user out
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        // Respond with success message
        return res.json({ success: true, message: 'Logged Out' });

    } catch (err) {
        // Optional: You can handle error here if needed
    }
} 
//Send Verification OTP to the user's email
export const sendVerifyOtp=async(req,res)=>{
    try{
        // const {userId}=req.body; 
        const userId = req.user.id;   // ✅ no destructuring from req.body

        const user=await userModel.findById(userId);
        if(user.isAccountVerified){
            return res.json({success:false, message:"Account already Verified"});

        }
        const otp= String(Math.floor(100000 + Math.random() * 900000)); // generates 6 digit random number that is otp
        user.verifyOtp = otp;
        user.verifyOtpExpiredAt= Date.now()+ 24*60*60*1000
        await user.save(); 
        const mailOptions={
            from: `sanikkarmacharya1000@gmail.com <${process.env.EMAIL_USER}>`,  // Sender's email
                to: user.email,  // Recipient's email
                subject: 'Account Verification OTP',  // Subject
                text:`Your OTP is ${otp}. Verify your account using these OTP`
        }
        await transporter.sendMail(mailOptions); // send email
        return res.json({success:true, message:'Verification OTP sent on email'});

    }catch(error){
       return res.json({success:false, message:error.message});

    }
}
export const verifyEmail= async(req,res)=>{
    const {userId,otp}=req.body;
    if(!userId || !otp){
        return res.json({success:false, message:'Missing Details'});
    }
    try{
        const user=await userModel.findById(userId); // finding user from userid
        if(!user){
            return res.json({ success:false, message:'User not found'});
        }
        if(user.verifyOtp==='' || user.verifyOtp!== otp){
            return res.json({ success:false, message:'Invalid OTP'});
        }
        if(user.verifyOtpExpiredAt<Date.now()){
            return res.json({success:false,message:'OTP Expired'}); 
        }
        user.isAccountVerified=true;
        user.verifyOtp='';
        user.verifyOtpExpiredAt=0;
        await user.save();
        return res.json({success:true,message:'Email verified successfully'});

    }catch(error){
        res.json({success:false, message:error.message});
    }
}