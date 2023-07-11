const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Thought = require("../models/Thought");

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (error) {
    console.error(error);
    res.send("No users found.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.send("Cannot find user.");
  }
});

router.post("/create", async (req, res) => {
  try {
    if (!req.body || !req.body.username || !req.body.email) {
      return res.status(400).send({
        message: "Bad Request",
        error: "Username and email are required.",
      });
    }
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
    });
    res.send({
      message: "success",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal server error.",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    user.set({
      username: req.body.username,
      email: req.body.email,
    });
    await user.save();
    res.send(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  const result = await user.deleteOne();
  res.send(result);
});

// Friends

router.post("/:userID/friends/:friendID", async (req, res) => {
  const userId = req.params.userID;
  const friendId = req.params.friendID;
  const user = await User.findById(userId);
  const friend = await User.findById(friendId);
  user.friends.push(friend);
  await user.save();
  res.send({
    message: "Friend added successfully.",
    data: user,
  });
});

router.delete("/:userID/friends/:friendID", async (req, res) => {
  const userId = req.params.userID;
  const friendId = req.params.friendID;
  const user = await User.findById(userId);
  const friendIndex = user.friends.indexOf(friendId);
  user.friends.splice(friendIndex, 1);
  await user.save();
  res.send({
    message: "Friend removed successfully.",
    data: user,
  });
});

module.exports = router;
