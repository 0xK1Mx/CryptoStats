class AppError extends Error {
  constructor(message, statusCode) {
    console.log(typeof statusCode);
    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith("4") ? "fail" : "error";

    this.isOperationalErr = true;
  }
}

export default AppError;
