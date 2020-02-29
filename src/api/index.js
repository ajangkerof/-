/*
  包含n个接口请求函数的对象
  函数返回值：promise对象
 */
import ajax from './ajax.js'
const BASE_URL = 'http://localhost:4000'

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodList = () => ajax(BASE_URL+'/index_category')
// 3、根据经纬度获取商铺列表
export const reqArList = (longitude, latitude) => ajax(BASE_URL+'/shops', {longitude, latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqArKeyList = (geohash, keyword) => ajax(BASE_URL+'/search_shops', {geohash, keyword})
// 5、获取一次性验证码
export const reqOneCode = () => ajax(BASE_URL+'/captcha')
// 6、用户名密码登陆
export const reqpwLogin = (name, pwd, captcha) => ajax(BASE_URL+'/login_pwd', {name, pwd, captcha})
// 7、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL+'/sendcode', {phone})
// 8、手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASE_URL+'/login_sms', {phone, code})
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL+'/userinfo')
// 10、用户登出
export const reqLogout = () => ajax(BASE_URL+'/logout')

