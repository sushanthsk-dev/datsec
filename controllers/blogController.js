const crypto = require('crypto');
const Blogs = require('../models/blogsModel');
const multer = require('multer');
const sharp = require('sharp');
const CatchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');

const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only image', 404), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadBlogImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'stepsImg', maxCount: 10 },
]);

exports.aliasTop5RecentBlog = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-createdAt';
  req.query.fields = 'title,slug';
  next();
};

exports.resizeBlogImages = CatchAsync(async (req, res, next) => {
  if (!req.files.imageCover) return next();
  const randomString = crypto.randomBytes(16).toString('hex');
  req.body.imageCover = `blog-${randomString}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg('quality:40')
    .toFile(`public/img/blogs/${req.body.imageCover}`);
  if (req.files.stepsImg) {
    req.body.stepsImg = [];
    await Promise.all(
      req.files.stepsImg.map(async (file, i) => {
        const randomString = crypto.randomBytes(16).toString('hex');
        const filename = `blogs-${randomString}-${Date.now()}-${i + 1}.jpeg`;
        await sharp(file.buffer)
          .resize(480, 320)
          .toFormat('jpeg')
          .jpeg('quality:60')
          .toFile(`public/img/blogs/${filename}`);
        req.body.stepsImg.push(filename);
      })
    );
  }
  next();
});

exports.getAllBlog = factory.getAll(Blogs);

exports.createBlog = factory.createOne(Blogs);

exports.getBlog = factory.getOne(Blogs);

exports.updateBlog = factory.updateOne(Blogs);

exports.deleteBlog = factory.deleteOne(Blogs);
