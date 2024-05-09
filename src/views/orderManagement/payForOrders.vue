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
        name: '代付订单',
        listUrl: '/agent/payOrder/getPayOrderPage',
        noOperation: 1,
        dataFormObj: {
          orderType: 'PAY'
        }
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
          prop: 'receivingTime',
          type: 'input',
          width: '100'

        },

        {
          label: '商户UID',
          prop: 'mchUid',
          type: 'input',
          search: 1

        },
        {
          label: '承兑商UID',
          prop: 'accUid',
          type: 'input',
          search: 1

        },
        {
          label: '国家',
          prop: 'countryName',
          type: 'input'
        },
        {
          label: '通道',
          prop: 'channelName',
          type: 'input'
        },

        {
          label: '订单法币金额',
          prop: 'orderAmount',
          type: 'input'

        },
        {
          label: '订单虚拟币金额(USDT)',
          prop: '',
          type: 'input',
          width: '200'

        },
        {
          label: '实付法币金额',
          prop: '',
          type: 'input'
        },
        {
          label: '实付虚拟币金额(USDT)',
          prop: '',
          type: 'input',
          width: '200'

        },
        {
          label: '接单汇率',
          prop: 'xxx',
          type: 'input'
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
          label: '收款信息',
          prop: 'channelDetail',
          type: 'channelDetail',
          width: '400'
        },
        {
          label: '是否已标记异常',
          prop: 'flagAnomalies',
          type: 'status',

          options: [
            {
              label: '是',
              value: 'YES'
            },
            {
              label: '否',
              value: 'NO',
              tagColor: 'danger'
            }

          ]

        }

      ]
    }
  },

  mounted() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped></style>

