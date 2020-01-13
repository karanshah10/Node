let connectionConfig = require('../config/connection');
let connection = connectionConfig.getConnection();
let table_name = 'nodesample.employee';
let utils = require('../utils/utilities');


module.exports = {
    insertdata,
    updateData,
    getEmployeeData,
    deleteEmployeeData,
    getEmployeeDataFromEmployee_Data,
    getAllEmployee,
    getPromiseFromEmployee,
    getPromiseFromEmployee_data,
    promiseInsertData,
    promiseGetAllEmployee
}

function promiseInsertData(name, password, email) {
    return new Promise(function (resolve, reject) {
        connection.getConnection(function (err, connect) {
            if (err) {
                connect.release();
                reject(err);
            } else {
                console.log("Conected");
                let sql = 'insert into ' + table_name + '(Name,Password,Email) values (' + name + ',' + password + ',' + email + ')';
                console.log(sql);
                connect.query(sql, function (err, res) {
                    if (err) {
                        console.log("SQL Error" + err);
                        connect.release();
                        reject(err);
                    } else {
                        console.log("InsertData Successfully");
                        connect.release();
                        resolve(res);
                    }
                });
            }
        });
    });
}

function insertdata(name, password, email, insertDatacallback) {
    connection.getConnection(function (err, connect) {
        if (err) {
            connect.release();
            return insertDatacallback(err);
        } else {
            console.log("SQL Connected");

            let sql = 'insert into ' + table_name + '(Name,Password,Email) values (' + name + ',' + password + ',' + email + ')';

            console.log(sql);
            connect.query(sql, function (err, res) {
                if (err) {
                    console.log("SQL ERROR" + err);
                    connect.release();
                    return insertDatacallback(err);
                } else {
                    console.log("Insert data sucessfully");
                    connect.release();
                    return insertDatacallback(null, res);
                }
            });
        }
    });
}

function updateData(fields, criteria, updateDAtaCallback) {
    connection.getConnection(function (err, connect) {
        if (err) {
            // console.log("Failed to connect", err);
            connect.release();
            return updateDAtaCallback(err);
        }
        let filedString = "";
        let criteriaString = "";
        // console.log("Fields", fields);
        Object.keys(fields).map(function (key, index) {
            if (index == Object.keys(fields).length - 1) {
                filedString = filedString + key + " = " + JSON.stringify(fields[key]);
            } else {
                filedString = filedString + key + " = " + JSON.stringify(fields[key]) + ", ";
            }
        });

        // console.log("fieldString", filedString);

        Object.keys(criteria).map(function (key, index) {
            if (index == Object.keys(criteria).length - 1) {
                criteriaString = criteriaString + key + "=" + criteria[key];
            } else {
                criteriaString = criteriaString + key + "=" + criteria[key] + "AND ";
            }
        });

        // console.log("criteriaString", criteriaString);

        let sql = "update " + table_name + " set " + filedString + " where " + criteriaString;
        // console.log("update query", sql);
        connect.query(sql, function (err, res) {
            if (err) {
                // console.log("sql error", err);
                connect.release();
                return updateDAtaCallback(err);
            }
            // console.log("record updated successfully");
            connect.release();
            return updateDAtaCallback(null, res);
        });
    });
}

function getEmployeeDataFromEmployee_Data(empId, getEmployeeDataCallBack) {
    connection.getConnection(function (err, connect) {
        if (err) {
            console.log("Failed to connect", err);
            connect.release();
            return getEmployeeDataCallBack(err);
        }
        console.log("Connected");

        let sql;
        sql = "select * from " + 'nodesample.employee_data' + " where Id = " + empId;

        connect.query(sql, function (err, res) {
            if (err) {
                console.log("sql error", err);
                connect.release();
                return getEmployeeDataCallBack(err);
            }
            connect.release();
            return getEmployeeDataCallBack(null, res);
        });
    });
}

function promiseGetAllEmployee() {
    return new Promise(function (resolve, reject) {
        connection.getConnection(function (err, connect) {
            if (err) {
                connect.release();
                reject(err);
            } else {
                let sql;
                sql = "select * from " + table_name;
                console.log(sql);
                connect.query(sql, function (err, res) {
                    if (err) {
                        console.log("SQL error" + err);
                        connect.release();
                        reject(err);
                    } else {
                        console.log("DATA fetch");
                        connect.release();
                        resolve(res);
                    }
                });
            }
        });
    });
}

function getAllEmployee(getAllcallback) {
    connection.getConnection(function (err, connect) {
        if (err) {
            // console.log("Failed to connect", err);
            connect.release();
            return getAllcallback(err);
        } else {
            let sql;
            sql = "select * from " + table_name;
            connect.query(sql, function (err, res) {
                if (err) {
                    // console.log("sql error", err);
                    connect.release();
                    return getAllcallback(err);
                } else {
                    connect.release();
                    return getAllcallback(null, res);
                }
            });
        }
    });
}

function getEmployeeData(empId, getDataCallback) {
    connection.getConnection(function (err, connect) {
        if (err) {
            console.log("Failed to connect", err);
            connect.release();
            return getDataCallback(err);
        }
        console.log("Connected");

        let sql;
        sql = "select * from " + table_name + " where Id = " + empId;

        connect.query(sql, function (err, res) {
            if (err) {
                console.log("sql error", err);
                connect.release();
                return getDataCallback(err);
            }
            connect.release();
            return getDataCallback(null, res);
        });
    });
}

function getPromiseFromEmployee(empId) {
    return new Promise(function (resolve, reject) {
        connection.getConnection(function (err, connect) {
            if (err) {
                console.log("Not connected");
                connect.release();
                reject(err);
            } else {
                console.log("Connected");

                let sql = "select * from " + table_name + " where Id = " + empId;
                connect.query(sql, function (err, res) {
                    if (err) {
                        console.log("sql error", err);
                        connect.release();
                        reject(err);
                    } else {
                        console.log("Success Employee");
                        resolve(res);
                    }
                });
            }
        });
    });
}

function getPromiseFromEmployee_data(empId) {
    return new Promise(function (resolve, reject) {
        connection.getConnection(function (err, connect) {
            if (err) {
                console.log("Not connected");
                connect.release();
                reject(err);
            } else {
                console.log("Connected");

                sql = "select * from " + 'nodesample.employee_data' + " where Id = " + empId;
                connect.query(sql, function (err, res) {
                    if (err) {
                        console.log("sql error", err);
                        connect.release();
                        reject(err);
                    } else {
                        console.log("Success Employee_data");
                        resolve(res);
                    }
                });
            }
        });
    });
}

function deleteEmployeeData(empId) {
    return new Promise((resolve, reject) => {
        connection.getConnection(function (err, connect) {
            if (err) {
                console.log("Not Connected");
                connect.release();
                reject(err);
            }
            console.log("Connected");
            let sql = "delete from " + table_name + " where Id = " + empId;
            console.log("SQL", sql);
            connect.query(sql, function (err, res) {
                if (err) {
                    console.log("SQL ERROR");
                    connect.release();
                    reject(err);
                } else {
                    console.log("res", JSON.stringify(res));
                    if (res.affectedRows > 0) {
                        connect.release();
                        resolve(res);
                    } else {
                        let msg = "No such record found";
                        let errResponse = utils.prepareJsonResponse(msg, err);
                        connect.release();
                        reject(errResponse);
                    }
                }
            });
        });
    });
}
