import mongoose from "mongoose";
const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log("✅ Database Connected Successfully");
    });

    mongoose.connection.on('error', (err) => {
      console.error("❌ Database Connection Error:", err);
    });

    await mongoose.connect(process.env.MONGODB_URI);

  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};

export default connectDB;
{/*
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on('connected', () => {
      console.log("✅ Database Connected Successfully");
    });

  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};

export default connectDB;
*/}

