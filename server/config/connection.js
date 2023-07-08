const mongoose = require("mongoose");
const mongoDb = await mongoose.connect("mongodb://localhost:27017/social", {
  useNewUrlParser: true,
  useUnifiedTechnology: true,
});

module.exports = mongoDb;
