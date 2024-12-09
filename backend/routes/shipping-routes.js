const express = require("express");
const router = express.Router();
const {
  addShipment,
  uploadFile,
  viewShipment,
  getDistinctJobIds,
  getDistinctCustomer,
  getCartoons,
  updateStatus,
} = require("../controller/shipping-controller");
const { upload } = require("../utilities/multer");

router.post("/addShipment", addShipment);
router.post("/uploadFile", [upload.single("file")], uploadFile);
router.get("/viewShipment", viewShipment);
router.get("/jobIds", getDistinctJobIds);
router.get("/customers", getDistinctCustomer);
router.get("/cartoons", getCartoons);
router.put("/updatecartoon", updateStatus);

module.exports = router;
