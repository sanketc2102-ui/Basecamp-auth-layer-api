const errorHander = (err, req, res, next) => {
  console.log(err);

  return res.status(500).json({
    code: err.statusCode || 500,
    message: err.message,
    success: err.success || false,
  });
};

export { errorHander };
