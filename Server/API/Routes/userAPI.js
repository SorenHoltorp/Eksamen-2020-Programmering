const express = require("express");
//Router er noget som følger med express, vi enabler den som en function
const router = express.Router();



// HTTP REQUEST NEDENFOR

//Vi bruger nu router til håndtere GET request (url)
router.get("/",(req, res, next) => {
    res.status(200).json({
message:  "Handling GET request til /user"
    });
});

//Vi bruger nu router til håndtere POST request (url)
router.post("/",(req, res, next) => {
    res.status(201).json({
message:  "Handling POST request til /user"
    });
});

//Vi bruger nu router til håndtere PATCH request (url) - specifik USERID
router.patch("/userID",(req, res, next) => {
    res.status(200).json({
message:  "Updaterede user"
    });
});

//Vi bruger nu router til håndtere DELETE request (url) - specifik USERID
router.delete("/userId",(req, res, next) => {
    res.status(200).json({
message:  "User er deleted"
    });
});

//GET request for et speical id efter user url/
router.get("/:userId", (req, res, next) => {
    const id = req.params.userId;
    if (id === "special") {
    res.status(200).json({
        message: "Det var id'et",
        id: id
    });
} else {
    res.status(200).json({
        message: "Du ramte ikke ID" 
        });
    }
});

module.exports = router;