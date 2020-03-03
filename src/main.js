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

new Vue({
  el: "#app",
  render: h => h(App),
  router, // 使用vue-router
  store // 使用vuex
})
