const orderModel = require('../Models/OrderModel');
const dotenv = require('dotenv');
dotenv.config();
const userModel = require('../Models/UserModel');
const productModel = require('../Models/ProductModel');
const { date } = require('yup');

//create otrder

const createOrder = async(req,res)=>{
    try{
        const { userid, productid, qty} = req.body;
        if ( !userid || !productid || !qty ) {
         return res.status(400).json({ status:400, message:"all field required" })   
        }
        const order = await orderModel.create({
            userid: userid,
            productid: productid,
            qty: qty
            
        })
        if (!order) {
            return res.status(404).json({ status:404, message:"order not found" })
        }
        return res.status(200).json({ status:200, data:order })
    }
    catch(err){
        return res.status(500).json({ status:500, message:err.message })
    }
};


//get all order

const getAllOrder = async(req,res)=>{
    try{
        const order = await orderModel.findAll({
            include: [userModel, productModel]
        });
        if (!order) {
            return res.status(404).json({status:404,message:"order is not found"})
        }
        return res.status(200).json({ status:200, data:order })
    }
    catch(err){
        return res.status(500).json({ status:500, message:err.message })
    }
};


//search order

const searchOrder = async(req,res)=>{
    try{
        const { orderid } = req.params;
        if (!orderid) {
            return res.status(400).json({ status:400, message:"order id required" })
        }

        const order = await orderModel.findByPk(orderid)
        if (!order) {
            return res.status(404).json({status:404,message:"order is not found"})
        }
        return res.status(200).json({ status:200, data:order })
    }
    catch(err){
        return res.status(500).json({ status:500, message:err.message })
    }
};


//update order

const updateOrder = async(req,res)=>{
    try{
        const { orderid } = req.params;
        if (!orderid) {
            return res.status(400).json({ status:400, message:"order id required" })
        }

        const order = await orderModel.findByPk(orderid)
        if (!order) {
            return res.status(404).json({status:404,message:"order is not found"})
        }
        order.update(req.body);
        return res.status(200).json({ status:200, message:"update successfully" })
    }
    catch(err){
        return res.status(500).json({ status:500, message:err.message })
    }
};


const statusUpdat = async(req,res)=>{
    try{
        const {orderid} = req.params;
        if (!orderid) {
            return res.status(400).json({ status:400, message:"order id required" })
        }
        const order = await orderModel.findByPk(orderid)
        if (!order) {
            return res.status(404).json({ status:404, message:"order not found" })
        }
        order.update({status:'Completed'});
        return res.status(200).json({ status:200, date:order })
    }
    catch(err){
        return res.status(500).json({ status:500, message:err.message })
    }
}


module.exports = {
    createOrder,
    getAllOrder,
    searchOrder,
    updateOrder,
    statusUpdat
};