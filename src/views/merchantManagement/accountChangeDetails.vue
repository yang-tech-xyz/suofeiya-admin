<template>
  <div>
    <elTableColumns v-if="dataObj.dataFormObj.mchId" ref="elTableColumns" :data-obj="dataObj" :form-arr="formArr" />

  </div>
</template>

<script>
export default {
  data() {
    return {

      dataObj: {
        name: '商户资产',
        listUrl: '/agent/mchFund/fundLogPage',
        noOperation: 1,
        dataFormObj: {
          mchId: ''

        }
      },
      formArr: [

        {
          label: '流水序号',
          prop: 'serialNum',
          type: 'input'

        },
        {
          label: '商户UID',
          prop: 'mchUid',
          type: 'input',
          search: 1

        },
        {
          label: '流水类型',
          prop: 'changeType',
          search: 1,
          type: 'status',
          options: []
        },
        {
          label: '关联单号',
          prop: 'orderNo',
          type: 'input'
        }, {
          label: '变更金额',
          prop: 'changeMoney',
          type: 'input'
        }, {
          label: '变更前余额',
          prop: 'beforeMoney',
          type: 'input'
        }, {
          label: '变更后余额',
          prop: 'afterMoney',
          type: 'input'
        }, {
          label: '创建时间',
          prop: 'createTime',
          type: 'date'
        }

      ]
    }
  },

  mounted() {
    this.dataObj.dataFormObj.mchId = this.$route.query.id
    this.mchTransactionType()
  },
  methods: {
    mchTransactionType() {
      this.$axios.get('/agent/agentTransactionType').then((res) => {
        const arr = []
        for (var i in res) {
          arr.push(
            {
              value: i,
              label: res[i]
            }
          )
        }
        this.formArr.forEach((r) => {
          console.log(r.prop)

          if (r.prop == 'changeType') {
            r.options = arr
          }
        })
      })
    }

  }
}
</script>
<style lang="scss" scoped></style>

