const express = require("express");
const utils = require("../other/utils");
const supa = require("../other/database.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.get("/getUserInfo/:username", async function (req, res) {
    var username = req.params["username"];

    const data = await supa.supaClient
        .from("users")
        .select()
        .eq("username", username);

    if (data["data"][0] != null) {
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
    if (error == null) {
        res.send({
            error: null,
            data: [],
            count: null,
            status: 200,
            statusText: "OK",
        });
    } else {
        console.log(error);
        res.send({
            error: null,
            data: [error],
            count: null,
            status: 400,
            statusText: "Error",
        });
    }
});

app.post("/getLikeAmount");

app.listen(port, () => {
    console.log(`Listing to port ${port}`);
});
