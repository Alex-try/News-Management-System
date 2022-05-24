const express = require('express')
const router = express.Router()
//导入数据库 sqlFun('sql',[],res=>{})
const sqlFun = require('./mysql')

// 测试路由接口
/* router.get("/",(req,res)=>{
    res.send('hello')
}) */

//路由接口
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
router.get("/search", (req,res)=>{
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

module.exports = router

