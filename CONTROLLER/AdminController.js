const AdminUser = require('../Models/AdminModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// CREATE ADMIN
const createAdminUser = async (req, res) => {
  try {
    const { mobileno, adminusername, password } = req.body;

    if (!mobileno || !adminusername || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await AdminUser.create({
      mobileno,
      adminusername,
      password: hashPassword,
    });

    res.status(201).json({ data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { mobileno, password } = req.body;

    const user = await AdminUser.findOne({ where: { mobileno } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { adminuserid: user.adminuserid },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// VERIFY TOKEN
const verifytoken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "Token required" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// GET ALL
const getAllAdminUser = async (req, res) => {
  const users = await AdminUser.findAll();
  res.json(users);
};

// SEARCH
const searchAdminUser = async (req, res) => {
  const user = await AdminUser.findByPk(req.params.adminuserid);
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json(user);
};

// UPDATE
const updateAdminUser = async (req, res) => {
  const user = await AdminUser.findByPk(req.params.adminuserid);
  if (!user) return res.status(404).json({ message: "Not found" });

  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  await user.update(req.body);
  res.json({ message: "Updated successfully" });
};

module.exports = {
  createAdminUser,
  login,
  verifytoken,
  getAllAdminUser,
  searchAdminUser,
  updateAdminUser,
};
