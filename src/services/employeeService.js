let sqlHelper = require('../helpers/sqlHelper');
let async = require('async');
let utils = require('../utils/utilities');

module.exports = {
    insertEmployeeData,
    updateEmployeeData,
    getEmployeeData,
    deleteEmployee,
    getEmployeeAsyncParaller,
    getEmployeeAsyncSeries,
    asyncwaterfall,
    callPromiseParaller,
    callPromiseSeries
}

function asyncwaterfall(empId, asyncWaterfallCalback) {
    let asyncWaterfallData = [];

    function getEmployeeById(callback) {
        sqlHelper.getEmployeeData(empId, function (err, res) {
            if (err) {
                return callback(err);
            } else {
                console.log("GET" + JSON.stringify(res));
                return callback(null, res);
            }
        });
    }

    function getuser_data(request, callback) {
        let id = request[0].Id;

        sqlHelper.getEmployeeDataFromEmployee_Data(id, function (err, res) {
            if (err) {
                callback(err);

            } else {
                callback(null, res);
            }
        });
    }

    asyncWaterfallData.push(getEmployeeById);
    asyncWaterfallData.push(getuser_data);

    async.waterfall(asyncWaterfallData, function (err, res) {
        if (err) {
            return asyncWaterfallCalback(err);
        } else {
            return asyncWaterfallCalback(null, res);
        }
    });
}

function callPromiseSeries(req) {
    return new Promise(function (resolve, reject) {
        let promise1 = new Promise(function (resolve, reject) {
            let name = req.name;
            let password = req.password;
            let email = req.email;
            sqlHelper.promiseInsertData(JSON.stringify(name), JSON.stringify(password), JSON.stringify(email))
                .then(function (result) {
                    resolve(result);
                }).catch(function (err) {
                    reject(err);
                });
        });

        let promise2 = new Promise(function (resolve, reject) {
            sqlHelper.promiseGetAllEmployee().then(function (result) {
                resolve(result);
            }).catch(function (err) {
                reject(err);
            });
        });

        let arr = [promise1, promise2];

        function series(arr) {
            return new Promise(function (resolve, reject) {
                arr.reduce(function (chain, d) {
                    chain.then(() => console.log(d))
                }, Promise.reduce());
            });
        }

        series(arr).then(function (result) {
            console.log("Final result" + result);
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });

        // function pseries(list) {
        //     var p = Promise.resolve();
        //     return list.reduce(function (pacc, fn) {
        //         return pacc = pacc.then(fn);
        //     }, p);
        // }

        // function series(arr) {
        //     const results = [];
        //     return new Promise(function (resolve1, reject) {
        //         arr.reduce(function (chain, value, index) {
        //             chain.then(function (value) {
        //                 console.log("IN Series", value);
        //                 resolve1(value);
        //                 results[index] = value;
        //             });
        //         });
        //     }, Promise.resolve([])).then(function () {
        //         resolve1(results);
        //     });
        // }

        // utils.promiseSeries(arr).then(function (result) {
        //     resolve(result);
        // }).catch(function (err) {
        //     reject(err);
        // });
    });
}

function getEmployeeAsyncSeries(req, asyncSeries) {
    let asyncSeriesData = [];

    function insertEmployee(callBack) {
        let name = req.name;
        let password = req.password;
        let email = req.email;
        sqlHelper.insertdata(JSON.stringify(name), JSON.stringify(password),
            JSON.stringify(email), function (err, res) {
                if (err) {
                    callBack(err);
                } else {
                    callBack(null, res);
                }
            });
    }

    function getEmployee(callback) {
        sqlHelper.getAllEmployee(function (err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
        });
    }

    asyncSeriesData.push(insertEmployee);
    asyncSeriesData.push(getEmployee);

    async.series(asyncSeriesData, function (err, res) {
        if (err) {
            return asyncSeries(err);
        } else {
            return asyncSeries(null, res);
        }
    });
}

