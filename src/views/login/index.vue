<template>
  <div class="login-container">

    <div class="bg"><img src="../../assets/img/bg4.png" alt="">

    </div>
    <div class="forms">
      <el-form
        v-show="loginForm.grant_type == 'password'"
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">托菲斯</h3>
        </div>
        <el-form-item prop="account">
          <img class="icon" src="../../assets/img/1.png" alt="">
          <el-input
            ref="account"
            v-model="loginForm.account"
            placeholder="请输入用户名"
            name="account"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item prop="password">
          <img class="icon" src="../../assets/img/2.png" alt="">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入你的密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item prop="googleCode">
          <img class="icon" src="../../assets/img/3.png" alt="">

          <el-input
            ref="googleCode"
            v-model="loginForm.googleCode"
            placeholder="请输入你的谷歌验证码"
            name="googleCode"
            tabindex="2"
            autocomplete="on"
            @keyup.enter.native="handleLogin"
          />
          <!-- <img class="codeImg" :src="codeImg" alt="" @click="getImageFn"> -->

        </el-form-item>
        <!-- <div v-show="loginForm.grant_type == 'password'" class="isGet" @click="isGet = !isGet"> <img
          :src="isGet ? require('../../assets/img/7.png') : require('../../assets/img/6.png')"
          alt=""
        > 记住账号密码</div> -->
        <el-button :loading="loading" type="primary" class="btn" @click.native.prevent="handleLogin">登录</el-button>
        <div class="codeCla">
          <!-- <el-button type="text" @click="loginForm.grant_type = 'mobile'">手机号登录</el-button> -->

        </div>
        <!-- <el-button class="btn2" type="text" @click="openDialog(0)">还没绑定谷歌验证码</el-button> -->

      </el-form>
      <el-form
        v-show="loginForm.grant_type == 'mobile'"
        ref="loginForm2"
        :model="loginForm"
        :rules="loginRules2"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >

        <div class="title-container">
          <h3 class="title">托菲斯</h3>
        </div>

        <el-form-item v-show="loginForm.grant_type == 'mobile'" prop="mobile">
          <img class="icon" src="../../assets/img/10.png" alt="">
          <el-input
            ref="mobile"
            v-model="loginForm.mobile"
            placeholder="请输入手机号"
            name="mobile"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item v-show="loginForm.grant_type == 'mobile'" prop="verifyCode">
          <img class="icon" src="../../assets/img/9.png" alt="">
          <el-input
            ref="verifyCode"
            v-model="loginForm.verifyCode"
            maxlength="6"
            placeholder="请输入谷歌验证码"
            name="verifyCode"
            type="text"
            @keyup.enter.native="handleLogin"
          />
          <!-- <el-button class="getCode2" type="primary" @click="loginGetCode">{{ valiBtn2 || '获取验证码' }}</el-button> -->

        </el-form-item>

        <!-- <div class="isGet" @click="isGet = !isGet"> <img
          :src="isGet ? require('../../assets/img/7.png') : require('../../assets/img/6.png')"
          alt=""
        > 记住手机号</div> -->
        <el-button :loading="loading" type="primary" class="btn" @click.native.prevent="handleLogin">登录</el-button>
        <div class="codeCla">
          <el-button type="text" @click="loginForm.grant_type = 'password'">用户名登录</el-button>

        </div>
        <!-- <el-button class="btn2" type="text" @click="openDialog(0)">还没绑定谷歌验证码</el-button> -->

      </el-form>

    </div>

    <el-dialog :close-on-click-modal="false" title="绑定Google验证" :visible.sync="showDialog" width="800px">

      <el-form class="showDialog">
        <el-form-item label="密钥二维码" label-width="120px">
          <div id="qrcodejs2" ref="qrcodejs2" />

        </el-form-item>
        <el-form-item label="密钥" label-width="120px">
          <el-input v-model="detail.secret" type="text" disabled />
          <span class="setCla" @click="copyText">复制</span>
        </el-form-item>
        <el-form-item label="账号" label-width="120px">
          <el-input v-model="detail.account" type="text" disabled placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="detail.password" type="password" show-password placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="Google验证码" label-width="120px">
          <el-input v-model="detail.googleCode" type="text" placeholder="请输入Google验证码" />
        </el-form-item>
        <!-- <el-form-item label="验证码" label-width="120px">
          <el-input type="text" v-model="detail.phoneVrifyCode" placeholder="请输入验证码" />
          <span class="setCla" @click="sendPhoneVerifyCodeFn()">{{ valiBtn || '获取验证码' }}</span>

        </el-form-item> -->

      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDialog = false">取消</el-button>
          <!-- <el-button type="primary" :loading="loading2" @click="bindGoogle">
            绑定Google验证
          </el-button> -->
        </span>

      </template>

    </el-dialog>

  </div>
