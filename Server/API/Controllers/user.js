const User = require("../Models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// GET
exports.user_get_all = (req, res, next) => {
    User.find()
    .select("username password _id gender email birthday ")
    .exec()
    .then(docs =>{
        const svarpårequest = {
            count: "Antal profiler er " + docs.length,
            user: docs.map(doc =>{
                return {
        username: doc.username,
        password: doc.password,
        gender: doc.gender,
        email: doc.email,
        birthday: doc.birthday,
        _id: doc._id,
        request:{
            type:"GET",
            url: "http://localhost:3000/user/" + doc._id
        }
                }
            })
        }
        //Man kan vælge at bruge det her eller ej, kommer an på om man vil kaste en fejl ved søgning efter en tom database, brug til reflektion
     //   if (docs.length >=0){
            res.status(200).json(svarpårequest);
       // } else {
       //     res.status(404).json({
     //        message: "Intet data at vise, sorries"
       //     });
     //   }
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

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
exports.user_delete_id = (req, res, next) => {
    const id = req.params.userId
    User.remove({ _id: id })
    .exec()
    .then(result =>{ 
        res.status(200).json({
            message: "User blev slettet"
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

//login

//create
