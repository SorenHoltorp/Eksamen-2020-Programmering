const express = require("express");
const { match } = require("assert");
//Router er noget som følger med express, vi enabler den som en function
const router = express.Router();

router.get("/", (req, res, next)=>{
    res.status(200).json({
        message: "Matches blevet hentet"
    })
})

router.post("/", (req, res, next)=>{
    const match = {
        matchId: req.body.matchId,
        matchName: req.body.matchName,
        matchPhoto: req.body.matchPhoto,
        matchKøn: req.body.matchKøn,
        matchAlder: req.body.matchAlder
    }
    res.status(201).json({
        message: "Potentiel match blev oprettet",
        match: match
    })
})

router.get("/:matchId", (req, res, next)=>{
    res.status(200).json({
        message: "Matches detaljer",
        matchId: req.params.matchId
    })
})

router.delete("/:matchId", (req, res, next)=>{
    res.status(200).json({
        message: "Match fjernet, tudegrim",
        matchId: req.params.matchId
    })
})



//Laver ikke nogen update function for matches, da det kun bør være user som har den

module.exports = router;