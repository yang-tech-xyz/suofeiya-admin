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
        listUrl: '/topUserInfo/getPage',
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
          label: '用户名',
          prop: 'username',
          type: 'input',
          addOrEdit: 1,
        },
        {
          label: '钱包地址',
          prop: 'walletAddress',
          type: 'input',
          search: 1,
        },
        {
          label: '参与活动次数',
          prop: 'attendActiveTime',
          type: 'input',
          search: 1,
        },
        {
          label: '拉新用户数',
          prop: 'invitedNewUserAmount',
          type: 'input',
          search: 1,
        },
        {
          label: 'FanToken持有总数',
          prop: 'fanTokenAmount',
          type: 'input',
          addOrEdit: 1,
        },
        {
          label: 'FanToken使用数量',
          prop: 'fanTokenUseAmount',
          type: 'input',
          addOrEdit: 1,
        },
        {
          label: '观看作品次数',
          prop: 'watchWorkTime',
          type: 'input',
          addOrEdit: 1,
        },
        // {
        //   label: '状态',
        //   prop: 'status',
        //   type: 'status',
        //   options: [
        //     {
        //       value: 0,
        //       label: '是',
        //     },
        //     {
        //       value: 1,
        //       label: '否',
        //     },
        //   ],
        // },
        {
          label: '创建时间',
          prop: 'createTime',
          type: 'input',
        },
        // {
        //   label: '更新时间',
        //   prop: 'updateTime',
        //   type: 'input',
        // },

      ],
    }
  },

  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped></style>
