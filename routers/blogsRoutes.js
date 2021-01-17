const express = require('express');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get(
  '/top-5-recent-blog',
  blogController.aliasTop5RecentBlog,
  blogController.getAllBlog
);

router
  .route('/')
  .get(blogController.getAllBlog)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'editor'),
    blogController.uploadBlogImages,
    blogController.resizeBlogImages,
    blogController.createBlog
  );
router
  .route('/:id')
  .get(blogController.getBlog)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'editor'),
    blogController.uploadBlogImages,
    blogController.resizeBlogImages,
    blogController.updateBlog
  )
  .delete(
    // authController.restrictTo('admin', 'editor'),
    blogController.deleteBlog
  );
module.exports = router;
