//引入express模块
const express = require('express');
//引入连接池
const pool = require('../pool_bak.js');
//创建路由器
var router = express.Router();
//添加路由
//用户注册
router.post('/reg', function (req, res) {
    var obj = req.body;
    if (!obj.uname) {
        res.send('请输入用户名');
        return;
    }
    if (!obj.upwd) {
        res.send('请输入密码');
        return;
    }
    pool.query("SELECT * FROM ccmit_user WHERE uname=?", [obj.uname], function (err, result) {
        if (err) { throw err }
        if (result.length > 0) {
            res.send('用户名已存在');
        } else {
            pool.query("INSERT INTO ccmit_user SET ?", [obj], function (err, result) {
                if (err) { throw err }
                res.send('注册成功')

            })
        }
    })
})

//删除用户
router.post('/delete', function (req, res) {
    var obj = req.body;
    if (!obj.uname) {
        res.send('请输入用户名')
    }
    pool.query("SELECT * FROM ccmit_user WHERE uname=?", [obj.uname], function (err, result) {
        if (err) { throw err }
        if (!result.length) {
            res.send('用户名不存在');
            return;
        } else {
            pool.query("DELETE FROM ccmit_user WHERE uname=?", [obj.uname], function (err, result) {
                if (err) { throw err }
                res.send('删除成功')
            })
        }
    })

})
//用户登录
router.post('/login', function (req, res) {
    var obj = req.body;
    for (var key in obj) {
        if (!obj[key]) {
            res.send('请输入' + key);
            return;
        }
    }
    pool.query("SELECT * FROM ccmit_user WHERE uname=? AND upwd=?", [obj.uname, obj.upwd], function (err, result) {
        if (err) { throw err }
        if (result.length > 0) {
            res.send('登录成功')
        } else {
            res.send('用户名或密码错误')
        }

    })
})
//完善用户信息
router.post('/update', function (req, res) {
    var obj = req.body;
    if (!obj.uname) {
        res.send('请输入用户名')
        return;
    }
    if (!obj.user_name) {
        res.send('请输入昵称')
        return;
    }
    if (obj.gender = '男') { obj.gender = 1 }
    if (obj.gender = '女') { obj.gender = 0 }
    console.log(obj)
    pool.query("SELECT * FROM ccmit_user WHERE uname=?", [obj.uname], function (err, result) {
        if (err) { throw err }
        if (result.length > 0) {
            pool.query("UPDATE ccmit_user SET user_name=?,email=?,phone=?,gender=? WHERE uname = ?", [obj.user_name, obj.email, obj.phone, obj.gender, obj.uname], function (err, result) {
                if (err) { throw err }
                res.send('保存成功')
            })
        } else {
            res.send('用户名不存在')
        }
    })

})

//导出路由器
module.exports = router;