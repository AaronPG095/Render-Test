import { users, db } from "../database/config.js";

export const getAllUsers = (req, res) => {
  res.send(users);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  let matchedUser = await users.find((user) => user.id === id);
  if (matchedUser) {
    res.send(matchedUser);
  } else {
    res.send("no user with this ID");
  }
};

export const addUser = async (req, res) => {
  const data = req.body;
  users.push(data);
  await db.write();

  res.send(users);
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      users.splice(userIndex, 1);
      await db.write();
      res.send("the user has been deleted");
    } else {
      const error = new Error("this user is not in DB");

      error.status = 401;
      throw error;
    }
  } catch (error) {
    res.send(error);
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    let matchedUser = await users.find((user) => user.id === id);

    if (matchedUser) {
      matchedUser.name = req.body.name;
      await db.write();
      res.send(matchedUser);
    } else {
      const error = new Error("No user found");

      error.status = 403;
      throw error;
    }
  } catch (error) {
    res.send(error);
  }
};
