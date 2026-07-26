import ApiError from "../shared/errors/ApiError.js";

const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

export default notFound;
