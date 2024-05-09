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
        name: '算力订单',
        listUrl: '/powerOrder/getPage',
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
          label: '订单编号',
          prop: 'orderNo',
          type: 'input',
        },
       
        {
          label: '购买币种',
          prop: 'symbol',
          type: 'input',
          search: 1,
        },

        {
          label: '购买金额',
          prop: 'amount',
          type: 'input',
        },
        {
          label: '购买台数',
          prop: 'number',
          type: 'input',
        },
        {
          label: '产出币种',
          prop: 'outputSymbol',
          type: 'input',
        },
        {
          label: '产出周期,默认值360天',
          prop: 'period',
          type: 'input',
        },
        {
          label: '累计产出',
          prop: 'income',
          type: 'input',
        },{
          label: '订单日期',
          prop: 'orderDate',
          type: 'input',
        },{
          label: '退出日期',
          prop: 'endDate',
          type: 'input',
        },
      ],
    }
  },

  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped></style>
