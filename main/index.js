const express = require("express");
const utils = require("../other/utils");
const supa = require("../other/database.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    if (data[0] != null) {
        data["data"][0]["password_hash"] = "";
    }

    res.send(data);
});

app.post("/signUpUserInfo", async function (req, res) {
    var username = req.body["username"];
    var email = req.body["email"];
    var passwordHash = req.body["password_hash"];
    var bio = req.body["bio"];
    var pic = req.body["img_url"];

    const { error } = await supa.supaClient.from("users").insert({
        username: username,
        email: email,
        password_hash: passwordHash,
        user_bio: bio,
        profile_picture_url: pic,
    });
});

app.post("/getLikeAmount");

app.listen(port, () => {
    console.log(`Listing to port ${port}`);
});
