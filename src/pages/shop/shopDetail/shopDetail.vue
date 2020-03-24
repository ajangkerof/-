<template>
  <div class="shop-info">
    <div class="info-content">
      <div class="section">
        <h3 class="section-title">配送信息</h3>
        <div class="delivery">
          <div>
            <span class="delivery-icon">{{shopDetail.description}}</span>
            <span>由商家配送提供配送，约{{shopDetail.deliveryTime}}分钟送达，距离{{shopDetail.distance}}</span>
          </div>
          <div class="delivery-money">配送费￥{{shopDetail.deliveryPrice}}</div>
        </div>
      </div>

      <div class="split"></div>

      <div class="section">
        <h3 class="section-title">活动与服务</h3>
        <div class="activity">
          <div class="activity-item" v-for="(support, index) in shopDetail.supports" :key="index" :class="activityColor[support.type]">
            <span class="content-tag">
              <span class="mini-tag">{{support.name}}</span>
            </span>
            <span class="activity-content">{{support.content}}</span>
          </div>
        </div>
      </div>

      <div class="split"></div>

      <div class="section">
        <h3 class="section-title">商家实景</h3>
        <div class="pic-wrapper">
          <ul class="pic-list" ref="picsUl">
            <li class="pic-item" v-for="(pic, index) in shopDetail.pics" :key="index">
              <img width="120" height="90" :src="pic"/>
            </li>
          </ul>
        </div>
      </div>

      <div class="split"></div>

      <div class="section">
        <h3 class="section-title">商家信息</h3>
        <ul class="detail">
          <li><span class="bold">品类</span> <span>{{shopDetail.category}}</span></li>
          <li><span class="bold">商家电话</span> <span>{{shopDetail.phone}}</span></li>
          <li><span class="bold">地址</span> <span>{{shopDetail.address}}</span></li>
          <li><span class="bold">营业时间</span> <span>{{shopDetail.workTime}}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  // 按需引入滚动插件
  import BScroll from "@better-scroll/core"
  import {mapState} from "vuex"
  export default {
    data () {
      return {
        activityColor: ['activity-green', 'activity-red', 'activity-orange']
      }
    },
    computed: {
      ...mapState(['shopDetail'])
    },
    mounted () {
      this.initScroll()
    },
    methods: {
      initScroll () {
        // 初始化商家显示创建滚动对象
        const DetailScroll = new BScroll(".shop-info", {
          click: true
        })
        // 初始化商家图片滚动
        const imgScroll = new BScroll(".pic-wrapper", {
          click: true,
          scrollX: true,
          scrollbar: true
        })
      }
    },
    watch: {
      shopDetail () {
        // DOM结构发生变化时执行回调函数
        this.$nextTick(() => {
          this.initScroll()
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  @import "../../../common/stylus/shopDetail.styl"
</style>
