const express = require("express");
//Router er noget som følger med express, vi enabler den som en function
const router = express.Router();
const request  = require("http");
const checkAuth = require("../middleware/check-auth");

const UserController = require("../Controllers/user");

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
router.post("/Client/FrontPage/frontpage.html", UserController.user_login, checkAuth)


// Oprettelse af bruger med crypto password - med POST request
router.post("/Client/Createacc/Createacc.html", UserController.user_create, /*upload.single("userImage"),*/ );
            
    
//GET Request for at finde alle profiler i databasen
router.get("/", UserController.user_get_all, checkAuth);

//Vi bruger nu router til håndtere PATCH request (url) - specifik USERID
//Jeg kan opdater alle mine propData med en ny ops.value. Jeg kan ikke tilføje nye. 
router.patch("/:userId", UserController.user_update_id, checkAuth);


//Vi bruger nu router til håndtere DELETE request (url) - specifik USERID
router.delete("/:userId", UserController.user_delete_id, checkAuth);


//GET request for et speical id efter user ID
router.get("/:userId", UserController.user_get_id, checkAuth )


module.exports = router;