const express = require("express");
//Router er noget som følger med express, vi enabler den som en function
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const UserController = require("../Controllers/user");
const User = require("../Models/userModel");
const checkAuth = require("../middleware/check-auth");
// const checkAuth = require("../middleware/check-auth");



// HTTP REQUEST NEDENFOR

// Oprettelse af bruger med crypto password - med POST request
router.post('/signup', async (req, res, next) => {
    await User.find({userName:req.body.userName})
    .exec()
    .then(signUser => {
        console.log("105")
        if (signUser.length >= 1) {
            return res.status(400).json({
                message: "Username er allerede taget i brug"
            });
        } else {
             bcrypt.hash(req.body.password,10, (err,hash) => {
                console.log(189)
                 if (err) {
                     return res.status(500).json({
                         error: err
                    });
               } else {
          //Her opretter vi et ID, igennem mongoose, som er unikt og som bruges som refference punkt igennem alle andre request.
                   const newuser = new User ({
                    _id: new mongoose.Types.ObjectId(),
                    userName: req.body.userName,
                    password: hash,
                    gender: req.body.gender,
                    email: req.body.email,
                    birthday: req.body.birthday,
                 // userBillede: req.file.path
                  });
                  newuser
                  .save()
                  .then(result => {
                              // console logger det post request jeg sender
                      console.log(result);
                      return res.status(201).json({
                          message:  "Oprettet en ny burger ved Søren TinderApp",
                        createdUser: {
                          userName: result.userName,
                          _id: result._id,
                       } });
                    })
                  .catch( err =>{
                      console.log(err);
                     return res.status(500).json({
                          error: err
                      });
                  });
                }
               });
            };
   });   });           

// Login function
router.post('/login', async (req, res, next) => {
    console.log(req.body)
    await User.find({ userName: req.body.userName })
    .exec()
    .then(newuser => {
        if (newuser.length < 1) {
            return res.status(401).json({
                message: 'fungegerer ikke her'
            });
        }
        bcrypt.compare(req.body.password, newuser[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Login failed by password'
                });
            }
            if (result) {
                const token = jwt.sign({
                    userName: newuser[0].userName,
                    newuserId: newuser[0]._id
                }, process.env.JWT_KEY, 
                {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    message: newuser,
                    token: token
                });
            }
            res.status(401).json({
                message: 'Kan ikke logge ind'
            })
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})
    
//GET Request for at finde alle profiler i databasen
router.get("/", (req, res, next) => {
    User.find()
    .select("userName password _id gender email birthday ")
    .exec()
    .then(docs =>{
        const svarpårequest = {
            count: "Antal profiler er " + docs.length,
            User: docs.map(doc =>{
                return {
        userName: doc.userName,
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
} );

//Vi bruger nu router til håndtere PATCH request (url) - specifik USERID
//Jeg kan opdater alle mine propData med en ny ops.value. Jeg kan ikke tilføje nye. 
router.patch("/:userId", UserController.user_update_id, );

// https://www.geeksforgeeks.org/mongoose-findbyidandupdate-function/

//Vi bruger nu router til håndtere DELETE request (url) - specifik USERID
router.delete("/:userId",(req, res, next) => {
    const id = req.params.signUserId
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
});


//GET request for et speical id efter user ID
router.get("/:userId", UserController.user_get_id,  )


module.exports = router;