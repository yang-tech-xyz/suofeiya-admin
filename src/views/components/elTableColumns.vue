<template>
  <el-card shadow="never" class="aui-card--fill">
    <!-- <template #header v-if="dataObj.name">
      <div class="card_header">
        <h4>{{ dataObj.name }}</h4>
      </div>
    </template> -->
    <div class="mod-sys__dict">
      <el-button
        v-if="dataObj.isGoBack"
        class="addBtn"
        type="primary"
        icon="el-icon-arrow-left"
        @click="goBack()"
      >
        返回
      </el-button>

      <el-form
        v-if="!dataObj.noSearch"
        ref="dataForm"
        :inline="true"
        :model="dataForm"
        @keyup.enter.native="
          dataForm.pageNum = 1

          getDataList()
        "
      >
        <span class="searchType">
          <el-form-item
            v-for="(item, idx) in dataFormArr"
            :key="idx"
            :label="item.type ? item.label2 || item.label : ''"
            :class="item.search ? '' : 'noHide'"
          >
            <el-input
              v-if="item.type == 'input'"
              v-model="dataForm[item.prop]"
              :placeholder="item.label"
              clearable
            />
            <el-select
              v-if="item.type == 'status'"
              v-model="dataForm[item.prop]"
              clearable
              :placeholder="item.label"
            >
              <el-option
                v-for="iteam in item.options"
                :key="iteam.value"
                :label="iteam.label"
                :value="iteam.value"
              />
            </el-select>

            <el-date-picker
              v-if="item.type == 'date'"
              v-model="dataForm[item.prop]"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />

            <!-- 日期时间单选选择器 -->
            <el-date-picker
              v-if="item.type == 'datetime'"
              v-model="dataForm[item.prop]"
              type="datetime"
              style="width: 100%;"
              placeholder="选择日期时间"
              @change="
                (res) => {
                  dataForm[item.prop] = filterTime(res)
                }
              "
            />
          </el-form-item>

          <el-form-item v-if="dataObj.dateSection">
            <el-date-picker
              v-model="dateSectionInfo"
              value-format="YYYY-MM-DD"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束日期"
              @change="changeDateSectionInfo"
            />
          </el-form-item>
        </span>

        <span class="btns" style="display: inline-block;" v-if="!noShowOp">
          <el-form-item v-if="dataFormArr.length">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="
                dataForm.pageNum = 1

                getDataList()
              "
            >
              搜索
            </el-button>
          </el-form-item>
          <el-form-item v-if="dataFormArr.length">
            <el-button icon="el-icon-refresh" @click="resetQuery">
              重置
            </el-button>
          </el-form-item>

          <el-form-item v-if="dataObj && dataObj.addUrl">
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="addOrUpdateHandle()"
            >
              {{ dataObj.addText || '新增' }}
            </el-button>
          </el-form-item>
          <el-form-item v-if="dataObj && dataObj.deletAlleUrl">
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deleteAllHandle()"
            >
              {{ dataObj.deleteAllText || '删除' }}
            </el-button>
          </el-form-item>
          <el-form-item v-if="dataObj && dataObj.export">
            <el-button
              icon="el-icon-upload2"
              type="primary"
              plain
              @click="exportFn()"
            >
              导出数据
            </el-button>
          </el-form-item>
          <el-form-item v-if="dataObj && dataObj.importUrl">
            <el-button
              icon="el-icon-download"
              type="primary"
              plain
              @click="importDialogFormVisible = true"
            >
              {{ dataObj.importText || '导入数据' }}
            </el-button>
          </el-form-item>
          <el-button
            v-if="dataObj && dataObj.toggleRowExpansion"
            @click="handleExpand"
          >
            展开/折叠
          </el-button>
        </span>
      </el-form>
      <el-button
        v-if="dataObj && dataObj.addUrl && dataObj.isAdd"
        class="addBtn"
        type="primary"
        icon="el-icon-plus"
        @click="addOrUpdateHandle()"
      >
        {{ dataObj.addText || '新增' }}
      </el-button>
      <el-button
        v-if="dataObj && dataObj.export && dataObj.isExport"
        class="addBtn"
        icon="el-icon-upload2"
        type="primary"
        plain
        @click="exportFn()"
      >
        {{ dataObj.exportText || '导出数据' }}
      </el-button>
      <el-button
        v-if="dataObj && dataObj.import && dataObj.isImport"
        class="addBtn"
        icon="el-icon-download"
        type="primary"
        plain
        @click="importDialogFormVisible = true"
      >
        {{ dataObj.importText || '导入数据' }}
      </el-button>
      <slot name="btnOther" :row="multipleSelection" />

      <el-table
        ref="multipleTable"
        v-loading="dataListLoading"
        :data="dataList"
        :row-key="dataObj.rowKey ? dataObj.rowKey || 'id' : ''"
        :tree-props="dataObj.treeProps"
        :default-expand-all="dataObj.defaultExpandAll"
        :class="dataObj.chooseOne ? 'chooseOne' : ''"
        :border="dataObj.noBorder ? false : true"
        style="width: 100%;"
        @select="select"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          v-if="dataObj.isSelection"
          type="selection"
          align="center"
          :selectable="selectable"
        />
        <el-table-column
          v-for="(item, idx) in dataFormArr"
          v-if="!item.noList"
          :key="idx"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          header-align="center"
          align="center"
        >
          <template v-slot="scope">
            <div
              v-if="
                item.type == 'status' ||
                item.type == 'radio' ||
                item.type == 'checkbox'
              "
              class="ovs"
            >
              <template
                v-if="
                  item.options && scope.row[item.prop] !== null && !item.isChild
                "
              >
                <el-tag
                  v-for="(iteam, index) in item.options || item.arr"
                  v-show="
                    scope.row[item.prop] != null &&
                    (scope.row[item.prop] == iteam.valueText ||
                      scope.row[item.prop] == iteam.value)
                  "
                  :key="index"
                  :effect="iteam.tagColor ? 'dark' : 'light'"
                  :type="iteam.tagColor || ''"
                >
                  {{ iteam.label }}
                </el-tag>
              </template>
              <template
                v-if="
                  item.options && scope.row[item.prop] !== null && item.isChild
                "
              >
                <el-tag
                  v-for="(iteam, index) in item.options || item.arr"
                  v-show="
                    scope.row[item.isChild][item.prop] == iteam.valueText ||
                    scope.row[item.isChild][item.prop] == iteam.value
                  "
                  :key="index"
                  :effect="iteam.tagColor ? 'dark' : 'light'"
                  :type="iteam.tagColor || ''"
                >
                  {{ iteam.label }}
                </el-tag>
              </template>

              <template v-if="item.arr">
                <el-tag
                  v-for="(iteam, index) in item.arr"
                  :key="index"
                  style="margin: 5px;"
                  :effect="iteam.tagColor ? 'dark' : 'light'"
                  :type="iteam.tagColor || ''"
                >
                  {{ iteam }}
                </el-tag>
              </template>
            </div>
            <div
              v-else-if="
                item.optionsObj
                  ? item.optionsObj[scope.row.type] == 'img'
                  : item.type == 'img'
              "
            >
              <el-image
                class="elTableColumnsImg"
                :src="scope.row[item.prop]"
                :zoom-rate="1.2"
                :preview-src-list="[scope.row[item.prop]]"
                :initial-index="4"
                fit="cover"
              />
            </div>
            <div
              v-else-if="
                item.optionsObj
                  ? item.optionsObj[scope.row.type] == 'videos'
                  : item.type == 'videos'
              "
            >
              <video
                class="elTableColumnsImg"
                controls
                :src="scope.row[item.prop]"
              />
            </div>
            <div v-else-if="item.type == 'imgArr'">
              <el-image
                v-for="(iteam, index) in scope.row[item.prop]"
                :key="index"
                class="elTableColumnsImgArr"
                :src="iteam"
                :zoom-rate="1.2"
                :preview-src-list="scope.row[item.prop]"
                :initial-index="4"
                fit="cover"
              />
            </div>
            <div v-else-if="item.type == 'headAndIdentity'" class="imageBox">
              <el-image
                class="elImage"
                :src="scope.row[item.prop1]"
                :preview-src-list="[scope.row[item.prop1]]"
                :initial-index="4"
                fit="cover"
              />
              <el-image
                class="elImage"
                :src="
                  scope.row[item.prop2] && scope.row[item.prop2].split(',')[1]
                "
                :preview-src-list="[
                  scope.row[item.prop2] && scope.row[item.prop2].split(',')[1],
                ]"
                :initial-index="4"
                fit="cover"
              />
            </div>
            <div v-else-if="item.type == 'video'">
              <video
                v-if="scope.row[item.prop]"
                controls
                :src="scope.row[item.prop]"
              />
            </div>
            <div v-else-if="item.type == 'listStatus'" class="listStatus">
              <el-tag v-for="(item2, idx2) in scope.row[item.prop]" :key="idx2">
                {{ item2[item.listName] }}
              </el-tag>
            </div>
            <div v-else-if="item.type == 'switch'">
              <el-switch
                v-model="scope.row[item.prop]"
                :active-value="item.switchObj.activeValue"
                :disabled="item.switchBtn == 1 ? false : true"
                :inactive-value="item.switchObj.inactiveValue"
                @change="changeFn(scope.row, item.prop)"
              />
            </div>

            <div v-else-if="item.type == 'index'">
              <template>
                {{ scope.$index + 1 }}
              </template>
            </div>
            <div v-else-if="item.type == 'icon'">
              <template>
                <i
                  v-if="item.isChild"
                  :class="scope.row[item.isChild][item.prop]"
                />
                <i v-else :class="scope.row[item.prop]" />
              </template>
            </div>

            <div v-else-if="item.type == 'channelDetail'">
              <template>
                <div v-if="scope.row[item.prop]">
                  <div
                    v-for="(iteam2, index2) in scope.row[item.prop]"
                    :key="index2"
                    class="listItem"
                  >
                    <span>{{ iteam2.fieldLabel }}：</span>
                    <span
                      v-if="
                        iteam2.fieldValue &&
                        iteam2.fieldValue.indexOf('data:image') == -1 &&
                        iteam2.fieldValue.indexOf('.png') == -1 &&
                        iteam2.fieldValue.indexOf('.jpg') == -1
                      "
                    >
                      {{ iteam2.fieldValue }}
                    </span>
                    <span v-else>
                      <el-image
                        style="height: 80px; width: 80px; object-fit: cover;"
                        class="elImage"
                        :src="iteam2.fieldValue"
                        :preview-src-list="[iteam2.fieldValue]"
                        :initial-index="4"
                        fit="cover"
                      />
                    </span>
                  </div>
                </div>
              </template>
            </div>
            <el-popover
              v-else-if="item.isPopover == 1"
              placement="top-start"
              title=""
              :width="300"
              trigger="hover"
              :content="scope.row[item.prop] + ''"
            >
              <template slot="reference">
                <div
                  class="ovs"
                  v-html="
                    scope.row[item.prop] || scope.row[item.prop] === 0
                      ? scope.row[item.prop]
                      : '-'
                  "
                />
              </template>
            </el-popover>

            <div v-else-if="item.type == 'treeInput'" class="treeInput">
              {{ scope.row[item.prop] }}
            </div>

            <div
              v-else
              class="ovs"
              v-html="
                scope.row[item.listfie || item.prop] ||
                scope.row[item.listfie || item.prop] === 0
                  ? scope.row[item.listfie || item.prop]
                  : '-'
              "
            />
          </template>
        </el-table-column>

        <el-table-column
          v-if="!dataObj.noOperation"
          label="操作"
          fixed="right"
          header-align="center"
          align="center"
          :width="dataObj.operateWidth ? dataObj.operateWidth : 200"
        >
          <template v-slot="scope">
            <el-button
              v-if="dataObj && dataObj.listAdd"
              size="small"
              type="primary"
              plain
              @click="addOrUpdateHandle(scope.row, 'addType')"
            >
              {{ dataObj.addText || '新增' }}
            </el-button>
            <el-button
              v-if="dataObj && dataObj.editUrl && !dataObj.noShowEdit"
              size="small"
              :disabled="
                scope.row[dataObj.isEditDisabled]
                  ? scope.row[dataObj.isEditDisabled] == dataObj.isEditVal
                    ? false
                    : true
                  : false
              "
              type="primary"
              plain
              @click="addOrUpdateHandle(scope.row)"
            >
              {{ dataObj.editText || '编辑' }}
            </el-button>
            <el-button
              v-if="dataObj && dataObj.deleteUrl"
              size="small"
              type="danger"
              plain
              @click="deleteHandle(scope.row)"
            >
              {{ dataObj.deleteText || '删除' }}
            </el-button>

            <el-button
              v-if="dataObj && dataObj.detailUrl && dataObj.detailBtnShow"
              size="small"
              type="primary"
              plain
              @click="addOrUpdateHandle(scope.row)"
            >
              详情
            </el-button>

            <slot name="userBtn" :row="scope.row" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="iselPagination"
        :current-page="dataForm.pageNum"
        :page-sizes="[10, 20, 50, 100, 500]"
        :page-size="dataForm.pageSize"
        :total="total"
        layout="->,total, sizes, prev, pager, next, jumper"
        @size-change="pageSizeChangeHandle"
        @current-change="pageCurrentChangeHandle"
      />
      <!-- 弹窗, 新增 / 修改 -->
      <add-or-update
        v-if="addOrUpdateVisible"
        ref="addOrUpdates"
        :form-arr="formArr"
        :data-obj="dataObj"
        :tree-list="dataObj.addUrl === 'menu/addMenu' ? treeList : []"
        @refreshDataList="getDataList"
        @handlePictureCardPreview="handlePictureCardPreview"
        @initFnTable="addOrUpdateVisible = false"
        @closeAddOrUpdateVisible="
          addOrUpdateVisible = false
          getDataList()
          $emit('upRenewFn')
        "
      />
      <el-dialog
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        top="6vh"
      >
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>

      <el-dialog
        :close-on-click-modal="false"
        :visible.sync="importDialogFormVisible"
        :title="dataObj.importTitle"
        width="600px"
      >
        <div class="importCla">
          <div>上传Excel文件</div>
          <div>
            <el-upload
              drag
              action="#"
              :http-request="httpRequest"
              :file-list="fileList"
              :before-upload="beforeUpload"
              :limit="1"
              accept=".xls,.xlsx"
              :on-exceed="handleExceed"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div slot="tip" class="el-upload__tip">
                仅允许导入xls、xlsx格式文件。
                <el-button type="text" @click="downLoadFn()">
                  下载模板
                </el-button>
              </div>
            </el-upload>
          </div>
        </div>

        <template #footer>
          <span class="dialog-footer">
            <el-button
              @click="
                importDialogFormVisible = false
                fileList = []
              "
            >
              取消
            </el-button>
            <el-button type="primary" @click="importFn">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog
        :close-on-click-modal="false"
        :visible.sync="importDialogFormVisible2"
        title="数据格式校验失败"
        width="600px"
      >
        <div class="errorList">
          <div v-for="(item, index) in errorList" :key="index">
            <p>错误行号：{{ item.lineNum }}</p>
            <el-tag
              v-for="(iteam, index2) in item.errors"
              :key="index2"
              type="danger"
            >
              {{ iteam }}
            </el-tag>
          </div>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import AddOrUpdate from './addOrEdit.vue'
