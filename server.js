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

    // Set connection settings for the database
    const { Model } = require('objection');
    Model.knex(options.knex);
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

    return server;
};
