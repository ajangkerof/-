/*
  包含n个接口请求函数的对象
  函数返回值：promise对象
 */
import ajax from './ajax.js'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// 2、获取物品分类列表
export const reqGoodList = () => ajax(BASE_URL+'/category')
// 3、根据经纬度获取商铺列表
export const reqBusiness = ({longitude, latitude}) => ajax(BASE_URL+'/shops', {longitude, latitude})
// 4、根据关键字搜索商铺列表
export const reqKeyBusiness = (keyword) => ajax(BASE_URL+'/search_shops', {keyword})
// 5、获取一次性图形验证码
export const reqOneCode = () => ajax(BASE_URL+'/captcha')
// 6、用户名密码登陆
export const reqPwLogin = ({name, pwd, captcha}) => ajax(BASE_URL+'/user/login_pwd', {name, pwd, captcha}, 'POST')
// 7、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL+'/user/sendcode', {phone})
// 8、手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASE_URL+'/user/login_sms', {phone, code}, 'POST')
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL+'/user/userinfo')
// 10、用户登出
export const reqLogout = () => ajax(BASE_URL+'/user/logout')

// 11.获取物品列表
export const reqShopGoods = () => ajax('/shopGoods')
// 12.获取评价
export const reqShopAssess = () => ajax('/shopAssess')
// 13.获取商家详情
export const reqShopDetail = () => ajax('/shopDetail')

// 14.用户单向评价
export const requserAssess = ({userId, index}) => ajax(BASE_URL+'/user/assess', {userId, index})

// 15.更新用户基础信息
export const reqUpdateUserInfo = ({id, name, phone}) => ajax(BASE_URL+'/user/updateInfo', {id, name, phone}, 'POST')
// 16.更新用户密码
export const reqUpdateUserPw = ({id, oldPassword, newPassword}) => ajax(BASE_URL+'/user/updateUserPw', {id, oldPassword, newPassword}, 'POST')
