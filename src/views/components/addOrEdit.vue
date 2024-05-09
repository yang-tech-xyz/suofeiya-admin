<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="dialogFormVisible"
    :before-close="closeFn"
    :append-to-body="true"
    :title="
      dataForm && dataForm.id
        ? dataObj.editAddText || '编辑'
        : dataObj.editdText || '新增'
    "
    class="addOrEdit"
    :width="dataObj.dataObjWidth || '700px'"
  >
    <el-form v-loading="loading" :model="dataForm">
      <el-form-item
        v-for="(item, idx) in dataFormArrCopy"
        v-show="dataForm.id ? !item.isItem : item.addOrEdit"
        :key="idx"
        :label="item.label"
        :label-width="dataObj.formLabelWidth || formLabelWidth"
        @click="dataFormIdx = idx"
      >
        <!-- 上传图片 -->

        <el-upload
          v-if="item.type == 'img' || item.type == 'imgArr'"
          accept=".png,.jpg"
          :before-upload="beforeAvatarUpload"
          :action="baseURL + '/admin/sys-file/upload'"
          :headers="headers"
          :on-success="
            (res) => {
              if (!dataForm[item.prop]) {
                dataForm[item.prop] = []
              }
              dataForm[item.prop].push({
                name: res.data.fileName,
                url: baseURL + res.data.url,
              })
              $forceUpdate()
            }
          "
          list-type="picture-card"
          :class="
            (dataForm[item.prop] && dataForm[item.prop].length >= item.limit) ||
            !item.addOrEdit
              ? 'el-upload-hide'
              : ''
          "
          :on-preview="handlePictureCardPreview"
          :on-remove="
            (file) => {
              dataForm[item.prop].forEach((e2, idx) => {
                if (e2.url == file.url) {
                  dataForm[item.prop].splice(idx, 1)
                  $forceUpdate()
                }
              })
            }
          "
          :disabled="!item.addOrEdit"
          :file-list="dataForm[item.prop]"
          :limit="item.limit"
        >
          <i class="el-icon-plus" />
        </el-upload>

        <!-- 上传视频 -->
        <video
          v-else-if="item.type == 'videos'"
          :src="dataForm[item.prop]"
          controls
        />
        <!-- 输入框 -->
        <div v-else-if="item.type == 'input'">
          <el-input
            v-model="dataForm[item.prop]"
            autocomplete="off"
            :placeholder="item.placeholder || item.label"
            :disabled="item.addDisabled ? true : !item.addOrEdit"
            :type="item.inputType || 'text'"
          >
            <div v-if="item.rightMark" slot="append">{{ item.rightMark }}</div>
            <div
              slot="append"
              v-if="dataObj.name == '管理员列表' && item.label == '谷歌密钥'"
            >
              <el-button type="primary" @click="getGoogleSecret">
                分配密钥
              </el-button>
            </div>
          </el-input>
        </div>
        <!-- 密码框 -->
        <el-input
          v-else-if="item.type == 'password'"
          v-model="dataForm[item.prop]"
          autocomplete="off"
          :placeholder="item.placeholder || item.label"
          type="password"
          :disabled="!item.addOrEdit"
        />

        <!-- textarea输入框 -->
        <el-input
          v-else-if="item.type == 'textarea'"
          v-model="dataForm[item.prop]"
          type="textarea"
          autocomplete="off"
          :rows="5"
          :placeholder="item.placeholder || item.label"
          :disabled="item.addDisabled ? true : !item.addOrEdit"
        />
        <!-- 数字输入框 -->
        <el-input-number
          v-else-if="item.type == 'inputNumber'"
          v-model="dataForm[item.prop]"
          :min="0"
          :max="10000000"
          :placeholder="item.placeholder || item.label"
          :disabled="!item.addOrEdit"
        />

        <div v-else-if="item.type == 'elRadio'">
          <el-radio
            v-for="(iteam, index) in item.options"
            :key="index"
            v-model="dataForm[item.prop]"
            :label="iteam.value"
            border
            @change="elRadioFn"
          >
            {{ iteam.label }}
          </el-radio>
        </div>
        <!-- 图标 -->
        <div v-else-if="item.type == 'icon'" class="chooseIcons">
          <el-popover
            placement="top-start"
            :append-to-body="false"
            width="30vw"
            trigger="click"
          >
            <div slot="reference" class="iconDiv">
              <i :class="dataForm[item.prop]" />
              <div class="iconName">{{ chooseIcons || '请选择图标' }}</div>
            </div>
            <div class="iconList">
              <i
                v-for="item in iconList"
                :key="item"
                :class="[item, 'icon']"
                style="font-size: 20px;"
                @click="setIcon(item)"
              />
            </div>
          </el-popover>
        </div>
        <!-- 日期时间单选选择器 -->
        <el-date-picker
          v-else-if="item.type == 'datetime'"
          v-model="dataForm[item.prop]"
          type="datetime"
          style="width: 100%;"
          :disabled-date="item.disabledDate"
          :disabled="item.addDisabled ? true : !item.addOrEdit"
          placeholder="选择日期时间"
          @change="
            (res) => {
              dataForm[item.prop] = filterTime(res)
            }
          "
        />

        <!-- 日期时间范围选择器 -->
        <el-date-picker
          v-else-if="item.type == 'date'"
          v-model="dataForm[item.prop]"
          type="datetimerange"
          style="width: 100%;"
          :disabled-date="item.disabledDate"
          :disabled="item.addDisabled ? true : !item.addOrEdit"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />

        <!-- 多选框 -->
        <el-checkbox-group
          v-else-if="item.type == 'checkbox'"
          v-model="dataForm[item.prop]"
        >
          <el-checkbox v-for="item in item.arr" :key="item" :label="item">
            {{ item }}
          </el-checkbox>
        </el-checkbox-group>
        <!-- 单选 -->
        <el-radio-group
          v-else-if="item.type == 'radio'"
          v-model="dataForm[item.prop]"
        >
          <el-radio
            v-for="item in item.options"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
        <!--  Switch 开关 -->
        <el-switch
          v-else-if="item.type == 'switch'"
          v-model="dataForm[item.prop]"
          :active-value="item.switchObj.activeValue"
          :inactive-value="item.switchObj.inactiveValue"
        />
        <!-- 单选下拉框 -->
        <el-select
          v-else-if="item.type == 'status'"
          v-model="dataForm[item.prop]"
          :placeholder="item.placeholder || item.label"
          :disabled="
            item.isEditDisabled ? (dataForm.id ? true : false) : !item.addOrEdit
          "
          @change="changeFn(item, dataForm[item.prop])"
        >
          <el-option
            v-for="(iteam, index) in item.options"
            :key="index"
            :label="iteam.label"
            :value="iteam.valueText || iteam.value"
          />
        </el-select>
        <!-- 多选下拉框 -->
        <el-select
          v-else-if="item.type == 'listStatus'"
          v-model="dataForm[item.prop]"
          multiple
          :placeholder="item.placeholder || item.label"
          :disabled="
            item.isEditDisabled ? (dataForm.id ? true : false) : !item.addOrEdit
          "
          @change="changeMultipleFn(item, dataForm[item.prop])"
        >
          <el-option
            v-for="(iteam, index) in item.options"
            :key="index"
            :label="iteam.label"
            :value="iteam.valueText || iteam.value"
          />
        </el-select>
        <!-- 单选选择任意一级选项 -->
        <el-cascader
          v-else-if="item.type == 'elCascader'"
          v-model="dataForm[item.prop]"
          :options="item.options"
          :props="item.defaultProps"
          filterable
          :show-all-levels="false"
          clearable
          style="width: 100%;"
        />

        <!-- 树形选择 -->
        <el-tree-select
          v-else-if="item.type == 'treeList'"
          v-model="dataForm[item.prop]"
          :data="treeList"
          :render-after-expand="false"
          placeholder="默认为一级菜单"
          :accordion="true"
          :check-strictly="true"
          :expand-on-click-node="false"
          :highlight-current="true"
        />

        <!-- 富文本 -->
        <tinymce
          v-else-if="item.type == 'quillEditor'"
          v-model="dataForm[item.prop]"
          :disabled="!item.addOrEdit"
          :height="300"
        />

        <!-- 文本 -->
        <div v-else>
          <span>{{ dataForm[item.prop] }}</span>
        </div>
      </el-form-item>
      <el-form-item
        v-if="dataObj.addUrl == 'role/addRole'"
        label="角色菜单id集"
        :label-width="formLabelWidth"
      >
        <div style="width: 100%;">
          <el-cascader
            :options="options"
            :props="propsMultiple"
            collapse-tags
            collapse-tags-tooltip
            clearable
            style="width: 100%;"
            @change="changeCascaderFn"
          />
        </div>
      </el-form-item>

      <div v-if="dataObj.name == '广告管理'">
        <div class="titleOther">广告内容</div>
        <el-form
          v-for="(iteam, idx) in contentList"
          :key="idx"
          class="langIteam"
        >
          <el-form-item label="语言选择" :label-width="formLabelWidth">
            <el-select
              v-model="iteam.lang"
              placeholder="请选择语言"
              clearable
              @visible-change="visibleChange(iteam, idx)"
            >
              <el-option
                v-for="item in iteam.sysLang"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="图片地址" :label-width="formLabelWidth">
            <el-upload
              accept=".png,.jpg"
              :before-upload="beforeAvatarUpload"
              :action="baseURL + '/admin/sys-file/upload'"
              :headers="headers"
              :on-success="
                (res) => {
                  if (!iteam.adImgUrl) {
                    iteam.adImgUrl = []
                  }
                  iteam.adImgUrl.push({
                    name: res.data.fileName,
                    url: baseURL + res.data.url,
                  })
                  $forceUpdate()
                }
              "
              list-type="picture-card"
              :class="
                iteam.adImgUrl && iteam.adImgUrl.length >= 1
                  ? 'el-upload-hide'
                  : ''
              "
              :on-preview="handlePictureCardPreview"
              :on-remove="
                (file) => {
                  iteam.adImgUrl.forEach((e2, idx) => {
                    if (e2.url == file.url) {
                      iteam.adImgUrl.splice(idx, 1)
                      $forceUpdate()
                    }
                  })
                }
              "
              :file-list="iteam.adImgUrl || []"
              :limit="1"
            >
              <i class="el-icon-plus" />
            </el-upload>
          </el-form-item>
          <el-form-item label="链接地址" :label-width="formLabelWidth">
            <el-input v-model="iteam.adLinkUrl" placeholder="请输入链接地址" />
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth">
            <el-button
              v-if="
                idx == contentList.length - 1 &&
                contentList.length < dataObj.sysLang.length
              "
              type="primary"
              icon="el-icon-plus"
              @click="addLang"
            >
              添加其他语言广告
            </el-button>
            <el-button
              v-if="contentList.length > 1"
              type="danger"
              icon="el-icon-delete"
              @click="contentList.splice(idx, 1)"
            >
              删除此语言广告
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          @click="
            dialogFormVisible = false
            $emit('closeAddOrUpdateVisible')
          "
        >
          取消
        </el-button>
        <el-button type="primary" @click="dataFormSubmitHandle">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { getToken } from '@/utils/auth'
