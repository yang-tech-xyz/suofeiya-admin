<template>
  <div>
    <elTableColumns ref="elTableColumns" :data-obj="dataObj" :form-arr="formArr" />

  </div>
</template>

<script>
export default {
  data() {
    return {

      dataObj: {
        name: '发单历史',
        listUrl: '/agent/payOrder/getSendOrderPage',
        exchange_rate_currency: '/agent/common/dict/type/exchange_rate_currency',
        deleteId: 'mchId',
        noOperation: 1
      },
      formArr: [
        {
          label: '所属代理UID',
          prop: 'agentUid',
          type: 'input',
          search: 1

        },
        {
          label: '订单编号',
          prop: 'orderNo',
          type: 'input',
          search: 1

        }, {
          label: '发单时间',
          prop: 'sendOrderTime',
          type: 'input'

        }, {
          label: '等待时长',
          prop: 'waitingTime',
          type: 'input'

        }, {
          label: '商户UID',
          prop: 'mchUid',
          type: 'input',

          search: 1

        }, {
          label: '发单类型',
          prop: 'orderType',
          type: 'status',
          search: 1,

          options: [
            {
              value: 'RECEIVE',
              label: '收款'
            },
            {
              value: 'PAY',
              label: '付款'
            }

          ]

        }, {
          label: '国家',
          prop: 'countryName',
          type: 'input'

        }, {
          label: '通道',
          prop: 'channelName',
          type: 'input'

        }, {
          label: '订单金额',
          prop: 'orderAmount',
          type: 'input',

          search: 1

        },
        {
          label: '订单状态',
          prop: 'status',
          type: 'status',
          search: 1,

          options: [{
            value: 'PendingConfirmPayTimeout',
            label: '确认付款超时'
          },
          {
            value: 'Cancel',
            label: '取消'
          },
          {
            value: 'PendingMatch',
            label: '待匹配'
          },
          {
            value: 'PendingConfirmPay',
            label: '待确认付款'
          },
          {
            value: 'PendingConfirmReceive',
            label: '待确认收款'
          },
          {
            value: 'PendingConfirmReceiveTimeOut',
            label: '待确认收款超时'
          },
          {
            value: 'Appealing',
            label: '申诉中'
          },
          {
            value: 'Finished',
            label: '完成'
          },
          {
            value: 'AppealFinished',
            label: '申诉完成'
          }
          ]
        },
        {
          label: '收/付信息',
          prop: 'channelDetail',
          type: 'channelDetail',
          width: '500'

        }

      ]
    }
  },

  mounted() {
    this.exchange_rate_currency()
  },
  methods: {

    detailUrl(row) {
      this.$axios.get(this.dataObj.detailUrl + row.mchId).then((res) => {
        this.detail = res
        this.isDialog = true
      })
    },
    getAccountDetailFn(row) {
      this.$axios.get(this.dataObj.getAccountDetail + row.mchId).then((res) => {
        this.getAccountDetail = res
        this.isgetAccountDetail = true
      })
    },
    exchange_rate_currency() {
      this.$axios.get(this.dataObj.exchange_rate_currency).then((res) => {
        this.formArr.forEach((r) => {
          if (r.prop == 'scur' || r.prop == 'tcur') {
            r.options = res
          }
        })
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.borBox {
  background: #fff;

  .title {
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0;

  }

  .list {
    border: 1px solid #dfe6ec;
    margin-bottom: 30px;

    >div {
      text-align: center;
      display: flex;
      height: 44px;
      line-height: 44px;
      border-bottom: 1px solid #dfe6ec;
      ;

      p {
        margin: 0;
        padding: 0;
      }

      >P:nth-child(1) {
        background: #f5f7fa;
        width: 30%;
      }

      >P:nth-child(2) {
        width: 70%;
      }
    }

    >div:last-child {
      border-bottom: 0;
    }
  }
}

.set {
  background: #f5f7fa;
  position: absolute;
  right: 1px;
  top: 1px;
  padding: 0 20px;
  height: 34px;
}
</style>

