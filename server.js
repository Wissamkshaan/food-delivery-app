// define the middleware and services here
const express = require ("express");
const app = express();
const mongoose = require("mongoose");

// const db = mongoose.connection;
// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// our modles
// const { Restaurant } = require('./restaurants');

 const Restaurant = require('./models/restaurants.js');


const PORT = 3000;

// Connect to the port
app.listen(PORT,()=>{
    console.log(`app is listining to ${PORT}`)
});