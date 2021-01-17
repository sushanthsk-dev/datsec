const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: (true, 'Please enter a name'),
  },
  email: {
    type: String,
    lowercase: true,
    required: (true, 'Please enter a email address'),
  },
  subject: {
    type: String,
    required: (true, 'Please enter a subject'),
  },
  message: {
    type: String,
    required: (true, 'Please enter a message'),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Client = new mongoose.model('Client', clientSchema);

module.exports = Client;
