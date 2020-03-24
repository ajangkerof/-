<template>
  <div class="model" v-if="isShow">
    <div class="model_content">
        <div class="content_top">
          <img v-lazy="food.image">
          <span class="iconfont icon-zuo" @click="toggleShow"></span>
          <span class="info">{{food.info}}</span>
        </div>
        <div class="content_bottom">
          <h3>{{food.name}}</h3>
          <span class="cellCount">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
        </div>
        <CartControl :food="food"/>
      </div>
    <div class="model_back" @click="toggleShow"></div>
  </div>
</template>

<script>
  // 引入CartControl组件
  import CartControl from "../CartControl/CartControl.vue"
  export default {
    props: {
      food: Object,
    },
    data () {
      return {
        isShow: false
      }
    },
    components: {
      CartControl
    },
    methods: {
      toggleShow () {
        this.isShow = !this.isShow
      }
    }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/foodModel.styl"
</style>
