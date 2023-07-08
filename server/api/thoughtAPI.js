const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("thoughts get route");
});

module.exports = router;
