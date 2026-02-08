require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const rateLimiter = require("./middleware/rateLimiter");
const dataRoutes = require("./routes/dataRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

// Apply rate limiter: 5000 requests per minute
app.use(rateLimiter(60 * 1000, 5000));

app.use("/api/data", dataRoutes);

app.get("/health", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
