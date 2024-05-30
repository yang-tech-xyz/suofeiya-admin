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
        name: '存币生息订单',
        listUrl: '/topStoreOrder/getPage',
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
        // {
        //   label: '产品ID',
        //   prop: 'storeId',
        //   type: 'input',
        // },

        {
          label: '投资周期',
          prop: 'period',
          type: 'status',
          options:[],
          search: 1,

        },
        {
          label: '用户ID',
          prop: 'userId',
          type: 'input',
        },
        {
          label: '存单号',
          prop: 'orderNo',
          type: 'input',
        },
        {
          label: '存入币种',
          prop: 'symbol',
          type: 'input',
          search: 1,

        },
       
        {
          label: '币种价格',
          prop: 'price',
          type: 'input',
        },
        {
          label: '存入数量',
          prop: 'amount',
          type: 'input',
        },
        {
          label: '投资金额USD',
          prop: 'investAmount',
          type: 'input',
        },
        {
          label: '订单时间',
          prop: 'orderDate',
          type: 'input',
        },
        {
          label: '到期释放时间',
          prop: 'releaseDate',
          type: 'input',
        },
        {
          label: '状态',
          prop: 'status',
          type: 'status',

          options: [
            {
              value: 1,
              label: '收益中',
            },
            {
              value: 2,
              label: '已领取',
            },
          ],
        },
        {
          label: '累计利息',
          prop: 'totalIncome',
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

  mounted() {
    this.topStoregetList()
  },
  methods: {
    topStoregetList() {
      this.$axios.get('/topStore/getList').then((res) => {
        this.formArr.forEach((r) => {
          if (r.prop == 'period' && r.type == 'status') {
            res.forEach((e) => {
              e['value'] = e.id
              e['label'] = e.name
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
