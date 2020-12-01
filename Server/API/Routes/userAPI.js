const express = require("express");
//Router er noget som følger med express, vi enabler den som en function
const router = express.Router();
// const request  = require("http");
// const checkAuth = require("../middleware/check-auth");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserController = require("../Controllers/user");
const User = require("../Models/userModel")

/*
const storage = multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null, "./uploads/")
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }

})
const fileFilter = (req, file, cb)=> {
        // tillader en fil
    if(file.mimetype === "image/jpeg " || file.mimetype === "image/png"){
        cb(null,true);
// Afviser en fil hvis den ikke er jpeg, eller png
    }else { 
        cb(new Error ("Kun JPEG eller PNG"), false);
    }
   
}

// Størrelsen på de uploads af billeder

const upload = multer({storage: storage,
    limits:{
    fileSize: 1024 * 1024 * 5
},
    fileFilter: fileFilter

});
*/


// HTTP REQUEST NEDENFOR


// Login function
router.post("/login",(req, res, next) => {
    User.find({ username: req.body.username})
    .exec()
    .then(user =>{
        if(user.length < 1){
            return res.status(401).json({
                message: "Kunne ikke logge ind"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
            if(err) {
                return res.status(401).json({ 
                    message: "Kunne ikke logge ind"
            }); 
        } if (result){
            const token = jwt.sign({
                username: user[0].username,
                userId: user[0]._id
            }, process.env.JWT_KEY, 
            {
                expiresIn: "1h"
            }
            );
            return res.status(200).json({
                message: user,
                token: token
            })
        }
        res.status(401).json({
            message: "Kunne ikke logge ind"
        })
        }) 

    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
    
} )


// Oprettelse af bruger med crypto password - med POST request
router.post('/signup', (req, res, next) => {
    User.find({username:req.body.username})
    .exec()
    .then(user => {
        console.log("178")
        if(user.length >= 1){
            return res.status(400).json({
                message: "Username er allerede taget i brug"
            })
        } else {

        }
    })
    bcrypt.hash(req.body.password,10, (err,hash) => {
        console.log(189)
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const user = newUser ({
            //Her opretter vi et ID, igennem mongoose, som er unikt og som bruges som refference punkt igennem alle andre request.
                      _id: new mongoose.Types.ObjectId(),
                     username: req.body.username,
                     password: hash,
                     gender: req.body.gender,
                  email: req.body.email,
                  birthday: req.body.birthday,
                 // userBillede: req.file.path
                  });
                  user.save()
                  .then(result => {
                              // console logger det post request jeg sender
                      console.log(result);
                      res.status(201).json({
                          message:  "Oprettet en ny burger ved Søren TinderApp",
                          /* createdUser: {
                          username: result.username,
                          password: result.password,
                          gender: result.gender,
                          email: result.email,
                          birthday: result.birthday,
                          _id: result._id,
                          request:{ 
                              type:"GET",
                              url: "http://localhost:3000/user/" + result._id
                          }
              }*/
                      })
                  })
                  .catch( err =>{
                      console.log(err);
                      res.status(500).json({
                          error: err
                      })
                  })
              }
          })
                  
        });


            
    
//GET Request for at finde alle profiler i databasen
router.get("/", UserController.user_get_all, );

//Vi bruger nu router til håndtere PATCH request (url) - specifik USERID
//Jeg kan opdater alle mine propData med en ny ops.value. Jeg kan ikke tilføje nye. 
router.patch("/:userId", UserController.user_update_id, );


//Vi bruger nu router til håndtere DELETE request (url) - specifik USERID
router.delete("/:userId", UserController.user_delete_id, );


//GET request for et speical id efter user ID
router.get("/:userId", UserController.user_get_id,  )


module.exports = router;