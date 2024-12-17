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
        name: '用户列表',
        listUrl: '/topUser/getPage',
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
          prop: 'wallet',
          type: 'input',
          search: 1,
        },
        {
          label: '等级',
          prop: 'grade',
          type: 'input',
        },

        {
          label: '邀请码',
          prop: 'invitedCode',
          type: 'input',
          addOrEdit: 1,
        },
        {
          label: '邀请人的ID',
          prop: 'invitedUserId',
          type: 'input',
          addOrEdit: 1,
        },
        {
          label: '邀请人的地址',
          prop: 'invitedUserWallet',
          type: 'input',
        },
        {
          label: '邀请人的邀请码',
          prop: 'invitedUserCode',
          type: 'input',
        },
        {
          label: 'btc转账地址',
          prop: 'btcTransferAddress',
          type: 'input',
        },

        {
          label: '注册时间',
          prop: 'createTime',
          type: 'input',
          isItem: 1,
        },
        {
          label: '是否禁用',
          prop: 'blockEnabled',
          type: 'switch',
          switchBtn:1,
          switchObj:{
            activeValue:true,
          },
        },

      ],
    }
  },

  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped></style>
