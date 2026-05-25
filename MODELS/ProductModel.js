const sequelize = require('../Config/Config');
const { DataTypes } = require('sequelize');
const catagoryModel = require('../Models/CatagoryModel');

const product = sequelize.define("product",{
    
    productid:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true

    },

    productname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    catagoryid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: catagoryModel,
            key: "catagoryid"
        }
    },

    price: {
        type: DataTypes.STRING,
        allowNull: false 
    },

    status: {
        type: DataTypes.ENUM('Active', 'Deactive'),
        allowNull: false,
        defaultValue: 'Active'
    }
});

product.sync();
product.belongsTo(catagoryModel,{foreignKey:"catagoryid"})
module.exports = product;