</template>

<script>
import SocialSign from './components/SocialSignin'
import { generateUUID, encryption } from '@/filters/other'
import QRCode from 'qrcodejs2'

export default {
  name: 'Login',
  components: { SocialSign },

  data() {
    const validateaccount = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('请正确输入你的密码'))
      } else {
        callback()
      }
    }
    const validatecode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请正确输入你的图形验证码'))
      } else {
        callback()
      }
    }

    const validateVerifyCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请正确输入你的短信验证码'))
      } else {
        callback()
      }
    }
    const validateMobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请正确输入你的手机号'))
      } else {
        callback()
      }
    }

    return {
      baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
      codeImg: null,
      isGet: false,
      disabled: false,
      qrCode: '',
      valiBtn: '',
      disabled2: false,
      valiBtn2: '',
      detail: {},
      countryArr: [],
      loginForm: {
        account: '',
        mobile: '',
        password: '',
        grant_type: 'password',
        googleCode: '',
        randomStr: '',
        scope: 'server'
      },
      loginRules: {
        account: [{ required: true, trigger: 'blur', validator: validateaccount }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        code: [{ required: true, trigger: 'blur', validator: validatecode }]

      },
      loginRules2: {
        verifyCode: [{ required: true, trigger: 'blur', validator: validateVerifyCode }],
        mobile: [{ required: true, trigger: 'blur', validator: validateMobile }]

      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      loading2: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    this.$store.dispatch('user/logout')
    if (localStorage.getItem('isGet')) {
      this.loginForm.password = localStorage.getItem('agentPassword')
      this.loginForm.account = localStorage.getItem('nickName')
      this.isGet = localStorage.getItem('isGet')
    } else {
      localStorage.removeItem('agentPassword')
    }
  },
  mounted() {
    if (this.loginForm.account === '') {
      this.$refs.account.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    this.getImageFn()
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    initQrCode(URL) {
      if (this.qrcode) {
        this.qrcode.clear() // 清除之前的二维码
        this.qrcode.makeCode(URL) // 生成新的二维码
      } else {
        this.qrcode = new QRCode(this.$refs.qrcodejs2,
          { text: URL, width: 200, height: 200 })
      }
    },
    async openDialog(type) {
      if (!this.loginForm.account) {
        this.$message.error('请先输入账号')
        return
      }

      const detail = await this.$axios.get('/agent/common/createGoogleScret/' + this.loginForm.account)
      this.qrCode = encodeURI(detail.qrCode)

      console.log(detail)

      this.detail = detail
      if (detail.googleStatus) {
        if (!type) {
          this.$message.success('您已完成Google绑定')
        }
      } else {
        this.detail.account = this.loginForm.account
        this.showDialog = true
        this.$nextTick(() => {
          this.initQrCode(detail.qrCode)
        })
      }
      return detail.googleStatus
    },
    async bindGoogle() {
      this.loading2 = true
      const obj = JSON.parse(JSON.stringify(this.detail))

      const basicAuth = 'Basic ' + window.btoa('agent:agent')
      sessionStorage.setItem('basicAuth', basicAuth)
      let encPassword = obj.password
      // 密码加密
      encPassword = encryption(obj.password, 'thanks,pig4cloud')
      obj.password = encPassword
      await this.$axios.post('/agent/common/verifyGoogleScret', obj).then(() => {
        this.loading2 = false

        this.detail = {}
        this.showDialog = false
        this.$message.success('绑定Google验证成功')
      }).catch((e) => {
        this.loading2 = false
      })
    },
    async getImageFn() {
      this.loginForm.randomStr = generateUUID()
      this.codeImg = `${this.baseURL}/code?randomStr=${this.loginForm.randomStr}`
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async handleLogin() {
      // if (this.loginForm.grant_type == 'password') {
      //   const isBind = await this.openDialog(1)
      //   if (!isBind) {
      //     return
      //   }
      // }

      this.$refs[this.loginForm.grant_type == 'password' ? 'loginForm' : 'loginForm2'].validate(valid => {
        if (valid) {
          this.loading = true
          const obj = JSON.parse(JSON.stringify(this.loginForm))
          // if (this.loginForm.grant_type == 'password') {
          //   const basicAuth = 'Basic ' + window.btoa('agent:agent')
          //   sessionStorage.setItem('basicAuth', basicAuth)
          //   let encPassword = obj.password
          //   // 密码加密
          //   encPassword = encryption(obj.password, 'thanks,pig4cloud')
          //   obj.password = encPassword
          // }
          console.log(obj)

          this.$store.dispatch('user/login', obj)
            .then(() => {
              if (this.loginForm.account) {
                localStorage.setItem('nickName', this.loginForm.account)
              }
              if (this.loginForm.mobile) {
                localStorage.setItem('mobile', this.loginForm.mobile)
              }
              if (this.isGet) {
                localStorage.setItem('isGet', this.isGet)
              } else {
                localStorage.removeItem('isGet')
              }
              localStorage.setItem('agentPassword', this.loginForm.password)

              this.$router.push({ path: this.redirect || '/layout', query: this.otherQuery })

              this.loading = false
            })
            .catch((e) => {
              this.loading = false
              if (e.data.msg == '验证码不合法') {
                this.getImageFn()
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },

    copyText() {
      const inputDom = document.createElement('textarea') // js创建一个文本框
      document.body.appendChild(inputDom) // 将文本框暂时创建到实例里面
      inputDom.value = this.detail.secret // 将需要复制的内容赋值到创建的文本框中
      inputDom.select() // 选中文本框中的内容
      inputDom.focus()
      document.execCommand('copy') // 执行复制操作
      document.body.removeChild(inputDom) // 最后移出
      this.$message.success('复制成功')
    },

    async loginGetCode() {
      if (this.disabled2) {
        return
      }
      const data = await this.$axios.get('/agent/mobile/' + this.loginForm.mobile)
      console.log(data)
      if (data == true) {
        this.tackBtn2()
      } else {
        this.$message.error(data.msg)
      }
    },
    tackBtn2() {
      // 验证码倒数60秒
      let time = 120
      const timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer)
          this.valiBtn2 = '获取验证码'
          this.disabled2 = false
        } else {
          this.disabled2 = true
          this.valiBtn2 = time + '秒后重试'
          time--
        }
      }, 1000)
    },
    async sendPhoneVerifyCodeFn() {
      if (this.disabled) {
        return
      }
      await this.$axios.post('/google/sendPhoneVerifyCode/tab', {
        sendType: 'SEND_TYPE_GOOGLE_BINDINGVERIFY',
        account: this.loginForm.account
      })
      this.tackBtn()
    },
    tackBtn() {
      // 验证码倒数60秒
      let time = 120
      const timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer)
          this.valiBtn = '获取验证码'
          this.disabled = false
        } else {
          this.disabled = true
          this.valiBtn = time + '秒后重试'
          time--
        }
      }, 1000)
    }
  }

}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: #333;
  }
}

