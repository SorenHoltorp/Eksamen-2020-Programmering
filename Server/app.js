const http = require("http");
//importere express
const express = require("express");
//importere cors, en nødvendighed for at bruge http
const cors = require("cors");
// importere body-parser - omskriver json
const bodyParser = require("body-parser")
// bruger express til vores server
const app = express();
//importere mongoose, et udvidelse til MongoDb
const mongoose = require("mongoose");
//nodejs måde at logge ting på - middleware
const morgan = require("morgan");







//Sætter porten til et vilkårligt tal
port = process.env.PORT || 30000;

//Henter mongoDb stien til databasen
require("dotenv/config");

// Så jeg kan snakke med Json filen ved alle request
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan("dev"));

//Import route








// Vi sætter appen igang med at lytte til serveren
// På den port som blev defineret øverst.
app.listen(port);

// Nu kører serveren ved npm start i consollen. 
module.exports = app;