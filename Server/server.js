const http = require("http");
const app = require("./app")
//Sætter porten til et vilkårligt tal OR 3000
const port = process.env.PORT || 3000;


//opretter serveren
const server = http.createServer(app);

//Serveren lytter
// Vi sætter appen igang med at lytte til serveren
// På den port som blev defineret øverst.

server.listen(port);