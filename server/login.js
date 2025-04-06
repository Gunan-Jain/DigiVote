import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import EmployeeModel from "./models/employee.js"; // Add .js extension for ES module
const PORT = process.env.PORT || 5009;


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://gunanjain809:v413ySsA1Iw9kw7h@cluster0.wfmhx.mongodb.net/"
);

app.post("/register", async (req, res) => {
  try {
    const employees = await EmployeeModel.create(req.body);
    res.json(employees);
  } catch (err) {
    res.json(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email, password);

  try {
    const user = await EmployeeModel.findOne({ email: email });
    if (user) {
      res.json(
        user.password === password ? "Success" : "Password is Incorrect"
      );
    } else {
      res.json("No record existed");
    }
  } catch (err) {
    res.json(err);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