function callPromiseParaller(empId) {
    console.log("callPromiseParaller");
    return new Promise(function (resolve, reject) {
        // let parallelData = [];

        var promise1 = new Promise(function (resolve, reject) {
            console.log("In call promiseFromEmployee");
            sqlHelper.getPromiseFromEmployee(empId).then(function (result) {
                // return promiseFromEmployee(result);
                resolve(result);
            }).catch(function (err) {
                // return promiseFromEmployee(err);
                reject(err);
            });
        });

        var promise2 = new Promise(function (resolve, reject) {
            console.log("In call promiseFromEmployee_data");
            sqlHelper.getPromiseFromEmployee_data(empId).then(function (result) {
                // return promiseFromEmployee_data(result);
                resolve(result);
            }).catch(function (err) {
                // return promiseFromEmployee_data(err);
                reject(err);
            });
        });

        // function promiseFromEmployee() {
        //     consoe.log("In call promiseFromEmployee");
        //     sqlHelper.getPromiseFromEmployee(empId).then(function (result) {
        //         return promiseFromEmployee(result);
        //         // resolve(result);
        //     }).catch(function (err) {
        //         return promiseFromEmployee(err);
        //         // reject(err);
        //     });
        // }

        // function promiseFromEmployee_data() {
        //     consoe.log("In call promiseFromEmployee_data");
        //     sqlHelper.getPromiseFromEmployee_data(empId).then(function (result) {
        //         return promiseFromEmployee_data(result);
        //         // resolve(result);
        //     }).catch(function (err) {
        //         return promiseFromEmployee_data(err);
        //         // reject(err);
        //     });
        // }

        // parallelData.push(promiseFromEmployee);
        // parallelData.push(promiseFromEmployee_data);

        Promise.all([promise1, promise2]).then(result => {
            console.log("In ALL OK" + result);
            resolve(result);
        }).catch(function (err) {
            console.log("In ALL FAIL" + err);
            reject(err);
        });
    });
}

function getEmployeeAsyncParaller(empId, asyncParallerCallback) {
    let asyncData = [];

    function fromEmployee(callBack) {
        sqlHelper.getEmployeeData(empId, function (err, res) {
            if (err) {
                callBack(err);
            } else {
                callBack(null, res);
            }
        });
    }

    function fromEmployee_data(callBack) {
        sqlHelper.getEmployeeDataFromEmployee_Data(empId, function (err, res) {
            if (err) {
                callBack(err);
            } else {
                callBack(null, res);
            }
        });
    }

    asyncData.push(fromEmployee);
    asyncData.push(fromEmployee_data);

    async.parallel(asyncData, function (err, res) {
        if (err) {
            return asyncParallerCallback(err);
        } else {
            return asyncParallerCallback(null, res);
        }
    });
}

function getEmployeeData(empId, getEmployeeCallback) {
    sqlHelper.getEmployeeData(empId, function (err, res) {
        if (err) {
            return getEmployeeCallback(err);
        }
        return getEmployeeCallback(null, res);
    });
}

function insertEmployeeData(request, insertEmployeeDataCallback) {
    let name = request.name;
    let password = request.password;
    let email = request.email;
    sqlHelper.insertdata(JSON.stringify(name), JSON.stringify(password),
        JSON.stringify(email), function (err, res) {
            if (err) {
                return insertEmployeeDataCallback(err);
            }
            return insertEmployeeDataCallback(null, res);
        });
}

function updateEmployeeData(empId, request, updateEmployeeCallback) {
    let criteria = {};
    criteria.Id = empId;

    sqlHelper.updateData(request, criteria, function (err, res) {
        if (err) {
            return updateEmployeeCallback(err);
        } else {
            console.log("response in service", res);
            return updateEmployeeCallback(null, res);
        }

    });
}

function deleteEmployee(request) {
    return new Promise((resolve, reject) => {
        console.log("Id", request.id);
        sqlHelper.deleteEmployeeData(request.id).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
}