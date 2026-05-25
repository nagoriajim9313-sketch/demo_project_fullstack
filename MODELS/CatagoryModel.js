const sequelize = require('../Config/Config');
const { DataTypes } = require('sequelize');


const catagory = sequelize.define("catagory",{
    catagoryid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
 
    catagoryname: {
        type: DataTypes.STRING,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM('Active', 'Deactive'),
        allowNull: false,
        defaultValue: 'Active'
    }

});

catagory.sync();
module.exports = catagory;