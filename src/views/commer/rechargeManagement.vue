<template>
  <div>
    <elTableColumns
      ref="elTableColumns"
      :data-obj="dataObj"
      :form-arr="formArr"
    >
    </elTableColumns>
  
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
        name: '充值管理',
        listUrl: '/transaction/',
        dataFormObj: {},
        operateWidth:'260',
        noOperation:1
      },
      formArr: [
        {
          label: 'id',
          prop: 'id',
          type: 'input',
          width: '60',
        },
        {
          label: '事务编号',
          prop: 'transNo',
          type: 'input',
          width: '180',
        },
        {
          label: '链hash',
          prop: 'hash',
          type: 'input',
          search: 1,
          width: '280',
        },

        {
          label: '节点id',
          prop: 'chainId',
          type: 'input',
          width: '80',
        },
        {
          label: '币种id',
          prop: 'tokenId',
          type: 'input',
          width: '80',
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
          type: 'input',
          width: '80',
        },
        {
          label: 'token标记',
          prop: 'symbol',
          type: 'input',
          width: '100',
        },
        {
          label: '充值数量',
          prop: 'tokenAmount',
          type: 'input',
        },
        {
          label: '充值是否成功标价',
          prop: 'isConfirm',
          type: 'status',
          width: '100',

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
          label: '用户id',
          prop: 'userId',
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
              value: 'recharge',
              label: '充值',
            },
            {
              value: 'withdraw',
              label: '提现',
            },
            {
              value: 'Withdraw_BTC',
              label: '提现BTC',
            },
          ],
        },
   
        {
          label: 'erc20地址',
          prop: 'erc20Address',
          type: 'input',
          width: '200',
        },
        {
          label: '提现接收地址',
          prop: 'withdrawReceiveAddress',
          type: 'input',
          width: '180',
        },
        {
          label: '提现数量',
          prop: 'withdrawAmount',
          type: 'input',
          width: '140',
        },

        {
          label: '创建日期',
          prop: 'createTime',
          type: 'input',
          isItem: 1,
          width: '100',
        },

        {
          label: '更新日期',
          prop: 'updateTime',
          type: 'input',
          isItem: 1,
          width: '100',
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
