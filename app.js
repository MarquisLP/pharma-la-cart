// Load environment variables from the .env file.
// This is not needed for production, as environment variables are provided by the host.
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


// Create the object that will hold all of our server configurations.
serverOptions = {};


// Configure the Knex database used by Objection.
const Knex = require('knex');
const knexConfig = require('./knexfile');
if (process.env.NODE_ENV === 'production') {
    serverOptions.knex = Knex(knexConfig.production);
}
else {
    serverOptions.knex = Knex(knexConfig.development);
}


// Set up sessions for Express
const session = require('express-session');
const MAX_COOKIE_AGE_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;
// Production stores sessions in the database
if (process.env.NODE_ENV === 'production') {
    const pgSession = require('connect-pg-simple')(session);
    serverOptions.sessionConfig = session({
        store: new pgSession(),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: MAX_COOKIE_AGE_IN_MILLISECONDS }
    });
}
// Dev environments store sessions in local memory
else {
    serverOptions.sessionConfig = session({
        secret: 'hackrightnowdev',
        saveUninitialized: false,
        resave: false,
        cookie: { maxAge: MAX_COOKIE_AGE_IN_MILLISECONDS }
    });
}

// Get the user's ID and type from their session record, so that we can refer to it in the endpoints.
// They will be stored in 'req.userId' and 'req.userType'.
serverOptions.sessionMiddleware = function (req, res, next) {
    req.userId = ('userId' in req.session) ? req.session.userId : null;
    req.userType = ('userType' in req.session) ? req.session.userType : null;
    next();
};


// Parse JSON in request bodies.
serverOptions.bodyParser = require('body-parser').json();


// Enable CORS requests from localhost and our domain only
const cors = require('cors');
serverOptions.cors = cors({
    origin: ["http://localhost:3000"],
    credentials: true
});


// Create the server instance, injecting our configurations.
const server = require('./server')(serverOptions);


// Run the server on the correct port, depending on the environment
const http = require('http');
let port = process.env.PORT || 8080;
if (process.env.NODE_ENV === 'production') {
    http.createServer(server).listen(port, function (err) {
        if (err) console.log(err);
    });
}
else {
    http.createServer(server).listen(port, function (err) {
        if (err) console.log(err);
    });
}
