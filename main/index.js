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

app.get("/GetUserInfo", async function (req, res) {
    const data = await supa.supaClient
        .from("users")
        .select()
        .eq("username", "John_larry");

    res.send(data);
});

app.listen(port, () => {
    console.log(`Listing to port ${port}`);
});
