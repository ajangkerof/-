<template>
  <div class="star" :class="'star-'+size">
    <span class="star_item" v-for="(starClass, index) in starClasses" :class="starClass" :key="index"></span>
  </div>
</template>

<script>
  export default {
    props: {
      score: Number,
      size: Number
    },
    computed: {
      /*将评分转化为样式数组 ['on','on','on','half','off']*/
      starClasses () {
        const {score} = this
        const starArr = []

        /*添加n个'on'到数组中*/
        const onNum = Math.floor(score)
        for (let i=0 ; i<onNum ; i++) {
          starArr.push('on')
        }

        /*添加0/1个'half'到数组中*/
        const halfNum = (score % 1)*10
        if (halfNum > 4) {
          starArr.push('half')
        }

        /*添加n个'off'到数组中*/
        if (starArr.length < 5) {
          starArr.push('off')
        }

        return starArr
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star
    float left
    font-size 0
    .star_item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star_item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star_item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star_item
        width 10px
        height 10px
        margin-top 1px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 5px
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
</style>
