<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: totalCount}">
              <i class="iconfont icon-gouwu" :class="{highlight: totalCount}"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight: totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{shopDetail.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-if="watchShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="iconfont icon-tableresetpassword empty" @click="cleanShopCart"></span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in cartFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price}}</span></div>
                <CartControl :food="food"/>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="list-mask" v-if="watchShow" @click="toggleShow"></div>
  </div>
</template>

<script>
  import CartControl from "../CartControl/CartControl.vue"
  import {mapState, mapGetters} from "vuex"
  // 按需引入滚动插件
  import BScroll from "@better-scroll/core"
  // 引入mint-ui部分组件
  import { MessageBox, Toast } from "mint-ui"
  export default {
    data () {
      return {
        isShow: false
      }
    },
    components: {
      CartControl
    },
    computed: {
      ...mapState(['cartFoods', 'shopDetail']),
      ...mapGetters(['totalCount', 'totalPrice']),
      // 计算要为支付框添加的class类
      payClass () {
        const {totalPrice} = this
        const {minPrice} = this.shopDetail
        return totalPrice >= minPrice ? 'enough' : 'not-enough'
      },
      // 计算支付框对应的文本
      payText () {
        const {totalPrice} = this
        const {minPrice} = this.shopDetail
        if (totalPrice >= minPrice) {
          return `去支付`
        } else if (totalPrice === 0) {
          return `还差${minPrice}元起送`
        } else if (totalPrice < minPrice) {
          return `还差${minPrice - totalPrice}元起送`
        }
      },
      // 控制购物车以及遮罩层的显示隐藏
      watchShow () {
        // 如果totalCount为0时，直接不显示
        if (this.totalCount === 0) {
          // 控制不显示之前，先设置isShow为false
          this.isShow = false
          return false
        }

        if (this.isShow) {
          // console.log(this.$el)
          // 当ShopCart中DOM结构发生改变时执行回调函数创建滚动
          this.$nextTick(() => {
            // 创建购物车列表滚动
            if (!this.ShopScroll) { // 不存在则创建
              this.ShopScroll = new BScroll(".list-content", {
                click: true
              })
            } else { // 存在则重新计算better-scroll
              // 当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常（确保第一次就能滚动）
              this.ShopScroll.refresh()
            }
          })
        }

        // 否则就由isShow决定是否显示隐藏
        return this.isShow
      }
    },
    methods: {
      toggleShow () {
        // 只有当购物数量大于0的时候才能切换
        if (this.totalCount > 0) {
          this.isShow = !this.isShow
        }
      },
      // 清空购物车
      cleanShopCart () {
        MessageBox.confirm('你确定清空吗?')
          .then(action => { // 确认清空
            this.$store.dispatch('cleanShopCart')
          })
          .catch(action => { // 取消清空
            Toast({
              message: '取消成功',
              iconClass: 'iconfont icon-zhengque',
              duration: 500
            });
          })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  @import "../../common/stylus/shopCart.styl"
</style>
