const sequelize = require("../Config/Config");
const { DataTypes } = require("sequelize");

const user = sequelize.define("user", {
  userid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },

  mobileno: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM('Active','Deactive'),
    allowNull: false,
    defaultValue:'Active'
  },
});

user.sync();
module.exports = user;
