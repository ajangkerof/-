<template>
    <div class="home">
      <!--头部搜索定位-->
      <HeaderTop title="湖北武汉湖北武汉">
        <span class="iconfont icon-chazhao head_search" slot="head_search"></span>
        <span class="head_login" slot="head_login">登录 | 注册</span>
      </HeaderTop>
      <!--首页导航-->
      <div class="nav">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <a href="#" class="item_type">
                <div class="item_type_container">
                  <img src="./images/nav/1.jpg" alt="甜品饮品">
                </div>
                <span>甜品饮品</span>
              </a>
              <a href="#" class="item_type">
                <div class="item_type_container">
                  <img src="./images/nav/2.jpg" alt="商超便利">
                </div>
                <span>商超便利</span>
              </a>
              <a href="#" class="item_type">
                <div class="item_type_container">
                  <img src="./images/nav/3.jpg" alt="美食">
                </div>
                <span>美食</span>
              </a>
              <a href="#" class="item_type">
                <div class="item_type_container">
                  <img src="./images/nav/4.jpg" alt="简餐">
                </div>
                <span>简餐</span>
              </a>
              <a href="#" class="item_type">
                <div class="item_type_container">
                  <img src="./images/nav/5.jpg" alt="新店特惠">
                </div>
                <span>新店特惠</span>
              </a>
              <a href="#" class="item_type">
                <div class="item_type_container">
                  <img src="./images/nav/6.jpg" alt="准时达">
                </div>
                <span>准时达</span>
              </a>
              <a href="#" class="item_type">
                <div class="item_type_container">
                  <img src="./images/nav/7.jpg" alt="预订早餐">
                </div>
                <span>预订早餐</span>
              </a>
              <a href="#" class="item_type">
                <div class="item_type_container">
                  <img src="./images/nav/8.jpg" alt="霸王餐">
                </div>
                <span>霸王餐</span>
              </a>
            </div>
            <div class="swiper-slide">
              <a href="#" class="item_type">
                <div class="item_type_container">
                  <img src="./images/nav/9.jpg" alt="甜品饮品">
                </div>
                <span>甜品饮品</span>
              </a>
              <a href="#" class="item_type">
                <div class="item_type_container">
                  <img src="./images/nav/10.jpg" alt="商超便利">
                </div>
                <span>商超便利</span>
              </a>
              <a href="#" class="item_type">
                <div class="item_type_container">
                  <img src="./images/nav/11.jpg" alt="美食">
                </div>
                <span>美食</span>
              </a>
              <a href="#" class="item_type">
                <div class="item_type_container">
                  <img src="./images/nav/12.jpg" alt="简餐">
                </div>
                <span>简餐</span>
              </a>
              <a href="#" class="item_type">
                <div class="item_type_container">
                  <img src="./images/nav/13.jpg" alt="新店特惠">
                </div>
                <span>新店特惠</span>
              </a>
              <a href="#" class="item_type">
                <div class="item_type_container">
                  <img src="./images/nav/14.jpg" alt="准时达">
                </div>
                <span>准时达</span>
              </a>
              <a href="#" class="item_type">
                <div class="item_type_container">
                  <img src="./images/nav/14.jpg" alt="预订早餐">
                </div>
                <span>预订早餐</span>
              </a>
              <a href="#" class="item_type">
                <div class="item_type_container">
                  <img src="./images/nav/14.jpg" alt="霸王餐">
                </div>
                <span>霸王餐</span>
              </a>
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
        </div>
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

  export default {
    mounted () {
      var mySwiper = new Swiper ('.swiper-container', {
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
      })
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
