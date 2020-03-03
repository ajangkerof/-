<template>
    <div class="person">
      <div class="person_my">
        <router-link :to="userInfo._id ? '/userInfo' : '/login'" class="person_link">
          <div class="person_img">
            <span class="iconfont icon-wode"></span>
          </div>
          <div class="person_info">
            <p class="person_login" v-if="!userInfo.phone">{{userInfo.name || "登录 | 注册"}}</p>
            <p>
              <span class="iconfont icon-dianhua"></span>
              <span class="person_error">{{userInfo.phone || "手机号暂未绑定"}}</span>
            </p>
          </div>
          <div class="person_to">
            <span class="iconfont icon-you"></span>
          </div>
        </router-link>
      </div>
      <div class="person_data border-1px">
        <ul class="data_list">
          <li>
            <a href="#">
              <span class="link_top"><span>0.00</span>元</span>
              <span class="link_bottom">余额</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="link_top"><span>10</span>个</span>
              <span class="link_bottom">红包</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="link_top"><span>5</span>分</span>
              <span class="link_bottom">积分</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="person_menu border-1px">
        <a href='javascript:' class="my_order">
          <span class="iconfont icon-dingdan"></span>
          <div class="order_title">
            <span>我的订单</span>
            <span class="iconfont icon-you"></span>
          </div>
        </a>
        <a href='javascript:' class="my_order">
          <span class="iconfont icon-jifenshangcheng"></span>
          <div class="order_title">
            <span>积分商城</span>
            <span class="iconfont icon-you"></span>
          </div>
        </a>
        <a href='javascript:' class="my_order">
          <span class="iconfont icon-vip"></span>
          <div class="order_title">
            <span>尊贵VIP</span>
            <span class="iconfont icon-you"></span>
          </div>
        </a>
      </div>
      <div class="person_menu border-1px">
        <a href='javascript:' class="my_order">
          <span class="iconfont icon-kefu"></span>
          <div class="order_title">
            <span>客服中心</span>
            <span class="iconfont icon-you"></span>
          </div>
        </a>
      </div>
      <div class="border-1px" v-show="userInfo._id">
        <mt-button type="danger" style="width: 100%" @click="loginOut">退出</mt-button>
      </div>
    </div>
</template>

<script>
  import {mapState} from "vuex"
  import {MessageBox, Toast } from "mint-ui"
  export default {
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      // 登出函数
      loginOut () {
        MessageBox.confirm('你确定退出吗?')
          .then(action => { // 确认登出
            this.$store.dispatch('outLogin')
            Toast({
              message: '退出成功',
              iconClass: 'iconfont icon-zhengque',
              duration: 2000
            });
          })
          .catch(action => { // 取消
            Toast({
              message: '取消成功',
              iconClass: 'iconfont icon-zhengque',
              duration: 2000
            });
          })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  @import "../../common/stylus/person.styl"
</style>
