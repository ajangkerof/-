<template>
    <div class="search">
      <form action="" class="search_form">
        <input type="search" name="search" placeholder="输入商家或商品" class="search_input">
        <input type="submit" name="submit" class="search_submit" value="取消">
      </form>

      <div class="search_hot">
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
    export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/search.styl"
</style>
