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
        listUrl: '/transaction/getMonthStatic',
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
          label: '充值数量',
          prop: 'rechargeAmount',
          type: 'input',
          width: '180',
        },
        {
          label: '充值币种',
          prop: 'symbol',
          type: 'input',
          width: '100',
        },
        {
          label: '操作日期',
          prop: 'operateDate',
          type: 'input',
          width: '160',
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