import Tinymce from '@/components/Tinymce'
import { elementIcons } from '../components/js/icon'

export default {
  components: {
    Tinymce,
  },
  props: {
    formArr: { type: Array, default: [] },
    dataObj: { type: Object, default: {} },
    treeList: { type: Array, default: [] },
  },
  data() {
    return {
      baseURL: process.env.VUE_APP_BASE_API,
      headers: {
        Authorization: `${getToken()}`,
      },
      contentList: [
        {
          lang: '简体中文',
          adImgUrl: '',
          adLinkUrl: '',
          sysLang: [],
        },
      ],

      datetimerangeTime: '',
      formLabelWidth: '140px',
      dialogFormVisible: false,
      dataForm: {},

      imgList: [],
      dataFormIdx: null,
      menuIds: null,
      loading: false,

      options: [],
      propsMultiple: {
        multiple: true,
      },

      messageSendIdx: 0,
      optionsMessageSend: [],

      userChooseIcon: '',
      chooseIcons: '',
      iconList: [],
      dataFormArrCopy: [],
    }
  },
  computed: {},
  mounted() {
    this.dataFormArrCopy = JSON.parse(JSON.stringify(this.formArr))
    if (this.dataObj.name == '菜单管理') {
      this.iconList = elementIcons
    }
    if (this.dataObj && this.dataObj.getMenuList) {
      this.getMenuListFn()
    }
  },
  methods: {
    addLang() {
      this.contentList.push({
        lang: '',
        adImgUrl: '',
        adLinkUrl: '',
        sysLang: [],
      })
    },

    visibleChange(e, idx) {
      console.log(e, idx)
      const sysLang = JSON.parse(JSON.stringify(this.dataObj.sysLang))
      console.log(this.contentList)
      this.contentList.forEach((e) => {
        sysLang.forEach((e2, idx2) => {
          if (e.lang == e2.value) {
            sysLang.splice(idx2, 1)
            console.log(sysLang)
            this.contentList[idx].sysLang = sysLang
            this.$forceUpdate()
          }
        })
      })
    },
    filterTime(time) {
      console.log(time)
      var date = new Date(time)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      var s = date.getSeconds()
      s = s < 10 ? '0' + s : s
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + s
    },
    // 给icon绑定的点击事件
    setIcon(icon) {
      console.log(icon)
      this.dataFormArrCopy.forEach((e) => {
        if (e.prop == 'icon') {
          this.dataForm[e.prop] = icon
          this.$forceUpdate()
        }
      })

      this.userChooseIcon = icon // 将i的样式设为选中的样式el-icon-xxx
      this.chooseIcons = ''
    },
    disabledDate(time) {
      return time.getTime() < Date.now()
    },
    async changeFn(e, prop) {
      console.log(e, prop)

      this.$forceUpdate()
    },
    async changeMultipleFn(e, prop) {
      console.log(e, prop)
      this.$forceUpdate()
    },

    closeFn() {
      this.dialogFormVisible = false
      this.$emit('closeAddOrUpdateVisible')
    },
    elRadioFn(e) {
      if (this.dataObj.name == '菜单管理') {
        if (e == 0) {
          this.dataFormArrCopy = JSON.parse(JSON.stringify(this.formArr))
        }
        if (e == 1) {
          this.dataFormArrCopy.forEach((e) => {
            if (
              e.prop == 'icon' ||
              e.prop == 'keepAlive' ||
              e.prop == 'visible' ||
              e.prop == 'path'
            ) {
              e['addOrEdit'] = 0
              e['isItem'] = 1
            }
            if (e.prop == 'permission') {
              e['addOrEdit'] = 1
              e['isItem'] = 0
            }
          })
        }
      }
    },
    setSysLang() {
      this.contentList.forEach((e) => {
        e['sysLang'] = JSON.parse(JSON.stringify(this.dataObj.sysLang))
      })
    },

    // 初始化
    init(e) {
      console.log(e)
      if (this.dataObj.name == '广告管理') {
        this.setSysLang()
      }
      if (e) {
        this.dataForm = e
        this.dataFormArrCopy.forEach((e2, idx) => {
          if (e2.type == 'img' || e2.type == 'videos') {
            if (e[e2.prop]) {
              this.dataForm[e2.prop] = [
                {
                  name: idx,
                  url: e[e2.prop],
                },
              ]
            }
          }
        })
        if (this.dataObj.name == '广告管理' && e.contentList) {
          this.dataForm['adStartTime_adEndTime'] = [e.adStartTime, e.adEndTime]
          const sysLang = JSON.parse(JSON.stringify(this.dataObj.sysLang))
          e.contentList.forEach((e, idx) => {
            e['adImgUrl'] = [
              {
                name: idx,
                url: e.adImgUrl,
              },
            ]
            e['sysLang'] = sysLang
          })
          if (!e.contentList.length) {
            this.contentList = [
              {
                lang: '',
                adImgUrl: '',
                adLinkUrl: '',
                sysLang: sysLang,
              },
            ]
          } else {
            this.contentList = e.contentList
          }
          console.log(this.dataForm)
          this.$forceUpdate()
        }
      }

      this.dialogFormVisible = true
    },

    unique(arr) {
      return Array.from(new Set(arr))
    },
    changeCascaderFn(e) {
      let menuIds = []

      e.forEach((e1, idx) => {
        menuIds = menuIds.concat(e1)
      })
      this.menuIds = this.unique(menuIds)
    },
    getGoogleSecret() {
      this.$axios.get('/topAdmin/getGoogleSecret',{
        params:{
          account:this.dataForm.account
        }
      }).then((res) => {
        this.dataForm.googleSecret=res.msg
        console.log(res)
       
      })
    },

    // 表单提交
    async dataFormSubmitHandle() {
      const dataForm = JSON.parse(JSON.stringify(this.dataForm))
      delete dataForm.createTime
      delete dataForm.updateTime
      // 校验是否有必填
      let isItRequired = 1
      let isItRequiredText = ''
      console.log(this.dataFormArr)
      console.log(this.dataForm)
      this.dataFormArrCopy.forEach((e) => {
        if (e.type == 'img') {
          const imgArr = []
          this.dataForm[e.prop].forEach((imgUrl) => {
            imgArr.push(imgUrl.url)
          })
          dataForm[e.prop] = imgArr.join(',')
        }

        if (
          e.isItRequired &&
          !dataForm[e.prop] &&
          dataForm[e.prop] !== 0 &&
          typeof dataForm[e.prop] !== 'boolean' &&
          isItRequired
        ) {
          isItRequiredText = e.label + '不能为空'
          isItRequired = 0
          return
        }
        if (e.type == 'date') {
          if (dataForm[e.prop] && e.prop.split('_')[1]) {
            dataForm[e.prop.split('_')[0]] = this.filterTime(
              dataForm[e.prop][0],
            )
            dataForm[e.prop.split('_')[1]] = this.filterTime(
              dataForm[e.prop][1],
            )
            delete dataForm[e.prop]
          }
        }
      })

      if (!isItRequired) {
        this.$message.error(isItRequiredText)
        return
      }

      if (this.dataObj.name == '广告管理') {
        const contentList = JSON.parse(JSON.stringify(this.contentList))
        contentList.forEach((e) => {
          e.adImgUrl = e.adImgUrl ? e.adImgUrl[0].url : ''
          delete e.sysLang
        })
        dataForm['contentList'] = contentList
      }
      if (this.dataObj.listUrl == '/token/getList' && this.dataForm.id) {
        dataForm['annualInterestRate'] = dataForm.annualInterestRate / 100
      }

      const url = this.dataForm.id ? this.dataObj.editUrl : this.dataObj.addUrl
      if (!url) {
        this.$emit('closeAddOrUpdateVisible')

        return
      }

      this.loading = true
      const axiosType =
        (this.dataForm.id
          ? this.dataObj.axiosEditType || 'post'
          : this.dataObj.axiosAddType || 'post') || 'post'
      console.log(dataForm)
      this.$axios[axiosType](url, dataForm)
        .then(() => {
          this.loading = false
          this.$message({
            message: '操作成功',
            type: 'success',
          })
          this.$emit('closeAddOrUpdateVisible')
        })
        .catch((e) => {
          this.loading = false
        })
    },

    // 预览
    handlePictureCardPreview(uploadFile) {
      this.$emit('handlePictureCardPreview', uploadFile)
    },

    // 视频上传
    handleUploadVideo(res) {},
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    },

    // 获取菜单列表
    getMenuListFn() {
      this.$axios.get(this.dataObj.getMenuList, {}).then((res) => {
        this.options = res.data
      })
    },
  },
}
</script>
<style scoped lang="scss">
.videos {
  width: 146px;
  height: 146px;
  object-fit: cover;
}

