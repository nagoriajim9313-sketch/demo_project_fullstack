const productModel = require("../Models/ProductModel");
const dotenv = require("dotenv");
dotenv.config();
const catagoryModel = require('../Models/CatagoryModel');

//create product

const createProduct = async (req, res) => {
  try {
    const { productname, description, catagoryid, price } = req.body;
    if (!productname || !description || !catagoryid || !price) {
      return res
        .status(400)
        .json({ status: 400, message: "all field required" });
    }
    const product = await productModel.create({
      productname: productname,
      description: description,
      catagoryid: catagoryid,
      price: price,
    });
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: "peoduct not found" });
    }
    return res.status(200).json({ status: 200, data: product });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

//get all product

const getAllProduct = async (req, res) => {
  try {
    const product = await productModel.findAll({
        include: catagoryModel
    });
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: "product not found" });
    }
    return res.status(200).json({ status: 200, data: product });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

//search product

const searchProduct = async (req, res) => {
  try {
    const { productid } = req.params;
    if (!productid) {
      return res
        .status(400)
        .json({ status: 400, message: "product id required" });
    }
    const product = await productModel.findByPk(productid);
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: "product not found" });
    }
    return res.status(200).json({ status: 200, data: product });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

//update product

const updateProduct = async (req, res) => {
  try {
    const { productid } = req.params;
    if (!productid) {
      return res
        .status(400)
        .json({ status: 400, message: "product id required" });
    }
    const product = await productModel.findByPk(productid);
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: "product not found" });
    }
    product.update(req.body);
    return res
      .status(200)
      .json({ status: 200, message: "update successfully" });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  searchProduct,
  updateProduct,
};
