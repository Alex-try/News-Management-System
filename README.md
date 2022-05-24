## 报错问题
1、被eslint检测命名使用驼峰或横线拼接单词
    Component name "index" should always be multi-word.eslint
    解决：在.eslintrc.js文件中的rules对象中加上一句：
         'vue/multi-word-component-names': 0,

2、Proxy error: Could not proxy request /api/user from localhost:8081 to http://localhost:8989.       
See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (ECONNRESET).
    解决：
    "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "start": "node index.js",
    "server": "nodemon index.js --ignore client"
    },

## element-ui引入后样式不生效
    解决：未引入element-ui所提供的样式
        在main.js里引入
        import 'element-ui/lib/theme-chalk/index.css'

## element-ui的使用
    1、导航菜单 设置路由跳转 添加 router 属性
    在激活导航时以 index 作为 path 进行路由跳转

## 配置路由
    1、在router下的index.js中引入组件并添加路径
    2、

## 数据库分页
    利用limit和offset
    select * from user limit 5, 10      //拉取的是第6到15条数据
    或者
    select * form user limit 10 offset 5    //拉取的是第6到15条数据
    注意第一条索引为0