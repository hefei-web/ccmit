//引入express模块
const express = require('express');
//引入body-parser模块
const bodyParser = require('body-parser');
//引入路由器
const userRouter = require('./router/user.js');
const disRouter = require('./router/discuss.js');
//创建web服务器
var server = express();
//监听端口
server.listen(8080);
//托管静态资源
server.use(express.static('public'));
server.use(express.static('ccmit'));
//使用body-parser中间件将post请求格式化为对象
server.use(bodyParser.urlencoded({
    extended: false
}))

//挂载路由
server.use('/user', userRouter);
server.use('/dis',disRouter);
