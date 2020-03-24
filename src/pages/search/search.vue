<template>
    <div class="search">
      <!--搜索表单-->
      <form class="search_form" @click.prevent="searchList">
        <input type="search" name="search" placeholder="输入商家或商品" class="search_input" v-model="keyword" >
        <input type="submit" name="submit" class="search_submit" value="搜索">
      </form>
      <!--搜索结果列表-->
      <div class="search_list" v-if="!noSearchShow">
        <ul class="list_ul">
          <router-link tag="li" :to="{path: '/shop', query: {id: item._id}}" class="list_li" v-for="(item, index) in searchShopList" :key="index">
            <div class="item_left">
              <img width="50" height="50" :src="item.image_path">
            </div>
            <div class="item_right">
              <div class="right_top">
                <span class="name">{{item.name}}</span>
              </div>
              <div class="right_middle">
                <span class="rating_count">月售 {{item.rating_count}} 单</span>
              </div>
              <div class="right_bottom">
                <span class="initial">{{item.distribution.initial}} / </span>
                <span class="tips">{{item.distribution.tip}}</span>
              </div>
            </div>
          </router-link>
        </ul>
      </div>
      <!--搜索失败-->
      <div class="no_search" v-else>
        <div class="content">
          <span class="iconfont icon-bumanyi"></span>
          <span class="no_search_text">没有查询到相关店铺</span>
        </div>
      </div>
      <!--热门搜索-->
      <div class="search_hot" v-if="isShowHot">
        <span class="hot_title">热门搜索</span>
        <ul>
          <li>
            <span class="iconfont icon-shucai"></span>
            <span>新鲜蔬菜</span>
          </li>
          <li>
            <span class="iconfont icon-kouzhao"></span>
            <span>口罩</span>
          </li>
          <li>
            <span class="iconfont icon-yao"></span>
            <span>药物</span>
          </li>
          <li>
            <span class="iconfont icon-yao"></span>
            <span>酒精</span>
          </li>
          <li>
            <span class="iconfont icon-shucai"></span>
            <span>新鲜蔬菜</span>
          </li>
          <li>
            <span class="iconfont icon-shucai"></span>
            <span>新鲜蔬菜</span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    data () {
      return {
        keyword: '', // 搜索值
        noSearchShow: false, // 是否显示未找到框
        isShowHot: true // 是否显示热门搜索
      }
    },
    computed: {
      ...mapState(['searchShopList'])
    },
    mounted () {
      // 刷新重进后重置列表
      this.$store.state.searchShopList = []
      this.$nextTick(() => {
        // 刷新重进后不显示未找到框
        this.noSearchShow = false
      })
    },
    methods: {
      // 搜索店铺
      searchList () {
        // 得到搜索关键字
        const {keyword} = this
        // 搜索相应店铺
        if (keyword) {
          this.$store.dispatch("searchShop", keyword)
        }
      }
    },
    watch: {
      // 监视searchShopList的变化，如果变化了且length为0则显示未找到框
      searchShopList (value) {
        if (!value.length) { // 没有搜索到则显示
          this.noSearchShow = true
          this.isShowHot = true
        } else if (value.length) {
          this.noSearchShow = false
          this.isShowHot = false
        }
      },
      keyword (value) {
        if (!value.length) {
          // 重置列表
          this.$store.state.searchShopList = []
          // 当DOM结构发生改变时调用
          this.$nextTick(() => {
            this.noSearchShow = false
          })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/search.styl"
</style>