export default {
  components: {
    AddOrUpdate,
  },
  props: {
    formArr: { type: Array, default: [] },
    dataObj: { type: Object, default: {} },
    noShowOp:false,
    isSecondary: { type: String, default: '' },
  },

  data() {
    return {
      baseURL: process.env.VUE_APP_BASE_API,
      fileList: [],

      dialogVisible: false,
      importDialogFormVisible: false,
      importDialogFormVisible2: false,
      ishandleExpand: true,

      dialogImageUrl: '',
      dataList: [],
      dataFormArr: [],
      errorList: [],
      dataListLoading: true,
      datetimerangeTime: null,
      datetimerangeTime2: null,
      dateSectionInfo: [],
      itemObj: {},
      rowObj: '',
      dataForm: {
        createTime: null,
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      addOrUpdateVisible: false,
      iselPagination: 0,
      treeList: [],
      multipleSelection: [],
    }
  },
  mounted() {
    this.dataFormArr = this.formArr
    this.getDataList()
  },

  methods: {
    handleExpand() {
      this.ishandleExpand = !this.ishandleExpand
      this.dataList.forEach((e) => {
        this.$refs.multipleTable.toggleRowExpansion(e, this.ishandleExpand)
      })
    },

    // 列表查询
    getDataList(params) {
      if (this.dataObj.isObj) {
        this.dataList = [this.dataObj.detailObj]
        this.dataListLoading = false
        return
      }
      const dataForm = JSON.parse(JSON.stringify(this.dataForm))

      this.dataListLoading = true
      let createTime = null
      const descs = ''
      this.dataFormArr.forEach((e) => {
        // descs
        // if (e.prop.indexOf('Time') != -1 && e.prop !='waitingTime') {
        //   console.log(e.prop)
        //   e.prop= e.prop.replace('Order','_order')
        //   descs += e.prop.replace('Time','_time') + ','

        // }
        // if (descs) {

        //   dataForm.descs = descs.substring(0, descs.length - 1)
        // }

        if (e.type == 'date') {
          if (dataForm[e.prop]) {
            createTime =
              '?' +
              e.prop.split('_')[0] +
              '=' +
              this.filterTime(dataForm[e.prop][0],e.prop.split('_')[0] ) +
              '&' +
              e.prop.split('_')[1] +
              '=' +
              this.filterTime(dataForm[e.prop][1],e.prop.split('_')[1])
            delete dataForm[e.prop]
          }
        }
      })

      if (this.dataObj.name == '账变明细') {
        if (this.$route.query.agentUid) {
          this.dataForm['agentUid'] = this.$route.query.agentUid
          dataForm['agentUid'] = this.$route.query.agentUid
        }
      }
      if (this.dataObj.name == '信誉分明细') {
        if (this.$route.query.accId) {
          dataForm['accId'] = this.$route.query.accId
        }
      }
      if (this.dataObj.name == '用户列表') {
        console.log("this.dataObj",this.dataObj.dataFormObj)
        if (dataForm.id) {
          dataForm['userId'] = dataForm.id
        }
      }
      params = {
        ...dataForm,
        ...this.dataObj.dataFormObj,
        ...params
      }
      if (this.dataObj.noParameters) {
        params = {}
      }
      this.$axios[this.dataObj.axiosType || 'get'](
        this.dataObj.listUrl + (createTime || ''),
        { params },
      )
        .then((res) => {
          if (res.total) {
            this.iselPagination = 1
            this.total = res.total * 1
          }

          if (res.list || res.records) {
            this.dataList = res.list || res.records
            this.$emit('dataInfo', res.list || res.records)
          } else {
            if (this.dataObj.listUrl == '/powerConfig/') {
              this.dataList = [res]
            } else {
              this.dataList = res

              if (this.dataObj.listUrl == '/token/getList') {
                res.forEach((e) => {
                  e['annualInterestRate2'] = e.annualInterestRate * 100 + '% '
                })
              }
            }
          }

          this.dataListLoading = false

        })
        .catch((err) => {
          this.dataListLoading = false
        })
      console.log("调用了吗")
      if (this.dataObj.isGetParams) {
        console.log("调用了吗111111111")

        this.$emit('isGetParams', params)
      }
    },
    formatGap(receivingTime) {
      const staytimeGap =
        new Date().getTime() - new Date(receivingTime).getTime()
      const stayHour = Math.floor(staytimeGap / (3600 * 1000))
      const leave1 = staytimeGap % (3600 * 1000)
      const stayMin = Math.floor(leave1 / (60 * 1000))
      const leave2 = leave1 % (60 * 1000)
      const staySec = Math.floor(leave2 / 1000)
      return stayHour + '时' + stayMin + '分' + staySec + '秒'
    },

    // 日期格式化
    parseTime(time, pattern) {
      if (arguments.length === 0 || !time) {
        return null
      }
      const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
      let date
      if (typeof time === 'object') {
        date = time
      } else {
        if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
          time = parseInt(time)
        } else if (typeof time === 'string') {
          time = time
            .replace(new RegExp(/-/gm), '/')
            .replace('T', ' ')
            .replace(new RegExp(/\.[\d]{3}/gm), '')
        }
        if (typeof time === 'number' && time.toString().length === 10) {
          time = time * 1000
        }
        date = new Date(time)
      }
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
      }
      const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
          return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
          value = '0' + value
        }
        return value || 0
      })
      return time_str
    },

    // 选择日期
    changeDateSectionInfo(val) {
      console.log(val)
    },
    // 重置
    resetQuery() {
      this.dataForm = {
        createTime: null,
        pageNum: 1,
        pageSize: 10,
      }

      this.dateSectionInfo = []
      this.dataFormArr = this.formArr
      this.datetimerangeTime = null
      this.datetimerangeTime2 = null
      this.getDataList()
    },
    changeFn(e, prop) {
      const obj = JSON.parse(JSON.stringify(e))
      obj['userId'] = e.id

      if (this.dataObj.name == '用户管理') {
        obj['lockFlag'] = e.lockFlag
        const postList = []
        const roleList = []
        e.postList.forEach((item) => {
          postList.push(item.postId)
        })
        e.roleList.forEach((item) => {
          roleList.push(item.roleId)
        })
        obj['post'] = postList

        obj['role'] = postList
      }
      console.log("changeFn",obj)

      this.$axios[this.dataObj.axiosSwitchType || 'put'](
        this.dataObj.switchUrl,
        obj,
      ).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success',
        })
      })
    },

    // 禁止选中条目
    selectable(row) {
      if (this.dataObj.isOperateSelection && this.dataObj.name == '用户管理') {
        if (row.username != localStorage.getItem('nickName')) {
          return true
        }
      } else {
        return true
      }
    },
    // 限制只能选择一个
    async select(selection, row) {
      if (this.dataObj.chooseOne) {
        await this.$refs.multipleTable.clearSelection() // 执行完清空操作在进行下面的勾选
        if (selection.length === 0) return
        this.$refs.multipleTable.toggleRowSelection(row, true)
      }
    },

    // 取消选中的内容
    toggleSelection() {
      this.$refs.multipleTable.clearSelection()
    },

    // 选中的内容
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 条数
    pageSizeChangeHandle(e) {
      this.dataForm.pageSize = e
      this.getDataList()
    },
    // 页数
    pageCurrentChangeHandle(e) {
      this.dataForm.pageNum = e

      this.getDataList()
    },

    filterTime(time,time2) {
      console.log(time)
      console.log(time.indexOf('Time')!=-1)
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
      let times =
      time2.indexOf('Time')!=-1
          ? y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + s
          : y + '-' + m + '-' + d
      return times
    },

    // 新增或编辑
    async addOrUpdateHandle(r, type) {
      console.log(r)

      if (this.dataObj.isAddOrEditOther) {
        // 单独新开一个弹窗
        this.$emit('addOrEditOther', r)
        return
      }
      let row = r ? JSON.parse(JSON.stringify(r)) : {}

      if (!this.dataObj.detailUrl) {
        this.addOrUpdateVisible = true

        if (this.dataObj.name == '用户管理') {
          const postList = []
          const roleList = []
          if (r && r.userId) {
            row['id'] = r.userId
            r.postList.forEach((e) => {
              postList.push(e.postId)
            })
            r.roleList.forEach((e) => {
              roleList.push(e.roleId)
            })
          } else {
            row['password'] = '123456'
          }
          row['post'] = postList

          row['role'] = postList
        }

        if (this.dataObj.name == '菜单管理') {
          if (r && r.id) {
            if (type == 'addType') {
              row = {
                menuType: '0',
                status: '-1',
                visible: '1',
                keepAlive: '0',
                parentId: r.id,
                id: '',
              }
            } else {
              row = await this.$axios.get('/admin/menu/' + r.id)
              row['id'] = r.id
            }
          } else {
            row = {
              menuType: '0',
              status: '-1',
              visible: '1',
              keepAlive: '0',
              parentId: '-1',
              id: '',
            }
          }
        }

        if (this.dataObj.name == '角色管理') {
          row['id'] = row.roleId
        }
        if (this.dataObj.name == '部门管理') {
          if (r && r.id) {
            if (type == 'addType') {
              row = {
                parentId: r.id,
                id: '',
              }
            } else {
              row = await this.$axios.get('/admin/dept/' + r.id)
              row['id'] = r.id
            }
          } else {
            row = {
              parentId: '0',
              id: '',
            }
          }
        }

        if (this.dataObj.name == '汇率管理') {
          row['id'] = row.rateId
        }
        if (this.dataObj.name == '广告管理') {
          row['id'] = row.adId
          row['adSort'] = 1
        }
        if (this.dataObj.name == '实名管理') {
          row['id'] = row.accId
        }
        if (this.dataObj.name == '管理员列表') {
          row['password'] = ''
        }

        console.log(row)
        if (row) {
          this.rowObj = row
        } else {
          this.rowObj = ''
        }
        if (this.dataObj.listUrl == '/token/getList' && row.id) {
          row['annualInterestRate'] = row.annualInterestRate * 100
        }

        this.$nextTick(() => {
          this.$refs.addOrUpdates.init(row)
        })
        return
      } else {
        if (this.dataObj.name == '广告管理') {
          if (r && r.adId) {
            r['id'] = r.adId
          }
        }
        if (this.dataObj.name == '新增商户') {
          if (r && r.mchId) {
            r['id'] = r.mchId
          }
        }
        if (this.dataObj.name == '实名管理') {
          if (r && r.accId) {
            r['id'] = r.accId
          }
        }

        if (r && r.id) {
          row = await this.$axios.get(this.dataObj.detailUrl + r.id)
          if (this.dataObj.name == '广告管理') {
            row['id'] = row.adId
          }
          if (this.dataObj.name == '新增商户') {
            row['id'] = row.mchId
          }
          this.addOrUpdateVisible = true
          this.$nextTick(() => {
            this.$refs.addOrUpdates.init(row)
          })
        } else {
          this.addOrUpdateVisible = true
          this.$nextTick(() => {
            this.$refs.addOrUpdates.init(row)
          })
        }
      }
    },
    // 批量删除
    deleteAllHandle() {
      // this.deleteHandle()
      const arr = []

      this.multipleSelection.forEach((e) => {
        arr.push(e[this.dataObj.deleteId || 'id'])
      })
      if (!arr.length) {
        this.$message.error('至少选择一条数据')

        return
      }
      this.deleteHandle(0, arr)
    },

    // 删除

    deleteHandle(row, arr) {
      console.log(row)

      if (this.dataObj.name == '菜单管理') {
        if (row.children) {
          this.$message.error('菜单包含下级不能删除')

          return
        }
      }
      let data = {}
      if (row) {
        data = {
          data: [row[this.dataObj.deleteId || 'id']],
        }
      } else {
        data = {
          data: arr,
        }
      }

      this.$confirm('此操作将永久移除此记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // this.$prompt('请输入谷歌验证码', '安全验证', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   inputPattern: /^.+$/,
        //   inputErrorMessage: '谷歌验证码不能为空'
        // }).then(({ value }) => {

        // })
        if (this.dataObj.deleteUrlPath) {
          this.$axios[this.dataObj.axiosDeleteType || 'delete'](
            this.dataObj.deleteUrl + '/' + row.id,
          ).then(() => {
            this.$message({
              message: '删除成功',
              type: 'success',
            })
            this.resetQuery()
            this.$emit('updateDeleteFn')
          })
        } else {
          this.$axios[this.dataObj.axiosDeleteType || 'delete'](
            this.dataObj.deleteUrl,
            data,
          ).then(() => {
            this.$message({
              message: '删除成功',
              type: 'success',
            })
            this.resetQuery()
            this.$emit('updateDeleteFn')
          })
        }
      })
    },
    // 下載模板
    downLoadFn() {
      this.$axios.get(this.dataObj.localFile, {}).then(() => {})
    },
    // 导出数据
    exportFn() {
      const dataForm = JSON.parse(JSON.stringify(this.dataForm))
      let createTime = null
      this.dataFormArr.forEach((e) => {
        if (e.type == 'date') {
          if (dataForm[e.prop]) {
            createTime =
              '?' +
              e.prop +
              '=' +
              this.filterTime(dataForm[e.prop][0]) +
              '&' +
              e.prop +
              '=' +
              this.filterTime(dataForm[e.prop][1])
            delete dataForm[e.prop]
          }
        }
      })
      const params = {
        ...dataForm,
        ...this.dataObj.dataFormObj,
      }
      this.dataListLoading = true

      this.$axios
        .get(this.dataObj.export + (createTime || ''), { params })
        .then(() => {
          this.dataListLoading = false
        })
    },

    // 覆盖默认的上传行为
    httpRequest(raw) {
      console.log(raw)
      this.fileList = []
      this.fileList.push({
        ...raw,
        name: raw.file.name,
      })
    },
    // 上传前
    beforeUpload(file) {
      const fileSize = file.size
      const FIVE_M = 10 * 1024 * 1024
      // 不允许上传大于10M
      if (fileSize > FIVE_M) {
        this.$message.error('最大上传10M')
        return false
      }
      // 判断文件类型，必须是xlsx格式
      const fileName = file.name
      const reg = /^.+(\.xlsx)$/
      if (!reg.test(fileName)) {
        this.$message.error('只能上传xlsx!')
        return false
      }
      return true
    },
    // 文件数量提醒
    handleExceed() {
      this.$message({ type: 'error', message: '最多支持1个附件上传' })
    },
    // 导入数据
    async importFn() {
      const params = new FormData()
      this.fileList.forEach((x) => {
        params.append('file', x.file)
      })
      // params.append('name', this.peopleform.name)
      // params.append('phone', this.peopleform.phone)
      // params.append('address', this.peopleform.address)
      this.$axios
        .post(this.dataObj.importUrl, params)
        .then((res) => {
          console.log(res)
          this.importDialogFormVisible = false
          this.fileList = []

          if (res && res && res.length) {
            this.errorList = res
            this.importDialogFormVisible2 = true
          } else {
            this.resetQuery()
            this.$message.success('上传成功！')
          }
        })
        .catch((err) => {
          this.fileList = []
          this.importDialogFormVisible = false
          console.log(err)
        })
    },

    // 图片预览
    handlePictureCardPreview(uploadFile) {
      this.dialogVisible = true
      this.dialogImageUrl = uploadFile.url
    },
  },
}
</script>
<style lang="scss" scoped>
.elTableColumnsImg {
  width: 70px;
  height: 70px;
}

.elTableColumnsImgArr {
  width: 50px;
  margin: 0 5px;
  height: 50px;
}

.el-form {
  position: relative;
}

video {
  width: 70px;
  height: 70px;
}

.imageBox {
  display: flex;
  align-items: center;
  justify-content: center;

  .elImage {
    width: 60px;
    height: 60px;
  }
}

:deep(.el-popper .is-light) {
  overflow: initial;
}

.aui-card--fill {
  border: 0;
}

.addBtn {
  margin-bottom: 22px;
}

.importCla {
  display: flex;
  justify-content: center;

  > div:nth-child(1) {
    margin-right: 20px;
    font-size: 16px;
  }
}

.listStatus {
  span {
    margin: 0 5px;
  }
}

.errorList {
  span {
    margin-right: 10px;
    margin-top: 10px;
  }

  p {
    margin: 0;
    font-size: 16px;
  }
}

.listItem {
  display: flex;
  justify-content: center;
  padding-bottom: 6px;
}
</style>
