import express from "express";

import User from "../models/User.js";


// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving users");
  }
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.send("User not found").status(404);
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retriecing user");
  }
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    let newUser = new User({
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    });

    const result = await newUser.save();
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).send("Error adding user");
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };

    const result = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true
    });

    if (!result) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).send("Error updating user");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await User.findByIdAndDelete(userId);

    if (!result) {
      res.status(404).send("User not found");
    } else {
      res.status(200).json({ message: "User deleted successfully", deletedUser: result});
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});

export default router;
