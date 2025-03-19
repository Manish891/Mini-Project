require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI;
const client = new MongoClient(mongoURI);
let usersCollection;

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("expense_tracker");  
    usersCollection = db.collection("users");  
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
}
connectDB();

// 🚀 Signup Route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "All fields are required" });

  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) return res.status(400).json({ error: "User already exists" });

  await usersCollection.insertOne({ name, email, password });
  res.status(201).json({ message: "User registered successfully" });
});

 
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await usersCollection.findOne({ email });

  if (!user || user.password !== password) return res.status(401).json({ error: "Invalid credentials" });

  res.status(200).json({ message: "Login successful", user });
});

 
app.get("/user/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await usersCollection.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

 
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

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email Error:", error);
        return res.status(500).json({ error: "Failed to send email" });
      }
      res.status(200).json({ message: "New password sent to your email" });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
