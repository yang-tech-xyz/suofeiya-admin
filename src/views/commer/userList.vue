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
        name: '管理员列表',
        listUrl: '/topAdmin/getList',
        addUrl: '/topAdmin/add',
        editUrl: '/topAdmin/edit',
        dataFormObj: {},
      },
      formArr: [
        {
          label: '主键',
          prop: 'id',
          type: 'input',
          isItem:1
        },
        {
          label: '账号',
          prop: 'account',
          type: 'input',
          search: 1,
          addOrEdit: 1,
        },

        {
          label: '密码',
          prop: 'password',
          type: 'password',
          addOrEdit: 1,
        },
        {
          label: '谷歌密钥',
          prop: 'googleSecret',
          type: 'input',
          addDisabled:1,
          addOrEdit: 1,
        },
        {
          label: '状态',
          prop: 'status',
          type: 'status',
          addOrEdit: 1,

          options: [
            {
              value: 1,
              label: '有效',
            },
            {
              value: 2,
              label: '禁止登录',
            },
          ],
        },
        {
          label: '创建日期',
          prop: 'createdDate',
          type: 'input',
          isItem:1
        },
        {
          label: '创建人',
          prop: 'createdBy',
          type: 'input',
          isItem:1
        },
        {
          label: '更新日期',
          prop: 'updatedDate',
          type: 'input',
          isItem:1
        },

        {
          label: '更新人',
          prop: 'updatedBy',
          type: 'input',
          isItem:1
        },
      ],
    }
  },

  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped></style>
