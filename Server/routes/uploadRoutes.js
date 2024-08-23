const express = require("express");
const { upload } = require("../controllers/uploadFileController");
const uploadData = express.Router();

uploadData.post("/api/upload", upload);

module.exports = uploadData;
