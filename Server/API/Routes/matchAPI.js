const express = require("express");
const { match } = require("assert");
//Router er noget som følger med express, vi enabler den som en function
const router = express.Router();
const mongoose = require("mongoose")
const checkAuth = require('../middleware/check-auth');

const Match = require("../Models/matchModel");

router.post("/", (req, res, next)=>{
    const match = new Match ({
        _id: mongoose.Types.ObjectId(),
        matchName: req.body.matchName,
        matchKøn: req.body.matchKøn,
       // matchBillede: req.body.userId,
        matchAlder: req.body.matchAlder,
    }); 
    match.save()
    .then(result => { 
        console.log(result);
      res.status(201).json({result})  
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

router.get("/", (req, res, next)=> {
    Match.find()
    .exec()
    .then(docs => { 
        const svarpåmatchrequest = {
            count: "Antal matches er " + docs.length,
            user: docs.map(doc =>{
                return {
                    matchName: doc.matchName,
                    matchKøn: doc.matchKøn,
                    matchAlder: doc.matchAlder,
        _id: doc._id,
        request:{
            type:"GET",
            url: "http://localhost:3000/match/" + doc._id 
    }
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

router.delete("/:matchId", (req, res, next)=>{
    const id = req.params.matchId
    Match.remove({ _id: id })
    .exec()
    .then(result =>{ 
        res.status(200).json({
            message: "Match blev slettet,tudegrim var hun"
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});



//Laver ikke nogen update function for matches, da det kun bør være user som har den

module.exports = router;