.chooseIcons {
  width: 100%;
  border: 1px solid #e6ebf5;
  cursor: pointer;

  .iconList {
    width: 30vw;
    height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .icon {
    display: inline-block;
    width: 60px;
    height: 45px;
    color: #000000;
    font-size: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    line-height: 45px;
    margin: 5px;
  }

  .icon:hover {
    color: red;
    border-color: red;
  }

  .iconDiv {
    width: 100%;
    height: 50%;

    display: flex;
    flex-direction: row;
    align-items: center;

    i {
      background: #f5f7fa;
      margin-right: 10px;
      padding: 0 20px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .iconName {
    height: 36px;
    text-align: center;
  }
}

.titleOther {
  font-weight: bold;
  font-size: 16px;
  color: #333;
  margin: 26px 0 16px;

  i {
    color: #1890ff;
    font-size: 18px;
    cursor: pointer;
  }
}

.langIteam {
  margin-bottom: 20px;
  border-bottom: 1px dashed #e6ebf5;
  position: relative;

  .el-icon-remove {
    position: absolute;
    left: 40px;
    top: 9px;
    color: #1890ff;
    font-size: 18px;
    cursor: pointer;
  }
}

.langIteam:last-child {
  border-bottom: 0;
}

.rightMark {
  position: absolute;
  right: 1px;
  background: #f5f7fa;
  padding: 0 20px;
  height: 95%;
  top: 1px;
}
</style>
