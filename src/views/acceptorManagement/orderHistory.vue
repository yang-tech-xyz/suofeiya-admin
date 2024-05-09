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
        name: '接单历史',
        listUrl: '/agent/payOrder/getOrdersPage',
        noOperation: 1
      },
      formArr: [
        {
          label: '订单编号',
          prop: 'orderNo',
          type: 'input',
          search: 1
        },
        {
          label: '接单时间',
          prop: 'orderReceivingTime',
          type: 'input',
          search: 1
        }, {
          label: '接单承兑商UID',
          prop: 'accUid',
          type: 'input',
          search: 1
        }, {
          label: '商户UID',
          prop: 'mchUid',
          type: 'input',
          search: 1
        },
        {
          label: '订单类型',
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
              label: '代付'
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
        }

      ]
    }
  },

  mounted() {

  },
  methods: {

    getAccountDetailFn(row) {
      this.$axios.get(this.dataObj.getAccountDetail + row.mchId).then((res) => {
        this.getAccountDetail = res
        this.isgetAccountDetail = true
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

