import express from "express";
import cors from "cors";
import userRouter from "./router/userRouter.js";
import { errorHandler } from "./middleware/index.js";
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello there");
});
app.use("/users", userRouter);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(" 😀 the server is run on port " + PORT);
});
