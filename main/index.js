const express = require("express");
const cors = require("cors");
const utils = require("../other/utils");
const supa = require("../other/database.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

app.post("/updateUserInfo", async function (req, res) {
    var username = req.body["username"];
    var newUsername = req.body["newUsername"];
    var email = req.body["email"];
    var bio = req.body["bio"];
    var pic = req.body["img_url"];

    const { error } = await supa.supaClient
        .from("users")
        .update({
            username: newUsername,
            email: email,
            user_bio: bio,
            profile_picture_url: pic,
        })
        .eq("username", username);

    if (error == null) {
        res.send({
            error: null,
            data: [],
            count: null,
            status: 200,
            statusText: "OK",
        });
    } else {
        res.send({
            error: null,
            data: [error],
            count: null,
            status: 400,
            statusText: "Error",
        });
    }
});

app.get("/getUserPosts/:username", async function (req, res) {
    var username = req.params["username"];

    const data = await supa.supaClient
        .from("users")
        .select("user_id")
        .eq("username", username);

    if (data["data"][0] == null) {
        res.send({
            error: null,
            data: [],
            count: null,
            status: 400,
            statusText: "Error",
        });
        return;
    }

    var userId = data["data"][0]["user_id"];

    const posts = await supa.supaClient
        .from("posts")
        .select()
        .eq("user_id", userId);
    res.send(posts);
});

app.get("/getTotalFollowers/:username", async function (req, res) {
    var username = req.params["username"];

    const data = await supa.supaClient
        .from("users")
        .select("user_id")
        .eq("username", username);

    if (data["data"][0] == null) {
        res.send({
            error: null,
            data: ["User does not exist"],
            count: null,
            status: 400,
            statusText: "Error",
        });
        return;
    }

    var userId = data["data"][0]["user_id"];

    const { count, error } = await supa.supaClient
        .from("followers")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId);
    res.send({
        error: null,
        data: [count.toString()],
        count: null,
        status: 200,
        statusText: "OK",
    });
});

app.get("/getFollowerList/:username", async function (req, res) {
    var username = req.params["username"];

    const data = await supa.supaClient
        .from("users")
        .select("user_id")
        .eq("username", username);

    if (data["data"][0] == null) {
        res.send({
            error: null,
            data: ["User does not exist"],
            count: null,
            status: 400,
            statusText: "Error",
        });
        return;
    }

    var userId = data["data"][0]["user_id"];

    const followingUsers = await supa.supaClient
        .from("followers")
        .select("follower_user_id")
        .eq("user_id", userId);

    var arr = [];

    for (let i = 0; i < followingUsers["data"].length; i++) {
        const followingUsername = await supa.supaClient
            .from("users")
            .select("username")
            .eq("user_id", followingUsers["data"][i]["follower_user_id"]);

        arr.push(followingUsername);
    }

    res.send(arr);
});

app.listen(port, () => {
    console.log(`Listing to port ${port}`);
});
