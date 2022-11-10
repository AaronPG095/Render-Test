import express from "express";
import {
  addUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "./controllers/users.controller.js";
import {auth} from "../middleware/index.js";

const router = express.Router();

router
  .route("/:id")
  .get(getUserById)
  .delete(deleteUserById)
  .put(updateUserById);

router.route("/add").post(addUser);

router.route("/all").get(auth, getAllUsers);
export default router;
