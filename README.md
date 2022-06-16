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
    或者是没有启用node：在serve的终端下输入：nodemon

3、 POST http://localhost:8081/api/api/login 500 (Internal Server Error)
    出现这种问题可以点浏览器控制台中的网络，点击预览或响应查看具体的问题，这次出现的问题如下：
    Cannot destructure property 'user_name' of 'req.body' as it is undefined.
    解决： server下的 index.js 文件中
        You need to use express's body parser before adding routes to express. Like this:
            const app = express();
            app.use(express.json());    //它解析传入的JSON请求，并将解析后的数据放入req.body中。
        要放在添加路由之前

## 很重要
app.use(express.json());        //用于将传入的请求对象识别为JSON 对象
app.use(express.urlencoded());      //用于将传入的请求对象识别为字符串或数组

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

## 登录--路由拦截

## 后台服务
1、node.js服务
2、express 
3、jwt（生成token）jsonwebtoken 密钥 解析token 安装 jwt-decode
4、MySQL

## 富文本编辑
1、百度编译器
2、wangEditor