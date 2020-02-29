/*
  路由器对象模块
 */
import Vue from "vue"
import VueRouter from "vue-router"

import home from "../pages/home/home.vue"
import search from "../pages/search/search.vue"
import order from "../pages/order/order.vue"
import person from "../pages/person/person.vue"
import login from "../pages/login/login.vue"

// 声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
  // 所有路由
  routes: [
    {
      path: "/home",
      component: home,
      meta: {
        footerShow: true
      }
    },
    {
      path: "/search",
      component: search,
      meta: {
        footerShow: true
      }
    },
    {
      path: "/order",
      component: order,
      meta: {
        footerShow: true
      }
    },
    {
      path: "/person",
      component: person,
      meta: {
        footerShow: true
      }
    },
    {
      path: "/login",
      component: login
    },
    {
      path: "/",
      redirect: "/home"
    }
  ]
})
