import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/index.vue'
import Login from '../views/Login/Login.vue'
import Home from '../views/Home/index.vue'

//异步
const PersonalCenter = ()=>import('../views/PersonalCenter/index.vue')
const AdminUser = ()=>import('../views/AdminUser/index.vue')
const AdminTopic = ()=>import('../views/AdminTopic/index.vue')
const CheckNews = ()=>import('../views/CheckNews/index.vue')
const Feedback = ()=>import('../views/Feedback/index.vue')
const Checked = ()=>import('../views/CheckNews/Checked.vue')
const Uncheck = ()=>import('../views/CheckNews/Uncheck.vue')

const AddUser = ()=>import('../views/AdminUser/AddUser.vue')

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    component:Layout,
    children:[
      {
        path:'/',
        name:'Home',
        component:Home
      },
      {
        path:'/personalcenter',
        name:'PersonalCenter',
        component:PersonalCenter
      },
      {
        path:'/adminuser',
        name:'AdminUser',
        component:AdminUser
      },
      {
        path:'/adduser',
        name:'AddUser',
        component:AddUser
      },
      {
        path:'/admintopic',
        name:'AdminTopic',
        component:AdminTopic
      },
      {
        path:'/checknews',
        name:'CheckNews',
        component:CheckNews,
        redirect:'/checknews/checked',
        children:[
          {
            path:'checked',
            component:Checked
          },
          {
            path:'uncheck',
            component:Uncheck
          }
        ]
      },
      {
        path:'/feedback',
        name:'Feedback',
        component:Feedback
      },
    ]
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  }
]

const router = new VueRouter({
  routes
})

export default router
