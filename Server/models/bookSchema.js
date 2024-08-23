const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  isbnCode: {
    type: String,
    require: true,
  },

  authorId: mongoose.Schema.Types.ObjectId,
});

const bookDataSchema = new mongoose.model("bookData", bookSchema);
module.exports = bookDataSchema;
