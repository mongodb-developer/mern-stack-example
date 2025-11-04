// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// Controller function to fetch all records
export const getAllRecords = async (req, res) => {
  try {
    // Get the "records" collection
    let collection = await db.collection("records");

    // Fetch all documents from the collection and convert them to an array
    let results = await collection.find({}).toArray();

    // Send the results as a JSON response with a success status code
    res.status(200).send(results);
  } catch (error) {
    // Handle errors and send an error response with a 500 status code
    res.status(500).send({ message: "Error fetching records", error });
  }
};

// Controller function to fetch a single record by its ID
export const getRecordById = async (req, res) => {
  try {
    // Get the "records" collection
    let collection = await db.collection("records");

    // Construct a query to find a record by its ObjectId
    let query = { _id: new ObjectId(req.params.id) };

    // Find the record matching the query
    let result = await collection.findOne(query);

    // If no record is found, send a "Not found" response with a 404 status code
    if (!result) {
      res.status(404).send("Not found");
    } else {
      // Send the found record as a JSON response with a success status code
      res.status(200).send(result);
    }
  } catch (error) {
    // Handle errors and send an error response with a 500 status code
    console.error(err);
    res.status(500).send({ message: "Error fetching record", error });
  }
};

// Controller function to create a new record
export const createRecord = async (req, res) => {
  try {
    // Create a new document based on the request body
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };

    // Get the "records" collection
    let collection = await db.collection("records");

    // Insert the new document into the collection
    let result = await collection.insertOne(newDocument);

    // Send the result of the insertion as a JSON response with a success status code
    res.status(201).send(result);
  } catch (err) {
    // Handle errors and send an error response with a 500 status code
    console.error(err);
    res.status(500).send("Error adding record");
  }
};

// Controller function to update a record by its ID
export const updateRecordById = async (req, res) => {
  try {
    // Construct a query to find a record by its ObjectId
    const query = { _id: new ObjectId(req.params.id) };

    // Define updates to be applied to the record
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };
    // Get the "records" collection
    let collection = await db.collection("records");

    // Update the record matching the query with the specified updates
    let result = await collection.updateOne(query, updates);

    // Send the result of the update operation as a JSON response with a success status code
    res.status(200).send(result);
  } catch (err) {
    // Handle errors and send an error response with a 500 status code
    console.error(err);
    res.status(500).send("Error updating record");
  }
};

// Controller function to delete a record by its ID
export const deleteRecordById = async (req, res) => {
  try {
    // Construct a query to find a record by its ObjectId
    const query = { _id: new ObjectId(req.params.id) };

    // Get the "records" collection
    const collection = db.collection("records");

    // Delete the record matching the query
    let result = await collection.deleteOne(query);

    // Send the result of the deletion as a JSON response with a success status code
    res.status(200).send(result);
  } catch (err) {
    // Handle errors and send an error response with a 500 status code
    console.error(err);
    res.status(500).send("Error deleting record");
  }
};
