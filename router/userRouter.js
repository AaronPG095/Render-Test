import express from "express";
import {
  addNewUser,
  deleteUserById,
  getAllUsers,
  getOneUser,
  updateUser,
} from "../controller/userController.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(addNewUser); // localhost:5000/users/

router.route("/:id").get(getOneUser).put(updateUser).delete(deleteUserById); // localhost:5000/users/:id
export default router;
