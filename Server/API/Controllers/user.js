const User = require("../Models/userModel");
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken");
// const mongoose = require("mongoose");

// GET
exports.user_get_all = 

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
            url: "http://localhost:3000/signUser"
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
exports.user_update_id = (req, res, next) => {
    const id = req.params.userId
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propData] = ops.value
    }
    User.update({ _id: id },
        //ved at køre det igennem et for loop sikrer vi at vi kan skifte hvert objekt med req.body formen. 
        {$set: updateOps})
        /* Anden slags metode at fetche data på
        username: req.body.Newusername,
        password: req.body.Newpassword,
        gender: req.body.Newgender,
        email: req.body.Newemail,
        */
        .exec()
        .then(result =>{
            res.status(200).json({
                message: "Users info er opdateret",
                request:{
                    type: "GET",
                    url: "http://localhost:3000/user/"+id
                }
            
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    }

// Delete

//login

//create
