const asyncHander = (controller) => {
  return (req, res, next) => {
    return Promise.resolve(controller(req, res, next)).catch((err) =>
      next(err),
    );
  };
};

export { asyncHander };
