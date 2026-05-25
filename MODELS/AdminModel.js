const sequelize = require("../Config/Config");
const { DataTypes } = require("sequelize");

const adminUser = sequelize.define("adminuser", {
  adminuserid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mobileno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminusername: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Active", "Deactive"),
    defaultValue: "Active",
  },
});

adminUser.sync();
module.exports = adminUser;