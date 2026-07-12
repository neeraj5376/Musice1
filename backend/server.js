require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const songRoutes = require("./routes/songRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/uploads/images", express.static("uploads/images"));
app.use("/uploads/songs", express.static("uploads/songs"));

app.use("/api/songs", songRoutes);
app.use("/api/auth", authRoutes);

/* Error Handler */
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File size must be less than 50MB",
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});