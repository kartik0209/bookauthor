const authorDataSchema = require("../models/authorSchema");
const bookDataSchema = require("../models/bookSchema");

exports.upload = async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: "Invalid input data. Expected a non-empty array." });
    }

    const authors = [];
    const books = [];

    for (const item of data) {
      const { authorName, authorEmail, authorDOB, bookName, bookISBN } = item;

      if (!authorName || typeof authorName !== 'string') {
        return res.status(400).json({ message: "Invalid or missing author name." });
      }

      if (!authorEmail || typeof authorEmail !== 'string' || !/^\S+@\S+\.\S+$/.test(authorEmail)) {
        return res.status(400).json({ message: "Invalid or missing author email." });
      }

      if (!authorDOB || isNaN(Date.parse(authorDOB))) {
        return res.status(400).json({ message: "Invalid or missing author date of birth." });
      }

      if (!bookName || typeof bookName !== 'string') {
        return res.status(400).json({ message: "Invalid or missing book name." });
      }

      let author = await authorDataSchema.findOne({ email: authorEmail });
      if (!author) {
        author = new authorDataSchema({
          name: authorName,
          email: authorEmail,
          dateOfBirth: new Date(authorDOB),
        });
        authors.push(author);
      }

      let book = await bookDataSchema.findOne({ isbnCode: bookISBN });
      if (!book) {
        book = new bookDataSchema({
          name: bookName,
          isbnCode: bookISBN,
          authorId: author._id,
        });
        books.push(book);
      } else {
        return res.status(400).json({ message: `Book with ISBN ${bookISBN} already exists. Skipping upload.` });
      }
    }

    if (authors.length > 0) await authorDataSchema.insertMany(authors);
    console.log(authors);
    
    if (books.length > 0) await bookDataSchema.insertMany(books);
    console.log(books);
    
    res.json({ message: "Data uploaded successfully" });
  } catch (error) {
    console.error("Error uploading data:", error);
    res.status(500).json({ message: "Error uploading data" });
  }
};
