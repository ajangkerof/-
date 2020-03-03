/*
通过mutations间接更新state的多个方法的对象
 */
import {reqAddress, reqGoodList, reqBusiness, reqUserInfo, reqLogout} from '../api/index.js'
import {RECEIVE_ADDRESS, RECEIVE_GOODLIST, RECEIVE_BUSINESS, RECEIVE_USERINFO, RESET_LOGIN} from "./mutation-types"

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
    if (result.code === 0) {
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
  }
}
