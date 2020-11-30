const User = require("../Models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// GET
exports.user_get_all = (req, res, next) => {
    User.find()
    .select("username password _id køn email alder userBillede")
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
        userBillede: doc.userBillede,
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
  .select("username password _id køn email alder userBillede")
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
exports.user_login = (req, res, next) => {
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
    
}

//create
exports.user_create = (req,res,next) => {
    User.find({username:req.body.username})
    .exec()
    .then(user =>{
        console.log("178")
        if(user.length >= 1){
            return res.status(409).json({
                message: "Username er allerede taget i brug"
            })
        } else {

        }
    })
    console.log(req.file);
    bcrypt.hash(req.body.password,10, (err,hash) => {
        console.log(189)
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {const user = new User ({
            //Her opretter vi et ID, igennem mongoose, som er unikt og som bruges som refference punkt igennem alle andre request.
                      _id: new mongoose.Types.ObjectId(),
                     username: req.body.username,
                     password: hash,
                     køn: req.body.køn,
                  email: req.body.email,
                  alder: req.body.alder,
                  info: req.body.info
                 // userBillede: req.file.path
                  });
                  user.save()
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
                  
              }

