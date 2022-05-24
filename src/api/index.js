/* 请求的方法 */

import axios from "axios"
import base from './base'
const api={
    // 用户列表
    getUserList(params){
        return axios.get(base.userList,{
            params
        })
    },
    //搜索用户
    getSearch(params){
        return axios.get(base.search,{params})
    }
}

export default api