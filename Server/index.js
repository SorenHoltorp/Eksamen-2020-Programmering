var express = require("express");
var cors = require("cors")
var app = express();
app.use(cors());

const PORT = 3000;

//server aktiveres
app.listen(PORT, () => {
  console.log(`Server-applikation lytter på http://localhost:${port}`)
})