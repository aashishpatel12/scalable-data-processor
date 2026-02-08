const DataRecord = require("../models/DataRecord");

const getData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const data = await DataRecord.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const total = await DataRecord.countDocuments();

    res.json({
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

const createData = async (req, res) => {
  try {
    const { value, source, metadata } = req.body;
    const newRecord = new DataRecord({
      value,
      source,
      metadata,
      timestamp: new Date(),
    });

    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ error: "Failed to save data" });
  }
};

module.exports = {
  getData,
  createData,
};
