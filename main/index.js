const express = require("express");
const app = express();
const utils = require("../other/utils");
const database = require("../other/database");

const port = 3000;

app.get("/", async function (req, res) {
    res.send("Get request recieved");
    await utils.encrypt("Test");
    await utils
        .compareData("Test")
        .then((result) => {
            console.log(result);
            return;
        })
        .catch((err) => {
            console.log(err);
        });

    await utils
        .compareData("test")
        .then((result) => {
            console.log("recieved");
        })
        .catch((err) => {
            console.log(err);
        });
});

app.listen(port, () => {
    console.log(`Listing to port ${port}`);
});
