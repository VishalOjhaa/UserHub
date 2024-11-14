const express = require ('express')
const app = express();
const path = require('path')
const userModel = require('./models/user');
const { log } = require('console');
//parsing
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//static files
app.use(express.static(path.join(__dirname,"public")));


//view engine
app.set("view engine","ejs")



//routes
app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/read",async(req,res)=>{
    let allusers = await userModel.find();
    res.render("read",{allusers});
})
app.get("/delete/:id",async(req,res)=>{
  let delUser = await userModel.findOneAndDelete({_id:req.params.id});
  res.redirect("/read");
})
app.post("/update/:id",async(req,res)=>{
   let {name,email,image} = req.body;
   let updatedUser = await userModel.findOneAndUpdate({_id: req.params.id},{name,email,image});
   res.redirect("/read");
 
  })
app.get("/edit/:id",async(req,res)=>{
    let editUser = await userModel.findOne({_id:req.params.id});
    res.render("edit",{editUser});
})
app.post("/create",async(req,res)=>{
    let {name,email,image} = req.body;
    let createdUser = await userModel.create({name: name, email: email, image: image});
    res.redirect("read");
})




//server start
app.listen("3000",()=>{
    console.log("server running....");
    
})