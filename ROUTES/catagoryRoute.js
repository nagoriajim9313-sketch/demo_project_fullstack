const catagoryController = require("../Controllers/CatagoryController");
const categorySchema = require('../Schema/CatagorySchema');
const yupValidate = require('../Routes/YupValidate');
const user = require('../Controllers/UserController');
const express = require("express");
const router = express.Router();

router.post("/",yupValidate(categorySchema.catagorySchema),  catagoryController.createCatagory);
router.get("/", catagoryController.getAllCatagory);
router.get("/search/:catagoryid", catagoryController.searchCatagory);
router.put("/update/:catagoryid",yupValidate(categorySchema.catagorySchema), catagoryController.updateCatagory);

module.exports = router;
