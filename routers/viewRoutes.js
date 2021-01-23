const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const route = express.Router();

route.get('/', viewController.getHome);
route.get('/contact', viewController.contact);
route.get('/about', viewController.about);
route.get('/blogs', viewController.getBlogOverview);
route.get('/blogs/:slug', viewController.getBlog);
route.get('/blogs/page/:pageNo', viewController.getBlogOverview);
route.get('/admin/blogs/page/:pageNo', viewController.getBlogOverview);
route.get('/admin', authController.isLoggedIn, viewController.adminLogin);
route.get('/admin/forgotPassword', viewController.forgotPassword);
route.get('/admin/resetPassword/:token', viewController.resetPassword);
route.get(
  '/admin/response',
  authController.protect,
  authController.restrictTo('admin', 'editor'),
  viewController.getResponse
);
route.get(
  '/admin/blogs/:slug',
  authController.protect,
  authController.restrictTo('admin', 'editor'),
  viewController.getBlog
);
route.get(
  '/admin/logout',
  authController.protect,
  authController.restrictTo('admin', 'editor'),
  authController.logout
);
route.get(
  '/admin/blogs',
  authController.protect,
  authController.restrictTo('admin', 'editor'),
  viewController.adminBlogOverview
);
route.get(
  '/admin/createblog',
  authController.protect,
  authController.restrictTo('admin', 'editor'),
  viewController.createBlog
);
route.get(
  '/admin/editBlog/:blogId',
  authController.protect,
  authController.restrictTo('admin', 'editor'),
  viewController.editBlog
);
module.exports = route;
