
//importere express
const express = require("express");
//importere cors, en nødvendighed for at bruge http
//const cors = require("cors");
// importere body-parser - omskriver json
//const bodyParser = require("body-parser")
// bruger express til vores server
const app = express();
//importere mongoose, et udvidelse til MongoDb
//const mongoose = require("mongoose");
//nodejs måde at logge ting på - middleware
//const morgan = require("morgan");




//Henter mongoDb stien til databasen
//require("dotenv/config");

// Så jeg kan snakke med Json filen ved alle request
//app.use(cors())
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(morgan("dev"));

//middleware, en request skal gå igennem app eller hvad vi sætter ind i parameteren
app.use((req,res,next) => {
    res.status(200).json({
        message: "Du har connection til serveren"
    });
});

//Import route




// Nu kører serveren ved npm start i consollen. 
module.exports = app;