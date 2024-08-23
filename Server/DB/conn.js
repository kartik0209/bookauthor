const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("db connected"))
  .catch((error) => {
    console.log("Error" + error.message);
  });
