const express = require('express')
const router = express.Router()
//导入数据库 sqlFun('sql',[],res=>{})
const sqlFun = require('./mysql')

//安装并导入模块 JWT两个相关的包
const jwt = require('jsonwebtoken')
// const expressJWT = require('express-jwt')
//定义密钥
const config = require('./secret')

// 测试路由接口
/* router.get("/",(req,res)=>{
    res.send('hello')
}) */

//路由接口
/* 登录接口 
    接收的字段：user_name,user_password,user_identity
    测试：postman
*/
router.post('/login', (req,res)=>{
    let {
        user_name,
        user_password,
        user_identity
    } = req.body
    let sql = `select * from user where user_name=? and user_password=? and user_identity=?`;
    let arr = [user_name,user_password,user_identity];
    sqlFun(sql, arr, result=>{
        // res.send({result})
        if(result.length>0){
            let token = jwt.sign({
                user_name:result[0].user_name,
                user_id:result[0].user_id,
                user_identity:result[0].user_identity
            }, config.jwtSecert, {expiresIn:20*1})
            res.send({
                status:200,
                data:token
            })
        }else{
            res.send({
                status:404,
                msg:'信息错误',
            })
        }
    })
})
/* 用户列表 */
router.get("/user", (req, res) => {
    let page=(req.query.page==undefined)?0:req.query.page;
    let startPage = page*8;
    const sqlLen = "select * from user";
    sqlFun(sqlLen, null, data => {
        let len = data.length
        const sql = `select * from user order by user_id limit ${startPage},8`;
        sqlFun(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    data: result,
                    total: len,
                    pageSize: 8
                })
            } else {
                res.send({
                    msg: "暂无数据"
                })
            }
        })
    })
})
/* 搜索用户 */
router.get('/search', (req,res)=>{
    const search = req.query.search;
    const sql=`select * from user where concat(user_id,user_name) like '%` + search + `%'`;
    sqlFun(sql, null, result=>{
        let len = result.length
        if(result.length>0){
            res.send({
                result,
                total:len,
                pageSize:8
            })
        }else{
            res.send({
                msg:"暂无数据"
            })
        }
    })
})
/* 添加人员 */
router.get('/addUser',(req,res)=>{
    let user_name = req.query.user_name || "";
    let user_password = req.query.user_password || "";
    let user_identity = req.query.user_identity || "";
    let sql = `insert into user(user_name,user_password,user_identity) values(?,?,?);`;
    let arr = [user_name,user_password,user_identity];
    sqlFun(sql, arr, result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:"添加成功"
            })
        }else{
            res.send({
                status:500,
                msg:"添加失败"
            })
        }
    })
})
/* 初始化密码 */
router.get('/initPsw',(req,res)=>{
    let user_id = req.query.user_id;
    let sql = `update user set user_password='123' where user_id=?;`
    sqlFun(sql, user_id, result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:"初始化密码成功！"
            })
        }else{
            res.send({
                status:500,
                msg:"初始化失败！"
            })
        }
    })
})
/* 删除人员 */
router.get('/delUser',(req,res)=>{
    let user_id = req.query.user_id;
    let sql = `delete from user where user_id=?;`
    sqlFun(sql, user_id, result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:"删除成功！"
            })
        }else{
            res.send({
                status:500,
                msg:"删除失败！"
            })
        }
    })
})
/* 专题列表 */
router.get('/topic',(req,res)=>{
    let page=(req.query.page==undefined)?0:req.query.page;
    let startPage = page*8;
    const sqlLen = "select * from topic";
    sqlFun(sqlLen, null, data => {
        let len = data.length
        const sql = `select * from topic order by topic_id limit ${startPage},8`;
        sqlFun(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    data: result,
                    total: len,
                    pageSize: 8
                })
            } else {
                res.send({
                    msg: "暂无数据"
                })
            }
        })
    })
})
/* 搜索专题 */
router.get('/topicSearch',(req,res)=>{
    const search = req.query.search;
    const sql=`select * from topic where concat(topic_id,topic_name) like '%` + search + `%'`;
    sqlFun(sql, null, result=>{
        let len = result.length
        if(result.length>0){
            res.send({
                result,
                total:len,
                pageSize:8
            })
        }else{
            res.send({
                msg:"暂无数据"
            })
        }
    })
})
/* 添加专题 */
router.get('/addTopic',(req,res)=>{
    let topic_name = req.query.topic_name;
    let sql =  `select * from topic where topic_name=?`;
    sqlFun(sql,topic_name,result=>{
        if(result.length>0){
            res.send({
                status:500,
                msg:"添加的专题名重复了！"
            })
        }else{
            let sql = `insert into topic(topic_name,topic_state) value(?,'正常');`
            sqlFun(sql,topic_name,result=>{
                if(result.affectedRows>0){
                    res.send({
                        status:200,
                        msg:"添加成功"
                    })
                }else{
                    res.send({
                        status:500,
                        msg:"添加失败"
                    })
                }
            })
        }
    })
})
/* 删除专题 */
router.get('/delTopic',(req,res)=>{
    let topic_id = req.query.topic_id;
    let sql = `delete from topic where topic_id=?;`
    sqlFun(sql, topic_id, result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:"删除成功！"
            })
        }else{
            res.send({
                status:500,
                msg:"删除失败！"
            })
        }
    })
})

module.exports = router

