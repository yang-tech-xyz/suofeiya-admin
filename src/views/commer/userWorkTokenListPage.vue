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
        name: '用户空投列表',
        listUrl: '/userWorkTokenList/getPage',
        dataFormObj: {},
        noOperation:1,

        axiosSwitchType:'post',
        switchUrl:'/topUser/blockEnabled',

      },
      formArr: [
        {
          label: '用户id',
          prop: 'id',
          type: 'input',
          search: 1,
        },
        {
          label: '钱包地址',
          prop: 'walletAddress',
          type: 'input',
          search: 1,
        },
        {
          label: '推广人数',
          prop: 'invitedAmount',
          type: 'input',
          search: 1,
        },
        {
          label: '空投数量',
          prop: 'tokenBalance',
          type: 'input',
          addOrEdit: 1,
        },
        {
          label: '创建时间',
          prop: 'createTime',
          type: 'input',
        },
        {
          label: '更新时间',
          prop: 'updateTime',
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
