const express = require("express");
const router = express.Router();
const thoughtAPI = require("./thoughtAPI");
const userAPI = require("./userAPI");

router.use("/thoughts", thoughtAPI);
router.use("/user", userAPI);

module.exports = router;