.areaCode {
  position: absolute;
  right: 0;
  top: 0;
  width: 160px;
  border-left: 1px solid #eee;

  .el-select {
    width: 100% !important;

  }

  .el-input {
    width: 100% !important;
  }
}

/* reset element-ui css */
.login-container {

  .login-form {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: #333;
        height: 47px;
        font-size: 14px;

        caret-color: #333;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px #fff inset !important;
          -webkit-text-fill-color: #333 !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      color: #333;

      .icon {
        width: 20px;
        vertical-align: middle;
        margin-left: 14px;
        margin-top: -4px;
      }
    }
  }

}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #333;

.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;

  display: flex;

  .img1 {
    position: absolute;
    right: 0;
    top: 5%;
    width: 300px;
  }

  .img2 {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 150px;
  }

  .forms {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40%;
  }

  .login-form {
    position: relative;
    width: 400px;
    box-shadow: 1px 3px 10px rgba(0,0,0,.1);
    max-width: 100%;
    overflow: hidden;
    background: #fff;
    border-radius: 10px;
    padding: 40px 24px 24px;
    margin: 0 auto;
  }

  .tips {
    font-size: 14px;
    color: #333;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .codeImg {
    position: absolute;
    right: 10px;
    top: 5px;
    cursor: pointer;
    height: 40px;
    width: 80px;

  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }

    .bg {
      display: none;
    }

    .forms {
      width: 100%;
      .login-form{
        margin-left: 0;
      box-shadow:inherit;

      }
    }

    .img1 {
      top: 50px;
    }

  }
}

