const userModel = require("../Models/UserModel");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//create user

const createUser = async (req, res) => {
  try {
    const { mobileno, username, password } = req.body;
    if (!mobileno || !username || !password) {
      return res
        .status(400)
        .json({ status: 400, message: "All Field Required" });
    }

    const encodedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      mobileno: mobileno,
      username: username,
      password: encodedPassword
      
    });
    return res.status(200).json({ status: 200, data: user });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

//verify token


const verifytoken = (req, resp, next) => {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    return resp.status(401).json({ status: 401, message: "Access denied, no token provided" });
  }

  const parts = authHeader.split(" ");
  if (parts[0] !== "Bearer") {
    return resp.status(401).json({ status: 401, message: "Invalid authorization header format" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return resp.status(401).json({ status: 401, message: "Invalid or expired token" });
  }
};





//user login

const login = async(req,res)=>{
    try{
        const { mobileno, password } = req.body;
        if (!mobileno || !password) {
            return res.status(400).json({ status:400, message:"all field required" })
        }
        const user = await userModel.findOne({ where:{mobileno} });
        if (!user) {
            return res.status(404).json({ status:404, message:"user not found" })
        }
        const match = await bcrypt.compare(password,user.password);
        if (!match) {
            return res.status(401).json({ status:401, message:"invalid credentials" })
        }
        const token = jwt.sign(
            {userid:user.userid},
            "JWT_SECRET",
            { expiresIn: '10h' }
        );
        return res.status(200).json({ status:200,data:user, token:token, message:"Login successfully" })
    }
    catch(err){
        return res.status(500).json({ status:500, message:err.message })
    }
};

//get all user

const getAllUser = async (req, res) => {
  try {
    const user = await userModel.findAll();
    if (!user) {
      return res
        .status(404)
        .json({ status: 404, message: "user is not found" });
    }
    return res.status(200).json({ status: 200, data: user });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

// user search

const searchUser = async (req, res) => {
  try {
    const { userid } = req.params;
    if (!userid) {
      return res.status(400).json({ status: 400, message: "user id required" });
    }
    const user = await userModel.findByPk(userid);
    if (!user) {
      return res
        .status(404)
        .json({ status: 404, message: "user is not found" });
    }
    return res.status(200).json({ status: 200, data: user });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

//update user

const updateUser = async (req, res) => {
  try {
    const { userid } = req.params;
    if (!userid) {
      return res.status(400).json({ status: 400, message: "user id required" });
    }
    const user = await userModel.findByPk(userid);
    if (!user) {
      return res
        .status(404)
        .json({ status: 404, message: "user is not found" });
    }
    user.update(req.body);
    return res
      .status(200)
      .json({ status: 200, message: "update successfully" });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  createUser,
  verifytoken,
  getAllUser,
  searchUser,
  updateUser,
  login
};
