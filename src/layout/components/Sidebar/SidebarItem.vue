<template>
  <div>

    <el-submenu ref="subMenu" :index="item.name + ''" popper-append-to-body>
      <template slot="title">
        <i :class="item.activeIcon ? 'el-icon-folder-opened' : 'el-icon-folder'" style="color:#ffffff" />
        <!-- <i :class="item.meta && item.meta.icon"></i> -->
        <span style="color:#ffffff">{{ item.name }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="iteam, index in item.children"
          :key="index"
          class="nest-menu"
          :class="iteam.path == $route.path ? 'active' : ''"
          :index="iteam.id + ''"
          style="color:#ffffff"
          @click="goTo(iteam.path)"
        >{{
          iteam.name }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

  </div>
</template>

<script>

export default {
  name: 'SidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },

    isCollapse: {
      type: Boolean,
      default: false
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.icons {
  padding-left: 15px;

}
</style>
