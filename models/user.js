const mongoose = require("mongoose");

//mongoose connection 
 mongoose.connect("mongodb://127.0.0.1:27017/14nov");

 const userSchema = mongoose.Schema({
    name: String,
    email: String,
    image: String
 })

module.exports =  mongoose.model("crud",userSchema)