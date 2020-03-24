<template>
    <div class="shop_header">
      <div class="header_back" :style="{backgroundImage: `url(${shopDetail.bgImg})`}">
        <a class="back" @click="$router.back()">
          <span class="iconfont icon-zuo"></span>
        </a>
      </div>
      <div class="header_content">
        <img class="content_img" :src="shopDetail.avatar">
        <div class="content_top">
          <span class="top_title">品牌</span>
          <span class="top_text">{{shopDetail.name}}</span>
          <span class="iconfont icon-you" @click="ModelShow = !ModelShow"></span>
        </div>
        <div class="content_center">
          <span>{{shopDetail.score}}分</span>
          <span>月售{{shopDetail.sellCount}}单</span>
          <span>{{shopDetail.description}} 约{{shopDetail.deliveryTime}}分钟</span>
          <span>距离约{{shopDetail.distance}}</span>
        </div>
        <div class="content_bottom" v-if="shopDetail.supports">
          <div class="bottom_left">
            <div class="activity" :class="activityColor[shopDetail.supports[0].type]">
              <span class="content_tag">{{shopDetail.supports[0].name}}</span>
            </div>
          </div>
          <div class="bottom_center ellipsis">
            <span>{{shopDetail.supports[0].content}}</span>
          </div>
          <div class="bottom_right">
            <span>{{shopDetail.supports.length}}个优惠</span>
            <span class="iconfont icon-xiangxia" @click="SheetShow = !SheetShow"></span>
          </div>
        </div>
      </div>

      <!--商家配送信息面板-->
      <transition name="fade">
        <div class="shop-brief-modal" v-if="ModelShow">
          <div class="brief-modal-content">
            <h2 class="content-title">
        <span class="content-tag">
          <span class="mini-tag">品牌</span>
        </span>
              <span class="content-name">{{shopDetail.name}}</span>
            </h2>
            <ul class="brief-modal-msg">
              <li>
                <h3>{{shopDetail.score}}</h3>
                <p>评分</p>
              </li>
              <li>
                <h3>{{shopDetail.sellCount}}单</h3>
                <p>月售</p>
              </li>
              <li>
                <h3>{{shopDetail.description}}</h3>
                <p>约{{shopDetail.deliveryTime}}分钟</p>
              </li>
              <li>
                <h3>{{shopDetail.deliveryPrice}}元</h3>
                <p>配送费用</p>
              </li>
              <li>
                <h3>{{shopDetail.distance}}</h3>
                <p>距离</p>
              </li>
            </ul>
            <h3 class="brief-modal-title">
              <span>公告</span>
            </h3>
            <div class="brief-modal-notice">
              {{shopDetail.bulletin}}
            </div>
            <div class="mask-footer">
              <span class="iconfont icon-icon-test" @click="ModelShow = !ModelShow"></span>
            </div>
          </div>
          <div class="brief-modal-cover"></div>
        </div>
      </transition>
      <!--商家优惠面板-->
      <transition name="fade">
        <div class="activity-sheet" v-if="SheetShow">
          <div class="activity-sheet-content">
            <h2 class="activity-sheet-title">优惠活动</h2>
            <ul class="list">
              <li class="activity-item" v-for="(support, index) in shopDetail.supports" :key="index"
                  :class="activityColor[shopDetail.supports[index].type]">
              <span class="content-tag">
                <span class="mini-tag">{{support.name}}</span>
              </span>
                <span class="activity-content">{{support.content}}</span>
              </li>
            </ul>
            <div class="activity-sheet-close">
              <span class="iconfont icon-icon-test" @click="SheetShow = !SheetShow"></span>
            </div>
          </div>
          <div class="activity-sheet-cover"></div>
        </div>
      </transition>
    </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    data () {
      return {
        activityColor: ['activity-green', 'activity-red', 'activity-orange'],
        ModelShow: false,
        SheetShow: false
      }
    },
    computed: {
      ...mapState(['shopDetail', 'shopGoods', 'shopAssess'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  @import "../../common/stylus/shopHeader.styl"
</style>
