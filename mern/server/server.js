import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express();

// Logging middleware: Logs the HTTP method and URL for every incoming request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next()
});

app.use(cors());
app.use(express.json());

// Mongoose Connection in app.js
async function connectDB() {
  try {
    const mongoUri = process.env.ATLAS_URI || "";
    if (!mongoUri) {
      console.error("ATLAS_URI is not defined!");
      process.exit(1);
    }
    await mongoose.connect(mongoUri); // Simplified for Mongoose 6+
    console.log("MongoDB connected with Mongoose!");

    // Set up Mongoose event listeners here if desired
    mongoose.connection.on('error', err => console.error(`Mongoose connection error: ${err}`));

  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

connectDB(); // Call the connection function when the app starts

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.use("/record", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
