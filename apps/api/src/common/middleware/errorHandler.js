const AppError = require('../errors/AppError');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const status = err instanceof AppError ? err.statusCode : 500;
  res.status(status).json({ error: status === 500 ? 'Internal server error' : err.message });
};
