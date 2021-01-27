const mongoose = require("mongoose");

//Item Model Schema
const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
});

module.exports = mongoose.model("Item", Schema);
