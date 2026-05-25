const userController = require("../Controllers/UserController");
const userSchema = require('../Schema/UserSchema');
const yupValidate = require('../Routes/YupValidate');
const express = require("express");
const router = express.Router();

router.post("/",yupValidate(userSchema.userSchema) ,userController.createUser);
router.get("/", userController.getAllUser);
router.get("/search/:userid", userController.searchUser);
router.put("/update/:userid",yupValidate(userSchema.userSchema) , userController.updateUser);
router.post('/login',userController.login)

module.exports = router;
