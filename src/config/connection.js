const mysql = require('mysql');
let connection;
module.exports = {
    getConnection: function () {
        connection = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'karan1002',
            database: 'nodesample'
        });
        return connection;
    }
}