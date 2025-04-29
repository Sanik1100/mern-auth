// Importing mongoose library for MongoDB object modeling
import mongoose from "mongoose";

// Defining the user schema (structure of user documents in the database)
const userSchema = new mongoose.Schema({
    // 'name' field of type String, and it is required (cannot be empty)
    name: {
        type: String,
        required: true
    },

    // 'email' field of type String, required, and must be unique (no two users can have same email)
    email: {
        type: String,
        required: true,
        unique: true
    },

    // 'password' field of type String, required to store user's hashed password
    password: {
        type: String,
        required: true
    },

    // 'verifyOtp' field to store the OTP code sent to the user's email during registration verification
    // Default is an empty string if no OTP is generated yet
    verifyOtp: {
        type: String,
        default: ''
    },

    // 'verifyOtpExpiredAt' field to store the timestamp (in milliseconds) when the verification OTP expires
    // Default is 0 (no expiration yet)
    verifyOtpExpiredAt: {
        type: Number,
        default: 0
    },

    // 'isAccountVerified' field to check if the user's email/account is verified
    // Default is false (account not verified initially)
    isAccountVerified: {
        type: Boolean,
        default: false
    },

    // 'resetOtp' field to store the OTP code sent when the user requests a password reset
    // Default is an empty string if no reset OTP is generated
    resetOtp: {
        type: String,
        default: ''
    },

    // 'resetOtpExpiredAt' field to store the timestamp when the reset OTP expires
    // Default is 0 (no expiration yet)
    resetOtpExpiredAt: {
        type: Number,
        default: 0
    },
});

// Checking if 'user' model already exists (useful during hot-reloading in development)
// If not exists, create a new model called 'user' with the defined schema
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

// Exporting the user model to use it in other parts of the application
export default userModel;
