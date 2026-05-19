const errorMiddleware = (err, req, res, next) => {
  console.error(err.response?.data || err.message);

  res.status(err.response?.status || 500).json({
    success: false,
    message:
      err.message || "Integrated system unavailable or internal server error",
  });
};

module.exports = errorMiddleware;
