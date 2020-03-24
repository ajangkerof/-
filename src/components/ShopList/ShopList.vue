<template>
  <div class="list_container">
    <ul v-if="business.length">
      <li v-for="(busines, index) in business" :key="index" @click="toShop(busines._id)">
        <a>
          <div class="list_container_left">
            <img :src="busines.image_path" class="left_img">
          </div>
          <div class="list_container_center">
            <div class="center_header">
              <h4>{{busines.name}}</h4>
              <ul>
                <li v-for="(support, index) in busines.supports" :key="index">
                  {{support.icon_name}}
                </li>
              </ul>
            </div>
            <div class="center_body">
              <div class="body_left">
                <star :score="busines.rating" :size="24"/>
                <div class="score">
                  <span>{{busines.rating}}</span>
                </div>
                <div class="sales">
                  <span>月销售{{busines.rating_count}}</span>
                </div>
              </div>
              <div class="body_right">
                <span class="delivery">{{busines.delivery_text}}</span>
              </div>
            </div>
            <div class="center_footer">
              <div class="regulations">
                <span>{{busines.distribution.initial}}</span>
                <span>/</span>
                <span>{{busines.distribution.tips}}</span>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
    <!-- 数据还没出来时，显示此svg背景图片 -->
    <ul v-else>
      <li v-for="item in 6">
        <img src="./images/shop_back.svg" alt="加载时背景">
      </li>
    </ul>
  </div>
</template>

<script>

  import {mapState} from "vuex"
  /*评分组件star*/
  import star from "../star/star.vue"
  export default {
    computed: {
      ...mapState(['business'])
    },
    components: {
      star
    },
    methods: {
      // 去详情页面
      toShop (id) {
        // 跳转到详情页面
        // this.$router.push({path: '/shop', query: {id: id}}) 下面方法也可以传递参数
        this.$router.push('/shop?id='+id)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .list_container
    >ul
      margin-bottom 50px
      >li
        border-bottom 1px solid #f1f1f1
        > a
          clearFix()
          display: block
          box-sizing border-box
          padding: 5px
          width 100%
          .list_container_left
            float: left
            width 25%
            box-sizing border-box
            padding 10px
            img
              width 71px
              height 71px
              display block
          .list_container_center
            float: right
            width 75%
            .center_header
              width 100%
              margin-top 5px
              clearFix()
              h4
                float left
                width 200px
                font-size 20px
                line-height 25px
                font-weight bold
                color black
                &::before
                  content "紧急"
                  display inline-block
                  font-size 12px
                  line-height 12px
                  color red
                  background gold
                  margin-right 5px
                  border 2px solid gainsboro
                  border-radius 2px
              ul
                float right
                li
                  float left
                  margin-left 5px
                  font-weight bold
                  color #999
                  border 1px solid #f1f1f1
                  border-radius 2px
            .center_body
              width 100%
              margin 11px 0
              clearFix()
              .body_left
                float left
                .score
                  float left
                  font-size 12px
                  color red
                  margin-right 5px
                .sales
                  float left
                  font-size 12px
              .body_right
                float right
                border 1px solid #6dc2a2
                color #6dc2a2
                font-size 12px
                line-height 15px
            .center_footer
              width 100%
              .regulations
                font-size 12px
</style>
