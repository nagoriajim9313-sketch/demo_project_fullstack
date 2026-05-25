const catagoryModel = require("../Models/CatagoryModel");
const dotenv = require("dotenv");
dotenv.config();

//create catagory

const createCatagory = async (req, res) => {
  try {
    const { catagoryname } = req.body;
    if (!catagoryname) {
      return res
        .status(400)
        .json({ status: 400, message: "catagory name required" });
    }
    const catagory = await catagoryModel.create({
      catagoryname: catagoryname,
    });
    if (!catagory) {
      return res
        .status(404)
        .json({ status: 404, message: "catagory not found" });
    }
    return res.status(200).json({ status: 200, data: catagory });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

//get all catagory

const getAllCatagory = async (req, res) => {
  try {
    const catagory = await catagoryModel.findAll();
    if (!catagory) {
      return res
        .status(400)
        .json({ status: 400, message: "catagory not found" });
    }
    return res.status(200).json({ status: 200, data: catagory });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

//search catagory

const searchCatagory = async (req, res) => {
  try {
    const { catagoryid } = req.params;
    if (!catagoryid) {
      return res
        .status(400)
        .json({ status: 400, message: "catagory id required" });
    }
    const catagory = await catagoryModel.findByPk(catagoryid);
    return res.status(200).json({ status: 200, data: catagory });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

//update catagory

const updateCatagory = async (req, res) => {
  try {
    const { catagoryid } = req.params;
    if (!catagoryid) {
      return res
        .status(400)
        .json({ status: 400, message: "catagory id required" });
    }
    const catagory = await catagoryModel.findByPk(catagoryid);
    if (!catagory) {
      return res.json({ status: 404, message: "catagory not found" });
    }
    catagory.update(req.body);
    return res
      .status(200)
      .json({ status: 200, message: "update successfully" });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  createCatagory,
  getAllCatagory,
  searchCatagory,
  updateCatagory,
};
