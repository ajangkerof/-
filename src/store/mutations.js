/*
直接更新state的多个方法的对象
 */
import {RECEIVE_ADDRESS, RECEIVE_GOODLIST, RECEIVE_BUSINESS, RECEIVE_USERINFO, RESET_LOGIN} from "./mutation-types"

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
  },
  [RESET_LOGIN] (state) {
    state.userInfo = {}
  }
}
