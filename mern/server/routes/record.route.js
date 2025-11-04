import express from "express";
import {
  createRecord, // Importing controller function to create a new record
  deleteRecordById, // Importing controller function to delete a record by ID
  getAllRecords, // Importing controller function to fetch all records
  getRecordById, // Importing controller function to fetch a record by ID
  updateRecordById, // Importing controller function to update a record by ID
} from "../controllers/records.controller.js";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// Route to fetch all records
router.get("/", getAllRecords);

// Route to fetch a single record by its ID
router.get("/:id", getRecordById);

// Route to create a new record
router.post("/", createRecord);

// Route to update a record by its ID
router.patch("/:id", updateRecordById);

// Route to delete a record by its ID
router.delete("/:id", deleteRecordById);

export default router;
