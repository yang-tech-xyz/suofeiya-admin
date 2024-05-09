<template>
  <div>
    <elTableColumns ref="elTableColumns" :data-obj="dataObj" :form-arr="formArr" />

  </div>
</template>

<script>
export default {
  data() {
    return {

      dataObj: {
        name: '账变明细',
        listUrl: '/agent/agentFund/getAgentFundLogPage',
        noOperation: 1
      },
      formArr: [

        {
          label: '流水序号',
          prop: 'serialNum',
          type: 'input',
          search: 1

        },
        {
          label: '代理UID',
          prop: 'agentUid',
          type: 'input',
          search: 1

        },
        {
          label: '流水类型',
          prop: 'type',
          search: 1,
          type: 'status',
          options: []
        },
        {
          label: '变更金额',
          prop: 'changeMoney',
          type: 'input'
        }, {
          label: '变更前余额',
          prop: 'beforeBalance',
          type: 'input'
        }, {
          label: '变更后余额',
          prop: 'afterBalance',
          type: 'input'
        }, {
          label: '创建时间',
          prop: 'createTime',
          type: 'date',
          search: 1

        }

      ]
    }
  },

  mounted() {
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
          if (r.prop == 'type') {
            r.options = arr
          }
        })
      })
    }

  }
}
</script>
<style lang="scss" scoped></style>

