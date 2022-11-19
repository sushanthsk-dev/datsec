const fs = require('fs');
const aws = require('aws-sdk');
const crypto = require('crypto');
const Blogs = require('../models/blogsModel');
const multer = require('multer');
// const sharp = require('sharp');
const CatchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');

const factory = require('./handlerFactory');

// Configuring aws s3
const awsS3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

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
  if (req.files.imageCover) {
    const randomString = crypto.randomBytes(16).toString('hex');
    req.body.imageCover = `blog-${randomString}-${Date.now()}-cover.jpeg`;
    // const image = await sharp()
    //   .resize(1280, 720, { fit: 'cover' })
    //   .toFormat('jpeg')
    //   .jpeg('quality:40');
    const image = req.files.imageCover[0].buffer;
    const params = {
      Bucket: 'datsec-blog-images/blog-images',
      Key: `${req.body.imageCover}`,
      Body: image,
    };
    await awsS3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return next(new AppError('Failed to upload a file', 401));
      }
    });
  }

  //.toFile(`public/img/blogs/${req.body.imageCover}`);
  if (req.files.stepsImg) {
    req.body.stepsImg = [];
    await Promise.all(
      req.files.stepsImg.map(async (file, i) => {
        const randomString = crypto.randomBytes(16).toString('hex');
        const filename = `blogs-${randomString}-${Date.now()}-${i + 1}.jpeg`;
        // const image = await sharp(file.buffer)
        //   .toFormat('jpeg')
        //   .jpeg('quality:60');
        //  .toFile(`public/img/blogs/${filename}`);
        const image = file.buffer;
        await awsS3.upload(
          {
            Bucket: 'datsec-blog-images/blog-steps-images',
            Key: `${filename}`,
            Body: image,
          },
          (err, data) => {
            if (err) {
              console.log(err);
              return next(new AppError('Failed to upload a file', 401));
            }
          }
        );
        req.body.stepsImg.push(filename);
      })
    );
  }
  next();
});
exports.deleteImage = CatchAsync(async (req, res, next) => {
  const blog = await Blogs.findById(req.params.id);
  if (blog) {
    if (req.body.imageCover) {
      await awsS3.deleteObject(
        {
          Bucket: 'datsec-blog-images',
          Key: `blog-images/${blog.imageCover}`,
        },
        (err, data) => {
          if (err) {
            console.log(err);
            return next(
              'Failed to delete file.. Please try after sometime',
              401
            );
          }
        }
      );
      next();
    }
    await awsS3.deleteObject(
      {
        Bucket: 'datsec-blog-images',
        Key: `blog-images/${blog.imageCover}`,
      },
      (err, data) => {
        if (err) {
          console.log(err);
          return next('Failed to delete file.. Please try after sometime', 401);
        }
      }
    );
  }
  // fs.unlink(`public/img/blogs/${blog.imageCover}`, function (err) {
  //   if (err) {
  //     next(new AppError('Image not found', 401));
  //   }
  // });
  next();
});
exports.getAllBlog = factory.getAll(Blogs);

exports.createBlog = factory.createOne(Blogs);

exports.getBlog = factory.getOne(Blogs);

exports.updateBlog = factory.updateOne(Blogs);

exports.deleteBlog = factory.deleteOne(Blogs);
