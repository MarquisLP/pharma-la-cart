const requestPrefix = (
    (process.env.NODE_ENV === 'production')
    ? ''
    : 'http://localhost:8080'
);

module.exports = {
    requestPrefix: requestPrefix // Base URL used for all requests sent to the backend
};