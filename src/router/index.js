import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout/index.vue";
import Login from "../views/Login/Login.vue";
import Home from "../views/Home/index.vue";

//异步
const PersonalInfo = () => import("../views/PersonalInfo/index.vue");
const AdminUser = () => import("../views/AdminUser/index.vue");
const AdminTopic = () => import("../views/AdminTopic/index.vue");
const CheckNews = () => import("../views/CheckNews/index.vue");
// const Feedback = () => import("../views/Feedback/index.vue");
const Checked = () => import("../views/CheckNews/Checked.vue");
const Uncheck = () => import("../views/CheckNews/Uncheck.vue");
const AddUser = () => import("../views/AdminUser/AddUser.vue");
const NewsDetail = () => import("../views/CheckNews/NewsDetail.vue");
const ToAudit = () => import("../views/CheckNews/ToAudit.vue");
const WriteNews = () => import("../views/WriteNews/index.vue");
const ApplyRecord = () => import("../views/ApplyRecord/index.vue");
const DraftBox = () => import("../views/DraftBox/index.vue");
const EditDraft = () => import("../views/DraftBox/EditDraft.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    component: Layout,
    //路由元信息
    meta: {
      isLogin: true,
      roles: ["admin", "author"],
    },
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
        meta: { roles: ["admin", "author"] },
      },
      {
        path: "/personalinfo",
        name: "PersonalInfo",
        component: PersonalInfo,
        meta: { roles: ["admin", "author"] },
      },
      {
        path: "/adminuser",
        name: "AdminUser",
        component: AdminUser,
        meta: { roles: ["admin"] },
      },
      {
        path: "/adduser",
        name: "AddUser",
        component: AddUser,
        meta: { roles: ["admin"] },
      },
      {
        path: "/admintopic",
        name: "AdminTopic",
        component: AdminTopic,
        meta: { roles: ["admin"] },
      },
      {
        path: "/checknews",
        name: "CheckNews",
        component: CheckNews,
        meta: { roles: ["admin"] },
        redirect: "/checknews/checked",
        children: [
          {
            path: "checked",
            component: Checked,
            meta: { roles: ["admin"] },
          },
          {
            path: "uncheck",
            component: Uncheck,
            meta: { roles: ["admin"] },
          },
        ],
      },
      {
        path: "/writenews",
        component: WriteNews,
        meta: { roles: ["author"] },
      },
      {
        path: "/applyrecord",
        component: ApplyRecord,
        meta: { roles: ["author"] },
      },
      {
        path: "/draftbox",
        component: DraftBox,
        name: DraftBox,
        meta: { roles: ["author"] },
      },
      {
        path: "/editdraft",
        component: EditDraft,
        meta: { roles: ["author"] },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { roles: ["admin", "author"] },
  },
  {
    path: "/newsdetail",
    name: "NewsDetail",
    component: NewsDetail,
    meta: { isLogin: true, roles: ["admin", "author"] },
  },
  {
    path: "/toaudit",
    name: "ToAudit",
    component: ToAudit,
    meta: { isLogin: true, roles: ["admin"] },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
