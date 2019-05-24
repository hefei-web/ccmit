//引入express模块
const express = require('express');
//引入mysql连接池
const pool = require('../pool.js');
//创建路由器对象
var router = express.Router();
//添加路由
//用户评论
router.post('/discuss',function(req,res){
    var obj = req.body;
    if(!obj.title){
        res.send('请输入评论标题');
        return;
    }
    if(!obj.content){
        res.send('请输入评论内容');
        return;
    }
    pool.query("INSERT INTO ccmit_discuss SET ?",[obj],function(err,result){
        if(err){throw err}
        if(result.affectedRows>0){
            res.send('评论成功')
        }else{
            res.send('评论失败')
        }
    })
})

//编辑评论

//导出路由器对象
module.exports = router;