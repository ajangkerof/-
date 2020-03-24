<template>
    <div id="app">
      <router-view/>
      <footerList v-show="$route.meta.footerShow"/>
    </div>
</template>

<script>
  import {mapActions} from "vuex"
  import footerList from "./components/footerList/footerList.vue"

  export default {
    mounted () {
      // this.$store.dispatch('getAddress')
      this.getAddress()
      // 刷新页面时保持登录
      this.getUserInfoAsync()
    },
    methods: {
      ...mapActions(['getAddress', 'getUserInfoAsync'])
    },
    components: {
      footerList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background-color #f5f5f5
    position relative
</style>
