const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", function (req, res) {
  res.send("working");
});

app.get("/create", async function (req, res) {
  let user = await userModel.create({
    username: "shaggy",
    age: 25,
    email: "shrotri@gmail.com",
  });

  res.send(user);
});

app.get("/post/create", async function (req, res) {
  let post = await postModel.create({
    postdata: "hello bhai saryane",
    user: "667c0e4de24e588b06e44f5d",
  });

  let user = await userModel.findOne({ _id: "667c0e4de24e588b06e44f5d" });

  user.posts.push(post._id);
  await user.save();
  res.send({ post, user });
});

app.listen(5000);
