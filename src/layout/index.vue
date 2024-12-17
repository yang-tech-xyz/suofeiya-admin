<template>
  <div v-loading="loading" :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar
      v-if="permission_routes && permission_routes.length"
      class="sidebar-container"
      :permission_routes="permission_routes"
    />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar :permission_routes="permission_routes" />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <!-- <right-panel v-if="showSettings">
        <settings />
      </right-panel> -->
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import { getUserPerms } from '@/api/user'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
  },
  mixins: [ResizeMixin],
  data() {
    return {
      permission_routes: [],
      loading: false,
    }
  },
  created() {
    this.getUserPermsFn()
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      showSettings: (state) => state.settings.showSettings,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      }
    },
  },
  methods: {
    getUserPermsFn() {
      this.permission_routes = [
        {
          id: 1,
          name: '功能',
          path: '/commer',
          children: [
            {
              id: 1,
              name: '用户列表',
              path: '/layout',
            },
            {
              id: 2,
              name: '用户资产',
              path: '/topAccount/getPage',
            },
            {
              id: 3,
              name: '资产流水',
              path: '/topAccountTx/getPage',
            },
            {
              id: 4,
              name: '算力配置',
              path: '/powerConfig',
            },
            {
              id: 4,
              name: '算力订单',
              path: '/powerOrderGetPage',
            },
            {
              id: 13,
              name: '算力收益明细',
              path: '/topPowerOrderIncomeGetPage',
            },
            {
              id: 14,
              name: '算力层级收益明细',
              path: '/topPowerSharingIncomeGetPage',
            },
            {
              id: 5,
              name: '理财管理',
              path: '/topStoreOrder/getList',
            },
            {
              id: 6,
              name: '理财订单管理',
              path: '/topStoreOrder/getPage',
            },
            {
              id: 12,
              name: '理财收益明细',
              path: '/getStoreIncomePage',
            },

            {
              id: 7,
              name: '币种管理',
              path: '/token/getList',
            },
            {
              id: 8,
              name: '链管理',
              path: '/chain/getList',
            },
            {
              id: 9,
              name: '链-币种管理',
              path: '/tokenChain/getList',
            },

            {
              id: 10,
              name: '充提管理',
              path: '/transaction',
            },
            {
              id: 12,
              name: '出入金日统计',
              path: '/transactionDayStatic',
            },
            {
              id: 15,
              name: '出入金月统计',
              path: '/transactionMonthStatic',
            },
            
            {
              id: 11,
              name: '管理员管理',
              path: '/userList',
            },
            {
              id: 14,
              name: '统计',
              path: '/analyse',
            },
            {
              id: 12,
              name: '公告管理',
              path: '/showList',
            },
            {
              id: 12,
              name: 'BTCF销毁管理',
              path: '/BTCFBurning',
            },
                                                                                                                                                                                                                     
          ],
        },
      ]
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
