/*
  路由器对象模块
 */
import Vue from "vue"
import VueRouter from "vue-router"

// import home from "../pages/home/home.vue"
// import search from "../pages/search/search.vue"
// import order from "../pages/order/order.vue"
// import person from "../pages/person/person.vue"
// 利用路由组件懒加载实现后台js分次执行（本质上就是利用了函数的特性，在需要的时候调用）
const home = () => import("../pages/home/home.vue")
const search = () => import("../pages/search/search.vue")
const order = () => import("../pages/order/order.vue")
const person = () => import("../pages/person/person.vue")

import login from "../pages/login/login.vue"
import shop from "../pages/shop/shop.vue"
import shopGoods from "../pages/shop/shopGoods/shopGoods.vue"
import shopAssess from "../pages/shop/shopAssess/shopAssess.vue"
import shopDetail from "../pages/shop/shopDetail/shopDetail.vue"
import userInfo from "../pages/userInfo/userInfo.vue"
import updatePw from "../pages/updatePw/updatePw.vue"

import open from "../pages/open/open.vue"

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
      path: "/userInfo",
      component: userInfo
    },
    {
      path: "/updatePw",
      component: updatePw
    },
    {
      path: "/open",
      component: open
    },
    {
      path: "/",
      redirect: "/open"
    },
    {
      path: "/shop",
      component: shop,
      children: [
        {
          path: "/shop/shopGoods",
          component: shopGoods
        },
        {
          path: "/shop/shopAssess",
          component: shopAssess
        },
        {
          path: "/shop/shopDetail",
          component: shopDetail
        },
        {
          path: "/",
          redirect: "/shop/shopGoods"
        }
      ]
    }
  ]
})
