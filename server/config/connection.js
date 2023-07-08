const mongoose = require("mongoose");
const mongoDb = mongoose.connect("mongodb://localhost:27017/social", {
  useNewUrlParser: true,
});

module.exports = mongoDb;
