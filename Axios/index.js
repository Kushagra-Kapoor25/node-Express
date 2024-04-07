import axios from "axios";
import express from "express";
import "dotenv/config";
import morgan from "morgan";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { generateApiKey } from "./module/generateApiKey.js";

const app = express();
const baseURL = "https://api.api-ninjas.com/v1/facts";
const PORT = 3000;
const API_KEY = process.env.API_KEY;
const headers = {
  "X-Api-Key": API_KEY,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logDirectory = join(__dirname, "logs");
const accessLogStream = fs.createWriteStream(join(logDirectory, "access.log"), {
  flags: "a",
});

app.use(morgan("combined", { stream: accessLogStream }));
app.use("/", express.static("public"));

const getFacts = async (limit = 1) => {
  const params = {
    limit: limit,
  };

  const config = {
    params,
    headers,
  };

  try {
    const res = await axios.get(baseURL, config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

app.get("/", (req, res) => {
  res.redirect("/getFacts");
});

app.get("/generateApiKey", (req, res) => {
  const apiKey = generateApiKey();
  res.send({
    apiKey: apiKey,
  });
});

app.get("/getFacts", async (req, res) => {
  const facts = await getFacts(req.query.limit);
  res.send(facts);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
