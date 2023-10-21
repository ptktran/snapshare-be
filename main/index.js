const express = require("express");
const app = express();

const utils = require("../other/utils");
const supa = require("../other/database.js");

const port = 3000;

app.get("/", async function (req, res) {
    res.send("tes");
    const data = await supa.supaClient.from("test").select();
    console.log(data);
});

app.listen(port, () => {
    console.log(`Listing to port ${port}`);
});
