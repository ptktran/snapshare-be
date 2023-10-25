const express = require("express");
const bodyParser = require("body-parser");
const utils = require("../other/utils");
const supa = require("../other/database.js");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.get("/", async function (req, res) {
    res.send("tes");
    const data = await supa.supaClient.from("test").select();
    console.log(data);
});

app.post("/getUserInfo", async function (req, res) {
    var username = req.body["username"];

    const data = await supa.supaClient
        .from("users")
        .select()
        .eq("username", username);

    res.send(data);
});

app.listen(port, () => {
    console.log(`Listing to port ${port}`);
});
