import dotenv from "dotenv";
import express from "express";
import routes from "./routes/indexRoutes.js";
import cors from "cors";
import connectDB from "./config/db.js";
import notificationAPI from "notificationapi-node-server-sdk";

const app = express();
const port = 3001;
dotenv.config();
app.use(cors());
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // ✅ /uploads/images accessible honge

notificationAPI.init(
  "7ir1r7lcvtlknal8j9pnsbw7eg",
  "ngpcn6mf22hf2g1jf54tncizvpjb3aia682no23mpkwzsic0mwfdcaa0s5"
);

connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.use(routes);

app.listen(port, () => {
  console.log(`app start on port ${port}`);
});
