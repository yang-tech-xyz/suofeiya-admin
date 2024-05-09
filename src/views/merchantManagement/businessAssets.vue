<template>
  <div>
    <elTableColumns ref="elTableColumns" :data-obj="dataObj" :form-arr="formArr">
      <template v-slot:userBtn="scope">
        <el-button
          size="small"
          type="primary"
          @click="goTo('/merchantManagement/accountChangeDetails?id=' + scope.row.mchId)"
        > 资产流水明细</el-button>

      </template>
    </elTableColumns>

  </div>
</template>

<script>
export default {
  data() {
    return {

      dataObj: {
        name: '商户资产',
        listUrl: '/agent/mchFund/getMchFundPage'
      },
      formArr: [

        {
          label: '序号',
          prop: 'id',
          type: 'input'

        },
        {
          label: '商户UID',
          prop: 'mchUid',
          type: 'input',
          search: 1

        },
        {
          label: '总余额',
          prop: 'allBalance',
          type: 'input'
        },
        {
          label: '可用余额',
          prop: 'balance',
          type: 'input'
        }, {
          label: '交易中余额',
          prop: 'transactionAmount',
          type: 'input'
        }, {
          label: '被冻结总额',
          prop: 'frozenAmount',
          type: 'input'
        }, {
          label: '提现中',
          prop: 'drawBalance',
          type: 'input'
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

