const express = require("express");
const { getData, createData } = require("../controllers/dataController");
const validateRequest = require("../middleware/requestValidator");
const router = express.Router();

const dataSchema = {
  value: { required: true, type: "number" },
  source: { required: true, type: "string" },
};

router.get("/", getData);
router.post("/", validateRequest(dataSchema), createData);

module.exports = router;
