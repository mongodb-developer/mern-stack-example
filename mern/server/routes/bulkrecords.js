import express from "express";
import db from "../db/connection.js";

const router = express.Router();


router.get("/", async (req, res) => {
    let collection = await db.collection("uploadExcel");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  });

// Endpoint for handling bulk Excel uploads
router.post("/", async (req, res) => {
  const jsonData = req.body;
  
  if (!jsonData || jsonData.length === 0) {
    return res.status(400).json({ message: "No data provided" });
  }

  try {
    // Insert the data into MongoDB (assuming MongoDB connection is set up)
    const result = await db.collection("uploadExcel").insertMany(jsonData);
    res.status(200).json({ message: "Data uploaded successfully", result });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ message: "Error inserting data", error: err.message });
  }
});

// Endpoint to delete all records from the collection
router.delete("/", async (req, res) => {
    try {
      const result = await db.collection("uploadExcel").deleteMany({});
      res.status(200).json({ message: "All records deleted successfully", result });
    } catch (err) {
      console.error("Error deleting records:", err);
      res.status(500).json({ message: "Error deleting records", error: err.message });
    }
  });

export default router;
