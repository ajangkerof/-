<template>
    <div class="userInfo">
      <span class="iconfont icon-zuo" @click="$router.back()"></span>
      <div class="title">用户详情</div>
      <form class="form">
        <div class="form-group">
          <span class="group-title">用户名</span>
          <span class="iconfont icon-yonghu"></span>
          <input ref="userName" type="text" class="form-control" :class="{mistake: isMistake === 1}" id="exampleInputEmail1" placeholder="name" v-model="userName">
          <span class="name_tip" v-if="isMistake === 1">用户名不能为空！</span>
        </div>
        <div class="form-group">
          <span class="group-title">电话</span>
          <span class="iconfont icon-shouji"></span>
          <input ref="phone" type="text" class="form-control" :class="{mistake: isMistake === 2}" id="exampleInputPassword1" placeholder="phone" v-model="userPhone">
          <span class="phone_tip" v-if="isMistake === 2">电话号码格式为11位（仅支持国内）！</span>
        </div>
        <input type="button" class="remake" value="重置" @click="remakeInput">
        <input type="submit" class="update" value="确认修改" @click="updateUser">
        <span class="update_pw" @click="$router.push('/updatePw')">修改密码</span>
        <span class="know">用户须知</span>
      </form>
    </div>
</template>

<script>
  import { mapState } from "vuex"
  import { Toast } from "mint-ui"
  export default {
    data () {
      return {
        userName: '',
        userPhone: '',
        isMistake: 0
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    mounted() {
      this.userName = this.userInfo.name
      this.userPhone = this.userInfo.phone
    },
    methods: {
      remakeInput () {
        this.userName = ''
        this.userPhone = ''
      },
      updateUser () {
        const id = this.userInfo._id
        const name = this.userName
        const phone = this.userPhone

        if (name) { // 判断用户名是否为空
          const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
          if (reg.test(phone)) { // 格式全部正确
            this.$store.dispatch("updateUserInfo", {id, name, phone})
              .then(() => {
                // 跳转到个人中心界面
                this.$router.replace('/person')
              })
          } else { // 手机号不合格
            Toast({
              message: '手机号不合格',
              iconClass: 'iconfont icon-icon-test'
            });
          }
        } else { // 用户名不能为空
          Toast({
            message: '用户名不能为空',
            iconClass: 'iconfont icon-icon-test'
          });
        }
      }
    },
    watch: {
      userInfo () {
        this.$nextTick(() => {
          this.userName = this.userInfo.name
          this.userPhone = this.userInfo.phone
        })
      },
      userName () {
        if (!this.userName) {
          this.isMistake = 1
        } else {
          this.isMistake = 0
        }
      },
      userPhone () {
        const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
        if (!reg.test(this.userPhone)) {
          this.isMistake = 2
        } else {
          this.isMistake = 0
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/userInfo.styl"
</style>
