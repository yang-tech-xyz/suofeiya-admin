<template>
  <div>
    <elTableColumns
      ref="elTableColumns"
      :data-obj="dataObj"
      :form-arr="formArr"
    >
      <template v-slot:btnOther>
        <el-button style="margin-bottom: 10px;" @click="isUpdateRate = true">
          提现审批
        </el-button>
      </template>
      <template v-slot:userBtn="scope">
        <el-button
          style="margin-bottom: 10px;"
          @click="
            isUpdateRate2 = true
            obj = scope.row
          "
        >
          增加图标
        </el-button>
      </template>
    </elTableColumns>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="isUpdateRate"
      title="提现审批"
      width="600px"
    >
      <el-form>
        <el-form-item label="事务编号" label-width="140px">
          <el-input
            v-model="transactionNo"
            placeholder="请输入事务编号"
            type="text"
          />
        </el-form-item>
        <el-form-item label="是否通过" label-width="140px">
          <el-radio v-model="pass" :label="true">通过</el-radio>
          <el-radio v-model="pass" :label="false">不通过</el-radio>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isUpdateRate = false">取消</el-button>

          <el-button type="primary" @click="personal_sign">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="isUpdateRate2"
      title="增加图标"
      width="600px"
    >
      <el-form>
        <el-form-item label="图标" label-width="140px">
          <el-upload
            class="avatar-uploader"
            ref="upload"
            accept=".png,.jpg"
            :limit="1"
            action=""
            :on-change="httpRequest"
            :on-remove="httpRequest"
            :file-list="fileList"
            :auto-upload="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            @click="
              isUpdateRate2 = false
              imageUrl = ''
              fileList = []
            "
          >
            取消
          </el-button>

          <el-button type="primary" @click="updateIcon">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pass: true,
      transactionNo: '',
      isUpdateRate: false,
      isUpdateRate2: false,
      fileList: [],
      upLoadFile: [],
      imageUrl: '',
      obj: {},
      dataObj: {
        operateWidth: '300',
        name: '币种管理',
        listUrl: '/token/getList',
        addUrl: '/token/',
        editUrl: '/token/',
        dataFormObj: {},
        deleteUrl: '/token/',
        axiosEditType: 'put',
        deleteUrlPath: 1,
      },
      formArr: [
        {
          label: 'token 名称',
          prop: 'symbol',
          type: 'input',
          search: 1,
          addOrEdit: 1,
        },
        {
          label: '小数位',
          prop: 'decimals',
          type: 'input',
          addOrEdit: 1,
        },

        {
          label: '价格平台',
          prop: 'plate',
          type: 'status',
          options: [
            {
              value: 'GATE_IO',
              label: 'GATE_IO',
            },
            {
              value: 'BINANCE',
              label: 'BINANCE',
            }, {
              value: 'OKX',
              label: 'OKX',
            }, {
              value: 'HUO_BI',
              label: 'HUO_BI',
            },
          ],
          addOrEdit: 1,
        },
        {
          label: '是否上线',
          prop: 'online',
          type: 'status',
          addOrEdit: 1,

          options: [
            {
              value: 1,
              label: '上线',
            },
            {
              value:0,
              label: '下线',
            },
          ],
        },
        {
          label: '展示年利率',
          prop: 'outputAnnualInterestRate',
          type: 'input',
          addOrEdit: 1,
        },
        {
          label: '实际年利率',
          prop: 'annualInterestRate',
          type: 'input',
          rightMark: 1,
          rightMark: '%',
          addOrEdit: 1,
        },
        {
          label: '实际年利率',
          prop: 'annualInterestRate2',
          type: 'input',
          isItem: 1,
        },
        {
          label: '当前最新价格',
          prop: 'price',
          type: 'input',
          addOrEdit: 1,
        },

        {
          label: '自动刷新价格',
          prop: 'autoPriceEnabled',
          type: 'status',
          addOrEdit: 1,
          options: [
            {
              value: true,
              label: '是',
            },
            {
              value: false,
              label: '否',
            },
          ],
        },
        {
          label: '是否挖矿',
          prop: 'powerEnabled',
          type: 'status',
          addOrEdit: 1,
          options: [
            {
              value: true,
              label: '是',
            },
            {
              value: false,
              label: '否',
            },
          ],
        },
        {
          label: '是否理财',
          prop: 'storeEnabled',
          type: 'status',
          addOrEdit: 1,

          options: [
            {
              value: true,
              label: '是',
            },
            {
              value: false,
              label: '否',
            },
          ],
        },

        {
          label: '创建日期',
          prop: 'createTime',
          type: 'input',
          isItem: 1,
        },

        {
          label: '更新日期',
          prop: 'updateTime',
          type: 'input',
          isItem: 1,
        },
      ],
    }
  },

  mounted() {},
  methods: {
    async httpRequest(file, fileList) {
      this.upLoadFile = []
      for (let i in fileList) {
        this.upLoadFile[i] = await this.getBase64(fileList[i].raw)
      }
      console.log('上传文件列表', this.upLoadFile)
      this.imageUrl = this.upLoadFile[0]
    },
    // 转base64码
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        let fileResult = ''
        reader.readAsDataURL(file)
        // 开始转
        reader.onload = () => {
          fileResult = reader.result
        }
        // 转 失败
        reader.onerror = (error) => {
          reject(error)
        }
        // 转 结束
        reader.onloadend = () => {
          resolve(fileResult)
        }
      })
    },
    updateIcon() {
      var self = this

      self.$axios
        .post('/token/updateIcon', {
          tokenId: self.obj.id,
          icon: self.imageUrl,
        })
        .then((res) => {
          if (res.code == 200) {
            console.log(res)
            self.imageUrl = ''
            self.fileList = []
            self.isUpdateRate2 = false

            self.$message({
              message: '操作成功',
              type: 'warning',
            })
            self.$refs.elTableColumns.resetQuery()
          }
        })
        .catch((err) => {
          self.$message({
            message: '操作失败',
            type: 'warning',
          })
        })
    },
    personal_sign() {
      var self = this
      var timestamp =  'sign_' + new Date().getTime()
      try {
        window.ethereum
          .enable()
          .then(function (accounts) {
            console.log(accounts)
            window.ethereum
              .request({
                method: 'personal_sign',
                params: [timestamp,window.ethereum.selectedAddress.toLowerCase()],
              })
              .then((signature) => {
                self.$axios
                  .post('/token/withdrawAudit', {
                    signMsg: signature,
                    content:timestamp,
                    pass: self.pass,
                    transactionNo: self.transactionNo,
                  })
                  .then((res) => {
                    if (res.code == 200) {
                      console.log(res)
                      self.transactionNo = ''
                      self.pass = true
                      self.isUpdateRate = false
                      self.$message({
                        message: '操作成功',
                        type: 'warning',
                      })
                      self.$refs.elTableColumns.resetQuery()
                    }
                  })
                  .catch((err) => {
                    self.$message({
                      message: '操作失败',
                      type: 'warning',
                    })
                  })
              })
          })
          .catch(function (reason) {
            self.$message({
              message: '操作失败',
              type: 'warning',
            })
          })
      } catch (error) {
        this.$message({
          message: '请下载小狐狸',
          type: 'warning',
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
