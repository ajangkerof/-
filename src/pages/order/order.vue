<template>
    <div class="order">
      <!--搜索订单-->
      <form class="order_search">
        <input type="search" placeholder="搜索我的订单" name="order" v-model="orderName">
      </form>
      <!--未登陆界面-->
      <div class="order_login" v-if="!userInfo._id">
        <img src="./images/no_login.png">
        <h3>登录后查看外卖订单</h3>
        <button @click="$router.push('/login')">立即登陆</button>
      </div>
      <!--登陆后界面-->
      <div class="order_content" v-else>
        <ul class="content_ul" ref="orderUL">
          <li class="model"></li>
          <li class="content_li" v-for="(order, index) in orders" :key="index">
          <div class="li_top">
            <div class="top_left">
              <span class="iconfont icon-shucai"></span>
              <span class="shop_name">{{order.name}}</span>
            </div>
            <div class="top_right">
              <span class="order_status">{{order.status === 0 ? '未评价' : '已评价'}}</span>
            </div>
          </div>
          <div class="li_middle">
            <div class="order_img">
              <img width="50" height="50" :src="order.order_img">
            </div>
            <div class="order_detail">
              <span class="shop_time">消费时间: {{order.order_time | date-filter}}</span>
              <span class="shop_money">总价: ￥{{order.order_price}}</span>
            </div>
          </div>
          <div class="li_bottom">
            <a class="order_detail" @click="userAssess(userInfo._id, index)" v-if="order.status === 0"><span>评价</span></a>
            <a class="order_next"><span>再来一单</span></a>
          </div>
        </li>
          <li class="model1"></li>
        </ul>
      </div>
    </div>
</template>

<script>
  import {mapState} from "vuex"
  import BScroll from "@better-scroll/core"
  import {MessageBox, Toast } from "mint-ui"
  export default {
    data () {
      return {
        orderName: ''
      }
    },
    mounted () {
      // 如果数据还没来 直接结束
      if (!this.userInfo.orders) {
        return
      }

      // 来了初始化滚动
      this.initScroll ()
    },
    computed: {
      ...mapState(['userInfo', 'orders'])
    },
    methods: {
      // 初始化滚动函数
      initScroll () {
        // 动态计算ul的高度
        const ul = this.$refs.orderUL
        const height = 130
        const space = 6
        const count = this.userInfo.orders.length
        ul.style.height = (height + space) * count + space + 60
        // 初始化滚动
        this.orderScroll = new BScroll(".order_content", {
          click: true
        })
      },
      // 评价
      userAssess (userId, index) {
        console.log(userId, index)
        MessageBox.confirm('你确定这样评价吗?')
          .then(action => { // 确认登出
            this.$store.dispatch("assessUser", {userId, index}).then(() => {
              Toast({
                message: '评价成功',
                iconClass: 'iconfont icon-zhengque',
                duration: 2000
              });
            })
          })
          .catch(action => { // 取消
            Toast({
              message: '取消成功',
              iconClass: 'iconfont icon-zhengque',
              duration: 2000
            });
          })
      }
    },
    watch: {
      userInfo () {
        this.$nextTick(() => {
          // DOM结构发生改变，初始化滚动
          this.initScroll ()
        })
      },
      // 监视orderName
      orderName (value) {
        this.$store.dispatch("searchOrderList", this.orderName)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/order.styl"
</style>
