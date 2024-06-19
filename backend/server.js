import user from "./user.js";
import like from "./like.js";
import post from "./post.js";

import express from "express";
import { Op } from "@sequelize/core";

import cors from "cors";

const app = express();

const PORT = 3001;

app.use(express.json());
app.use(cors());

// ////////////////////////////////////////////////////////////////////////////

app.get("/all_users", async (req, res) => {
  try {
    const users = await user.findAll();
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "error for /all_users" });
  }
});

app.get("/all_users/:userId", async (req, res) => {
  try {
    const id = req.params.userId;
    const item = await user.findByPk(id, {
      include: [{ model: post }],
    });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log("error for /all_users/:id", err.message);
  }
});

// ////////////////////////////////////////////////////////////////////////////

app.get("/posts", async (req, res) => {
  try {
    const item = await post.findAll({
      include: [
        {
          model: user,
        },
        {
          model: like,
        },
      ],
    });
    res.json(item);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/posts/:postId", async (req, res) => {
  try {
    const id = req.params.postId;
    const item = await post.findByPk(id, {
      include: [{ model: user }, { model: like }],
    });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Post Not Found" });
    }
  } catch (err) {
    console.log(err.message);
  }
});

// //////////////////////////////////////////////////////////////////////////////////

app.get("/like", async (req, res) => {
  try {
    const item = await like.findAll();
    res.json(item);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "error for /like" });
  }
});

app.post("/like", async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const post_id = req.body.post_id;

    const existingLike = await like.findOne({
      where: {
        user_id: { [Op.eq]: user_id },
        post_id: { [Op.eq]: post_id },
      },
    });

    if (existingLike) {
      return res.status(409).json({ message: "Post already liked" });
    }

    await like.create({
      user_id,
      post_id,
    });

    res.status(201).json({ message: "Post liked successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error liking post" });
  }
});

app.delete("/like/:like_id", async (req, res) => {
  try {
    const id = req.params.like_id;
    await like.destroy({ where: { id: id } });
  } catch (err) {
    console.log("error for deleting /like/:like_id", err.message);
  }
});

app.listen(PORT);
