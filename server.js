// the package
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { auth, errorHandler, notFound } from "./middleware/index.js";
// import controllers

import {
  addUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "./controllers/users.controller.js";

// call the express
const app = express();
dotenv.config();
// the middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5001;
console.log(process.env.DB_URL);
// the routers

app.get("/", (req, res) => {
  console.log("my first request");
  res.send("my first request");
});

//! without router
// app.get("/users/all", auth, getAllUsers);
// app.get("/users/:id", getUserById);
// app.post("/users/add", addUser);
// app.delete("/users/:id", deleteUserById);
// app.put("/users/:id", updateUserById);
//! with router
app.use("/users", usersRouter);

// page not found middleware

app.use(notFound);
// middleware error
app.use(errorHandler);
// listen on port
app.listen(PORT, () => {
  console.log("the server is ready and listen to port ", PORT);
});
