const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
  },

  dateOfBirth: {
    type: String,
    require: true,
  },
});

const authorDataSchema = new mongoose.model("authorData", authorSchema);
module.exports = authorDataSchema;
