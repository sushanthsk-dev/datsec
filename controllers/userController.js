const User = require('../models/userModel');
const catchAsync = require('../utils/CatchAsync');
const factory = require('./handlerFactory');

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.getAllUser = factory.getAll(User);
exports.createUser = factory.createOne(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
