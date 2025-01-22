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
          label: '用户uid',
          prop: 'uid',
          type: 'input',
        },
        {
          label: '作品id',
          prop: 'workId',
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
