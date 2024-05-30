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
        listUrl: '/topPowerSharingIncome/getStatistics',
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
          prop: 'income',
        },
      ],

      dataObj: {
        name: '算力收益明细',
        listUrl: '/topPowerSharingIncome/getPage',
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
          label: '贡献人地址',
          prop: 'providerWallet',
          type: 'input',
        },
        {
          label: '贡献人订单号',
          prop: 'providerOrderNo',
          type: 'input',

        },
        {
          label: '贡献人订单号',
          prop: 'orderNo',
          type: 'input',
          noList:1,
          isItem:1,
          search: 1,

        },
        {
          label: '贡献人层级',
          prop: 'providerLevel',
          type: 'input',
        },

        {
          label: '层级收益比例',
          prop: 'rate',
          type: 'input',
        },

        {
          label: '收益币种',
          prop: 'symbol',
          type: 'input',
        },
        {
          label: '收益金额',
          prop: 'income',
          type: 'input',
        },
        {
          label: '收益日期',
          prop: 'processDate',
          type: 'input',
        },
        {
          label: '是否处理',
          prop: 'processEnabled',
          type: 'status',
          options: [
            {
              value: true,
              label: '是',
            },
            {
              value: false,
              label: '否',
            },
          ],
        },
        {
          label: '时间范围',
          prop: 'startDate_endDate',
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
