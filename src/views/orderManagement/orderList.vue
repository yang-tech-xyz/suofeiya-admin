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
        name: '进单列表',
        listUrl: '/无接口',
        noOperation: 1
      },
      formArr: [
        {
          label: '订单编号',
          prop: 'id',
          type: 'input'
        },

        {
          label: '发单时间',
          prop: 'title',
          type: 'input'
        },
        {
          label: '等待时长',
          prop: 'createBy',
          type: 'input'
        },
        {
          label: '商户UID',
          prop: 'logType',
          type: 'input'

        },
        {
          label: '订单类型',
          prop: 'remoteAddr',
          type: 'input'
        },
        {
          label: '国家',
          prop: 'userAgent',
          type: 'input',
          isPopover: 1
        },
        {
          label: '通道',
          prop: 'requestUri',
          type: 'input'
        },

        {
          label: '订单金额',
          prop: 'delFlag',
          type: 'input'

        },
        {
          label: '收/付单位',
          prop: 'createTime',
          type: 'input'
        },
        {
          label: '收/付账户',
          prop: 'createTime',
          type: 'input'
        }, {
          label: '收/付姓名',
          prop: 'createTime',
          type: 'input'
        }

      ]
    }
  },

  mounted() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped></style>

