<template>
  <div class="amap">
    <!-- 地图容器 -->
    <div ref="amap" class="amap_view" />
    <!-- 搜索栏 -->
    <el-input id="map_input" v-model.trim="searchVal" placeholder="请输入关键字" size="small" />
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  setup() {
    const amap = ref(null)
    const searchVal = ref('')
    let map = null

    onMounted(() => {
      loadAMap()
    })

    onBeforeUnmount(() => {
      map && map.destroy()
      map = null
    })

    const loadAMap = () => {
      AMapLoader.load({
        key: 'e5761f5df1d30e2ffedee67d693ff590' /* Web端JS API key */,
        version: '2.0',
        plugins: ['AMap.Scale', 'AMap.ToolBar']
      })
        .then(AMap => {
          initMap(AMap)
        })
        .catch(e => {
          console.error(e)
        })
    }

    const initMap = AMap => {
      map = new AMap.Map(amap.value, {
        resizeEnable: true /* 城市定位 */,
        zooms: [1, 18],
        zoom: 14
      })

      // 比例尺
      map.addControl(new AMap.Scale())
      // 工具条
      map.addControl(new AMap.ToolBar())

      // 标记
      const maker = new AMap.Marker({
        title: '长安街1号',
        position: map.getCenter()
      })
      map.add(maker)

      // 关键字搜索
      AMap.plugin(['AMap.PlaceSearch', 'AMap.AutoComplete'], function() {
        const auto = new AMap.AutoComplete({ input: 'map_input' })
        const placeSearch = new AMap.PlaceSearch({ map: map }) // 构造地点查询类
        // 注册监听，当选中某条记录时会触发
        auto.on('select', function(e) {
          placeSearch.setCity(e.poi.adcode)
          placeSearch.search(e.poi.name) // 关键字查询查询
        })
      })
    }

    return { amap, searchVal }
  }
}
</script>

<style lang="scss" scoped>
.amap {
    width: 100%;
    height: calc(100vh - 284px);
    border: 1px solid #ccc;
    position: relative;

    .amap_view {
        width: 100%;
        height: 100%;
    }
    .el-input {
        width: 256px;
        position: absolute;
        top: 10px;
        right: 10px;
    }
}
</style>
