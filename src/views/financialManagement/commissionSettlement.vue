<template>
  <div class="commissionSettlement">
    <div>
      <div class="title">我的佣金总览(统计近30天)</div>
      <elTableColumns :data-obj="dataObj2" :form-arr="formArr2" />
      <elTableColumns :data-obj="dataObj3" :form-arr="formArr3" />
    </div>

    <div>
      <div class="title">佣金结算明细</div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="承兑商" name="1">
          <elTableColumns :data-obj="dataObj4" :form-arr="formArr4" />
        </el-tab-pane>
        <el-tab-pane label="商户" name="2">
          <elTableColumns :data-obj="dataObj" :form-arr="formArr" />
        </el-tab-pane>

      </el-tabs>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: '1',

      dataObj: {
        name: '商户佣金结算',
        listUrl: '/agent/commission/getSettlementDetails',
        noOperation: 1,
        dataFormObj: {
          queryType: 'menchant'
        }

      },
      formArr: [
        {
          label: '序号',
          prop: 'index',
          type: 'index',
          isItem: 1
        },
        {
          label: '商户UID',
          prop: 'mchUid',
          type: 'input',
          search: 1
        },
        {
          label: '订单编号',
          prop: 'orderNo',
          type: 'input',
          search: 1

        },

        {
          label: '订单法币金额',
          prop: 'tokenAmount',
          type: 'input'

        },
        {
          label: '订单当时汇率',
          prop: 'exchangeRate',
          type: 'input'
        },
        {
          label: '订单虚拟币金额',
          prop: 'tokenAmount',
          type: 'input'

        },
        {
          label: '获得返佣比例',
          prop: 'colRate',
          type: 'input'

        },
        {
          label: '获得佣金',
          prop: 'commission',
          type: 'input'

        },
        {
          label: '结算状态',
          prop: 'settleFlag',
          type: 'status',
          search: 1,
          options: [
            {
              value: 'UNSETTLE',
              label: '未结算'
            },
            {
              value: 'SETTLE',
              label: '已结算'
            }
          ]
        },

        {
          label: '发单时间',
          prop: 'createTime',
          type: 'input'

        }

      ],
      dataObj4: {
        name: '承兑商佣金结算',
        listUrl: '/agent/commission/getSettlementDetails',
        noOperation: 1,
        dataFormObj: {
          queryType: 'acceptor'
        }

      },
      formArr4: [
        {
          label: '序号',
          prop: 'index',
          type: 'index',
          isItem: 1
        },
        {
          label: '承兑商UID',
          prop: 'accUid',
          type: 'input',
          search: 1
        },
        {
          label: '订单编号',
          prop: 'orderNo',
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
        },

        {
          label: '订单法币金额',
          prop: 'tokenAmount',
          type: 'input'

        },
        {
          label: '订单当时汇率',
          prop: 'exchangeRate',
          type: 'input'
        },
        {
          label: '订单虚拟币金额',
          prop: 'tokenAmount',
          type: 'input'

        },
        {
          label: '获得返佣比例',
          prop: 'colRate',
          type: 'input'

        },
        {
          label: '获得佣金',
          prop: 'commission',
          type: 'input'

        },
        {
          label: '结算状态',
          prop: 'settleFlag',
          type: 'status',
          search: 1,
          options: [
            {
              value: 'UNSETTLE',
              label: '未结算'
            },
            {
              value: 'SETTLE',
              label: '已结算'
            }
          ]
        },

        {
          label: '接单时间',
          prop: 'receivingTime',
          type: 'input'

        }

      ],

      dataObj2: {
        name: '佣金结算',
        listUrl: '/agent/commission/getCommissionOverview',
        export: '/agent/appVersionInfo/export',
        noOperation: 1,
        noSearch: 1

      },
      formArr2: [
        {
          label: '累计收入(USDT)',
          prop: 'cumulativeIncomeAmount',
          type: 'input',
          isItem: 1
        },
        {
          label: '未提现余额(USDT)',
          prop: 'uncashBalance',
          type: 'input'

        },
        {
          label: '待结算佣金(USDT)',
          prop: 'unSettledCommission',
          type: 'input'

        },
        {
          label: '已结算佣金(USDT)',
          prop: 'settledCommission',
          type: 'input'

        },

        {
          label: '直接邀请商户结算佣金(USDT)',
          prop: 'directInviteMchCommission',
          type: 'input',
          width: '170'

        },
        {
          label: '间接邀请商户结算佣金(USDT)',
          prop: 'indirectInviteMchCommission',
          type: 'input',
          width: '170'

        },
        {
          label: '直接邀请商户待结算佣金(USDT)',
          prop: 'directInviteMchPsCommission',
          type: 'input',
          width: '180'

        },
        {
          label: '间接邀请商户待结算佣金(USDT)',
          prop: 'indirectInvitePsMchCommission',
          type: 'input',
          width: '180'

        },
        {
          label: '直接邀请承兑商结算佣金(USDT)',
          prop: 'directInviteAccCommission',
          type: 'input',
          width: '180'

        },
        {
          label: '间接邀请承兑商结算佣金(USDT)',
          prop: 'indirectInviteAccCommission',
          type: 'input',
          width: '180'

        },

        {
          label: '直接邀请承兑商待结算佣金(USDT)',
          prop: 'directInviteAccPsCommission',
          type: 'input',
          width: '200'

        },
        {
          label: '间接邀请承兑商待结算佣金(USDT)',
          prop: 'indirectInvitePsAccCommission',
          type: 'input',
          width: '200'

        }

      ],
      dataObj3: {
        name: '佣金结算',
        listUrl: '/agent/commission/getCommissionOverview',
        export: '/agent/appVersionInfo/export',
        noOperation: 1,
        noSearch: 1

      },
      formArr3: [
        {
          label: '累计结算单数',
          prop: 'settlementOrders',
          type: 'input',
          isItem: 1
        },
        {
          label: '待结算单数',
          prop: 'waitSettlementOrders',
          type: 'input'
        },
        {
          label: '已结算单数',
          prop: 'settledOrders',
          type: 'input'
        },
        {
          label: '直接邀请商户结算单数',
          prop: 'directInviteMchSettlementOrders',
          type: 'input'
        },

        {
          label: '间接邀请商户结算单数',
          prop: 'indirectInviteMchSettlementOrders',
          type: 'input'
        },
        {
          label: '直接邀请商户待结算单数',
          prop: 'directInviteMchWaitSettlementOrders',
          type: 'input'
        },
        {
          label: '间接邀请商户待结算单数',
          prop: 'indirectInviteMchWaitSettlementOrders',
          type: 'input',
          addOrEdit: 1

        },
        {
          label: '直接邀请承兑商结算单数',
          prop: 'directInviteAccSettlementOrders',
          type: 'input'

        },
        {
          label: '间接邀请承兑商结算单数',
          prop: 'indirectInviteAccSettlementOrders',
          type: 'input'

        },
        {
          label: '直接邀请承兑商待结算单数',
          prop: 'directInviteAccWaitSettlementOrders',
          type: 'input'

        },

        {
          label: '间接邀请承兑商待结算单数',
          prop: 'indirectInviteAccWaitSettlementOrders',
          type: 'input'

        },
        {
          label: '最后更新时间',
          prop: 'updateTime',
          type: 'input'

        }

      ]
    }
  },

  mounted() {
    this.getCommissionOverview()
  },
  methods: {

    getCommissionOverview() {
      this.$axios.get('/agent/commission/getCommissionOverview').then((res) => {
        console.log(res)
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.title{
  font-size: 16px;
  padding:20px 20px 0;
  font-weight: bold;
}
</style>
<style lang="scss" >
.commissionSettlement {
  .el-tabs__header {
    padding: 20px 20px 0;
    margin-bottom: 0;
  }
}
</style>

