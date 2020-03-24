<template>
    <div class="cartcontrol-wrapper">
      <transition name="reduce">
        <div class="reduce" :class="{reduceClass: reduceClass}" v-if="food.count" @click.stop="foodCount(false)">
          <span class="iconfont icon-jianhao"></span>
        </div>
      </transition>
      <transition name="num">
        <div class="num" v-if="food.count">
          <span>{{food.count}}</span>
        </div>
      </transition>
      <transition name="add">
        <div :class="{addClass: addClass}" @click.stop="foodCount(true)">
          <span class="iconfont icon-tianjia"></span>
        </div>
      </transition>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          isAdd: true,
          addClass: false,
          reduceClass: false
        }
      },
      props: {
        food: Object
      },
      methods: {
        foodCount (isAdd) {
          this.$store.dispatch("setFoodCount", {isAdd, food: this.food})
          // isAdd ? this.addClass = false : this.reduceClass = false

          if (isAdd) {
            this.addClass = true
            setTimeout(() => {
              this.addClass = false
            }, 300)
          } else {
            this.reduceClass = true
            setTimeout(() => {
              this.reduceClass = false
            }, 300)
          }
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol-wrapper
    position absolute
    right 5px
    bottom 10px
    z-index 99
    div
      width 20px
      height 20px
      float left
      text-align center
      line-height 20px
      .iconfont
        font-size 20px
        color #fff
        background-color #82b5d4
        border-radius 20px
    .addClass, .reduceClass
      animation ClickOne .3s
    .reduce
      &.reduce-enter-active
        animation reduceOne .3s
      &.reduce-leave-to
        animation reduceTwo .3s
    .num
      &.num-enter-active
        animation numOne .3s
      &.num-leave-to
        opacity 0
        transition opacity .3s
  @keyframes reduceOne {
    0% {
      opacity 0
      transform translate(40px, -20px) rotate(0deg) scale(1)
    }
    50% {
      opacity 0.5
      transform translate(20px, -20px) rotate(180deg) scale(1.8)
    }
    100% {
      opacity 1
      transform translate(0px, 0px) rotate(360deg) scale(1)
    }
  }
  @keyframes reduceTwo {
    0% {
      opacity 1
      transform translate(-10px, 0px) rotate(0deg) scale(1)
    }
    50% {
      opacity 0.5
      transform translate(0px, 20px) rotate(180deg) scale(1.8)
    }
    100% {
      opacity 0
      transform translate(20px, 0px) rotate(360deg) scale(1)
    }
  }
  @keyframes numOne {
    from {
      opacity 0
    }
    to {
      opacity 1
    }
  }
  @keyframes ClickOne{
    0%{
      transform scale(1)
    }
    50%{
      transform scale(1.2)
    }
    100%{
      transform scale(1)
    }
  }


</style>
