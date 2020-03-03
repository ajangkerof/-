<template>
    <div class="home">
      <!--头部搜索定位-->
      <HeaderTop :title="address.name">
        <router-link class="iconfont icon-chazhao head_search" slot="head_search" to="/search"></router-link>
        <router-link class="head_login" slot="head_login" :to="userInfo._id ? '/userInfo' : '/login'">
          <span class="iconfont icon-wode" v-if="userInfo._id"></span>
          <span v-else>登录 | 注册</span>
        </router-link>
      </HeaderTop>
      <!--首页导航-->
      <div class="nav">
        <div class="swiper-container" v-if="goodListArr.length">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(goodList, index) in goodListArr" :key="index">
              <a href="#" class="item_type" v-for="(good, index) in goodList" :key="index">
                <div class="item_type_container">
                  <img :src="baseImageUrl + good.image_url">
                </div>
                <span>{{good.title}}</span>
              </a>
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
        </div>
        <img src="./images/msite_back.svg" alt="加载时背景" v-else>
      </div>
      <!--商家列表-->
      <div class="list">
        <div class="list_header">
          <span class="iconfont icon-icon"></span>
          <span class="list_header_title">附近商家</span>
        </div>
        <ShopList/>
      </div>
    </div>
</template>

<script>
  import HeaderTop from "../../components/HeaderTop/HeaderTop.vue"
  import ShopList from "../../components/ShopList/ShopList.vue"
  /* 滑块swiper */
  import "../../../node_modules/swiper/dist/css/swiper.css"
  import Swiper from 'swiper'
  /*读取vuex中state*/
  import {mapState} from "vuex"

  export default {
    data () {
      return {
        baseImageUrl: 'https://fuss10.elemecdn.com'
      }
    },
    mounted () {
      this.$store.dispatch("getGoodList")
      this.$store.dispatch("getBusiness")
    },
    computed: {
      ...mapState(['address', 'goodList', 'userInfo']),

      /*
        将goodList一维数组变为二维数组goodListArr
       */
      goodListArr () {
        const {goodList} = this
        // 准备空的二维数组
        const arr = []
        // 准备最大长度为8的一维数组
        let minArr = []

        // 将goodList定量装到二维数组中
        goodList.forEach(good => {
          // 长度满8后清空当前数组
          if (minArr.length === 8) {
            minArr = []
          }

          // 初始将一维数组minArr装到二维数组arr中
          if (minArr.length === 0) {
            arr.push(minArr)
          }

          minArr.push(good)
        })

        return arr
      }
    },
    watch: {
      // 监视goodList的变化，并利用Swiper实现实时轮播
      goodList (value) {
        // 界面更新立即创建Swiper对象(一旦数据更新导致界面更新)
        this.$nextTick(() => {
          // 创建一个Swiper实例对象，来实现轮播
          var mySwiper = new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      }
    },
    components: {
      HeaderTop,
      ShopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  @import "../../common/stylus/home.styl"
</style>
