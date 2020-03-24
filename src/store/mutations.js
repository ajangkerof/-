/*
直接更新state的多个方法的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_GOODLIST,
  RECEIVE_BUSINESS,
  RECEIVE_USERINFO,
  RESET_LOGIN,
  RECEIVE_SHOPGOODS,
  RECEIVE_SHOPASSESS,
  RECEIVE_SHOPDETAIL,
  ADD_FOODCOUNT,
  REDUCE_FOODCOUNT,
  CLEAN_SHOPCART,
  SEARCH_SHOP,
  SEARCH_ORDERlIST,
  UPDATE_USERINFO,
  UPDATE_PWD
} from "./mutation-types"
import Vue from "vue"
export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECEIVE_GOODLIST] (state, {goodList}) {
    state.goodList = goodList
  },
  [RECEIVE_BUSINESS] (state, {business}) {
    state.business = business
  },
  [RECEIVE_USERINFO] (state, {userInfo}) {
    state.userInfo = userInfo

    // 另外存储订单数据
    state.orders = userInfo.orders
  },
  [RESET_LOGIN] (state) {
    state.userInfo = {}
  },
  [RECEIVE_SHOPGOODS] (state, {shopGoods}) {
    state.shopGoods = shopGoods
  },
  [RECEIVE_SHOPASSESS] (state, {shopAssess}) {
    state.shopAssess = shopAssess
  },
  [RECEIVE_SHOPDETAIL] (state, {shopDetail}) {
    state.shopDetail = shopDetail
  },
  [ADD_FOODCOUNT] (state, {food}) {
    if (food.count) {
      food.count++
    } else {
      // food.count = 1   // 这样添加的数据是没有数据绑定监听效果的

      /*
        利用Vue.set(对象, 属性名, 属性值)
       */
      Vue.set(food, "count", 1)

      // 更新cartFoods数组
      state.cartFoods.push(food)
    }
  },
  [REDUCE_FOODCOUNT] (state, {food}) {
    if (food.count) {
      food.count--
      if (food.count === 0) {
        // 当购物数为0时，删除购物车中对应物品的数据
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [CLEAN_SHOPCART] (state) {
    // 重置food中的count
    state.cartFoods.forEach(food => food.count = 0)
    // 清空购物车列表
    state.cartFoods = []
  },
  [SEARCH_SHOP] (state, {searchShopList}) {
    // 将获取到的店铺列表利用state进行管理
    state.searchShopList = searchShopList
  },
  [SEARCH_ORDERlIST] (state, {orderName}) {
    if (!orderName) {
      state.orders = state.userInfo.orders
    }else {
      // 筛选数据
      state.orders = state.userInfo.orders.filter((order) => {
        // 利用indexOf实现模糊查询
        return order.name.indexOf(orderName) > -1
      })
    }
  },
  [UPDATE_USERINFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [UPDATE_PWD] (state) { // 更新完密码重置vuex用户数据
    state.userInfo = {}
  }
}
