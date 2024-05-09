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
        name: '币种-链信息',
        listUrl: '/tokenChain/getList',
        addUrl: '/tokenChain/',
        editUrl: '/tokenChain/',
        deleteUrl: '/tokenChain/',
        axiosEditType: 'put',
        deleteUrlPath: 1,
        dataFormObj: {},
      },
      formArr: [
        {
          label: 'tokenId',
          prop: 'tokenId',
          type: 'input',
          isItem: 1,
        },
        {
          label: 'token symbol',
          prop: 'tokenId',
          type: 'status',
          search: 1,
          options: [],
          addOrEdit: 1,
        },
        {
          label: '链id',
          prop: 'chainId',
          type: 'input',
          isItem: 1,
        },
        {
          label: ' 链名称',
          prop: 'chainId',
          type: 'status',
          addOrEdit: 1,
          options: [],
        },

        {
          label: '币的合约地址',
          prop: 'erc20Address',
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

  mounted() {
    this.tokenChaingetList()
    this.tokengetList()
  },
  methods: {
    tokenChaingetList() {
      this.$axios.get('/chain/getList').then((res) => {
        this.formArr.forEach((r) => {
          if (r.prop == 'chainId' && r.type == 'status') {
            res.forEach((e) => {
              e['value'] = e.chainId
              e['label'] = e.chainName
            })
            r.options = res
          }
        })
      })
    },
    tokengetList() {
      this.$axios.get('/token/getList').then((res) => {
        this.formArr.forEach((r) => {
          if (r.prop == 'tokenId') {
            res.forEach((e) => {
              e['value'] = e.id
              e['label'] = e.symbol
            })
            r.options = res
          }
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped></style>
