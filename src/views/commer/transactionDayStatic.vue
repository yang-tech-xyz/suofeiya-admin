<template>
  <div>
    <elTableColumns
      ref="elTableColumns"
      :data-obj="dataObj"
      :form-arr="formArr"
    >
    </elTableColumns>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pass: true,
      obj: {},
      dataObj: {
        name: 'transaction',
        listUrl: '/transaction/getDayStatic',
        noOperation:true,
        noSearch:true,
        dataFormObj: {},
        operateWidth:'260'
      },
      formArr: [
        {
          label: '提现数量',
          prop: 'withdrawAmount',
          type: 'input',
          width: '180',
        },
        {
          label: '提现日期',
          prop: 'withdrawCreatedDate',
          type: 'input',
          width: '180',
        },
        {
          label: '提现币种',
          prop: 'withdrawSymbol',
          type: 'input',
          width: '100',
        },
        {
          label: '提现操作',
          prop: 'withdrawOperation',
          type: 'input',
          width: '80',
        },
        {
          label: '充值数量',
          prop: 'rechargeAmount',
          type: 'input',
          width: '180',
        },
        {
          label: '充值日期',
          prop: 'rechargeCreatedDate',
          type: 'input',
          width: '160',
        },
        {
          label: '充值币种',
          prop: 'rechargeSymbol',
          type: 'input',
          width: '100',
        },
        {
          label: '充值操作',
          prop: 'rechargeOperation',
          type: 'input',
          width: '120',
        }
      ],
    }
  },

  mounted() {},
  methods: {

  },
}
</script>
<style lang="scss" scoped></style>
