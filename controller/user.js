const xss = require('xss')
const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/crypto')

const login = async (username, password) => {
    const sql = `select username, realname from user where username = ${escape(username)} and password = ${escape(password)}`
    const rows = await exec(sql)
    return rows[0] || {}
}

module.exports = {
    login
}
