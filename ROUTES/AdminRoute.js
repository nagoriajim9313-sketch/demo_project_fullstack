const express = require("express");
const router = express.Router();
const adminController =  require('../Controllers/AdminController');

router.post("/", adminController.createAdminUser);
router.post("/login", adminController.login);

router.get("/",adminController.getAllAdminUser);
router.get("/search/:adminuserid",adminController.searchAdminUser);
router.put("/update/:adminuserid",adminController.updateAdminUser);
router.post("/login",adminController.login);

module.exports = router;
