const Blogs = require('../models/blogsModel');
const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/ApiFeatures');
const CatchAsync = require('../utils/CatchAsync');
exports.getHome = catchAsync(async (req, res) => {
  res.status(200).render('overview', {
    title: 'Home',
  });
});

exports.pageView = (req, res, next) => {
  req.query.page = req.params.pageNum;
  req.query.limit = 20;
};

exports.getBlogOverview = catchAsync(async (req, res) => {
  let pageNum;
  if (
    req.originalUrl.startsWith('/blogs/page/') &&
    !req.originalUrl.startsWith('/blogs/page/0')
  ) {
    req.query.page = parseInt(req.params.pageNo) + 1;
    pageNum = req.query.page - 1;
  }

  const allBlogs = await Blogs.find({ visibility: { $ne: false } });
  const blogLength = allBlogs.length;
  if (pageNum > parseInt(blogLength / 20)) {
    return res.status(200).render('error', {
      msg: `Can't find this page on this server`,
    });
  }
  req.query.sort = '-createdAt';
  const features = new APIFeatures(
    Blogs.find({ visibility: { $ne: false } }),
    req.query
  )
    .sort()
    .pagination();
  const blogs = await features.query;
  res.status(200).render('blogsOverview', {
    title: 'Blogs',
    blogs,
    blogLength,
    pageNum,
  });
});

exports.getBlog = catchAsync(async (req, res, next) => {
  let filter = req.user
    ? { slug: req.params.slug }
    : { slug: req.params.slug, visibility: { $ne: false } };
  const blog = await Blogs.findOne(filter);
  req.query.limit = '5';
  req.query.sort = '-createdAt';
  req.query.fields = 'title,slug';
  const features = new APIFeatures(Blogs.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const allBlog = await features.query;

  if (!blog) {
    return next(new AppError('There is no blog with that name', 404));
  }
  res.status(200).render('blog', {
    title: `${blog.title} Blog`,
    blog,
    allBlog,
  });
});

exports.contact = catchAsync(async (req, res, next) => {
  res.status(200).render('contact', {
    title: 'Contact',
  });
});

exports.about = catchAsync(async (req, res, next) => {
  res.status(200).render('about', {
    title: 'About',
  });
});

exports.adminLogin = (req, res) => {
  res.status(200).render('adminlogin', {
    title: 'Admin Login',
  });
};
exports.adminBlogOverview = catchAsync(async (req, res) => {
  let pageNum;
  if (
    req.originalUrl.startsWith('/admin/blogs/page/') &&
    !req.originalUrl.startsWith('/admin/blogs/page/0')
  ) {
    req.query.page = parseInt(req.params.pageNo) + 1;
    pageNum = req.query.page - 1;
  }
  const allBlogs = await Blogs.find();
  const blogLength = allBlogs.length;
  req.query.sort = '-createdAt';
  const features = new APIFeatures(Blogs.find(), req.query).sort().pagination();
  const blogs = await features.query;
  res.status(200).render('adminOverview', {
    title: 'Blogs',
    blogs,
    blogLength,
    pageNum,
  });
});

exports.createBlog = (req, res) => {
  res.status(200).render('createblog', {
    title: 'CreateBlog',
  });
};

exports.editBlog = CatchAsync(async (req, res) => {
  let filter = req.user
    ? { slug: req.params.blogId }
    : { slug: req.params.blogId, visibility: { $ne: false } };
  const blog = await Blogs.findOne(filter);
  res.status(200).render('editBlog', {
    title: 'Edit Blog',
    blog,
  });
});

exports.forgotPassword = CatchAsync(async (req, res) => {
  res.status(200).render('forgotPassword', {
    title: 'Forgot Password',
  });
});

exports.resetPassword = CatchAsync(async (req, res) => {
  res.status(200).render('resetPassword', {
    title: 'Reset Password',
  });
});
