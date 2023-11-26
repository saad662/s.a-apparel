module.exports = (theFunc) => (req, res, next) => {
    // Wrap the asynchronous function and catch any errors
    Promise.resolve(theFunc(req, res, next)).catch(next);
};