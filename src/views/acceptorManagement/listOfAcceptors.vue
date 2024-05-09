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
        name: '承兑商',
        listUrl: '/agent/accInfo/page',
        export: '/agent/accInfo/export',
        noOperation: 1
      },
      formArr: [
        {
          label: '承兑商UID',
          prop: 'accUid',
          type: 'input',
          search: 1

        },
        {
          label: '承兑商昵称',
          prop: 'nickName',
          type: 'input',
          search: 1

        }, {
          label: '是否我直推',
          prop: 'directPushFlag',
          type: 'status',
          search: 1,
          options: [
            {
              value: 'no',
              label: '否'
            },
            {
              value: 'yes',
              label: '是'
            }

          ]

        }, {
          label: '认证状态',
          prop: 'authFlag',
          type: 'status',
          search: 1,
          options: [
            {
              value: 0,
              label: '未认证'
            },
            {
              value: 1,
              label: '已认证'
            }

          ]

        }, {
          label: '上级代理UID',
          prop: 'email',
          type: 'input',
          search: 1

        }, {
          label: '承兑商团队数',
          prop: 'mobile',
          type: 'input',
          search: 1

        }, {
          label: '邀请承兑商人数',
          prop: 'mobile',
          type: 'input',
          search: 1

        }, {
          label: '上线状态',
          prop: 'googleStatus',
          type: 'status',
          isItem: 1,
          options: [
            {
              value: 0,
              label: '未绑定'
            },
            {
              value: 1,
              label: '已绑定',
              tagColor: 'danger'

            }

          ]

        }, {
          label: '当前代付接单状态',
          prop: 'supIdType',
          type: 'status',
          search: 1,

          options: [
            {
              value: 0,
              label: '无上级'
            },
            {
              value: 1,
              label: '承兑商'
            }, {
              value: 2,
              label: '代理商'
            }

          ]

        }, {
          label: '当前收款接单状态',
          prop: 'supUid',
          type: 'input',
          search: 1

        }, {
          label: '注册时间',
          prop: 'regTime',
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
<style lang="scss" scoped>
.borBox {
  background: #fff;

  .title {
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0;

  }

  .list {
    border: 1px solid #dfe6ec;
    margin-bottom: 30px;

    >div {
      text-align: center;
      display: flex;
      height: 44px;
      line-height: 44px;
      border-bottom: 1px solid #dfe6ec;
      ;

      p {
        margin: 0;
        padding: 0;
      }

      >P:nth-child(1) {
        background: #f5f7fa;
        width: 30%;
      }

      >P:nth-child(2) {
        width: 70%;
      }
    }

    >div:last-child {
      border-bottom: 0;
    }
  }
}

.set {
  background: #f5f7fa;
  position: absolute;
  right: 1px;
  top: 1px;
  padding: 0 20px;
  height: 34px;
}

.areaCode {
  height: 44px;
  z-index: 1;
  display: flex;

  .el-select {
    width: 100% !important;
    height: 44px;

  }

  .el-input {
    width: 100% !important;
  }
}

.rightMark {
  position: absolute;
  right: 1px;
  background: #f5f7fa;
  padding: 0 20px;
  height: 93%;
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  top: 1px;
}

.tips {
  color: red;
}

.bigTitle {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.smalltitle {
  margin-left: 140px;
  margin-bottom: 10px;
}

.bigTitle2 {
  margin-top: 60px;
}

.t1 {
  font-weight: bold;
  font-size: 16px;
  color: #000;
  margin-bottom: 10px;
  margin-top: 40px;

  span {
    color: red;
    font-size: 13px;
  }
}

.t0 {
  line-height: 1.6;
  padding: 0 40px;
}

.red {
  color: red !important;
}
</style>

