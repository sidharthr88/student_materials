const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const feedbackRoute = require("./routes/feedbackRoute");


const userRoute = require("./routes/userRoute");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/users", userRoute);
app.use("/feedback", feedbackRoute);


// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });


// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});