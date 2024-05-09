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
        name: '申诉订单',
        listUrl: '/merchant/appealOrder/getAppealOrderByPage',
        noOperation: 1
      },
      formArr: [
        {
          label: '序号',
          prop: 'id',
          type: 'input'
        },

        {
          label: '订单编号',
          prop: 'orderNo',
          type: 'input'
        },
        {
          label: '商户UID',
          prop: 'mchUid',
          type: 'input'
        },
        {
          label: '承兑商UID',
          prop: 'logType',
          type: 'input'

        },

        {
          label: '承兑商订单类型',
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
        },
        {
          label: '发起申诉方',
          prop: 'appealUserRole',
          type: 'status',
          search: 1,
          options: [
            {
              value: 'acceptor',
              label: '承兑商'
            },
            {
              value: 'merchant',
              label: '商户'
            }

          ]
        },

        {
          label: '申诉理由',
          prop: 'questionType',
          type: 'status',
          search: 1,

          options: [
            {
              value: 'noPaymentReceived',
              label: '未收到款'
            },
            {
              value: 'paymentNotConfirmed',
              label: '未确认收款'
            },
            {
              value: 'wrongAmount',
              label: '金额有误',
              tagColor: 'danger'

            },
            {
              value: 'other',
              label: '其它',
              tagColor: 'info'

            }

          ]

        },
        {
          label: '申诉进度',
          prop: 'appealStatus',
          type: 'status',
          search: 1,

          options: [
            {
              value: 'followUp',
              label: '平台跟进',
              tagColor: 'info'

            },
            {
              value: 'negotiationCompleted',
              label: '协商完成'
            },
            {
              value: 'finalReviewCompleted',
              label: '终审完成'

            }

          ]

        },
        {
          label: '预审结果',
          prop: 'preliminaryResult',
          type: 'input'
        }, {
          label: '申诉发起时间',
          prop: 'appealTime',
          type: 'date',
          search: 1

        }, {
          label: '客服跟进时间',
          prop: 'followUpTime',
          type: 'date',
          search: 1

        }, {
          label: '申诉结束时间',
          prop: 'appealEndTime',
          type: 'date',
          search: 1

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

