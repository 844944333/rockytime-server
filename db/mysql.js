const mysql = require('mysql')
// const { MYSQL_CONF } = require('../conf/db.js')

// 创建连接对象
// const con = mysql.createConnection(MYSQL_CONF)
// 默认线上环境数据库
const con = mysql.createConnection({
    host: '121.89.216.219',
    user: 'root',
    password: 'tianbao1999',
    port: '3306',
    database: 'myblog'
})

// 本地环境数据库
/*const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tianbao1999',
    port: '3306',
    database: 'myblog'
})*/

// 开始连接
con.connect()
console.log(con)
// 同一执行 sql 的函数
function exec (sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

module.exports = {
    exec,
    escape: mysql.escape
}
