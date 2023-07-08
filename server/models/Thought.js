const mongoose = require("../config/connection");
const dayjs = require("dayjs");
const reactionSchema = require("./Reaction");

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => {
      const dateFormat = dayjs(date).format("MM/DD/YYYY hh:mm A");
      return dateFormat;
    },
  },
  userName: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

module.exports = mongoose.model("Thought", thoughtSchema);
