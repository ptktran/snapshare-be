const express = require("express");
const app = express();

const port = 3000;

app.get("/", function (req, res) {
    res.send("Get request recieved");
});

app.listen(port, () => {
    console.log(`Listing to port ${port}`);
});
