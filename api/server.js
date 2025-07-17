const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const pokemonRouter = require("./routes/pokemon");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

app.use(express.json());
app.use("/pokemon", pokemonRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
