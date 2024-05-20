<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <!-- <img class="img5" src="../../assets/img/5.png" alt=""> -->

    <breadcrumb
      id="breadcrumb-container"
      :permission_routes="permission_routes"
      class="breadcrumb-container"
    />

    <div class="right-menu">
      <transaction-msg></transaction-msg>
      <!-- <template v-if="device !== 'mobile'">
        <error-log class="errLog-container right-menu-item hover-effect" />

        <el-tooltip content="锁屏" effect="dark" placement="bottom">
          <div class="suoImg">
            <img src="../../assets/img/12.png" alt="" @click="closeFn" />
          </div>
        </el-tooltip>
        <el-tooltip content="全屏" effect="dark" placement="bottom">
          <screenfull id="screenfull" class="right-menu-item hover-effect" />
        </el-tooltip>

        <el-tooltip content="版面修改" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template> -->

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <div>
            <img src="../../assets/img/logo2.png" class="user-avatar" />
            <span class="nickName">{{ nickName }}</span>
          </div>

          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="showDialog = true">
            <span style="display: block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      title="修改密码"
      :visible.sync="showDialog"
      width="800px"
      append-to-body
    >
      <el-form class="showDialog">
        <el-form-item label="账号" label-width="120px">
          <el-input v-model="nickName" type="text" disabled placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="pwd" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="确认密码" label-width="120px">
          <el-input
            v-model="pwd2"
            type="password"
            placeholder="请输入确认密码"
          />
        </el-form-item>
        <el-form-item label="谷歌密钥" label-width="120px">
          <el-input
            v-model="googleSecret"
            type="text"
            placeholder="请输入谷歌密钥"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="setPwd">
            修改密码
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import TransactionMsg from "@/components/transactionMsg/TransactionMsg.vue";

export default {
  components: {
    TransactionMsg,
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search,
  },
  props: ['permission_routes'],
  data() {
    return {
      pwd: '',
      pwd2: '',
      showDialog: false,
      nickName: '',
      googleSecret: '',
      account: '',
    }
  },
  computed: {
    ...mapGetters(['device', 'sidebar']),
  },
  created() {
    this.nickName = localStorage.getItem('nickName')
    if (localStorage.getItem('isLock') == 'true') {
      this.closeFn()
    }
  },
  methods: {
    closeFn() {
      this.$store.commit('common/updateisLock', 'true')
      // localStorage.setItem('isLock','true' )
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    async setPwd() {
      if (!this.pwd || !this.pwd2) {
        this.$message.error('请输入密码')
        return
      }
      if (this.pwd != this.pwd2) {
        this.$message.error('两次密码不一致')
        return
      }
      await this.$axios.post('/topAdmin/edit', {
        account: this.nickName,
        password: this.pwd,
        googleSecret: this.googleSecret,
        status: 1,
      })
      this.logout()
    },
  },
}
</script>

<style lang="scss" scoped>
.img5 {
  width: 30px;
  float: left;
  margin-top: 10px;
  margin-left: 10px;
}

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    display: flex;
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 40px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 10px;
          vertical-align: middle;
          margin-right: 6px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}

.nickName {
  font-size: 14px;
}
.suoImg {
  height: 100%;
  display: inline-block;
  vertical-align: top;
  padding: 0 5px;
  cursor: pointer;
  img {
    width: 26px;
    vertical-align: middle;
  }
}
.suoImg:hover {
  background: rgba(0, 0, 0, 0.025);
}
</style>
