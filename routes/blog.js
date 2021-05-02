const express = require('express');
const router = express.Router();
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
    getBlogClassify,
    getBlogClassifyList,
    updateThumbcount
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 获取博客列表
router.get('/list', function(req, res, next) {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''

    const result = getList(author, keyword)
    return result.then(listData => {
        res.json(new SuccessModel(listData))
    })
});

// 访问量加一
router.get('/thumbcount', (req, res, next) => {
    const id = req.query.id
    const result = updateThumbcount(id)
    return result.then(res => {
        if (res) {
            res.json(new SuccessModel(res))
        } else {
            res.json(new ErrorModel('浏览量更新失败!'))
        }
    })
})

// 获取博客详情
router.get('/detail', (req, res, next) => {
    const id = req.query.id
    const result = getDetail(id)
    return result.then((detailData => {
        res.json(new SuccessModel(detailData))
    }))
})

// 获取博客分类列表
router.get('/category', (req, res, next) => {
    const result = getBlogClassify()
    return result.then(classifyData => {
        res.json(new SuccessModel(classifyData))
    })
})

// 获取某一分类的博客列表
router.get('/category/list', (req, res, next) => {
    const name = req.query.name
    // console.log('name is', name)
    const result = getBlogClassifyList(name)
    return result.then(classifyListData => {
        res.json(new SuccessModel(classifyListData))
    })
})



// router.post('/login', (req, res, next) => {
//     const { username, password } = req.body
//     res.json({
//         errno: 0,
//         data: {
//             username,
//             password
//         }
//     })
// })

module.exports = router;
