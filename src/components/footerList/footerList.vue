<template>
    <div class="footer_list">
      <a href="javascript:;" class="list_item" :class="{on: '/home' === $route.path}" @click="goTo('/home')">
        <span class="iconfont icon-dianpu1"></span>
        <span class="fontname">商店</span>
      </a>
      <a href="javascript:;" class="list_item" :class="{on: '/search' === $route.path}" @click="goTo('/search')">
        <span class="iconfont icon-chazhao"></span>
        <span class="fontname">搜索</span>
      </a>
      <a href="javascript:;" class="list_item" :class="{on: '/order' === $route.path}" @click="goTo('/order')">
        <span class="iconfont icon-dingdan"></span>
        <span class="fontname">订单</span>
      </a>
      <a href="javascript:;" class="list_item" :class="{on: '/person' === $route.path}" @click="goTo('/person')">
        <span class="iconfont icon-yonghu"></span>
        <span class="fontname">用户</span>
      </a>
    </div>
</template>

<script>
    export default {
      methods: {
        goTo (path) {
          // replace 跳转路由没有历史记录
          this.$router.replace(path)
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .footer_list
    width 100%
    height 50px
    background-color #fff
    line-height 50px
    position fixed
    bottom 0
    z-index 100
    display flex
    .list_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      &.on
        color #4cb4e7
      .fontname
        font-size 12px
        font-weight bold
        position: absolute
        bottom 0
        top 0
        margin-top 15px
      .iconfont
        font-size 25px
        position: absolute
        bottom 0
        top -5px
        margin-bottom 5px
</style>
