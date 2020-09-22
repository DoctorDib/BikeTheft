//const App = require('./templates/main.jsx');

const express = require('express');
//const ReactEngine = require('express-react-engine');
const bodyParser = require('body-parser');
const http = require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const flash = require('connect-flash');

const path = require('path');
const favicon = require('serve-favicon');

const dependencies = require('./dependencies');

dependencies.resolve(function(router, posts){
    const app = SetupExpress();

    function SetupExpress(){
        const app = express();
        const server = http.createServer(app);

        server.listen(8080, function(){
            console.log('Listening on port 8080');
        });

        configureExpress(app);

        // Setup Router/Routing
        const expressRouting = require('express-promise-router')();

        // grabbing main template
        // Grabbing content
        router.setRouting(expressRouting);
        posts.setRouting(expressRouting);

        app.use(expressRouting);
    }

    function configureExpress(app){

        app.use(express.static('client/public'));
        app.use(favicon(path.join(__dirname, '/client/src/img', 'icon.png')));
        app.use(cookieParser());

        app.set('views', __dirname + '/client/public');
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(validator());

        app.use(flash());
    }
});

