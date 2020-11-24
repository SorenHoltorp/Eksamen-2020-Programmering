//importere express
const express = require("express");
const cors = require("cors");
// importere body-parser
const bodyParser = require("body-parser")
// we execute it
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

// Så jeg kan snakke med Json filen ved alle request
app.use(cors())
app.use(bodyParser.json());

//Import routes
const postsRoute = require("./Routes/posts");


//WE creater middlewares og siger at hver gang man når posts
// Brug posts routen
app.use("/posts",postsRoute);

//Routes
app.get('/',(req,res)=>{
    res.send("we are home");
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
    () => console.log("connected to DB!"))


// how to listen to server
app.listen(3000);

// Nu kører serveren ved npm start i consollen. 