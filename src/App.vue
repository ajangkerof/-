<template>
    <div id="app">
      <router-view/>
      <footerList v-show="$route.meta.footerShow"/>
    </div>
</template>

<script>
  import footerList from "./components/footerList/footerList.vue"
  export default {
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
