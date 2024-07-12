import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import useRoute from "./routes/users.js";
import videoRoute from "./routes/videos.js";
import commentRoute from "./routes/comments.js";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const PORT = process.env.PORT || 8800;
const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected successfully...!!"))
  .catch((err) => {
    throw err;
  });

app.use(cookieParser());
app.use(express.json());
app.use(
  cors()
);

app.use("/api/auth", authRoute);
app.use("/api/users", useRoute);
app.use("/api/videos", videoRoute);
app.use("/api/comments", commentRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something Went to Wrong...!!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`Server connected with PORT ${PORT}...!!`);
});
