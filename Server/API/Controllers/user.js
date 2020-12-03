const User = require("../Models/userModel");
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken");
// const mongoose = require("mongoose");

// GET

//Speciel id
exports.user_get_id = (req, res, next) => {
    const id = req.params.userId;
  User.findById(id)
  .select("username password _id gender email birthday ")
  .exec()
  .then(doc =>{
      console.log("Fra vores MongoDB database", doc);
      if(doc){
        res.status(200).json({
        user: doc,
        request: {
            type: "Get",
            description: "Listen over alle users",
            url: "http://localhost:3000/user"
        }
    });
// HVIS ID ikke har en korrekt værdi, kaster vi denne error message
      } else res.status(404).json({
          message:"Dettte id har ikke en korrekt værdi"
      });

  })
  .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
});
}

// Update

// Delete

//login

//create
