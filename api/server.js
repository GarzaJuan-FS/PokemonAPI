const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const pokemonRouter = require("./routes/pokemon");
const authRouter = require("./routes/auth");

const app = express();
app.use(
  cors({
    origin: "*", // Allow all origins for development
    credentials: true,
  })
);

const PORT = process.env.PORT || 3001;

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

app.use(express.json());

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Pokemon API is running" });
});

// API routes
app.use("/pokemon", pokemonRouter);
app.use("/auth", authRouter);

// Serve static files from React build
app.use(express.static(path.join(__dirname, "../reactjs/build")));

// Catch all handler: send back React's index.html file for any non-API routes
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../reactjs/build", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
