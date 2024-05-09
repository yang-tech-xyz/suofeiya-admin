<template>
  <div v-if="isUpdate && agentId" class="proxyListDetail">

    <div class="top">
      <el-button class="addBtn" type="primary" icon="el-icon-arrow-left" @click="goBack()">返回</el-button>
      <div class="dis">

        <div class="list">
          <div>
            <p>代理UID</p>
            <p>{{ detail.agentUid }}</p>
          </div>
          <div>
            <p>顶级代理UID</p>
            <p>{{ detail.topUid }}</p>
          </div>
          <div>
            <p>上级Uid</p>
            <p>{{ detail.supUid }}</p>
          </div>
        </div>
        <div class="list">
          <div>
            <p>上级设置收款返佣比例</p>
            <p>{{ detail.supColRate }}</p>
          </div>
          <div>
            <p>上级设置代付返佣比例</p>
            <p>{{ detail.supPayRate }}</p>
          </div>
          <div>
            <p>上级设置商户返佣比例</p>
            <p>{{ detail.xx }}</p>
          </div>
        </div>
        <div class="list">
          <div>
            <p>总代理人数</p>
            <p>{{ detail.xx }}</p>
          </div>
          <div>
            <p>一级代理人数</p>
            <p>{{ detail.firstAgentNum }}</p>
          </div>
          <div>
            <p>间接代理人数</p>
            <p>{{ detail.indirectAgentNum || '-' }}</p>
          </div>
        </div>
        <div class="list">
          <div>
            <p>直接邀请商户数</p>
            <p>{{ detail.mchInviteDirectNum }}</p>
          </div>
          <div>
            <p>间接邀请商户数</p>
            <p>{{ detail.mchInviteIndirectNum }}</p>
          </div>
          <div>
            <p>直接邀请承兑商人数</p>
            <p>{{ detail.inviteDirectNum }}</p>
          </div>
        </div>
        <div class="list">
          <div>
            <p>承兑商邀请码</p>
            <el-popover placement="top-start" trigger="hover">
              <div class="code">
                <p> <img :src="detail.inviteQrCode" alt=""></p>
                <p>承兑商邀请二维码 </p>
              </div>
              <p slot="reference" class="set">{{ detail.inviteLink || '-' }}</p>
            </el-popover>

          </div>
          <div>
            <p>承兑商邀请链接</p>
            <p>{{ detail.inviteLink }}</p>
          </div>
          <div>
            <p>
              间接邀请承兑商人数</p>
            <p>{{ detail.inviteIndirectNum }}</p>
          </div>
        </div>

      </div>
    </div>
    <el-tabs v-model="activeName">

      <el-tab-pane label="下属代理列表" name="1">
        <elTableColumns ref="elTableColumns1" :data-obj="dataObj" :form-arr="formArr">
          <template v-slot:userBtn="scope">
            <el-button size="small" type="text" @click="detailFn(scope.row)">详情</el-button>
          </template>
        </elTableColumns>
      </el-tab-pane>
      <el-tab-pane label="下属承兑商列表" name="2">
        <elTableColumns ref="elTableColumns2" :data-obj="dataObj2" :form-arr="formArr2">
          <template v-slot:userBtn="scope">
            <el-button size="small" type="text" @click="getFn(scope.row)">交易详情</el-button>
          </template>
        </elTableColumns>

      </el-tab-pane>
      <el-tab-pane label="获得佣金总览" name="3">
        <elTableColumns ref="elTableColumns3" :data-obj="dataObj03" :form-arr="formArr03" />

        <el-tabs v-model="activeName2">
          <el-tab-pane label="承兑商" name="1">
            <elTableColumns ref="elTableColumns4" :data-obj="dataObj003" :form-arr="formArr003">
              <template v-slot:userBtn="scope">
                <el-button size="small" type="text" @click="getFn(scope.row)">
                  接单佣金明细</el-button>
              </template>
            </elTableColumns>
          </el-tab-pane>
          <el-tab-pane label="商户" name="2">
            <elTableColumns ref="elTableColumns5" :data-obj="dataObj3" :form-arr="formArr3">
              <template v-slot:userBtn="scope">
                <el-button size="small" type="text" @click="getFn(scope.row)">
                  发单佣金明细</el-button>
              </template>
            </elTableColumns>
          </el-tab-pane>
        </el-tabs>

      </el-tab-pane>
      <el-tab-pane label="获得佣金明细" name="4">
        <el-tabs v-model="activeName3">

          <el-tab-pane label="承兑商" name="1">
            <elTableColumns v-if="isShow4" ref="elTableColumns6" :data-obj="dataObj4" :form-arr="formArr4" />
          </el-tab-pane>
          <el-tab-pane label="商户" name="2">
            <elTableColumns v-if="isShow4" ref="elTableColumns7" :data-obj="dataObj04" :form-arr="formArr04" />
          </el-tab-pane>
        </el-tabs>

      </el-tab-pane>

    </el-tabs>

  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: '1',
      activeName2: '1',
      activeName3: '1',
      detail: {},
      isShow4: true,
      dataObj: {
        name: '下属代理列表',
        listUrl: '/agent/agentInfo/getSubAgentPage',
        dataFormObj: {}
      },
      formArr: [
        {
          label: '代理UID',
          prop: 'agentUid',
          type: 'input',
          search: 1
        },
        {
          label: '姓名',
          prop: 'agentName',
          type: 'input',
          search: 1

        },

        {
          label: '顶级代理UID',
          prop: 'topUid',
          type: 'input',
          search: 1

        },

        {
          label: '是否直属代理',
          prop: 'type',
          search: 1,
          type: 'status',
          options: [
            {
              value: 0,
              label: '是'
            },
            {
              value: 1,
              label: '否',
              tagColor: 'danger'

            }

          ]

        },

        {
          label: '上级代理UID',
          prop: 'supUid',
          type: 'input'
        },

        {
          label: '总代理人数',
          prop: 'agentNum',
          type: 'input'
        },

        {
          label: '上级设置收款返佣比例',
          prop: 'colRate',
          type: 'input'
        },

        {
          label: '上级设置代付返佣比例',
          prop: 'payRate',
          type: 'input'
        },

        {
          label: '上级设置商户返佣比例',
          prop: 'mchRate',
          type: 'input'
        },

        {
          label: '一级代理人数',
          prop: 'firstAgentNum',
          type: 'input'
        },
        {
          label: '间接代理人数',
          prop: 'indirectAgentNum',
          type: 'input'
        },
        {
          label: '直接邀请商户数',
          prop: 'directMchNum',
          type: 'input'
        },
        {
          label: '间接邀请商户数',
          prop: 'indirectMchNum',
          type: 'input'
        },
        {
          label: '直接邀请承兑商人数',
          prop: 'directAccNum',
          type: 'input'
        },
        {
          label: '间接邀请承兑商人数',
          prop: 'indirectAccNum',
          type: 'input'
        },
        {
          label: '状态',
          prop: 'status',
          type: 'status',
          options: [
            {
              value: 0,
              label: '正常'
            },
            {
              value: 1,
              label: '禁用',
              tagColor: 'danger'

            }

          ]
        },
        {
          label: '成为代理时间',
          prop: 'createTime',
          type: 'date',
          search: 1

        }

      ],

      dataObj2: {
        name: '下属承兑商列表',
        listUrl: '/agent/agentInfo/getSubAccPage',
        dataFormObj: {}

      },
      formArr2: [
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

        },

        {
          label: '是否当前代理直属',
          prop: 'type',
          type: 'status',
          options: [
            {
              value: 0,
              label: '是'
            },
            {
              value: 1,
              label: '否',
              tagColor: 'danger'

            }

          ],

          search: 1

        },

        {
          label: '认证状态',
          prop: 'authFlag',
          type: 'status',
          options: [
            {
              value: 0,
              label: '未认证',
              tagColor: 'danger'

            },
            {
              value: 1,
              label: '已认证'

            }

          ],

          search: 1

        },

        {
          label: '上级代理UID',
          prop: 'supUid',
          type: 'input'
        },

        {
          label: '承兑商团队数',
          prop: 'teamNumber',
          type: 'input'
        },

        {
          label: '邀请承兑商总人数',
          prop: 'inviteAccNumber',
          type: 'input'
        },

        {
          label: '上线状态',
          prop: 'onlineStatus',
          type: 'status',
          options: [
            {
              value: 0,
              label: '在线'
            },
            {
              value: 1,
              label: '离线',
              tagColor: 'danger'

            }

          ]
        },

        {
          label: '当前代付接单状态',
          prop: 'payReceiveFlag',
          type: 'status',
          options: [
            {
              value: 0,
              label: '开启'
            },
            {
              value: 1,
              label: '关闭',
              tagColor: 'danger'

            }

          ]
        },

        {
          label: '当前收款接单状态',
          prop: 'colReceiveFlag',
          type: 'status',
          options: [
            {
              value: 0,
              label: '开启'
            },
            {
              value: 1,
              label: '关闭',
              tagColor: 'danger'

            }

          ]
        },
        {
          label: '创建时间',
          prop: 'createTime',
          type: 'date',
          search: 1

        },
        {
          label: '更新时间',
          prop: 'updateTime',
          type: 'date'

        }

      ],

      dataObj03: {
        name: '总览',
        listUrl: '/agent/agentInfo/getCommissionOverview',
        noSearch: 1,
        noOperation: 1,
        dataFormObj: {}

      },
      formArr03: [
        {
          label: '佣金总额',
          prop: 'totalCommission',
          type: 'input'
        },
        {
          label: '商户佣金总额',
          prop: 'totalMchCommission',
          type: 'input'

        },

        {
          label: '承兑商佣金总额',
          prop: 'totalAccCommission',
          type: 'input'

        },

        {
          label: '直邀请商户佣金总额',
          prop: 'directInviteTotalMchCommission',
          type: 'input'

        },

        {
          label: '间邀商户佣金总额',
          prop: 'indirectInviteTotalMchCommission',
          type: 'input'
        },

        {
          label: '直邀承兑商佣金总额',
          prop: 'directInviteTotalAccCommission',
          type: 'input'
        },

        {
          label: '直邀承兑商收款佣金总额',
          prop: 'directInviteReceiveTotalAccCommission',
          type: 'input'
        },

        {
          label: '直邀承兑商代付佣金总额',
          prop: 'directInvitePayTotalAccCommission',
          type: 'input'
        },

        {
          label: '间邀承兑商佣金总额',
          prop: 'indirectInviteTotalAccCommission',
          type: 'input'
        },

        {
          label: '间邀承兑商收款佣金总额',
          prop: 'indirectInviteReceiveTotalAccCommission',
          type: 'input'
        },
        {
          label: '间邀承兑商代付佣金总额',
          prop: 'indirectInvitePayTotalAccCommission',
          type: 'input'

        }

      ],

      dataObj003: {
        name: '承兑商',
        listUrl: '/agent/agentInfo/getCommissionPage',
        dataFormObj: {
          queryType: 'acceptor'

        }

      },
      formArr003: [
        {
          label: '序号',
          prop: 'index',
          type: 'index'
        },
        {
          label: '承兑商UID',
          prop: 'accUid',
          type: 'input',
          search: 1

        },

        {
          label: '是否直属',
          prop: 'directlyUnderFlag',
          type: 'status',
          search: 1,
          options: [
            {
              value: 'yes',
              label: '是'
            },
            {
              value: 'no',
              label: '否'
            }

          ]

        },

        {
          label: '接单总额',
          prop: 'receivingAmount',
          type: 'input'

        },

        {
          label: '收款接单总额',
          prop: 'receivingReceiveAmount',
          type: 'input'
        },

        {
          label: '代付接单总额',
          prop: 'receivingPayAmount',
          type: 'input'
        },

        {
          label: '获得收款返佣比例',
          prop: 'colRate',
          type: 'input'
        },

        {
          label: '获得代付返佣比例',
          prop: 'payRate',
          type: 'input'
        },

        {
          label: '获得佣金总额',
          prop: 'commissionTotal',
          type: 'input'
        },

        {
          label: '获得收款佣金总额',
          prop: 'receiveCommission',
          type: 'input'
        },
        {
          label: '获得代付佣金总额',
          prop: 'payCommission',
          type: 'input'

        },
        {
          label: '最后更新时间',
          prop: 'updateTime',
          type: 'input'

        }

      ],
      dataObj3: {
        name: '商户',
        listUrl: '/agent/agentInfo/getCommissionPage',
        dataFormObj: {
          queryType: 'menchant'

        }

      },
      formArr3: [
        {
          label: '序号',
          prop: 'index',
          type: 'index'
        },
        {
          label: '商户UID',
          prop: 'mchUid',
          type: 'input',
          search: 1

        },

        {
          label: '是否直属',
          prop: 'directlyUnderFlag',
          type: 'status',
          search: 1,
          options: [
            {
              value: 'yes',
              label: '是'
            },
            {
              value: 'no',
              label: '否'
            }

          ]

        },

        {
          label: '发单总额',
          prop: 'billingAmount',
          type: 'input'

        },

        {
          label: '获得返佣比例',
          prop: 'rebateRatio',
          type: 'input'
        },

        {
          label: '获得佣金总额',
          prop: 'commissionTotal',
          type: 'input'
        },
        {
          label: '最后更新时间',
          prop: 'updateTime',
          type: 'input'

        }

      ],

      dataObj4: {
        name: '获得佣金明细-承兑商',
        listUrl: '/agent/agentInfo/getAccCommissionDetailPage',
        noOperation: 1,
        dataFormObj: {
          queryType: 'acceptor',
          accId: ''

        }

      },
      formArr4: [
        {
          label: '序号',
          prop: 'index',
          type: 'index'
        },
        {
          label: '承兑商UID',
          prop: 'accUid',
          type: 'input',
          search: 1
        },

        {
          label: '订单编号',
          prop: 'orderNo',
          type: 'input',
          search: 1

        },

        {
          label: '订单类型',
          prop: 'orderType',
          type: 'status',
          search: 1,

          options: [
            {
              value: 'RECEIVE',
              label: '收款'
            },
            {
              value: 'PAY',
              label: '代付'
            }

          ]
        },

        {
          label: '订单法币金额',
          prop: 'orderAmount',
          type: 'input'
        },

        {
          label: '订单当时汇率',
          prop: 'exchangeRate',
          type: 'input'
        },

        {
          label: '订单虚拟币金额',
          prop: 'tokenAmount',
          type: 'input'
        },

        {
          label: '获得返佣比例',
          prop: 'colRate',
          type: 'input'
        },

        {
          label: '获得佣金',
          prop: 'commission',
          type: 'input'
        },

        {
          label: '结算状态',
          prop: 'settleFlag',
          type: 'status',
          search: 1,
          options: [
            {
              value: 'UNSETTLE',
              label: '未结算'
            },
            {
              value: 'SETTLE',
              label: '已结算'
            }
          ]
        },
        {
          label: '接单时间',
          prop: 'receivingTime',
          type: 'input'
        }

      ],

      dataObj04: {
        name: '获得佣金明细-商户',
        listUrl: '/agent/agentInfo/getAccCommissionDetailPage',
        noOperation: 1,
        dataFormObj: {
          queryType: 'menchant',
          accId: ''

        }

      },
      formArr04: [
        {
          label: '序号',
          prop: 'index',
          type: 'index'
        },
        {
          label: '商户UID',
          prop: 'mchUid',
          type: 'input',
          search: 1
        },

        {
          label: '订单编号',
          prop: 'orderNo',
          type: 'input',
          search: 1

        },

        {
          label: '订单法币金额',
          prop: 'orderAmount',
          type: 'input'
        },

        {
          label: '订单当时汇率',
          prop: 'exchangeRate',
          type: 'input'
        },

        {
          label: '订单虚拟币金额',
          prop: 'tokenAmount',
          type: 'input'
        },

        {
          label: '获得返佣比例',
          prop: 'colRate',
          type: 'input'
        },

        {
          label: '获得佣金',
          prop: 'commission',
          type: 'input'
        },

        {
          label: '结算状态',
          prop: 'settleFlag',
          type: 'status',
          search: 1,
          options: [
            {
              value: 'UNSETTLE',
              label: '未结算'
            },
            {
              value: 'SETTLE',
              label: '已结算'
            }
          ]
        },
        {
          label: '接单时间',
          prop: 'receivingTime',
          type: 'input'
        }

      ],
      isUpdate: true,
      agentId: ''
    }
  },

  mounted() {
    this.agentId = this.$route.query.agentId
    this.dataObj.dataFormObj['agentId'] = this.agentId
    this.dataObj2.dataFormObj['agentId'] = this.agentId
    this.dataObj03.dataFormObj['agentId'] = this.agentId
    this.dataObj003.dataFormObj['agentId'] = this.agentId
    this.dataObj3.dataFormObj['agentId'] = this.agentId
    this.dataObj4.dataFormObj['agentId'] = this.agentId
    this.dataObj04.dataFormObj['agentId'] = this.agentId
    this.proxyListDetail()
  },
  methods: {
    detailFn(row) {
      this.isUpdate = false
      this.$route.query.agentId = row.agentId
      this.agentId = row.agentId
      this.dataObj.dataFormObj['agentId'] = this.agentId
      this.dataObj2.dataFormObj['agentId'] = this.agentId
      this.dataObj03.dataFormObj['agentId'] = this.agentId
      this.dataObj003.dataFormObj['agentId'] = this.agentId
      this.dataObj3.dataFormObj['agentId'] = this.agentId
      this.dataObj4.dataFormObj['agentId'] = this.agentId
      this.dataObj04.dataFormObj['agentId'] = this.agentId
      setTimeout(() => {
        this.isUpdate = true
      })
    },
    proxyListDetail() {
      this.$axios.get('/agent/agentInfo/getAgentBaseInfo', {
        params: {
          agentId: this.agentId
        }
      }).then((res) => {
        this.detail = res
      })
    },

    getFn(row) {
      this.isShow4 = false

      this.activeName = '4'
      this.dataObj4.dataFormObj['accId'] = row.accId
      this.dataObj04.dataFormObj['accId'] = row.accId
      setTimeout(() => {
        this.isShow4 = true
      })
    }

  }
}
</script>
<style lang="scss" >
.proxyListDetail {
  .el-tabs__header {
    padding: 20px 20px 0;
    margin-bottom: 0;
  }
}
</style>
<style lang="scss" scoped>
.top {
  padding: 20px 20px 0;

  .addBtn {
    margin-bottom: 10px;
  }
}

.dis {
  display: flex;
  width: 100%;
}

.list {
  border: 1px solid #dfe6ec;
  width: 20%;
  font-size: 14px;
  margin-right: 5px;

  >div {
    text-align: center;
    display: flex;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #dfe6ec;

    p {
      margin: 0;
      padding: 0;
      font-size: 13px;

    }

    >p:nth-child(1) {
      background: #f5f7fa;
      width: 160px;
      word-break: keep-all;
    }

    >p:nth-child(2) {
      width: 60%;
    }

    >span {
      width: 60%;

      display: inline-block;
    }

  }

  >div:last-child {
    border-bottom: 0;
  }
}

.code {
  text-align: center;

  p {
    margin: 0;
  }

  img {
    width: 160px;
  }

  .set {
    width: 100%;
  }
}
</style>

