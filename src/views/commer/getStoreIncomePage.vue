<template>
  <div>
    <elTableColumns
        ref="elTableColumns"
        :data-obj="dataObj"
        @isGetParams="isGetParams"
        :form-arr="formArr">

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
        listUrl: '/topAccountTx/getStoreStatistics',
        dataFormObj: {},
        isGetParams:1,
        noOperation:1,
      },
      getStatisticsFormArr:[
        {
          label: '币种',
          prop: 'symbol',
        },
        {
          label: '金额',
          prop: 'symbol',
        },
      ],

      dataObj: {
        name: '理财收益明细',
        listUrl: '/topAccountTx/getStoreIncomePage',
        isGetParams:1,
        dataFormObj: {},
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
          label: '钱包',
          prop: 'wallet',
          type: 'input',
          search: 1,
        },
        {
          label: '代币',
          prop: 'symbol',
          type: 'input',
        },

        {
          label: '金额',
          prop: 'amount',
          type: 'input',
        },
        {
          label: '类型',
          prop: 'txType',
          type: 'status',
          options: [
            {
              value: 'STORE_INTEREST',
              label: '理财收益',
            },
            {
              value: 'STORE_INTEREST_INVITE',
              label: '理财邀请收益',
            },
          ],
        },
        {
          label: '订单号',
          prop: 'refNo',
          type: 'input',
          search: 1,
        },

        {
          label: '处理时间',
          prop: 'createdDate',
          type: 'input',
          isItem: 1,
        },
        {
          label: '时间范围',
          prop: 'startDateTime_endDateTime',
          type: 'date',
          search: 1,
          isItem:1,
          noList:1

        },
      ],
    }
  },

  mounted() {},
  methods: {
    isGetParams(params){
      this.$refs.elTableColumnsStatistics.getDataList(params)
      console.log("isGetParams",params)
    }
  },
}
</script>
<style lang="scss" scoped></style>
