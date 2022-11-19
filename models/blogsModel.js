const mongoose = require('mongoose');
const slugify = require('slugify');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter a title'],
    unique: true,
  },
  visibility: {
    type: Boolean,
    default: true,
  },

  content: {
    type: String,
    required: [true, 'Please enter a content'],
  },
  imageCover: {
    type: String,
  },
  stepsDescription: [String],
  stepsImg: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  footer: String,
  slug: String,
});

BlogSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const BlogModel = new mongoose.model('Blogs', BlogSchema);

module.exports = BlogModel;
