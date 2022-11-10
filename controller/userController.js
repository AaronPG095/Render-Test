import { db, users } from "../database/config.js";

export const getAllUsers = (req, res) => {
  res.send(users);
};

export const addNewUser = async (req, res, next) => {
  try {
    const data = req.body;

    users.push(data);

    await db.write();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

export const getOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oneUser = await users.find((user) => user.id === id);

    if (oneUser) {
      res.send(oneUser);
    } else {
      const err = new Error(" No user with id " + id);

      err.status = 401;

      throw err;
    }
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const oneUser = await users.find((user) => user.id === id);

  if (oneUser) {
    oneUser.name = req.body.name;
    await db.write();
    res.send(oneUser);
  } else {
    const err = new Error("No User found with this ID");

    err.status = 403;

    throw err;
  }
};

// 5. Delete The user

export const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      users.splice(userIndex, 1);

      await db.write();

      res.send("The User is deleted");
    } else {
      const error = new Error("The desired user not exist in our Data Base");
      error.status = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
