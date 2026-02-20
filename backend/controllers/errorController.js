import AppError from "./../utils/AppError.js";

function handleValidationError() {
  return new AppError("The password or email does not match", 401);
}

function handleDuplicationError() {
  return new AppError("This email is already associated with an user", 409);
}

export const errorController = async (err, req, res, next) => {
  //   if (err.name === "JsonWebTokenError") {
  //     throw new Error("The token belonging to that user dont exist", 401);
  //   }

  if (err.name === "ValidationError") err = handleValidationError();
  if (err.cause.code === 11000) err = handleDuplicationError();
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
