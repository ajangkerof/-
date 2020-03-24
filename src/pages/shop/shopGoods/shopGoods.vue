<template>
  <div class="goods">
    <!--分类菜单-->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" :class="{current: index === menuIndex}" v-for="(shopGood, index) in shopGoods" :key="index" @click="menuClick(index)">
              <span class="text bottom-border-1px">
                <img class="icon" :src="shopGood.icon" v-if="shopGood.icon">
                {{shopGood.name}}
              </span>
        </li>
      </ul>
    </div>
    <!--物品列表-->
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul ref="topUL">
        <li class="food-list-hook" v-for="(shopGood, index) in shopGoods" :key="index">
          <h1 class="title">{{shopGood.name}}</h1>
          <ul>
            <li class="food-item bottom-border-1px" v-for="(food, index) in shopGood.foods" :key="index" @click="foodShow(food)">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售 {{food.sellCount}} 份</span>
                  <span>好评率 {{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
              <CartControl :food="food"/>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--物品详情-->
    <FoodModel :food="food" ref="foodModel"/>
    <!--购物车-->
    <ShopCart/>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  // 按需引入滚动插件
  import BScroll from "@better-scroll/core"
  // 引入CartControl组件
  import CartControl from "../../../components/CartControl/CartControl.vue"
  // 引入FoodModel组件
  import FoodModel from "../../../components/FoodModel/FoodModel.vue"
  // 引入ShopCart组件
  import ShopCart from "../../../components/ShopCart/ShopCart.vue"
  export default {
    data () {
      return {
        scrollY: 0, // 滑动时实时的top值
        tops: [], // 物品栏各分类的top值
        food: {} // 存储当前点击物品的数据
      }
    },
    mounted () {
      this.$store.dispatch('getShopGoods')
    },
    computed: {
      ...mapState(['shopGoods']),

      // 计算当前滑动位置在菜单栏位置的索引
      menuIndex () {
        // 列出获取到的滚动数据
        const {scrollY, tops} = this

        // 计算当前滚动值所对应菜单的索引值
        const index = tops.findIndex((top, index) => {
          // 筛选条件
          return scrollY >= top && scrollY < tops[index+1]
        })

        // 返回当前位置所属的索引
        return index
      }
    },
    components: {
      CartControl,
      FoodModel,
      ShopCart
    },
    methods: {
      // 初始化滚动
      initScroll () {
        // 菜单栏scroll
        this.menuScroll = new BScroll(".menu-wrapper", {
          click: true
        })
        // 物品栏scroll
        this.goodScroll = new BScroll(".foods-wrapper", {
          probeType: 2,
          scrollbar: true,
          click: true
        })
      },

      // 初始化滚动数据
      initScrollData () {
        // 1.初始化scrollY
        this.goodScroll.on("scroll", (scroll) => {
          // 将监听的scrollY值赋值给data中的scrollY
          this.scrollY = Math.abs(scroll.y)
        })

        // 2.监听滚动结束
        this.goodScroll.on("scrollEnd", (scroll) => {
          // 将监听的scrollY值赋值给data中的scrollY
          this.scrollY = Math.abs(scroll.y)
        })

        // 3.初始化tops
        const tops = []
        let top = 0
        tops.push(top)

        // 获取物品列表对应top值
        const lis = this.$refs.topUL.children
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })

        // 更新data中的tops
        this.tops = tops
      },

      // 菜单点击
      menuClick (index) {
        // 根据索引获取相应的scrollY
        const menuScrollY = this.tops[index]
        // 更新菜单
        this.scrollY = menuScrollY
        // 将物品栏滚动到相应位置
        this.goodScroll.scrollTo(0, -menuScrollY, 500)
      },

      // 显示隐藏物品详情
      foodShow (food) {
        // 给data中的food赋值
        this.food = food
        // 显示物品详情model(这里是调用父组件调用子组件的方法，利用ref完成)
        this.$refs.foodModel.toggleShow()
      }
    },
    watch: {
      // 监视shopGoods的变化
      shopGoods (value) {
        this.$nextTick(() => {
          // 初始化滚动
          this.initScroll()
          // 初始化滚动数据
          this.initScrollData()
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  @import "../../../common/stylus/shopGoods.styl"
</style>
