const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Data = require("./models/Data");

dotenv.config();
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Atlas MongoDB Connected"))
  .catch(err => console.error(" MongoDB Error:", err));

// Routes
app.post("/data", async (req, res) => {
  try {
    const { name, value } = req.body;
    const newData = await Data.create({ name, value });
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ error: "Failed to create data" });
  }
});

app.get("/data", async (req, res) => {
  try {
    const allData = await Data.find();
    res.json(allData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

module.exports = app;
