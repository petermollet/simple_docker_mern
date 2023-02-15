// person model with mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Person = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    collection: "person",
  }
);

module.exports = mongoose.model("Person", Person);
