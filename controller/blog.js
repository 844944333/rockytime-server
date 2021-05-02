const xss = require('xss')
const { exec } = require('../db/mysql')

// 获取博客列表
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author = '${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // 返回 Promise
    return exec(sql)
}

// 获取博客详情
const getDetail = (id) => {
    let sql = `select * from blogs where id = '${id}';`
    return exec(sql).then(rows => {
        console.log('查询内容成功')
        return rows[0]
    })
}

// 获取博客分类列表
const getBlogClassify = () => {
    let sql = `select * from classify`
    return exec(sql)
}

// 获取某一分类的博客列表
const getBlogClassifyList = (name) => {
    const sql = `select * from blogs where category='${name}';`
    return exec(sql)
}

// 新建博客
const newBlog = (blogData = {}) => {
    // blogData 是一篇博客，包含 title content author 等
    const title = blogData.title
    const content = blogData.content
    // 时间戳的形式
    const createtime = Date.now()
    const author = 'Trimble'
    const thumbcount = 0                        // 博客的点击量，默认 0
    const category = blogData.category          // 博客类型
    const tags = blogData.tags                  // 博客标签
    const sql = `insert into blogs (title, content, createtime, author, thumbcount, category, tags) values 
        ('${title}', '${content}', ${createtime}, '${author}', '${thumbcount}', '${category}', '${tags}')
    `
    return exec(sql).then(insertData => {
        // console.log('insertData is ', insertData)
        return {
            id: insertData.insertId
        }
    })
}

// 更新博客
const updateBlog = (id, blogData = {}) => {
    // id 就是要更新的博客的 id

    // 从前端发送过来的数据中获取
    const title = blogData.title
    const content = blogData.content
    const category = blogData.category

    const sql = `update blogs set title = '${title}', content = '${content}', category = '${category}' where id = ${id}`
    return exec(sql).then(updateRes => {
        // console.log('updateRes is', updateRes)
        // affectedRows: 影响的行数
        if (updateRes.affectedRows > 0) {
            return true
        }
        return false
    })
}

// 更新浏览量
const updateThumbcount = (id) => {
    // 每浏览一次博客，浏览量就加一
    // 将浏览量取出来
    let thumbcountSql = `select thumbcount from blogs where id = '${id}';`
    return exec(thumbcountSql).then(res => {
        // console.log('thumbcount', res)
        // // 对浏览量进行加一
        const _thumbcount = parseInt(res[0].thumbcount) + 1
        // 将新的浏览量写入数据库
        let updateThumbcountSql = `update blogs set thumbcount = '${_thumbcount}' where id = ${id}`
        return exec(updateThumbcountSql).then(updateRes => {
            if (updateRes.affectedRows > 0) {
                console.log('更新浏览量成功', _thumbcount)
                let _thumbcountSql = `select thumbcount from blogs where id = '${id}';`
                return exec(_thumbcountSql)
            }
            return false
        })
    })
}

// 删除博客
const delBlog = (id, author) => {
    // id 就是要删除的博客的 id
    const sql = `delete from blogs where id = '${id}' and author = '${author}';`
    return exec(sql).then(delRes => {
        if (delRes.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
    getBlogClassify,
    getBlogClassifyList,
    updateThumbcount
}
