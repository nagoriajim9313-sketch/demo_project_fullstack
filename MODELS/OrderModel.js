const sequelize = require('../Config/Config');
const { DataTypes } = require('sequelize');
const userModel = require('../Models/UserModel');
const productModel = require('../Models/ProductModel');
const order = sequelize.define("order",{
    orderid: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement:true
    },

    userid: {
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userModel,
            key:"userid"
        }
    },

    productid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: productModel,
            key:"productid"
        }
    },

    qty: {
        type: DataTypes.STRING,
        allowNull: false
    },

 status:{
    type:DataTypes.ENUM('Pending','Completed'),
    defaultValue:'Pending',
    allowNull:false
 }
  
});

order.sync();
order.belongsTo(userModel,{foreignKey:"userid"});
order.belongsTo(productModel,{foreignKey:"productid"});
module.exports = order;