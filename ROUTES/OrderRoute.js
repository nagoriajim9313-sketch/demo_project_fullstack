const orderController = require('../Controllers/OrderController');
const orderSchema = require('../Schema/OrderSchema');
const yupValidate = require('../Routes/YupValidate');
const express = require('express');
const router = express.Router();


router.post("/",yupValidate(orderSchema.orderSchema),orderController.createOrder);
router.get("/",orderController.getAllOrder);
router.get("/search/:orderid",orderController.searchOrder);
router.put("/update/:orderid",yupValidate(orderSchema.orderSchema),orderController.updateOrder);
router.put("/status/:orderid",orderController.statusUpdat);
module.exports = router;