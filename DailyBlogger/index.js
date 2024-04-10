import express from "express";
import { db, executeQuery } from "./module/db.js";

const app = express();
const port = 3000;

// Attach middleware
app.use(express.urlencoded({ extended: true }));

try {
  db.connect();
  console.log("Database connected.");
} catch (error) {
  console.error("Database connection failed", error);
  throw error;
}

app.get("/getPosts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const value = [id];
    const post = await executeQuery(
      "SELECT * FROM public.blogs WHERE id = $1",
      value
    );

    if (post.length !== 0) {
      res.status(200).send(post);
    } else {
      res.status(404).send({ error: 404, message: "post not found" });
    }
  } catch (error) {
    console.error("Parsing failed for path: ", req.params.id);
    res.status(404).send({ error: 404, message: "path does not exist" });
  }
});

app.get("/getPosts", async (req, res) => {
  const posts = await executeQuery(
    "SELECT * FROM public.blogs ORDER BY id ASC "
  );

  if (posts.length !== 0) {
    res.status(200).send(posts);
  } else {
    res.status(404).send({ error: 404, message: "no posts exist" });
  }
});

app.post("/addPost", async (req, res) => {
  const { post, author } = req.body;
  const data = [post, author];

  const newPost = await executeQuery(
    "INSERT INTO public.blogs (post, author) VALUES($1, $2) RETURNING *",
    data
  );
  res.status(200).send({ message: "post created", created_post: newPost[0] });
});

app.put("/posts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedPost = req.body.post;
    const author = req.body.author;
    const value = [updatedPost, author, id];

    const post = await executeQuery(
      "UPDATE public.blogs SET  post = $1, author = $2 WHERE id = $3 RETURNING *",
      value
    );

    if (post.length !== 0) {
      res.status(200).send({ message: "post updated" });
    } else {
      res
        .status(404)
        .send({ error: 404, message: `post with id ${id} does not exist` });
    }
  } catch (error) {
    console.error("Parsing failed for path: ", req.params.id);
    res.status(404).send({ error: 404, message: "path does not exist" });
  }
});

app.delete("/deletePosts/all", async (req, res) => {
  try {
    const post = await executeQuery("DELETE FROM public.blogs RETURNING *");

    if (post.length !== 0) {
      res.status(200).send({ message: "all posts deleted" });
    } else {
      res.status(404).send({ error: 404, message: "no posts exist" });
    }
  } catch (error) {
    res.status(404).send({ error: 404, message: "could not delete all posts" });
  }
});

app.delete("/deletePosts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const value = [id];

    const post = await executeQuery(
      "DELETE FROM public.blogs WHERE id = $1 RETURNING *",
      value
    );

    if (post.length !== 0) {
      res.status(200).send({ message: "post deleted" });
    } else {
      res
        .status(404)
        .send({ error: 404, message: `post with id ${id} does not exist` });
    }
  } catch (error) {
    console.error("Parsing failed for path: ", req.params.id);
    res.status(404).send({ error: 404, message: "path does not exist" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
