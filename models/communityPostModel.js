const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 140 },
    body: { type: String, required: true, trim: true, maxlength: 2000 },
    tag: { type: String, enum: ['announcement', 'recruitment', 'discussion'], default: 'discussion' },
    author: { type: mongoose.Schema.ObjectId, ref: 'users', required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('communityPosts', postSchema);
