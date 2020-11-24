const express = require("express");

//Vi laver en route, som fungerer som en function
const router = express.Router();
const Post = require("../Models/Post");

// Vi creater vores egne routes i seperate filer og importere her

//Routes // "get request - skyder os tilbage en besked gennem res.send hvis vi skulle ha login form kunne
// bruge post til login form, hvis vi har en post list kan vi "delete"
// patch we would use path for updating
// '/' is the route we want to go to

//FÅr alle post tilbage i databasen
router.get("/", async (req,res) => {
    // find er en metode på mongoose
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message: err});
    }
});

// Det her sender et post afsted som jeg skriver i json body filen
router.post("/", async (req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
    const savedPost = await post.save();
    res.json(savedPost);
    } catch(err){
        res.json ({messege: err})
    };
});


//Søgning efter specifik route på objektID ( Se om der findes en user i databasen)
router.get("/:postId", async (req,res)=> {
    try{
    const post = await Post.findById(req.params.postId);
    res.json(post)
    }catch(err)
        {res.json({messege:err})
    }
});

//Delete en post ( Kunne være en specifik bruger)
// Async er fordi vi laver en promise
router.delete("/:postId", async (req,res)=>{
   try {
    const removedPost = await Post.remove({_id: req.params.postId})
    res.json(removedPost);
   }catch(err)
   {res.json({messege:err})
}
});


//Update en user (post)
router.patch("/:postId", async(req,res)=>{
    try{
        const updatedPost = await Post.updateOne ({_id: req.params.postId}, 
            {$set: { title: req.body.title } })
            res.json(updatedPost);
    }catch(err){
   res.json({messege:err});
}
});


//Nu kan vi exportere routeren
module.exports = router;