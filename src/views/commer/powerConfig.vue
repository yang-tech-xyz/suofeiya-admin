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
        name: '币种-链信息',
        listUrl: '/powerConfig/',
        editUrl: '/powerConfig/',
        dataFormObj: {},
        noSearch:1
      },
      formArr: [
        {
          label: 'id',
          prop: 'id',
          type: 'input',
          isItem:1
        },
        {
          label: '算力购买价格',
          prop: 'price',
          type: 'input',
          addOrEdit: 1,

        },

        {
          label: '算力周期',
          prop: 'period',
          type: 'input',
          addOrEdit: 1,

        },
        {
          label: '产出币种',
          prop: 'outputSymbol',
          type: 'input',
          addOrEdit: 1,

        },
        {
          label: 'eth链钱包私钥',
          prop: 'curve',
          type: 'input',
          addOrEdit: 1,
        },
        {
          label: '产出比例',
          prop: 'outputRatio',
          type: 'input',
          addOrEdit: 1,
        },
        {
          label: '提现费率',
          prop: 'feeRatio',
          type: 'input',
          addOrEdit: 1,
        },
        {
          label: '波场钱包私钥',
          prop: 'tronCurve',
          type: 'input',
          addOrEdit: 1,
        },
        {
          label: '审核签名钱包',
          prop: 'auditWallet',
          type: 'input',
          addOrEdit: 1,
        },
        {
          label: '创建者',
          prop: 'createBy',
          type: 'input',
          isItem: 1,
        },
        {
          label: '更新者',
          prop: 'updateBy',
          type: 'input',
          isItem: 1,
        },
        {
          label: '创建日期',
          prop: 'createTime',
          type: 'input',
          isItem: 1,
        },

        {
          label: '更新日期',
          prop: 'updateTime',
          type: 'input',
          isItem: 1,
        },
      ],
    }
  },

  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped></style>
