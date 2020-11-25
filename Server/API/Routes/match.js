/*
const express = require("express");

//Vi laver en route, som fungerer som en function
const router = express.Router();

router.get("/",(req, res, next) => {
    res.status(200).json({
        message: "Match were fetched"
    });
});

router.post("/",(req, res, next) => {
    res.status(201).json({
        message: "Match were created"
    });
});

router.get("/:matchId",(req, res, next) => {
    res.status(200).json({
        message: "Match detail ",
        orderId: req.params.orderId
    });
});

*/