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
        name: '存币生息',
        listUrl: '/topStore/getList',
        addUrl: '/topStore/add',
        editUrl: '/topStore/edit',
        dataFormObj: {},
        noSearch:1,
        isAdd:1

      },
      formArr: [
        {
          label: '产品名称',
          prop: 'name',
          type: 'input',
          search: 1,
          addOrEdit: 1,


        },
        {
          label: '产品周期（月）',
          prop: 'period',
          type: 'input',
          addOrEdit: 1,

        },

        {
          label: '最低投资数量',
          prop: 'limitMinAmount',
          type: 'input',
          addOrEdit: 1,
        },
        {
          label: '展示利率',
          prop: 'displayRate',
          type: 'input',
          addOrEdit: 1,
        },
        {
          label: '实际利率',
          prop: 'rate',
          type: 'input',
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
              label: '无效',
            },
          ],
        },
        {
          label: '创建日期',
          prop: 'createdDate',
          type: 'input',
          isItem: 1,
        },

        {
          label: '更新日期',
          prop: 'updatedDate',
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
