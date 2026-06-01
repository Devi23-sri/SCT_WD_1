const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    source: {
      type: String,
      enum: ['hero', 'footer', 'popup', 'other'],
      default: 'other',
    },
    active: { type: Boolean, default: true },
    ipAddress: { type: String },
  },
  { timestamps: true }
);

subscriberSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('Subscriber', subscriberSchema);
