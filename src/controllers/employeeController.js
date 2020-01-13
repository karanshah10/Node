let employeeService = require('../services/employeeService');
let utils = require('../utils/utilities');

module.exports = {
    employeeRegistration,
    updateEmployeeProfile,
    getEmployee,
    removeEmployee,
    employeeDataAsyncParellar,
    employeeAsyncSeries,
    employeeAsyncWaterfall,
    promiseParaller,
    promiseSeries
};

function employeeAsyncWaterfall(req, res) {
    let empId = req.params['id'];
    employeeService.asyncwaterfall(empId, function (err, response) {
        if (err) {
            let msg = "Invalid request";
            let result = utils.prepareJsonResponse(msg, err);
            res.send(result);
        } else {
            let msg = "SuccessFul waterfall request";
            let result = utils.prepareJsonResponse(msg, err, response);
            res.send(result);
        }
    });
}

function employeeAsyncSeries(req, res) {

    employeeService.getEmployeeAsyncSeries(req.body, function (err, response) {
        if (err) {
            // console.log(err);
            let msg = "Invalid data";
            let result = utils.prepareJsonResponse(msg, err);
            res.send(result);
        } else {
            // console.log("Data Successfully added");
            let msg = "Success";
            let result = utils.prepareJsonResponse(msg, err, response[1]);
            res.send(result);
        }
    });
}

function promiseSeries(req, res) {
    employeeService.callPromiseSeries(req.body).then(function (result) {
        let msg = "Success";
        let resp = utils.prepareJsonResponse(msg, null, result);
        res.send(resp);
    }).catch(function (err) {
        let msg = "Invalid Data";
        let resp = utils.prepareJsonResponse(msg, err);
        res.send(resp);
    });
}

function employeeDataAsyncParellar(req, res) {
    console.log(req.params['id'] + 'Employee Id');
    let id = req.params['id'];
    employeeService.getEmployeeAsyncParaller(id, function (err, response) {
        if (err) {
            console.log(err);
            let msg = "Invalid Request";
            let resp = utils.prepareJsonResponse(msg, err);
            res.send(resp);
        } else {
            console.log(response);
            let msg = "Success";
            let resp = utils.prepareJsonResponse(msg, err, response);
            res.send(resp);
        }
    });
}

function promiseParaller(req, res) {
    let id = req.params['id'];
    employeeService.callPromiseParaller(id).then(function (result) {
        let msg = "success"
        let resp = utils.prepareJsonResponse(msg, null, result);
        res.send(resp);
    }).catch(function (err) {
        let msg = "Invalid Data";
        let resp = utils.prepareJsonResponse(msg, err);
        res.send(resp);
    });
}

function employeeRegistration(req, res) {
    console.log("In controller");
    employeeService.insertEmployeeData(req.body, function (err, resp) {
        if (err) {
            let msg = "Invalid Data";
            let response = utils.prepareJsonResponse(msg, err);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(response);
        } else {
            let msg = "Successfully data added";
            let response = utils.prepareJsonResponse(msg);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(response);
        }
    });
}

function updateEmployeeProfile(req, res) {
    console.log("##", req.body);

    let Id = req.params['id'];
    employeeService.updateEmployeeData(Id, req.body, function (err, resp) {
        if (err) {
            let msg = "Invalid Data";
            let response = utils.prepareJsonResponse(msg);
            res.send(response);
        } else {
            let msg = "User information updated successfully";
            let response = utils.prepareJsonResponse(msg);
            res.send(response);
        }
    });
}

function getEmployee(req, res) {
    let Id = req.params['id'];
    employeeService.getEmployeeData(Id, function (err, response) {
        if (err) {
            let msg = "Invalid request";
            let resp = utils.prepareJsonResponse(msg, err);
            res.send(resp);
        }
        let msg = "Success";
        console.log(response);
        let resp = utils.prepareJsonResponse(msg, err, response[0]);
        console.log(resp);
        res.send(resp);
    });
}

function removeEmployee(req, res) {
    employeeService.deleteEmployee(req.body).then(function (result) {
        let msg = "User deleted successfully";
        let response = utils.prepareJsonResponse(msg);
        res.send(response);
    }).catch(function (err) {
        res.send(err);
    });
}

// module.exports = function (app) {
//     app.post('/employee/register', function (req, res) {
//         employeeService.insertEmployeeData(req.body, function (err, resp) {
//             if (err) {
//                 let msg = "Invalid Data";
//                 let response = utils.prepareJsonResponse(msg, err);
//                 res.send(response);
//             } else {
//                 let msg = "Successfully data added";
//                 let response = utils.prepareJsonResponse(msg);
//                 res.send(response);
//             }
//         });
//     });

//     app.post('/employee/updateProfile/:id', function (req, res) {
//         console.log("##", req.body);

//         let Id = req.params['id'];
//         employeeService.updateEmployeeData(Id, req.body, function (err, resp) {
//             if (err) {
//                 let msg = "Invalid Data";
//                 let response = utils.prepareJsonResponse(msg);
//                 res.send(response);
//             } else {
//                 let msg = "User information updated successfully";
//                 let response = utils.prepareJsonResponse(msg);
//                 res.send(response);
//             }
//         });
//     });

//     app.get('/employee/getEmployee/:id', function (req, res) {
//         let Id = req.params['id'];
//         employeeService.getEmployeeData(Id, function (err, response) {
//             if (err) {
//                 let msg = "Invalid request";
//                 let resp = utils.prepareJsonResponse(msg, err);
//                 res.send(resp);
//             }
//             let msg = "Success";
//             let resp = utils.prepareJsonResponse(msg, err, response);
//             res.send(resp);
//         });
//     });

//     app.post('/employee/remove', function (req, res) {
//         employeeService.deleteEmployee(req.body).then(function (result) {
//             let msg = "User deleted successfully";
//             let response = utils.prepareJsonResponse(msg);
//             res.send(response);
//         }).catch(function (err) {
//             res.send(err);
//         });
//     });
// }