<template>
  <div class="shop">
    <ShopHeader/>
    <div class="tab">
      <div class="tab_item">
        <router-link to="/shop/shopGoods" replace>货品</router-link>
      </div>
      <div class="tab_item">
        <router-link to="/shop/shopAssess" replace>评价</router-link>
      </div>
      <div class="tab_item">
        <router-link to="/shop/shopDetail" replace>商家</router-link>
      </div>
    </div>
    <!--缓存路由组件对象（本质上在浏览器端的内存里把组件对象缓存起来）-->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import ShopHeader from "../../components/ShopHeader/ShopHeader.vue"
  export default {
    mounted () {
      // console.log(window.location.href)
      this.$store.dispatch('getShopDetail')
    },
    components: {
      ShopHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab_item
      float left
      width: 33.33333%
      text-align center
      a
        display block
        position relative
        font-size 14px
        font-weight bold
        color rgb(77, 85, 93)
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>
