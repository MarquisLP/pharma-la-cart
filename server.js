/**
 * Returns an instance of the Hack Right Now backend server using the given configuration options.
 * 
 * @param {object} options.knex The Knex instance defining database connection options
 * @param {object} options.bodyParser An instance of the bodyParser package that defines
 *                                    how request bodies should be parsed (e.g. JSON)
 * @param {object} options.sessionConfig OPTIONAL. An instance of the express-session package that configures session behaviour
 * @param {function(req, res, next)} options.sessionMiddleware OPTIONAL. A middleware function that sets the two sessiona attributes,
 *                                                             req.userId and req.userType, accordingly
 * @param {object} options.cors OPTIONAL. An instance of the cors package that defines how the server handles CORS requests
 */
module.exports = function(options) {
    // Set up Express server
    const express = require('express');
    const server = express();

    //Set up mongoose connection
    const mongoose = require('mongoose');
    const mongoDB = (process.env.ATLAS_CONNECTION_URI);
    mongoose.connect(mongoDB, { useNewUrlParser: true, useFindAndModify: false });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    // Set up sessions for Express
    if (options.sessionConfig) {
        server.use(options.sessionConfig);
    }
    // Set how request bodies will be parsed
    server.use(options.bodyParser);
    // Set retrieval of session info
    if (options.sessionMiddleware) {
        server.use(options.sessionMiddleware);
    }
    // Set CORS configurations
    if (options.cors) {
        server.use(options.cors);
    }

    // IMPORT ENDPOINT ROUTES HERE
    // Example: require('./routes/admins/signup')(server);
    require('./routes/Users/user')(server);
    require('./routes/Pharmacies/pharmacy')(server);
    require('./routes/Medicines/medicine')(server);
    require('./routes/DeliveryRequests/delivery_request')(server);
    return server;
};
