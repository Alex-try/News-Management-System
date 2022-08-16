/* 接口路径配置： 
    一般文件目录：base.js index.js
    但是公司不一定
        config
            login：index.js config.js
        index.js
        xxxx.js
*/

const base = {
  host: "http://localhost:8989", //基础域名
  userList: "/api/api/user", //用户列表
  search: "/api/api/search", //搜索用户
  login: "/api/api/login", //登录接口
  addUser: "/api/api/addUser", //添加人员
  initPsw: "api/api/initPsw", //初始化密码
  delUser: "api/api/delUser", //删除人员
  topicList: "/api/api/topic", //专题列表
  topicSearch: "api/api/topicSearch", //搜索专题
  addTopic: "/api/api/addTopic", //添加专题
  delTopic: "/api/api/delTopic", //删除专题
  changePsw: "/api/api/changePsw", //修改密码
  getId: "/api/api/getId", //获取编号
};

export default base;
