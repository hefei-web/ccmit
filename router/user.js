//引入express模块
const express = require('express');
//引入连接池
const pool = require('../pool.js');
//创建路由器对象
var router = express.Router();
//添加路由
//用户注册
router.post("/reg_name", function (req, res) {
    var $uname = req.body.uname;
    pool.query("SELECT * FROM ccmit_user WHERE uname=?", [$uname], function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.send('0')
        } else {
            res.send('1')
        }
    })
})

router.post('/reg', function (req, res) {
    var obj = req.body;
    pool.query("INSERT INTO ccmit_user SET ?", [obj], function (err, result) {
        if (err) throw err;
        res.send(result);
    })
})

//用户登录
router.post('/login', function (req, res) {
    var obj = req.body;
    if (!obj.uname) {
        res.send({ code: 401, msd: 'uname required' })
        return;
    }
    if (!obj.upwd) {
        res.send({ code: 402, msg: 'upwd required' })
        return;
    }
    pool.query("SELECT *FROM ccmit_user WHERE uname=? AND upwd=? ", [obj.uname, obj.upwd], function (err, result) {
        if (err) { throw err }
        if (result.length > 0) {
            res.send("200")
        } else {
            res.send("400")
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
    if (obj.gender = '男') { obj.gender = '1' }
    if (obj.gender = '女') { obj.gender = '0' }
    pool.query("UPDATE ccmit_user SET user_name=?,email=?,phone=?,gender=? WHERE uname = ?", [obj.user_name, obj.email, obj.phone, obj.gender, obj.uname], function (err, result) {
        if (err) { throw err }

        if (result.affectedRows > 0) {
            res.send('保存成功')
        } else { res.send('用户名错误') }
    })
})

//导出路由器
module.exports = router;