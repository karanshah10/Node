module.exports = function (req, res, next) {
    console.log("Executing the common policy");
    next();
}