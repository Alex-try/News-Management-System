/* 请求的方法 */

import axios from "axios";
import base from "./base";
//node.js
const qs = require("qs");

const api = {
  //登录接口
  getLogin(params) {
    //params={user_name,user_password,user_identity}
    console.log(qs.stringify(params));
    return axios.post(base.login, qs.stringify(params));
  },
  /* 用户管理 */
  // 用户列表
  getUserList(params) {
    return axios.get(base.userList, {
      params,
    });
  },
  //搜索用户
  getSearch(params) {
    return axios.get(base.search, { params });
  },
  //添加人员
  addUser(params) {
    return axios.get(base.addUser, { params });
  },
  //初始化密码
  initPsw(params) {
    return axios.get(base.initPsw, { params });
  },
  //删除人员
  delUser(params) {
    return axios.get(base.delUser, { params });
  },
  /* 专题管理 */
  //专题列表
  getTopicList(params) {
    return axios.get(base.topicList, { params });
  },
  //搜索专题
  topicSearch(params) {
    return axios.get(base.topicSearch, { params });
  },
  //添加专题
  addTopic(params) {
    return axios.get(base.addTopic, { params });
  },
  //删除专题
  delTopic(params) {
    return axios.get(base.delTopic, { params });
  },
  //修改密码
  changePsw(params) {
    return axios.get(base.changePsw, { params });
  },
  //获取编号
  getId(params) {
    return axios.get(base.getId, { params });
  },
};

export default api;
