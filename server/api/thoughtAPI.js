const express = require("express");
const Thought = require("../models/Thought");
const Reaction = require("../models/Reaction");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const thought = await Thought.find();
    res.send(thought);
  } catch (error) {
    console.error(error);
    res.send("No thoughts found.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const thoughtId = req.params.id;
    const thought = await Thought.findById(thoughtId);
    res.send(thought);
  } catch (error) {
    console.error(error);
    res.send("Cannot find thought.");
  }
});

router.post("/create", async (req, res) => {
  try {
    const post = await Thought.create({
      thoughtText: req.body.thoughtText,
      userName: req.body.userName,
      userId: req.body.userId,
    });
    const result = await post.save();
    res.send({ message: "success", data: result });
  } catch (error) {
    res.send({ message: "there was an error", error: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const thoughtId = req.params.id;
    const thought = await Thought.findById(thoughtId);
    thought.set({
      thoughtText: req.body.thoughtText,
      userName: req.body.userName,
    });
    await thought.save();
    res.send(thought);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  const thoughtId = req.params.id;
  const thought = await Thought.findById(thoughtId);
  const result = await thought.deleteOne();
  res.send(result);
});

// Reactions

router.post("/:thoughtId/reactions", async (req, res) => {
  console.log(req.params.thoughtId);
  try {
    const thoughtId = req.params.thoughtId;
    const { reactionBody, username } = req.body;

    console.log("Request Body:", req.body);
    if (!reactionBody || !username) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const reaction = {
      reactionBody: reactionBody,
      username: username,
    };
    console.log(reaction);
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }
    console.log(thought);
    thought.reactions.push(reaction);
    await thought.save();
    res.json({ success: true, message: "Reaction added to thought" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;
    // use _id value
    const reactionId = req.params.reactionId;

    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    const reaction = thought.reactions.find(
      (reaction) => reaction._id.toString() === reactionId
    );
    if (!reaction) {
      return res.status(404).json({ error: "Reaction not found" });
    }

    thought.reactions.pull(reaction);
    await thought.save();

    res.json({ success: true, message: "Reaction deleted from thought" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
