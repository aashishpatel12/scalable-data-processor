const mongoose = require("mongoose");

const dataRecordSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      required: true,
      index: true,
    },
    value: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      required: true,
      index: true,
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true },
); // Adds createdAt and updatedAt automatically

module.exports = mongoose.model("DataRecord", dataRecordSchema);
