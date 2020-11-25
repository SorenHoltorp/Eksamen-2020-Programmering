//importere express
const express = require("express");
const cors = require("cors");
// importere body-parser
const bodyParser = require("body-parser")
// we execute it
const app = express();
const mongoose = require("mongoose");
//nodejs måde at logge ting på - middleware
const morgan = require("morgan");

port = process.env.PORT || 30000;

require("dotenv/config");

// Så jeg kan snakke med Json filen ved alle request
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan("dev"));

//Import route
const postsRoute = require("./API/Routes/user");
const matchRoute = require("./API/Routes/match")


//WE creater middlewares og siger at hver gang man når posts
// Brug posts routen
app.use("/posts",postsRoute);

//Her laver jeg en error function som sender en error.message 
// hvis man ikke har en sti på sin local host - gør at man ikke kan bruge api knappen
/*
app.use((req, res,next)=> {
    const error = new Error("Ough forkert sti brormand");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

*/

//Routes
app.get('/',(req,res)=>{
    res.send("Du har kontakt til serveren");
});

//Middlewares
// er en function som sættes ignag når en route bliver Hit "ramt", 
// så vi kan køre en function som altid vil blive kørt når vi rammer routen.

// app.use("/posts", () => {
   // console.log("this is a middelware running")
// });
//tjekker om user er den rigtige
// app.use(auth);

// Nu kan vi lave router 

//Til reflektion kunne man bruge FS ( HASHMAPS HENTE TING PÅ ARRAYS PLADSER)



// Connection til MongoDB database Atlas
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    // { useUnifiedTopology: true }, // Virker ikke med vores server
    () => console.log("Serveren kører babe! on"))


// how to listen to server
app.listen(port);

// Nu kører serveren ved npm start i consollen. 

module.exports = app;