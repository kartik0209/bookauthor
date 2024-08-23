require("dotenv").config();

const express = require("express");
const app = express();

require("./DB/conn");

const cors = require("cors");
const bodyParser = require("body-parser");
const uploadData = require("./routes/uploadRoutes");
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(uploadData);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
