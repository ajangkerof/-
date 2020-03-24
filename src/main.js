/*
  入口js
 */
import Vue from "vue"
import App from "./App.vue"
import router from "./router/index.js"
import store from "./store/index.js"
/* 按需全局引入 */
import { Button } from "mint-ui"
Vue.component(Button.name, Button)
/* 引入mock */
import "./mock/mockServer.js"
/*引入图片懒加载*/
import VueLazyload from 'vue-lazyload'
import loading from "../static/img/loading.gif"
Vue.use(VueLazyload, {
  loading: loading
})
/*引入日期处理过滤器*/
import "./filters/date-filter.js"

new Vue({
  el: "#app",
  render: h => h(App),
  router, // 使用vue-router
  store // 使用vuex
})
