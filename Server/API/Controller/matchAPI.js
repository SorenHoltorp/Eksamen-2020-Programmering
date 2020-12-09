const express = require("express");
//Router er noget som følger med express, vi enabler den som en function
const router = express.Router();
const mongoose = require("mongoose")
const checkAuth = require('../middleware/check-auth');

const Match = require("../Models/matchModel");
const User = require("../Models/userModel")

router.post("/newmatch", (req, res, next)=>{
    const newmatch = new Match ({
        _id: mongoose.Types.ObjectId(),
        matchName: req.body.matchName,
        matchGender: req.body.matchGender,
        matchAlder: req.body.matchAlder,
    }); 
    newmatch
    .save()
    .then(result => { 
        console.log(result);
        //console.logger post
      return res.status(201).json({
        message:  "Oprettet et nyt MATCH ved Søren TinderApp",
      createdMatch: { 
        matchName: result.matchName,
        matchGender: result.matchGender,
        matchAlder: result.matchAlder,
        _id: result._id,
      } })  
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
})

/* for at få alle matches - simple
router.get("/", (req, res, next)=>{
    res.status(200).json({
        message: "Matches blevet hentet"
    })
})
*/
        //$addToSet sikrer at det vi pusher ind i arrayet ikke allerede er der. Så vi ikke kan like en user to gange


//Like function
router.put("/like", (req,res,next)=>{
    User.findByIdAndUpdate(req.body.newuserId),{
        $push:{userlikeuser:req.newuser._id}
    },{
        new: true
    }.exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        } else{
            res.json(result)
        }
    })

})


//Dislike function
router.put("/dislike", (req,res,next)=>{
    Match.findByIdAndUpdate(req.body.matchId),{
        $pull:{userlikes:req.newuser._id}
    },{
        new: true
    }.exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        } else{
            res.json(result)
        }
    })

})



router.get("/", (req, res, next)=> {
    User.find()
    .exec()
    .then(docs => { 
        const svarpåmatchrequest = {
            count: "Antal matches er " + docs.length,
            user: docs.map(doc =>{
                return {
                    userName: doc.userName,
                    gender: doc.gender,
                    birthday: doc.birthday,
                    _id: doc._id,
            }
        })
    }
     if (docs.length >= 0){
        res.status(200).json(svarpåmatchrequest);
        } else {
           res.status(404).json({
          message: "Ingen matches at vise, sorries"
           });
       }
})

    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

});

//Bruger metoden populate til at linke matches til en user?
router.get("/:matchId", (req, res, next)=>{
    const id = req.params.matchId;
    Match.findById(id)
    .exec()
    .then(doc =>{
        console.log("Fra vores MongoDB database", doc);
        if(doc){
          res.status(200).json({
          product: doc,
          request: {
              type: "Get",
              description: "Listen over alle matches",
              url: "http://localhost:3000/match/"
          }
      });
  // HVIS ID ikke har en korrekt værdi, kaster vi denne error message
        } else res.status(404).json({
            message:"Dette id har ikke en korrekt værdi"
        });
  
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
  });
  })

router.delete("/:newmatchId", async (req, res, next)=>{
    await Match.findByIdAndDelete(req.params.newmatchId)
    .exec()
    .then(result =>{ 
        return res.status(200).json({
            message: "Match blev slettet"
        });
    })
    .catch(err =>{
        console.log(err);
        return res.status(500).json({
            error: err
        })
    });
});




//Laver ikke nogen update function for matches, da det kun bør være user som har den

module.exports = router;