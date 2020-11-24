
/*
const express = require("express");
const router = express.Router();
const cors = require("cors")
const app = express();
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  password: Number,

});

module.exports = mongoose.model("Product",productSchema);


app.use(cors());

const { Router } =require("express")

Router.post("/",(req,res,next)=>{
  const Product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  Product.save().then(result => {
    console.log(result);
  })
  .catch(err =>console.log(err));
});

const Product = require("../Client/Createacc/Create");


mongoose.connect('mongodb://localhost/cluster0')


const PORT = 4000;

//server aktiveres
app.get("/",function(req,res){
  res.send("hello")
})

app.post("/",cors(),async(req,res)=>{
  name.lastName
})
app.listen(PORT, () => {
  console.log(`Server-applikation lytter på http://localhost:${PORT}`)
}) */