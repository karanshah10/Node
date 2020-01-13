const express = require('express');
const app = express();
const server = require('http').createServer(app);

const bodyparser = require('body-parser');
const fs = require('fs');
let route = require('./config/routes');
var cors = require('cors');

app.use(bodyparser.urlencoded({
    extended: false
}))

//parse application /json
app.use(bodyparser.json());
app.use(cors({
    origin: 'http://localhost:4200'
  }));
route(app);
startServer();

function startServer() {
    const port = 1002;
    //loadControllers();
    return server.listen(port, function () {
        console.log(`service monitor running on port ${port}`);
    });
}

function stopServer() {
    server.close(function () {
        process.exit();
    });
}

function loadControllers() {
    let controllers = fs.readdirSync(__dirname + '/controllers');
    controllers.forEach(controller => {
        require(__dirname + '/controllers/' + controller)(app);
    });
}

module.exports = {
    startServer,
    stopServer
};
