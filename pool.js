//引入mysql模块
const mysql = require('mysql');
//创建mysql连接池对象
var pool = mysql.createPool({
        host:'127.0.0.1',
        port:'3306',
        user:'root',
        password:'',
        database:'ccmit',
        connectionLimit:20
})
module.exports = pool;