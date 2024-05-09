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
        name: '资产流水',
        listUrl: '/topAccount/getPage',
        dataFormObj: {},
        noOperation:1
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
          search: 1,

        },
        {
          label: '代币',
          prop: 'symbol',
          type: 'input',
        },

        {
          label: '可用金额',
          prop: 'availableBalance',
          type: 'input',
        },
        {
          label: '锁仓金额',
          prop: 'lockupBalance',
          type: 'input',
        },
        {
          label: '冻结金额',
          prop: 'frozenBalance',
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

  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped></style>
