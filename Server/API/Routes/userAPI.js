const express = require("express");
//Router er noget som følger med express, vi enabler den som en function
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/userModel");
const { request } = require("http");

// HTTP REQUEST NEDENFOR

//Vi bruger nu router til håndtere GET request (url)
router.get("/",(req, res, next) => {
    User.find()
    .select("username password _id køn email alder")
    .exec()
    .then(docs =>{
        const svarpårequest = {
            count: "Antal profiler er " + docs.length,
            user: docs.map(doc =>{
                return {
        username: doc.username,
        password: doc.password,
        køn: doc.køn,
        email: doc.email,
        alder: doc.alder,
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
});

//Vi bruger nu router til håndtere POST request (url)
router.post("/",(req, res, next) => {
    const user = new User({
        //Her opretter vi et ID, igennem mongoose, som er unikt og som bruges som refference punkt igennem alle andre request.
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        køn: req.body.køn,
        email: req.body.email,
        alder: req.body.alder
    });
    user
    .save()
    .then(result => {
        // console logger det post request jeg sender
    console.log(result);
    res.status(201).json({
        message:  "Oprettet en ny burger ved Søren TinderApp",
        createdUser: {
        username: result.username,
        password: result.password,
        køn: result.køn,
        email: result.email,
        alder: result.alder,
        _id: result._id,
        request:{ 
            type:"GET",
            url: "http://localhost:3000/user/" + result._id
            }
        }
        });
    })
    .catch(err => {
        console.log(err);
    res.status(500).json({
        error: err
    });
});

});

//Vi bruger nu router til håndtere PATCH request (url) - specifik USERID
//Jeg kan opdater alle mine propData med en ny ops.value. Jeg kan ikke tilføje nye. 
router.patch("/:userId",(req, res, next) => {
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
        køn: req.body.Newkøn,
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
    });





//Vi bruger nu router til håndtere DELETE request (url) - specifik USERID
router.delete("/:userId",(req, res, next) => {
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
});




//GET request for et speical id efter user ID
router.get("/:userId", (req, res, next) => {
    const id = req.params.userId;
  User.findById(id)
  .select("username password _id køn email alder")
  .exec()
  .then(doc =>{
      console.log("Fra vores MongoDB database", doc);
      if(doc){
        res.status(200).json({
        product: doc,
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
})


module.exports = router;