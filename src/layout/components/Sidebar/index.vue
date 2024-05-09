<template>
  <div class="silbe" :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :default-openeds="openeds"
        :collapse-transition="true"
        mode="vertical"
      >
        <!-- <el-menu-item index="2" :class="'/layout' == $route.path ? 'active' : ''" @click="goTo('/layout')">
          <i class="el-icon-menu" style="color:#ffffff" />
          <span slot="title" style="color:#ffffff"></span>
        </el-menu-item> -->
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  props: ['permission_routes'],

  data() {
    return {
      openeds: ['功能']
    }
  },
  created() {
  },
  created() {
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      let isActive = ''
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      this.permission_routes.forEach(e => {
        e['activeIcon'] = false
        if (e.children && e.children.length) {
          e.children.forEach((r) => {
            if (r.path == path) {
              isActive = r.id + ''
              e['activeIcon'] = true
            }
          })
        }
      })
      return isActive
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      console.log(this.activeMenu)
      console.log(this.permission_routes)
      return !this.sidebar.opened
    }
  },
  methods: {

  }
}
</script>

<style lang="scss"  >

.silbe{
  .active {
    background-color: #ffffff !important;
    color: #6DC1C2 !important;
    position: relative;
    span{
    color: #6DC1C2 !important;

    }
    i{
    color: #6DC1C2 !important;

    }

  }
  .active::before {
    content: '';
    display: block;
    position: absolute;
    width: 4px;
    height: 26px;
    background: #6DC1C2;
    right: 0;
    top: 16px;
    border-radius: 10px;
  }
}

</style>
