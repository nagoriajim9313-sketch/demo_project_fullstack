const productController = require('../Controllers/ProductController');
const productSchema = require('../Schema/ProductSchema');
const yupValidate = require('../Routes/YupValidate');
const express = require('express');
const router = express.Router();

router.post("/",yupValidate(productSchema.productSchema),productController.createProduct);
router.get("/",productController.getAllProduct);
router.get("/search/:productid",productController.searchProduct);
router.put("/update/:productid",yupValidate(productSchema.productSchema),productController.updateProduct);

module.exports = router;