//搭建express服务
const express = require('express')
const app = express()
// const bodyParser = require('body-parser');
// 路由
const router = require('./router')

/* app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); */
app.use(express.json());
app.use(express.urlencoded());
app.use('/api',router)

app.listen(8989,()=>{
    console.log(8989)
})