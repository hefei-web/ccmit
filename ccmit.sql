/* #设置编码为utf-8 */
SET NAMES UTF8;
/* 丢弃数据库ccmit,如果存在的话 */
DROP DATABASE IF EXISTS ccmit;
/* 创建并设置数据库编码为utf_8 */
CREATE DATABASE ccmit CHARSET = UTF8;
/* 进入数据库ccmit */
USE ccmit;

/* 网站信息 */
CREATE TABLE ccmit_about(
        site_name VARCHAR(16),
        logo VARCHAR(64),
        address VARCHAR(64),
        tel VARCHAR(16),
        email VARCHAR(32),
        copyright VARCHAR(64) 
);

/* 用户 */
CREATE TABLE ccmit_user(
        uid INT PRIMARY KEY AUTO_INCREMENT,
        uname VARCHAR(32),    #用户名
        upwd VARCHAR(32),     #密码
        email VARCHAR(64),    #邮箱
        phone VARCHAR(16),    #电话
        user_name VARCHAR(32),#昵称
        photo VARCHAR(64),    #头像
        gender INT,           #性别  0-女  1-男
        isonline BOOLEAN      #是否在线
);

/* 网站栏目 */
CREATE TABLE ccmit_column(
        lid INT PRIMARY KEY AUTO_INCREMENT,
        lname VARCHAR(32),    #栏目名称
        abs VARCHAR(128),     #栏目简介
        url VARCHAR(64)       #栏目地址
);

/* 内容 */
CREATE TABLE ccmit_content(
       cid INT PRIMARY KEY AUTO_INCREMENT,
       title VARCHAR(64),     #内容标题
       author VARCHAR(16),    #内容作者
       souce VARCHAR(32),     #内容来源
       img VARCHAR(64),       #内容缩略图
       abs VARCHAR(128),      #内容摘要
       url VARCHAR(64),       #地址
       lid INT,               #所属栏目
       update_time DATE       #更新日期
);

/* 评论 */
CREATE TABLE ccmit_discuss(
    did INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(64),         #评论标题
    content VARCHAR(3000),     #评论内容
    update_time DATE           #更新日期
);

/****首页轮播图****/
CREATE TABLE ccmit_index_carousel(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(128),
  title VARCHAR(64),
  url VARCHAR(128)
);
