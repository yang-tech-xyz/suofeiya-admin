<template>
  <div>
    <elTableColumns
      ref="elTableColumns"
      :data-obj="dataObj"
      :form-arr="formArr"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataObj: {
        name: '算力收益明细',
        listUrl: '/topPowerOrderIncome/getPage',
        dataFormObj: {},
        noOperation: 1,
      },
      formArr: [
        {
          label: '钱包',
          prop: 'wallet',
          type: 'input',
          search: 1,
        },
        {
          label: '用户ID',
          prop: 'userId',
          type: 'input',
        },
        {
          label: '订单号',
          prop: 'orderNo',
          type: 'input',
          search: 1,
        },
        {
          label: '台数',
          prop: 'number',
          type: 'input',
        },

        {
          label: '收益币种',
          prop: 'symbol',
          type: 'input',
          search: 1,
        },

        {
          label: '日利率（年化利率/周期）',
          prop: 'rate',
          type: 'input',
        },
        {
          label: '价格',
          prop: 'price',
          type: 'input',
        },
        {
          label: '收益金额',
          prop: 'income',
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
          label: '处理日期',
          prop: 'processDate',
          type: 'input',
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
  methods: {},
}
</script>
<style lang="scss" scoped></style>
