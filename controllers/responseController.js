const Response = require('../models/responseModel');
const AppError = require('../utils/AppError');
const CatchAsync = require('../utils/CatchAsync');

exports.createResponse = CatchAsync(async (req, res, next) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return next(new AppError('Please fill the form', 401));
  }
  const data = await Response.create(req.body);
  console.log(data);
  res.status(200).json({
    status: 'success',
    data,
  });
});
