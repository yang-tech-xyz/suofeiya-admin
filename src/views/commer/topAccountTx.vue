<template>
  <div>
    <elTableColumns
        ref="elTableColumns"
        @isGetParams="isGetParams"
        :data-obj="dataObj"
        :form-arr="formArr"
    >
    <template v-slot:btnOther>
      <elTableColumns
          ref="elTableColumnsStatistics"
          :noShowOp="true"
          :data-obj="getStatisticsDataObj"
          :form-arr="getStatisticsFormArr"
      />
    </template>
    </elTableColumns>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getStatisticsDataObj:{
        name: '算力收益汇总',
        listUrl: '/topAccountTx/getStatistics',
        dataFormObj: {},
        isGetParams:1,
        noOperation:1,
      },
      getStatisticsFormArr:[
        {
          label: '币种',
          prop: 'symbol',
          type: 'input',
        },
        {
          label: '金额',
          prop: 'amount',
          type: 'input',
        },
      ],
      dataObj: {
        name: '资产流水',
        listUrl: '/topAccountTx/getPage',
        dataFormObj: {},
        isGetParams:1,
        noOperation: 1,
      },
      formArr: [
        {
          label: '用户ID',
          prop: 'userId',
          type: 'input',
          search: 1,
        },
        {
          label: '钱包地址',
          prop: 'wallet',
          type: 'input',
          width: '200',
          search: 1,
        },
        {
          label: '会员ID',
          prop: 'userId',
          type: 'input',
        },

        {
          label: '资产ID',
          prop: 'accountId',
          type: 'input',
        },
        {
          label: '代币',
          prop: 'symbol',
          type: 'status',
          options: [],
          search: 1,
        },
        {
          label: '交易金额',
          prop: 'amount',
          type: 'input',
        },
        {
          label: '手续费',
          prop: 'fee',
          type: 'input',
        },
        {
          label: '变动之前',
          prop: 'balanceBefore',
          type: 'input',
        },
        {
          label: '变动之后',
          prop: 'balanceAfter',
          type: 'input',
        },
        {
          label: '流水号',
          prop: 'transactionNo',
          type: 'input',
        },
        {
          label: '时间范围',
          prop: 'startDateTime_endDateTime',
          type: 'date',
          search: 1,
          isItem: 1,
          noList: 1

        },
        // {
        //   label: '状态',
        //   prop: 'balanceType',
        //   type: 'status',

        //   options: [
        //     {
        //       value: 'available',
        //       label: '可用',
        //     },
        //     {
        //       value: 'frozen',
        //       label: '冻结',
        //     },
        //     {
        //       value: 'lockup',
        //       label: '限制',
        //     },
        //   ],
        // },
        {
          label: '流水类型',
          prop: 'txType',
          type: 'status',
          options: [
            {
              value: 'STORE_IN',
              label: '理财',
            },
            {
              value: 'PURCHASE',
              label: '支付',
            },
            {
              value: 'INTERNAL_TRANSFER',
              label: '内部转账',
            },
            {
              value: 'EXCHANGE',
              label: '交易',
            },
            {
              value: 'RECHARGE_IN',
              label: '充值',
            },
            {
              value: 'WITHDRAW',
              label: '提现',
            },
            {
              value: 'WITHDRAW_BTC',
              label: '提现BTC',
            },
            {
              value: 'STORE_REDEEM',
              label: '理财赎回',
            },
            {
              value: 'STORE_INTEREST',
              label: '理财利息',
            },
            {
              value: 'POWER_DAILY_INCOME',
              label: '挖矿收益',
            },
            {
              value: 'POWER_SHARING_INCOME',
              label: '挖矿邀请收益',
            },
            {
              value: 'WITHDRAW_REJECT',
              label: '提现拒绝',
            }, {
              value: 'TRON_RECHARGE_IN',
              label: 'TRON充值',
            }, {
              value: 'TRON_WITHDRAW',
              label: '波场提现',
            }, {
              value: 'STORE_INTEREST_INVITE',
              label: '理财邀请收益',
            }, {
              value: 'WITHDRAW_FEE',
              label: '提现手续费',
            },

          ],
        },
        {
          label: '第三方号',
          prop: 'refNo',
          type: 'input',
        },
        {
          label: '唯一号，用于幂等',
          prop: 'uniqueId',
          type: 'input',
        },
        {
          label: '备注',
          prop: 'remark',
          type: 'input',
        },

        {
          label: '创建日期',
          prop: 'createdDate',
          type: 'input',
        },

        {
          label: '更新日期',
          prop: 'updatedDate',
          type: 'input',
        },
      ],
    }
  },

  mounted() {
    this.tokengetList()
  },
  methods: {
    isGetParams(params){
      console.log("isGetParams",params)
      this.$refs.elTableColumnsStatistics.getDataList(params)
    },
    tokengetList() {
      this.$axios.get('/token/getList').then((res) => {
        this.formArr.forEach((r) => {
          if (r.prop == 'symbol') {
            res.forEach((e) => {
              e['value'] = e.symbol
              e['label'] = e.symbol
            })
            r.options = res
          }
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped></style>
