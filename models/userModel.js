const mongoose = require('mongoose');
const { default: validator } = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name'],
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please enter a confirm password'],
    validate: {
      validator: function (el) {
        return this.password === this.passwordConfirm;
      },
      message: 'Passwords are not the same!',
    },
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    required: [true, 'role is required'],
    enum: ['admin', 'editor', 'blogWriter'],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre(/^find/, async function (next) {
  this.find({ active: { $ne: false } });
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTtimestap) {
  if (this.passwordChangedAt) {
    const changedTimestap = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTtimestap < changedTimestap;
  }
};

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const userModel = new mongoose.model('User', userSchema);

module.exports = userModel;
