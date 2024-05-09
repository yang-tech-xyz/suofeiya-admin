<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">

    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in levelList" :key="item.title">
        <span v-if="item.redirect" class="no-redirect">{{ item.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
export default {
  props: ['permission_routes'],
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {

    getBreadcrumb() {
      this.levelList = []
      console.log(this.permission_routes, 111)
      this.permission_routes.forEach(element => {
        if (element.children) {
          element.children.forEach(element2 => {
            if (this.$route.path == element2.url) {
              this.levelList = [
                {
                  title: element.text,
                  redirect: element.url
                },
                {
                  title: element2.text,
                  path: element.url

                }
              ]
            // console.log(element.text)
            // console.log(element2.text)
            }
          })
        }
      })
    },

    pathCompile(path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
