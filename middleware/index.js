import { db, users } from "../database/config.js";

export const auth = (req, res, next) => {
  const { name } = req.body;
  const matchedUser = users.find((user) => user.name === name);
  if (matchedUser) {
    next();
  } else {
    const err = new Error("you are not admin");
    err.status = 403;
    next(err);
  }
};

export const notFound = (req, res, next) => {
  const err = new Error("Not Found 😆");
  err.status = 404;
  next(err);
};

export const errorHandler = (error, req, res, next) => {
  res.status(error.status || 403).send(error.message);
};
