
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
const morgan = require("morgan");


//Import route
const userRoute = require("./API/Routes/userAPI")
const matchRoute = require("./API/Routes/matchAPI")




//Henter mongoDb stien til databasen
//require("dotenv/config");

// Så jeg kan snakke med Json filen ved alle request
//app.use(cors())
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan("dev"));

//Routes som skal håndtere requests
app.use("/user", userRoute);
app.use("/match", matchRoute);

//Her laver jeg en error function som sender en error.message 
// hvis man ikke har en sti på sin local host - gør at man ikke kan bruge api knappen

app.use((req, res,next)=> {
    const error = new Error("Ough forkert sti johnny bravo");
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

// en anden metode ville være 
/*
catch(err)
{res.json({messege:err})
}
*/

//middleware, en request skal gå igennem app eller hvad vi sætter ind i parameteren
// Er en standard, hvis man ikke har en url efter localhost3000
app.use((req, res, next) => {
    res.status(200).json({
        message: "Du har connection til serveren, men ingen steder at gå hen"
    });
});


// Nu kører serveren ved npm start i consollen. 
module.exports = app;






