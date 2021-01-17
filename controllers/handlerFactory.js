const AppError = require('../utils/AppError');
const catchAsync = require('../utils/CatchAsync');
const APIFeatures = require('../utils/ApiFeatures');
const Email = require('../utils/Email');
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return next(new AppError('No blog found with that ID', 404));
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) return next(new AppError('No blog found with that ID', 404));
    res.status(200).json({
      status: 'success',
      doc,
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError('No tour found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      doc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { modelName } = { ...Model };
    const doc = await Model.create(req.body);
    if (modelName === 'User') {
      const url = `${req.protocol}://${req.get('host')}/me`;
      await new Email(doc, url).sendWelcome();
    }
    res.status(201).json({
      status: 'success',
      doc,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();
    const doc = await features.query;
    res.status(200).json({
      status: 'success',
      data: doc.length,
      doc,
    });
  });
