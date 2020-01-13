let employeeController = require('../controllers/employeeController');
let commonPolicy = require('../policies/commonPolicy');
let loginPolicy = require('../policies/loginPolicy');

module.exports = function (app) {
    let loginUserValidations = [commonPolicy, loginPolicy];
    app.post('/employee/register', loginUserValidations, function (req, res) {
        //emplpyeeController.employeeRegistration(req,res);
        console.log("Request from Angular Post");
        employeeController.employeeRegistration(req, res);
    });

    app.post('/employee/updateProfile/:id', function (req, res) {
        employeeController.updateEmployeeProfile(req, res);
    });

    app.get('/employee/getEmployee/:id', function (req, res) {
        console.log("Request from Angular Get");
        employeeController.getEmployee(req, res);
    })

    app.post('/employee/remove', function (req, res) {
        employeeController.removeEmployee(req, res);
    });

    app.get('/employee/getEmployeeUsingAsyncParaller/:id', function (req, res) {
        employeeController.employeeDataAsyncParellar(req, res);
    });

    app.post('/employee/asyncSeries', function (req, res) {
        employeeController.employeeAsyncSeries(req, res);
    });

    app.get('/employee/asyncWaterfall/:id', function (req, res) {
        employeeController.employeeAsyncWaterfall(req, res);
    });

    app.get('/employee/promiseparaller/:id', function (req, res) {
        employeeController.promiseParaller(req, res);
    });

    app.post('/employee/promiseSeries', function (req, res) {
        employeeController.promiseSeries(req, res);
    });
}