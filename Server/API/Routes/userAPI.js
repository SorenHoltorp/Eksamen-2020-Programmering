const express = require("express");
//Router er noget som følger med express, vi enabler den som en function
const router = express.Router();
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
router.post('/login', (req, res, next) => {
    console.log(req.body)
    User.find({ username: req.body.username })
    .then(User => {
        if (User.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        console.log("58")
        bcrypt.compare(req.body.password, User[0].password, (err, result) =>{
            if(err) {
                return res.status(401).json({ 
                    message: "Auth failed"
            });
        } if (result) {
            const token = jwt.sign({
                username: User[0].username,
                signUserId: User[0]._id
            }, process.env.JWT_KEY, 
            {
                expiresIn: "1h"
            }
            );
            console.log("77")

            return res.status(200).json({
                message: User,
                token: token
            })
        }
        console.log("84")

        return res.status(401).json({
            message: "Kunne ikke logge ind"
        })
        }) 
        console.log("90")


    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            error: err
        })
    })
    console.log("99")

    
} )

// Oprettelse af bruger med crypto password - med POST request
router.post('/signup', (req, res, next) => {
    User.find({username:req.body.username})
    .exec()
    .then(signUser => {
        console.log("178")
        if(signUser.length >= 1) {
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
                   const signUser = new User ({
            //Her opretter vi et ID, igennem mongoose, som er unikt og som bruges som refference punkt igennem alle andre request.
                      _id: new mongoose.Types.ObjectId(),
                     username: req.body.username,
                     password: hash,
                     gender: req.body.gender,
                  email: req.body.email,
                  birthday: req.body.birthday,
                 // userBillede: req.file.path
                  });
                  signUser.save()
                  .then(result => {
                              // console logger det post request jeg sender
                      console.log(result);
                      return res.status(201).json({
                          message:  "Oprettet en ny burger ved Søren TinderApp",
                        createdUser: {
                          username: result.username,
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
                

            
    
//GET Request for at finde alle profiler i databasen
router.get("/", (req, res, next) => {
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
} );

//Vi bruger nu router til håndtere PATCH request (url) - specifik USERID
//Jeg kan opdater alle mine propData med en ny ops.value. Jeg kan ikke tilføje nye. 
router.patch("/:userId", UserController.user_update_id, );


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