.btn {
  height: 44px;
  width: 100%;
  margin: 30px 0 20px;
  font-size: 16px;
  cursor: pointer;
}

.btn2 {
  height: 44px;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
}

.codeCla {
  text-align: right;
  margin-top: -10px;
}

.getCode2 {
  position: absolute;
  right: 6px;
  top: 6px;

}

.isGet {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-size: 14px;

  img {
    margin-right: 8px;
    width: 16px;
  }
}

.showDialog {
  #qrcodejs2 {
    width: 200px;
    height: 200px;
  }

  .el-input__inner {
    height: 45px;
  }

  .setCla {
    position: absolute;
    right: 0;
    color: #909399;
    display: inline-block;
    background-color: #f5f7fa;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0 20px;
    white-space: nowrap;
    top: 0;
    cursor: pointer;
    user-select: none;

  }

  .copy:active {
    opacity: 0.7;
  }
}

.bg {
  width: 60%;
  height: 100%;
  position: relative;
  .b1{
    position: absolute;
    z-index: 2;
    left: 20%;
    top:15%;
    img{
      width: 50%;
    }
  }
  .b2{
    position: absolute;
    z-index: 2;
    right: 10%;
    bottom:15%;
    img{
      width: 50%;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.floatingBox {
  position: relative;
  /*设置元素脱离文档流*/
  animation: floatUpDown 2s ease-in-out infinite;
  /*设置动画，循环播放*/
}

.floatingBox2 {
  position: relative;
  /*设置元素脱离文档流*/
  animation: floatUpDown2 2s ease-in-out infinite;
  /*设置动画，循环播放*/
}
/*动画部分，使用关键词@keyframes来定义动画*/
@keyframes floatUpDown {
  0% {
    top: 0;
    /*在起始状态时让元素位于顶部*/
  }

  50% {
    top: 10px;
    /*在50%时让元素向下浮动20像素*/
  }

  100% {
    top: 0;
    /*在结束状态时让元素回到原来位置*/
  }
}
@keyframes floatUpDown2 {
  0% {
    top: 10px;
    /*在起始状态时让元素位于顶部*/
  }

  50% {
    top: 0;
    /*在50%时让元素向下浮动20像素*/
  }

  100% {
    top: 10px;
    /*在结束状态时让元素回到原来位置*/
  }
}
</style>
