<template>
  <div>
    <elTableColumns
      ref="elTableColumns"
      :data-obj="dataObj"
      :form-arr="formArr"
    >
      <template v-slot:userBtn="scope">
        <template v-if="scope.row.status=='0x0' ">
          <el-button style="margin-bottom: 10px;"  v-if="scope.row.symbol == 'BTC' && scope.row.transNo" @click="isUpdateRateBTC = true;transactionNo=scope.row.transNo">
            BTC提现审批
          </el-button>
          <el-button style="margin-bottom: 10px;"  v-else-if="scope.row.transNo" @click="isUpdateRate = true;transactionNo=scope.row.transNo;">
            {{ ['recharge'].includes(scope.row.status)?'充值':'提现' }}审批
          </el-button>
        </template>
        <template v-else-if="scope.row.status=='0x1'">
          <el-tag>
            提现成功
          </el-tag>
        </template>
      </template>
    </elTableColumns>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="isUpdateRateBTC"
      title="BTC提现审批"
      width="800px"
    >
      <el-form>
        <el-form-item label="事务编号" label-width="200px">
          <el-input
            v-model="transactionNo"
            placeholder="请输入事务编号"
            disabled

            type="text"
          />
        </el-form-item>
        <el-form-item label="BTC提现生成的hash值" label-width="200px">
          <el-input
            v-model="hash"
            placeholder="请输入BTC提现生成的hash值"
            type="text"
          />
        </el-form-item>
        <el-form-item label="是否通过" label-width="200px">
          <el-radio v-model="pass" :label="true">通过</el-radio>
          <el-radio v-model="pass" :label="false">不通过</el-radio>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            @click="
              isUpdateRateBTC = false
              transactionNo = ''
              hash = ''
            "
          >
            取消
          </el-button>

          <el-button type="primary" @click="personal_sign">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="isUpdateRate"
      title="提现审批"
      width="800px"
    >
      <el-form>
        <el-form-item label="事务编号" label-width="200px">
          <el-input
            v-model="transactionNo"
            placeholder="请输入事务编号"
            disabled
            type="text"
          />
        </el-form-item>
        <el-form-item label="是否通过" label-width="200px">
          <el-radio v-model="pass" :label="true">通过</el-radio>
          <el-radio v-model="pass" :label="false">不通过</el-radio>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            @click="
              isUpdateRate = false
              hash = ''
              transactionNo = ''
            "
          >
            取消
          </el-button>

          <el-button type="primary" @click="personal_sign2">
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
      isUpdateRateBTC: false,
      hash: '',
      obj: {},
      dataObj: {
        name: 'transaction',
        listUrl: '/transaction/',
        dataFormObj: {},
        operateWidth:'260',
        // isIndex:1,
      },
      formArr: [
        {
          label: 'id',
          prop: 'id',
          type: 'input',
          width: '60',
        },

        {
          label: '用户id',
          prop: 'userId',
          type: 'input',
          width: '100',
          search: 1,

        },

        {
          label: '提现时间',
          prop: 'createTime',
          type: 'input',
          isItem: 1,
          width: '100',
        },
        {
          label: '提现数量',
          prop: 'withdrawAmount',
          type: 'input',
          width: '140',
        },
        {
          label: 'token标记',
          prop: 'symbol',
          type: 'input',
          width: '100',
        },

        {
          label: '提现接收地址',
          prop: 'withdrawReceiveAddress',
          type: 'input',
          width: '180',
        },
        {
          label: '节点id',
          prop: 'chainId',
          type: 'input',
          width: '80',
        },
        {
          label: '链hash',
          prop: 'hash',
          type: 'input',
          search: 1,
          width: '120',
        },
        {
          label: '充值数量',
          prop: 'tokenAmount',
          type: 'input',
        },
        {
          label: '链rpc节点',
          prop: 'rpcEndpoint',
          type: 'input',
          width: '160',
        },
        {
          label: '事务状态',
          prop: 'status',
          type: 'status',
          width: '80',
          options: [
            {
              value: '0x0',
              label: '未审核',
            }, {
              value: '0x1',
              label: '审核通过',
            },{
              value: '0x2',
              label: '审核拒绝',
            },
          ]
        },

        {
          label: 'erc20地址',
          prop: 'erc20Address',
          type: 'input',
          width: '200',
        },
        {
          label: '事务编号',
          prop: 'transNo',
          type: 'input',
          width: '180',
        },
        {
          label: '币种id',
          prop: 'tokenId',
          type: 'input',
          width: '80',
        },


        {
          label: '充值是否成功标价',
          prop: 'isConfirm',
          type: 'status',
          width: '150',
          labelByFun:(row)=>{
            if(row.status != '0x1'){
              return ''
            }
            const dist = {
              Recharge:"充值",
              TronRecharge:"波场充值",
              Withdraw_BTC:"提现BTC",
              Withdraw:"提现",
              Tron_Withdraw:"波场提现",
            }
            let label = dist[row.type]
            return (row.isConfirm==0?'成功':'失败')
          },
          options: [
            {
              value: 0,
              label: '充值成功',
            },
            {
              value: 1,
              label: '充值失败',
            },
          ],
        },
        {
          label: '事务区块高度',
          prop: 'height',
          type: 'input',
        },
        {
          label: '区块链确认',
          prop: 'blockConfirm',
          type: 'input',
          width: '100',

          isItem: 1,
        },
        {
          label: '事务类型',
          prop: 'type',
          type: 'status',
          width: '100',

          options: [
            {
              value: 'Recharge',
              label: '充值',
            },
            {
              value:'TronRecharge',
              label:'波场充值'
            },
            {
              value: 'Withdraw',
              label: '提现',
            },
            {
              value: 'Withdraw_BTC',
              label: '提现BTC',
            },
            {
              value: 'Tron_Withdraw',
              label: '波场提现',
            },
          ],
        },


        {
          label: '更新日期',
          prop: 'updateTime',
          type: 'input',
          isItem: 1,
          width: '100',
        },
        {
          label: '时间范围',
          prop: 'startDateTime_endDateTime',
          type: 'date',
          search: 3,
          isItem:1,
          noList:1

        },
      ],
    }
  },

  mounted() {},
  methods: {
    personal_sign() {
      var self = this
      var timestamp = 'sign_' + new Date().getSeconds()

      try {
        window.ethereum
          .enable()
          .then(function (accounts) {
            console.log(accounts)
            window.ethereum
              .request({
                method: 'personal_sign',
                params: [
                  timestamp,
                  window.ethereum.selectedAddress.toLowerCase(),
                ],
              })
              .then((signature) => {
                self.$axios
                  .post('/transaction/withdrawBTCAudit', {
                    signMsg: signature,
                    content: timestamp,
                    pass: self.pass,
                    hash: self.hash,
                    transactionNo: self.transactionNo,
                  })
                  .then((res) => {
                    if (res.code == 200) {
                      console.log(res)
                      self.transactionNo = ''
                      self.hash = ''
                      self.pass = true
                      self.isUpdateRateBTC = false
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
    personal_sign2() {
      var self = this
      var timestamp = 'sign_' + new Date().getTime()
      try {
        window.ethereum
          .enable()
          .then(function (accounts) {
            window.ethereum
              .request({
                method: 'personal_sign',
                params: [
                  timestamp,
                  window.ethereum.selectedAddress.toLowerCase(),
                ],
              })
              .then((signature) => {
                self.$axios
                  .post('/transaction/withdrawAudit', {
                    signMsg: signature,
                    content: timestamp,
                    pass: self.pass,
                    transactionNo: self.transactionNo,
                  })
                  .then((res) => {
                    if (res.code == 200) {
                      console.log(res)
                      self.transactionNo = ''
                      self.pass = true
                      self.isUpdateRate = false

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
