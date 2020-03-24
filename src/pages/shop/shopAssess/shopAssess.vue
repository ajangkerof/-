<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{shopDetail.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家99%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :score="shopDetail.serviceScore" :size="36" />
            <span class="score">{{shopDetail.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :score="shopDetail.foodScore" :size="36" />
            <span class="score">{{shopDetail.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{shopDetail.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <div class="split"></div>

      <div class="ratingselect">
        <div class="rating-type border-1px">
          <span class="block positive" :class="{active: selectType === 2}" @click="setSelectType(2)">
            <span class="iconfont icon-quanbu"></span>
            全部<span class="count">{{shopAssess.length}}</span>
          </span>
          <span class="block positive" :class="{active: selectType === 0}" @click="setSelectType(0)">
            <span class="iconfont icon-manyi"></span>
            满意<span class="count">{{positiveSize}}</span>
          </span>
          <span class="block negative" :class="{active: selectType === 1}" @click="setSelectType(1)">
            <span class="iconfont icon-bumanyi"></span>
            不满意<span class="count">{{shopAssess.length - positiveSize}}</span>
          </span>
        </div>
        <div class="switch" :class="{on: onlyShowText}" @click="toggleShowText">
          <span class="iconfont icon-zhengque"></span>
          <span class="text">默认不显示无内容的评价</span>
        </div>
      </div>

      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(shopAsses, index) in typeAssess" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="shopAsses.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{shopAsses.username}}</h1>
              <div class="star-wrapper">
                <star :score="shopAsses.score" :size="24" />
                <span class="delivery">{{shopAsses.deliveryTime ? shopAsses.deliveryTime+'min送达' : ' '}}</span>
              </div>
              <p class="text">{{shopAsses.text}}</p>
              <div class="recommend">
                <span class="iconfont" :class="shopAsses.rateType === 0 ? 'icon-dianzan' : 'icon-chaping1'"></span>
                <span class="item" v-for="(recommend, index) in shopAsses.recommends" :key="index">{{recommend}}</span>
              </div>
              <div class="time">{{shopAsses.rateTime | date-filter}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import star from "../../../components/star/star.vue"
  import {mapState, mapGetters} from "vuex"
  // 按需引入滚动插件
  import BScroll from "@better-scroll/core"
  export default {
    data () {
      return {
        onlyShowText: true, // 是否只显示有文本的
        selectType: 2 // 选择评论的类型：0表示满意，1表示不满意，2表示全部
      }
    },
    mounted () {
      this.$store.dispatch('getShopAssess')
    },
    computed: {
      ...mapState(['shopDetail', 'shopAssess']),
      ...mapGetters(['positiveSize']),
      /* 计算评论的类型 */
      typeAssess () {
        const {shopAssess, onlyShowText, selectType} = this

        // 通过筛选的条件过滤一个新数组
        return shopAssess.filter(shopAsses => {
          // 取出每个评论中的评论类型 和 文本
          const {rateType, text} = shopAsses

          /*
            选择1条件：
                  selectType ---> 0/1/2
                  rateType ---> 0/1
                    情形一：selectType === 2  全部显示
                    情形二：selectType === rateType 满意或不满意
                    综合：
                      全部显示 或 筛选满意或不满意的评论selectType === rateType
            选择2条件：
                  onlyShowText ---> true/false
                  text ---> 有文本/无文本
                    情形一：!onlyShowText  如果显示不带文本的直接return
                    情形二：text.length > 0  如果显示带文本的继续判断文本是否有值
           */
          return (selectType === 2 || selectType === rateType) && (!onlyShowText || text.length > 0)
        })
      }
    },
    methods: {
      // 设置显示评论的类型
      setSelectType (selectType) {
        this.selectType = selectType
      },
      // 切换是否显示空评论
      toggleShowText () {
       this.onlyShowText = !this.onlyShowText
      }
    },
    components: {
      star
    },
    watch: {
      shopAssess () {
        this.$nextTick(() => {
          // 评论数据获取到后初始化滚动
          const AssessScroll = new BScroll(".ratings", {
            click: true
          })
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  @import "../../../common/stylus/shopAssess.styl"
</style>
