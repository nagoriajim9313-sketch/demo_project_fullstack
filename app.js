const express = require('express');
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//user routes

const userRoutes = require('./Routes/UserRoute');
app.use("/user",userRoutes);


//catagory routes

const catagoryRoutes = require('./Routes/catagoryRoute');
app.use("/catagory",catagoryRoutes);


//product routes

const productRoutes = require('./Routes/ProductRoute');
app.use("/product",productRoutes);


//order routes

const orderRoutes = require('./Routes/OrderRoute');
app.use("/order",orderRoutes);


//admin routes

const adminRoutes = require('./Routes/AdminRoute');
app.use("/adminuser",adminRoutes); 

app.listen(3000,()=>{
    console.log('server is runing on port 3000');
});