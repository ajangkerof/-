<template>
    <div class="open">
      <h1>@THL</h1>
      <img src="./images/open.gif" alt="开机动画">
    </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    computed: {
      ...mapState(['goodList', 'business'])
    },
    mounted () {
      this.$store.dispatch("getGoodList")
      this.$store.dispatch("getBusiness")

      setTimeout(() => {
        this.$router.replace('/home')
      }, 2700)
      // open-yq 3700
    },
    /*watch: {
      business () {
        if (this.business.length > 0) {
          this.$router.replace('/home')
        }
      }
    }*/
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .open
    width 100%
    height 100%
    h1
      position absolute
      right 0
      bottom 0
      color lightskyblue
      z-index 10
      font-size 12px
    img
      position absolute
      left -18px
      top 0
</style>
