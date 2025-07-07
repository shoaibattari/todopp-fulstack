import dotenv from "dotenv";
import express from "express";
import routes from "./routes/router.js";
import mongoose, { connect } from "mongoose";
import cors from "cors";
const app = express();
const port = 3001;
dotenv.config();
const dbURI = process.env.MONGODB_URI;
app.use(cors());
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(dbURI)
  .then(() => console.log("database connected succes"))
  .catch((err) => console.log("database connection failed"));

app.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.use(routes);

app.listen(port, () => {
  console.log(`app start on port ${port}`);
});
