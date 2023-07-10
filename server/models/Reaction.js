const mongoose = require("mongoose");
const dayjs = require("dayjs");

const reactionSchema = new mongoose.Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => {
      const dateFormat = dayjs(date).format("MM/DD/YYYY hh:mm A");
      return dateFormat;
    },
  },
});

module.exports = reactionSchema;
