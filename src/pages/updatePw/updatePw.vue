<template>
  <div class="update_pw">
    <span class="iconfont icon-zuo" @click="$router.replace('/userInfo')"></span>
    <div class="title">密码修改</div>
    <form class="form">
      <div class="show_pwd">
        <span class="iconfont icon-icon-eye-open" v-if="showPw" @click="showPw = !showPw"></span>
        <span class="iconfont icon-icon-eye-close" v-else @click="showPw = !showPw"></span>
      </div>
      <div class="form-group">
        <span class="group-title">旧密码</span>
        <span class="iconfont icon-mima1"></span>
        <input type="text" class="form-control" :class="{mistake: showMistake === 1}" placeholder="输入你的旧密码" v-model="oldPassword" v-if="showPw">
        <input type="password" class="form-control" :class="{mistake: showMistake === 1}" placeholder="输入你的旧密码" v-model="oldPassword" v-else>
        <span class="name_tip" v-if="showMistake === 1">旧密码不能为空！</span>
      </div>
      <div class="form-group">
        <span class="group-title">新密码</span>
        <span class="iconfont icon-mima2"></span>
        <input type="text" class="form-control" :class="{mistake: showMistake === 2}" placeholder="输入新密码6-20位" v-model="newPassword" v-if="showPw">
        <input type="password" class="form-control" :class="{mistake: showMistake === 2}" placeholder="输入新密码6-20位" v-model="newPassword" v-else>
        <span class="phone_tip" v-if="showMistake === 2">新密码格式为6-20位</span>
      </div>
      <div class="form-group">
        <span class="group-title">确认密码</span>
        <span class="iconfont icon-mima2"></span>
        <input type="text" class="form-control" :class="{mistake: showMistake === 3}" placeholder="输入新密码6-20位" v-model="rNewPassword" v-if="showPw">
        <input type="password" class="form-control" :class="{mistake: showMistake === 3}" placeholder="输入新密码6-20位" v-model="rNewPassword" v-else>
        <span class="phone_tip" v-if="showMistake === 3">新密码格式为6-20位</span>
      </div>
      <input type="button" class="remake" value="重置" @click="remakeInput">
      <input type="button" class="update_yes" v-if="updateBtn" value="确认修改" @click="updateUser">
      <input type="button" class="update_no" v-else value="确认修改">
    </form>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import { Toast } from "mint-ui"
  import { reqUpdateUserPw } from "../../api/index.js"
  export default {
    data () {
      return {
        oldPassword: '', // 旧密码
        newPassword: '', // 新密码
        rNewPassword: '', // 重输新密码
        showPw: false, // 是否显示密码
        showMistake: 0 // 显示错误提示
      }
    },
    computed: {
      ...mapState(['userInfo']),
      // 更新按钮
      updateBtn () {
        const {oldPassword, newPassword, rNewPassword} = this
        return oldPassword.length > 5 && oldPassword.length < 21
          && newPassword.length > 5 && newPassword.length < 21
          && rNewPassword.length > 5 && rNewPassword.length < 21
      },
    },
    methods: {
      // 重置
      remakeInput () {
        this.oldPassword = ''
        this.newPassword = ''
        this.rNewPassword = ''
      },
      async updateUser () {
        const {oldPassword, newPassword, rNewPassword} = this
        const id = this.userInfo._id
        if (oldPassword.length > 5 && oldPassword.length < 21
          && newPassword.length > 5 && newPassword.length < 21
          && rNewPassword.length > 5 && rNewPassword.length < 21) { // 格式正确
          if (newPassword === rNewPassword) { // 验证新密码是否一样
            console.log(id, oldPassword, newPassword)
            // 一样则发送更改密码请求
            const result = await reqUpdateUserPw({id, oldPassword, newPassword})
            console.log(result)
            if (result.code === 0) {
              Toast({
                message: result.msg,
                iconClass: 'iconfont icon-zhengque',
                duration: 1000
              });
              // 更新vuex中userInfo数据
              this.$store.dispatch("updatePwd")
              // 一段时间跳转到登录页面
              setTimeout(() => {
                window.location.href = "http://localhost:8080/#/login"
                // this.$router.replace("/login")
              }, 1000)
            } else {
              Toast({
                message: result.msg,
                iconClass: 'iconfont icon-icon-test',
                duration: 2000
              });
            }
          } else { // 新密码输入不一致
            Toast({
              message: '新密码输入不一致',
              iconClass: 'iconfont icon-icon-test',
              duration: 2000
            });
          }
        }
      }
    },
    watch: {
      oldPassword () {
        if (!this.oldPassword) { // 输入之后才进行验证
          this.showMistake = 1
        } else {
          this.showMistake = 0
        }
      },
      newPassword () {
        if (this.newPassword.length < 6) { // 输入之后才进行验证
          this.showMistake = 2
        } else {
          this.showMistake = 0
        }
      },
      rNewPassword () {
        if (this.rNewPassword.length < 6) { // 输入之后才进行验证
          this.showMistake = 3
        } else {
          this.showMistake = 0
        }
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/updatePw.styl"
</style>
