const express = require("express");

//Vi laver en route, som fungerer som en function
const router = express.Router();
const Post = require("../Models/Post");

// Vi creater vores egne routes i seperate filer og importere her

//Routes // "get request - skyder os tilbage en besked gennem res.send hvis vi skulle ha login form kunne
// bruge post til login form, hvis vi har en post list kan vi "delete"
// patch we would use path for updating
// '/' is the route we want to go to

router.get("/",(req,res) => {
    res.send("we are post");
});


router.post("/",(req,res)=>{
    console.log(req.body);
})



//Nu kan vi exportere routeren
module.exports = router;