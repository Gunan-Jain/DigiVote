import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import EmployeeModel from "./models/employee.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Configure middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Database Connection
// Database Connection
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};
connectDB();

// Employee Routes
app.post("/register", async (req, res) => {
  try {
    const employees = await EmployeeModel.create(req.body);
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) return res.status(404).json("No record exists");
    if (user.password !== password)
      return res.status(401).json("Incorrect password");
    res.json("Success");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User Schema and Model
const UserSchema = new mongoose.Schema({
  epicNumber: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, required: true },
  state: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});
const User = mongoose.model("User", UserSchema);

// User Routes
app.post("/api/register", async (req, res) => {
  try {
    const {
      epicNumber,
      fullName,
      dateOfBirth,
      address,
      phoneNumber,
      gender,
      state,
    } = req.body;

    const existingUser = await User.findOne({ epicNumber });
    if (existingUser)
      return res.status(400).json({ message: "User already registered" });

    const newUser = new User({
      epicNumber,
      fullName,
      dateOfBirth,
      address,
      phoneNumber,
      gender,
      state,
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/verify", async (req, res) => {
  try {
    const { epicNumber, fullName, dateOfBirth } = req.body;
    const user = await User.findOne({ epicNumber, fullName, dateOfBirth });

    if (!user)
      return res
        .status(404)
        .json({ message: "Verification failed. User not found." });

    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: "User verified successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/check-voter", async (req, res) => {
  try {
    const { epicNumber, phoneNumber } = req.body;
    const user = await User.findOne({ epicNumber, phoneNumber });

    if (!user) return res.status(404).json({ message: "Voter not found" });

    res.status(200).json({ message: "Voter found" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
