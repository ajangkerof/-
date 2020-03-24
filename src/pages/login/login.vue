<template>
  <div class="login_container">
    <div class="login">
      <!--介绍-->
      <div class="login_header">
        <h2 class="login_logo">疫情快送</h2>
        <div class="login_header_title">
          <a href="javascript:" :class="{on: loginWay}" @click="loginWay = true">短信登录</a>
          <a href="javascript:" :class="{on: !loginWay}" @click="pwdLogin">密码登录</a>
        </div>
      </div>

      <!--登陆-->
      <div class="login_content">
        <form>
          <!--短信登录-->
          <div :class="{on: loginWay}">
            <div class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!phoneTrue" class="get_verification"
                      :class="{phoneClass: phoneTrue, clickClass: clickTrue}"
                      @click.prevent="getCode">{{countDown > 0 ? `已发送 ${countDown}s` : '获取验证码'}}</button>
            </div>
            <div class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </div>
            <div class="login_hint">
              温馨提示：未注册帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:">《用户服务协议》</a>
            </div>
          </div>
          <!--密码登录-->
          <div :class="{on: !loginWay}">
            <div class="login_message">
              <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
            </div>
            <div class="login_verification">
              <input type="text" maxlength="8" placeholder="密码" v-if="showPw" v-model="pwd">
              <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
              <div class="switch_button" :class="showPw ? 'on' : 'off'" @click="showPw=!showPw">
                <div class="switch_circle" :class="{right: showPw}"></div>
                <span class="switch_text">{{showPw ? '显示' : '***'}}</span>
              </div>
            </div>
            <div class="login_message">
              <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
              <img class="get_verification" :src="captchaSrc" @click="newCaptcha" ref="captcha">
            </div>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:" class="about_us">关于我们</a>
      </div>

      <!--回退-->
      <a href="javascript:" class="go_back" @click="$router.back()">
        <span class="iconfont icon-zuo"></span>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="showTip" @closeTip="closeTip"/>
  </div>
</template>

<script>
  import AlertTip from "../../components/AlertTip/AlertTip.vue"
  import {reqSendCode, reqPwLogin, reqSmsLogin, reqOneCode} from "../../api/index.js"
  export default {
    data () {
      return {
        loginWay: true, // true代表短信登录，false代表密码登录
        countDown: 0, // 发送验证码倒计时
        clickTrue: false, // 点击发送验证码，更新样式状态
        showPw: false,
        phone: '', // 电话号码
        code: '', // 短信验证码
        name: '', // 用户名
        pwd: '', // 密码
        captcha: '', // 图形验证码
        captchaSrc: '',
        alertText: '', // 弹框提示内容
        showTip: false // 是否显示弹框
      }
    },
    computed: {
      // 验证手机号是否正确
      phoneTrue () {
        const {phone} = this
        const reg = /^1[3|4|5|7|8][0-9]{9}$/

        return reg.test(phone)
      }
    },
    methods: {
      // 切换为密码登录
      pwdLogin () {
        this.loginWay = false
        this.captchaSrc = 'http://localhost:4000/user/captcha?time=' + Date.now()
      },
      // 发送验证码
      async getCode () {
        // 如果没有定时器就启动
        if (!this.countDown) {
          // 启动定时器
          this.countDown = 60
          this.clickTrue = true
          this.intervalId = setInterval(() => {
            this.countDown--
            if (this.countDown<=0) {
              clearInterval(this.intervalId)
              this.clickTrue = false
            }
          }, 1000)
        }
        // 发送ajax请求获取验证码
        const result = await reqSendCode(this.phone)
        if (result.code === 0) { // 发送成功
          console.log("发送成功")
        } else if (result.code === 0) { // 发送失败
          // 显示提示框
          this.showText(result.msg)
          // 停止计时
          if (this.countDown) {
            this.countDown = 0
            clearInterval(this.intervalId)
            this.intervalId = 0
          }
        }
      },
      // 弹框提示工具函数
      showText (alertText) {
        this.showTip = true
        this.alertText = alertText
      },

      // 登录验证
      async login () {
        let result
        // 短信验证模式
        if (this.loginWay) {
          const {phoneTrue, phone, code} = this
          if (!this.phoneTrue) {
            // 手机号码格式错误
            this.showText('手机号码格式错误')
            return
          } else if (!/^\d{6}$/.test(code)) {
            // 验证码必须是6位
            this.showText('验证码必须是6位')
            return
          }
          // 发送ajax请求验证登录
          result = await reqSmsLogin(phone, code)
        } else { // 密码验证
          const {name, pwd, captcha} = this
          if (!this.name) {
            // 必须输入手机/邮箱/用户名
            this.showText('必须输入手机/邮箱/用户名')
            return
          } else if (!this.pwd) {
            // 必须输入密码
            this.showText('必须输入密码')
            return
          } else if (!this.captcha) {
            // 必须输入图形验证码
            this.showText('必须输入图形验证码')
            return
          }
          // 发送ajax请求验证登录
          result = await reqPwLogin({name, pwd, captcha})
        }

        // 点击登录停止倒计时
        if (this.countDown) {
          this.countDown = 0
          clearInterval(this.intervalId)
          this.intervalId = 0
        }

        // 统一验证登录
        if (result.code === 0) { // 登录成功
          const user = result.data
          // 将user保存到vuex的state中
          this.$store.dispatch('getUserInfo', user)
          // 跳转到个人中心界面
          this.$router.replace('/person')
        } else if (result.code === 1) { // 登录失败
          // 刷新图形验证码
          this.newCaptcha()
          // 提示错误信息
          const msg = result.msg
          this.showText(msg)
        }
      },

      // 关闭弹框
      closeTip () {
        this.showTip = false
        this.alertText = ""
      },

      // 刷新图形验证码
      newCaptcha () {
        // 每次刷新事件，从而达到切换图片效果
        this.$refs.captcha.src = "http://localhost:4000/user/captcha?time=" + Date.now()
      }

    },
    components: {
      AlertTip
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login_container
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 200
    width 100%
    height 100%
    background #f9f9f9
    .login
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #82b5d4
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #82b5d4
              font-weight 700
              border-bottom 2px solid #82b5d4
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                box-shadow 0 0 8px 3px #dde
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                height 40px
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background #fff
              .phoneClass
                color black
              .clickClass
                color #ccc
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #82b5d4
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .5s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #82b5d4
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #82b5d4
            color #fff
            text-align center
            font-size 18px
            font-weight bold
            line-height 42px
            border 0
          .el-button
            padding 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
