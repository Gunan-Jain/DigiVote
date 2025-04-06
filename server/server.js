import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // Import CORS

const app = express();

// Enable CORS for all origins (Temporary Fix)
app.use(cors());

// OR (Recommended) Allow only your frontend origin
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only frontend origin
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json()); // Parse JSON requests

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://gunanjain809:v413ySsA1Iw9kw7h@cluster0.wfmhx.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};
connectDB();

// User Schema
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

// Registration Route
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

    // Check if user already exists
    const existingUser = await User.findOne({ epicNumber });
    if (existingUser)
      return res.status(400).json({ message: "User already registered" });

    // Create new user
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
    res.status(500).json({ message: "Server error", error });
  }
});

// Verification Route
app.post("/api/verify", async (req, res) => {
  try {
    const { epicNumber, fullName, dateOfBirth } = req.body;

    // Find user
    const user = await User.findOne({ epicNumber, fullName, dateOfBirth });
    if (!user)
      return res
        .status(404)
        .json({ message: "Verification failed. User not found." });

    // Mark user as verified
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "User verified successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/api/check-voter", async (req, res) => {
  try {
    const { epicNumber, phoneNumber } = req.body;

    const user = await User.findOne({ epicNumber, phoneNumber });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Voter not found. Please check your details." });
    }

    res.status(200).json({ message: "Voter found" });
  } catch (error) {
    console.error("Error checking voter:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
