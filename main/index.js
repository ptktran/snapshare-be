const express = require("express");
const app = express();
const utils = require("../other/utils");
const database = require("../other/database");

const port = 3000;

app.get("/", function (req, res) {
    res.send("Get request recieved");
});

app.listen(port, () => {
    console.log(`Listing to port ${port}`);
});
