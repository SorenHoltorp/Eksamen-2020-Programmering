
//importere express
const express = require("express");
//importere cors, en nødvendighed for at bruge http
//const cors = require("cors");
// importere body-parser - omskriver json
const bodyParser = require("body-parser")
// bruger express til vores server
const app = express();
//importere mongoose, et udvidelse til MongoDb
const mongoose = require("mongoose");
//nodejs måde at logge ting på - middleware
const morgan = require("morgan");
require("dotenv/config")

//Import route
const userRoute = require("./API/Controller/userAPI")
const matchRoute = require("./API/Controller/matchAPI")



// ved at tilføje process.env.MONGO_ATLAS_PW,
// så behøver jeg ikke hardcore mit password ind i stien, istedet laver jeg et opbject inde i nodemon.json filen
// ellers så er dette stien til min databse på mongoDB atlas
 mongoose.connect(
 "mongodb+srv://soren:"
    + process.env.MONGO_ATLAS_PW + 
"@tinderapp.f1lwk.mongodb.net/soren?retryWrites=true&w=majority",
{ useNewUrlParser: true },
{ useUnifiedTopology: true }, // Virker ikke med vores server
() => console.log("Serveren kører babe!"));
/*
mongoose.connect(
    process.env.MONGO_ATLAS_PW,
    { useNewUrlParser: true },
    () => console.log('Connected til serveren!'));
*/

// Så jeg kan snakke med Json filen ved alle request
//app.use(cors())
//Gør json data læseligt for mig
app.use(bodyParser.json());
// Kunne oversætte url data til javascript. boolean værdien siger noget om hvor kompleks værdierne skal være. False er simple værdier.
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan("dev"));
// app.use("/uploads",express.static("uploads"))

// Alt den her kode gør, at jeg kan sende req til single-view applikations igennem cors
app.use((req, res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*");
if (req.method === "OPTIONS") {
    res.header ("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});  
    }
    next();
});

//Routes som skal håndtere requests
app.use("/User", userRoute);
app.use("/Match", matchRoute);

//Her laver jeg en error function som sender en error.message 
// hvis man ikke har en sti på sin local host - gør at man ikke kan bruge api knappen

app.use((req, res, next)=> {
    const error = new Error("pis og lort");
        error.status = 404;
            next(error);
        })
app.use((error, req, res, next) => {
        res.status(error.status || 500);
            res.json({
        error: {
        message:("det er noget rigtig pis"+ error.message )
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






