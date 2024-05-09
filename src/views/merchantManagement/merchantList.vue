<template>
  <div>
    <elTableColumns ref="elTableColumns" :data-obj="dataObj" :form-arr="formArr">
      <template v-slot:userBtn="scope">
        <el-button size="small" type="primary" @click="detailUrl(scope.row)">详情</el-button>
        <el-button size="small" @click="getAccountDetailFn(scope.row)">开户信息</el-button>

      </template>
    </elTableColumns>
    <el-dialog :visible.sync="isDialog" title="查看" width="800px">
      <div class="borBox">
        <div class="title"> 商户基础信息</div>
        <div class="list">
          <div>
            <p>商户UID</p>
            <p>{{ detail.mchUid }}</p>
          </div>
          <div>
            <p>商户名称</p>
            <p>{{ detail.mchName }}</p>
          </div>
          <div>
            <p>商户联系工具</p>
            <p>telegram</p>
          </div>
          <div>
            <p>商户联系方式</p>
            <p>{{ detail.contactInfo }}</p>
          </div>
          <div>
            <p>平台类型</p>
            <p>{{ detail.platType }}</p>
          </div>
          <div>
            <p>商户所属国家</p>
            <p>{{ detail.countryName }}</p>
          </div>
          <div>
            <p>开通国家</p>
            <p>{{ detail.openCountry }}</p>
          </div>
          <div>
            <p>商户合作费率</p>
            <p>{{ detail.mchRate }}%</p>
          </div>
          <div>
            <p>结算周期</p>
            <p>{{ detail.settleMode }}/小时</p>
          </div>
          <div>
            <p>首笔充值金额</p>
            <p>{{ detail.firstRechargeAmount }}</p>
          </div>
          <div>
            <p>申请时间</p>
            <p>{{ detail.createTime }}</p>
          </div>
          <div>
            <p>开通时间</p>
            <p>{{ detail.verifyTime }}</p>
          </div>
          <div>
            <p>登录状态</p>
            <p v-if="detail.status == 0">正常</p>
            <p v-if="detail.status == 1">禁用</p>
          </div>
          <div>
            <p>最后登录时间</p>
            <p>{{ detail.lastLoginTime }}</p>
          </div>
          <div>
            <p>最后登录IP</p>
            <p>{{ detail.lastLoginIp }}</p>
          </div>

        </div>
      </div>
      <div class="borBox">
        <div class="title">开户信息</div>
        <div class="list">
          <div>
            <p>登录域名</p>
            <p>{{ detail.mchLoginDomain }}</p>
          </div>
          <div>
            <p>登录密码</p>
            <p>{{ detail.mchLoginPassword }}</p>
          </div>
          <div>
            <p>资金密码</p>
            <p>{{ detail.mchFundPassword }}</p>
          </div>
          <div>
            <p>商户KEY</p>
            <p>{{ detail.mchKey }}</p>
          </div>
          <div>
            <p>商户AES密钥</p>
            <p>{{ detail.mchAes }}</p>
          </div>
          <div>
            <p>下单网关</p>
            <p>{{ detail.mchCreateOrderGateway }}</p>
          </div>
          <div>
            <p>订单查询</p>
            <p>{{ detail.mchQueryOrder }}</p>
          </div>
          <div>
            <p>余额查询</p>
            <p>{{ detail.mchQueryBalance }}</p>
          </div>
          <div>
            <p>API文档</p>
            <p>{{ detail.mchApiDoc }}</p>
          </div>
          <div>
            <p>回调IP白名单</p>
            <p>{{ detail.whiteIp }}</p>
          </div>
          <div>
            <p>开通通道编码</p>
            <p>{{ detail.openChannelCode }}</p>
          </div>

        </div>
      </div>

    </el-dialog>
    <el-dialog :visible.sync="isgetAccountDetail" title="开户信息" width="800px">
      <div class="borBox">
        <div class="list">
          <div>
            <p>登录域名</p>
            <p>{{ getAccountDetail.mchLoginDomain }}</p>
          </div>
          <div>
            <p>登录UID</p>
            <p>{{ getAccountDetail.mchUid }}</p>
          </div>
          <div>
            <p>登录密码</p>
            <p>{{ getAccountDetail.mchLoginPassword }}</p>
          </div>
          <div>
            <p>资金密码</p>
            <p>{{ getAccountDetail.mchFundPassword }}</p>
          </div>
          <div>
            <p>商户KEY</p>
            <p>{{ getAccountDetail.mchKey }}</p>
          </div>
          <div>
            <p>商户AES密钥</p>
            <p>{{ getAccountDetail.mchAes }}</p>
          </div>
          <div>
            <p>下单网关</p>
            <p>{{ getAccountDetail.mchCreateOrderGateway }}</p>
          </div>
          <div>
            <p>订单查询</p>
            <p>{{ getAccountDetail.mchQueryOrder }}</p>
          </div>
          <div>
            <p>余额查询</p>
            <p>{{ getAccountDetail.mchQueryBalance }}</p>
          </div>
          <div>
            <p>API文档</p>
            <p>{{ getAccountDetail.mchApiDoc }}</p>
          </div>
          <div>
            <p>回调IP白名单</p>
            <p>{{ getAccountDetail.whiteIp }}</p>
          </div>
          <div>
            <p>开通通道编码</p>
            <p>{{ getAccountDetail.openChannelCode }}</p>
          </div>

        </div>
      </div>

    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isDialog: false,
      isgetAccountDetail: false,
      detail: {},
      getAccountDetail: {},

      dataObj: {
        name: '商户列表',
        listUrl: '/agent/mchMgr/getMchPage',
        detailUrl: '/agent/mchMgr/getMchDetail/',
        getAccountDetail: '/agent/mchMgr/getAccountDetail/',
        exchange_rate_currency: '/agent/common/dict/type/exchange_rate_currency',
        merchant_plat_type: '/agent/common/dict/type/merchant_plat_type',
        sys_country_code_name: '/agent/common/dict/type/sys_country_code_name',
        getopenChannelCode: '/agent/common/selectAllChannel',
        deleteId: 'mchId'
      },
      formArr: [
        {
          label: '所属代理UID',
          prop: 'mchId',
          type: 'input',
          search: 1

        },
        {
          label: '是否我新增',
          prop: 'isMyMerchant',
          type: 'status',
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
          label: '商户UID',
          prop: 'mchUid',
          type: 'input',

          search: 1

        }, {
          label: '商户名称',
          prop: 'mchName',
          type: 'input',

          search: 1

        }, {
          label: '商户联系工具',
          prop: 'contactType',
          type: 'status',
          addOrEdit: 1,

          search: 1,

          options: [
            {
              value: 0,
              label: 'telegram'
            }

          ],
          isItem: 1

        }, {
          label: '商户联系方式',
          prop: 'contactInfo',
          type: 'input'

        }, {
          label: '平台类型',
          prop: 'platType',
          type: 'status',
          search: 1,
          options: [],
          addOrEdit: 1,
          isItem: 1

        }, {
          label: '开通国家',
          prop: 'openCountry',
          type: 'input'

        }, {
          label: '商户合作费率',
          prop: 'mchRate',
          type: 'input',

          search: 1

        }, {
          label: '通道代码',
          prop: 'openChannelCode',
          type: 'status',
          search: 1,
          addOrEdit: 1,
          options: [],

          isItem: 1

        }, {
          label: '商户KEY',
          prop: 'mchKey',
          type: 'input'

        }, {
          label: '谷歌状态',
          prop: 'googleStatus',
          type: 'status',
          isItem: 1,
          options: [
            {
              value: 0,
              label: '未绑定',
              tagColor: 'danger'

            },
            {
              value: 1,
              label: '已绑定'

            }

          ]

        }, {
          label: '最后登录IP',
          prop: 'lastLoginIp',
          type: 'input'

        }, {
          label: '是否在线',
          prop: 'onlineStatus',
          type: 'status',

          search: 1,

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
          label: '登录状态',
          prop: 'status',
          type: 'status',

          search: 1,

          options: [
            {
              value: 0,
              label: '已启用'
            },
            {
              value: 1,
              label: '禁用',
              tagColor: 'danger'

            }

          ]
        },

        {
          label: '加入时间',
          prop: 'verifyTime',
          type: 'date',
          search: 1,
          width: '100'
        }

      ]
    }
  },

  mounted() {
    this.sys_country_code_name()
    this.merchant_plat_type()
    this.getopenChannelCode()
  },
  methods: {
    getopenChannelCode() {
      this.$axios.get(this.dataObj.getopenChannelCode).then((res) => {
        this.formArr.forEach((r) => {
          if (r.prop == 'openChannelCode') {
            res.forEach((e) => {
              e['value'] = e.channelCode
              e['label'] = e.channelName
            })
            r.options = res
          }
        })
      })
    },
    merchant_plat_type() {
      this.$axios.get(this.dataObj.merchant_plat_type).then((res) => {
        this.formArr.forEach((r) => {
          if (r.prop == 'platType') {
            r.options = res
          }
        })
      })
    },
    sys_country_code_name() {
      this.$axios.get(this.dataObj.sys_country_code_name).then((res) => {
        this.formArr.forEach((r) => {
          if (r.prop == 'countryCode') {
            r.options = res
          }
        })
      })
    },
    detailUrl(row) {
      this.$axios.get(this.dataObj.detailUrl + row.mchId).then((res) => {
        this.detail = res
        this.isDialog = true
      })
    },
    getAccountDetailFn(row) {
      this.$axios.get(this.dataObj.getAccountDetail + row.mchId).then((res) => {
        this.getAccountDetail = res
        this.isgetAccountDetail = true
      })
    }

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
</style>

