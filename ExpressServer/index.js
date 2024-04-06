import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { logger } from "./middleware/logger.js";

const app = express();
const PORT = 3000;

app.use(logger);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Me</h1><p>My name is Kushagra.</p>");
});

app.get("/contact", (req, res) => {
  res.send(
    "<h1>Contact Me</h1><p>Contact me on kushagrakapoor27@gmail.com</p>"
  );
});

app.use("/register", express.static("public"));

app.post("/register", (req, res) => {
  console.table(req.body);
  res.status(200).send(req.body);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
