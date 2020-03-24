/*
包含多个基于state的getter计算属性的对象
 */
export default {
  // 计算购物车物品个数总数
  totalCount (state) {
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
  },
  // 计算购物车物品价格总数
  totalPrice (state) {
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
  },
  // 计算满意评论的数量
  positiveSize (state) {
    return state.shopAssess.reduce((AssesTotal, shopAsses) => AssesTotal + (shopAsses.rateType === 0 ? 1 : 0), 0)
  }
}

