<template>
  <div id="app">
    <router-view />
    <Lock v-if="isLock == 'true'" />
  </div>
</template>

<script>

import lockMixin from '@/mixins/lock'
export default {
  name: 'App',
  mixins: [lockMixin]

}
</script>
<style lang="scss">
.el-menu--collapse {
  padding: 0 !important;

}

.seryBg {
  width: 800px;

  .el-table thead tr th {
    background: #f5f7fa;
  }
}

.messageIndex {
  z-index: 3000 !important;
}

.scrollbar-wrapper .el-tooltip {
  padding: 0 15px !important;

}

.el-submenu {
  margin-left: 0;
}

.el-menu--collapse .el-submenu [class^=el-icon-] {
  margin-left: 15px;
}

.mce-statusbar {
  opacity: 0;
}

.treeInput {
  display: inline-block;
}

.el-menu-item-group__title {
  padding: 0 !important;
}

.el-image-viewer__close {
  color: #fff;
}

.el-menu--collapse {
  padding: 0 12px;
}

.chooseOne {
  .el-table__header-wrapper {
    .el-checkbox__inner {
      display: none;
    }
  }
}

.el-popover--plain {
  max-height: 500px;
  box-sizing: border-box;
  overflow-y: scroll;
  margin-bottom: 0 !important;
}

.ovsOne {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 30upx;
}

.ovs {
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-pagination {
  margin-top: 20px;
}

.noHide {
  display: none !important;
  opacity: 0 !important;
  height: 0 !important;
  width: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
}

.el-form-item__content {
  position: relative;

  .el-input__inner {
    padding-right: 18px;
  }

  .el-input__suffix {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.addOrEdit {
  .el-select {
    width: 100%;
  }

  .el-input-number {
    width: 200px;
  }
}

.el-upload-hide {
  .el-upload--picture-card {
    display: none;
  }
}

.el-overlay-dialog .el-dialog__body {
  text-align: center;

  .PreviewImage {
    height: 540px;
  }
}

// 单元格样式
.el-table__cell {
  position: static !important; // 解决el-image 和 el-table冲突层级冲突问题
}

.el-upload-video-hide .el-upload-list__item {
  display: none !important;
}

.is-light {
  max-height: 700px;
  overflow-y: scroll;
}

.el-dialog {
  border-radius: 10px;
}

/* 垂直滚动条样式 */
/* 宽度 */
::-webkit-scrollbar {
  width: 12px;
}

/* 背景色 */
::-webkit-scrollbar-track {
  background-color: #fff;
}

/* 滑块颜色 */
::-webkit-scrollbar-thumb {
  background-color: #fff;
}

/* 水平滚动条样式 */
/* 高度 */
::-webkit-scrollbar {
  height: 12px;
  border-radius: 50px;
}

/* 背景色 */
::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 50px;

}

/* 滑块颜色 */
::-webkit-scrollbar-thumb {
  background-color: #dfe6ec;
  border-radius: 50px;
}

.el-dialog__body {
  max-height: 700px;
  overflow-y: scroll;
}

.el-dialog__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-dialog {
  margin-top: 0 !important;
}

#app .sidebar-container .el-submenu .el-menu-item.active {
  background-color: #ffffff !important;
  color: #6DC1C2 !important;
  position: relative;
}

.el-menu-item:hover,
.el-menu-item:focus {
  background: #40c4c5 !important;
}

#app .sidebar-container .el-submenu .el-menu-item.active::before {
  content: '';
  display: block;
  position: absolute;
  width: 4px;
  height: 26px;
  background: #6DC1C2;
  right: 0;
  top: 14px;
  border-radius: 10px;
}

.el-menu-item.active input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}

input::-webkit-outer-spin-button {
  -webkit-appearance: none !important;
}

.el-submenu__title i {
  color: #fff;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/*在Chrome下移除input[number]的上下箭头*/
::-webkit-outer-spin-button,
::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none !important;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none !important;
}

/*在firefox下移除input[number]的上下箭头*/
input {
  -moz-appearance: textfield;
}

input[type="number"] {
  -moz-appearance: textfield;
}</style>
