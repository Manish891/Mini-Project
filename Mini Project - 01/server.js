require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

// Enhanced CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:5173"], // Adjust based on frontend deployment
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("MongoDB URI is missing in .env file!");
  process.exit(1);
}

const client = new MongoClient(mongoURI);
let usersCollection;

// MongoDB Connection with Retry Mechanism
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB at:", mongoURI);
    const db = client.db("expense_tracker");
    usersCollection = db.collection("users");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    setTimeout(connectDB, 5000); // Retry after 5 seconds
  }
}
connectDB();

//  User Signup (Without Password Hashing)
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!email.endsWith("@gmail.com")) {
      return res.status(400).json({ error: "Email must be a @gmail.com address" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    if (password.length < 6 || password.length > 8) {
      return res.status(400).json({ error: "Password must be between 6 and 8 characters" });
    }

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    await usersCollection.insertOne({ name, email, password });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Server error during signup" });
  }
});

// User Login (Without Password Hashing)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersCollection.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
});

// Get User by Email
app.get("/user/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await usersCollection.findOne({ email }, { projection: { name: 1, email: 1 } });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ error: "Server error retrieving user" });
  }
});

// Forgot Password (Random Password + Email)
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await usersCollection.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    const newPassword = Math.random().toString(36).slice(-8);
    await usersCollection.updateOne({ email }, { $set: { password: newPassword } });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset - Expense Tracker",
      text: `Your new password is: ${newPassword}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "New password sent to your email" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ error: "Server error during password reset" });
  }
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
