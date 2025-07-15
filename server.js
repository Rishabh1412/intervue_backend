const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const morgan = require("morgan");

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL, // your frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// DB Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
