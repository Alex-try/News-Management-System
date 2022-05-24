/* devServer.proxy
如果你的前端应用和后端API服务器没有运行在同一主机上，
你需要在开发环境下将API请
 */
module.exports = {
    devServer: {
        //服务代理
        proxy: {
            '/api': {
                target: 'http://localhost:8989',
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^/api':''
                }
            },
        }
    }
}