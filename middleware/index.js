export const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500).send(error.message || "Sorry there is error");
};
