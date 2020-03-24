/*
通过mutations间接更新state的多个方法的对象
 */
import {reqAddress, reqGoodList, reqBusiness, reqUserInfo, reqLogout, reqShopGoods, reqShopAssess, reqShopDetail, reqKeyBusiness, requserAssess, reqUpdateUserInfo} from '../api/index.js'
import {RECEIVE_ADDRESS, RECEIVE_GOODLIST, RECEIVE_BUSINESS, RECEIVE_USERINFO, RESET_LOGIN, RECEIVE_SHOPGOODS, RECEIVE_SHOPASSESS, RECEIVE_SHOPDETAIL, ADD_FOODCOUNT, REDUCE_FOODCOUNT, CLEAN_SHOPCART, SEARCH_SHOP, SEARCH_ORDERlIST, UPDATE_USERINFO, UPDATE_PWD} from "./mutation-types"

export default {

  // 异步获取地址
  async getAddress ({commit, state}) {
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 提交一个mutation
    if (result.code === 0) {
      let address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },

  // 异步获取物品分类信息
  async getGoodList ({commit}) {
    const result = await reqGoodList()
    if (result.code === 0) {
      let goodList = result.data
      commit(RECEIVE_GOODLIST, {goodList})
    }
  },

  // 异步获取商家信息
  async getBusiness ({commit, state}) {
    const {longitude, latitude} = state
    const result = await reqBusiness({longitude, latitude})
    if (result.code === 0) { // 成功
      let business = result.data
      commit(RECEIVE_BUSINESS, {business})
    }
  },

  // 同步获取登录用户信息（登录后立即显示）
  getUserInfo ({commit}, userInfo) {
    commit(RECEIVE_USERINFO, {userInfo})
  },

  // 异步获取用户信息（刷新页面时保持登录）
  async getUserInfoAsync ({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      // 获取session保留的用户
      const userInfo = result.data
      commit(RECEIVE_USERINFO, {userInfo})
    }
  },

  // 退出登录,清除session中用户数据
  async outLogin ({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_LOGIN)
    }
  },

  // 存储商家物品信息
  async getShopGoods ({commit}) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const shopGoods = result.data
      commit(RECEIVE_SHOPGOODS, {shopGoods})
    }
  },

  // 存储商家评价信息
  async getShopAssess ({commit}) {
    const result = await reqShopAssess()
    if (result.code === 0) {
      const shopAssess = result.data
      commit(RECEIVE_SHOPASSESS, {shopAssess})
    }
  },

  // 存储商家详情信息
  async getShopDetail ({commit}) {
    const result = await reqShopDetail()
    if (result.code === 0) {
      const shopDetail = result.data
      commit(RECEIVE_SHOPDETAIL, {shopDetail})
    }
  },

  // 增加或删除下单数量
  setFoodCount ({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(ADD_FOODCOUNT, {food})
    } else if (!isAdd) {
      commit(REDUCE_FOODCOUNT, {food})
    }
  },

  // 清除购物车
  cleanShopCart ({commit}) {
    commit(CLEAN_SHOPCART)
  },

  // 根据已有的经纬度和关键字搜索店铺
  async searchShop ({commit, state}, keyword) {
    // 整合经纬度
    // const geohash = state.latitude + ',' + state.longitude
    // 发送ajax请求获取店铺数据
    if (keyword) {
      const result = await reqKeyBusiness(keyword)
      if (result.code === 0) { // 请求成功
        // 接收数据
        const searchShopList = result.data
        commit(SEARCH_SHOP, {searchShopList})
      }
    }else {
      const searchShopList = []
      commit(SEARCH_SHOP, {searchShopList})
    }
  },

  // 存入用户的订单数据
  async searchOrderList ({commit}, orderName) {
    commit(SEARCH_ORDERlIST, {orderName})
  },

  // 用户单向评价
  async assessUser ({commit, state}, {userId, index}) {
    // 请求后台更新
    const result = await requserAssess({userId, index})
    // 更新完成后，更新前台数据
    if (result.code === 0) {
      // 重新查询用户信息
      const data = await reqUserInfo()
      if (data.code === 0) {
        // 获取session保留的用户
        const userInfo = data.data
        // 评价成功后更新用户数组
        commit(RECEIVE_USERINFO, {userInfo})
      }
    }
  },

  // 修改用户信息
  async updateUserInfo ({commit}, {id, name, phone}) {
    // 发送更新请求
    const result = await reqUpdateUserInfo({id, name, phone})
    // 成功，更新vuex管理的用户数据
    if (result.code === 0) {
      const userInfo = result.data
      console.log(userInfo)
      commit(UPDATE_USERINFO, {userInfo})
    }
  },

  // 更新完密码同步更新用户数据
  updatePwd ({commit}) {
    commit(UPDATE_PWD)
  }
}
