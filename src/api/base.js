/* 接口路径配置： 
    一般文件目录：base.js index.js
    但是公司不一定
        config
            login：index.js config.js
        index.js
        xxxx.js
*/

const base={
    userList:'/api/api/user',    //用户列表
    search:'/api/api/search',   //搜索用户
}

export default base;