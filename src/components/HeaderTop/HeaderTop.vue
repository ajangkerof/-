<template>
  <div class="head">
    <slot name="head_search"></slot>
    <span class="iconfont icon-dingwei head_where"></span>
    <span class="head_title ellipsis">{{title}}</span>
    <slot name="head_login"></slot>
  </div>
</template>

<script>
    export default {
      props : {
        title: String
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /* 头部查询定位 */
  .head
    background-color #ffee93
    position fixed
    z-index 100
    left 0
    top 0
    width 100%
    height 45px
    span
      position absolute
      top 30%
      font-size 18px
      color #82b5d4
    .head_search
      left 5%
      transform translateY(-50%)
      top 50%
      font-size 30px
    .head_where
      left 33%
      transform translateY(-50%)
      top 50%
      font-size 24px
    .head_title
      left 40%
      width 100px
    .head_login
      right 5%
</style>
