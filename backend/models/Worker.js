const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      unique: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    skills: {
      type: [String],
      default: []
    },

    experience: {
      type: Number,
      default: 0
    },

    availability: {
      type: Boolean,
      default: true
    },

    location: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Worker", workerSchema);