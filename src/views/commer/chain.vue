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
      dataObj: {
        name: '链信息',
        listUrl: '/chain/getList',
        addUrl: '/chain/',
        editUrl: '/chain/',
        deleteUrl: '/chain/',
        dataFormObj: {},
        axiosEditType: 'put',
        deleteUrlPath: 1,
        noSearch:1,
        isAdd:1
      },
      formArr: [
        {
          label: '链类型',
          prop: 'chainType',
          type: 'input',
          search: 1,
          addOrEdit: 1,
        },
        {
          label: 'rpc 节点url',
          prop: 'rpcEndpoint',
          type: 'input',
          addOrEdit: 1,
        },

        {
          label: '在多少个区块确认之后 才确认充值成功',
          prop: 'blockConfirm',
          type: 'input',
          addOrEdit: 1,
        },
        {
          label: '链id',
          prop: 'chainId',
          type: 'input',
          addOrEdit: 1,
        },
        {
          label: '项目方收款地址',
          prop: 'receiveAddress',
          type: 'input',
          addOrEdit: 1,
        },
        {
          label: '链名称',
          prop: 'chainName',
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
  methods: {
   
  },
}
</script>
<style lang="scss" scoped></style>
