const express = require("express");
const utils = require("../other/utils");
const supa = require("../other/database.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = 3000;

app.get("/getUserInfo/:username", async function (req, res) {
    var username = req.params["username"];

    const data = await supa.supaClient
        .from("users123")
        .select()
        .eq("username", username);

    if (data.data.length === 0 || data === null) {
        res.status(404).json({
            status: 404,
            error: "Resource not found",
            data: [],
        });
    } else {
        res.status(200).json({
            status: 200,
            statusText: "OK",
            data: data.data,
        });
    }
});

app.get("/getUsername/:userId", async function (req, res) {
    var userId = req.params["userId"];

    const data = await supa.supaClient
        .from("users123")
        .select("username")
        .eq("user_id", userId);

    if (data === null || data.data.length === 0) {
        res.status(404).json({
            status: 404,
            error: "User not found",
            data: [],
        });
    } else {
        res.status(200).json({
            status: 200,
            statusText: "OK",
            data: data.data,
        });
    }
});

app.get("/getAllPosts", async function (req, res) {
    const data = await supa.supaClient.from("posts").select("*");

    if (data["data"][0] === null || data === null) {
        res.send({
            error: null,
            data: [],
            count: null,
            status: 400,
            statusText: "Error",
        });
        return;
    }

    res.send(data);
});

app.get("/getPost/:postId", async function (req, res) {
    const postId = req.params["postId"];

    const data = await supa.supaClient
        .from("posts")
        .select()
        .eq("post_id", postId);

    if (data.data.length === 0 || data === null) {
        res.status(404).json({
            status: 404,
            error: "Post not found",
            data: [],
        });
    } else {
        res.status(200).json({
            status: 200,
            statusText: "OK",
            data: data.data,
        });
    }
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
        .from("users123")
        .select("user_id")
        .eq("username", username);

    if (data.data.length === 0) {
        res.status(404).json({
            status: 404,
            error: "Resource not found",
            data: [],
        });
        return;
    }

    var userId = data["data"][0]["user_id"];

    const posts = await supa.supaClient
        .from("posts")
        .select()
        .eq("user_id", userId);
    if (posts.data.length === 0) {
        res.status(400).json({
            status: 400,
            statusText: "No posts yet",
        });
    } else {
        res.status(200).json({
            status: 200,
            statusText: "OK",
            data: posts.data,
        });
    }
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

app.get("/getFollowingList/:userID", async function (req, res) {
    var userID = req.params["userID"];

    const followerList = await supa.supaClient
        .from("followers")
        .select("following_id")
        .eq("follower_id", userID);

    res.send(followerList);
});

app.get("/getMessages/:userID", async function (req, res) {
    var userID = req.params["userID"];

    const messageList = await supa.supaClient
        .from("direct_messages")
        .select("*")
        .or(`sendingUserId.eq.${userID},recievingUserId.eq.${userID}`);

    res.send(messageList);
});

app.listen(port, () => {
    console.log(`Listing to port ${port}`);
});
