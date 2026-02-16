export const errorController = async (err, req, res, next) => {
  //   if (err.name === "JsonWebTokenError") {
  //     throw new Error("The token belonging to that user dont exist", 401);
  //   }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  console.log(err);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
