<template>
  <div>
    <elTableColumns ref="elTableColumns" :data-obj="dataObj" :form-arr="formArr">
      <template v-slot:userBtn="scope">
        <el-button
          v-if="scope.row.verifyStatus == 0"
          size="small"
          type="primary"
          @click="verifyMch(scope.row)"
        >审核</el-button>

      </template>
    </elTableColumns>
    <el-dialog :close-on-click-modal="false" :visible.sync="isVerifyMch" title="审核" width="600px">
      <el-form>

        <el-form-item label="审核" label-width="140px">
          <el-select v-model="verifyStatus" placeholder="请选择审核" style="width:100%">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="审核原因" label-width="140px">
          <el-input v-model="verifyFailRemark" placeholder="请输入审核原因" type="textarea" />
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="coloseFn2">取消</el-button>

          <el-button type="primary" @click="verifyMchFn">
            确定
          </el-button>
        </span>

      </template>

    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      verifyStatus: '',
      verifyFailRemark: '',
      isVerifyMch: false,
      obj: {},
      options: [
        {
          value: 1,
          label: '审核成功',
          tagColor: 'danger'

        },

        {
          value: 2,
          label: '审核失败',
          tagColor: 'danger'

        }
      ],
      dataObj: {
        name: '新增商户',
        listUrl: '/agent/mchVerifyMgr/getVerifyPage',
        addUrl: '/agent/mchVerifyMgr/saveMchApplay',
        detailUrl: '/agent/mchVerifyMgr/getVerifyDetail/',
        merchant_plat_type: '/agent/common/dict/type/merchant_plat_type',
        sys_country_code_name: '/agent/common/dict/type/sys_country_code_name',
        getopenChannelCode: '/agent/common/selectAllChannel',

        detailBtnShow: 1,
        deleteId: 'mchId',
        isShowFooter: 1,
        editAddText: '详情'
      },
      formArr: [

        {
          label: '录单代理UID',
          prop: 'enterUid',
          type: 'input',
          search: 1,

          isItem: 1
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
          label: '商户名称',
          prop: 'mchName',
          type: 'input',
          addOrEdit: 1,
          isItem: 1

        },
        {
          label: '平台类型',
          prop: 'platType',
          type: 'status',
          search: 1,
          options: [],
          addOrEdit: 1,
          isItem: 1

        },
        {
          label: '商户所属国家',
          prop: 'countryCode',
          type: 'status',
          options: [],
          noList: 1,
          addOrEdit: 1,
          isItem: 1

        },
        {
          label: '需开通国家',
          prop: 'openCountry',
          type: 'input',
          options: [],
          search: 1,
          isItem: 1

        },
        {
          label: '通道代码',
          prop: 'openChannelCode',
          type: 'status',
          search: 1,
          addOrEdit: 1,
          options: [],

          isItem: 1

        },
        {
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
          type: 'input',
          addOrEdit: 1,
          isItem: 1

        }, {
          label: '申请合作费率',
          prop: 'mchRate',
          type: 'input',
          addOrEdit: 1,
          rightMark: '%',
          isItem: 1

        }, {
          label: '申请结算周期',
          prop: 'settleMode',
          type: 'input',
          addOrEdit: 1,
          rightMark: 'H',
          isItem: 1

        }, {
          label: '首笔充值金额',
          prop: 'firstRechargeAmount',
          addOrEdit: 1,
          type: 'input',
          rightMark: 'USDT',
          isItem: 1

        },

        {
          label: '审核状态',
          prop: 'verifyStatus',
          type: 'status',
          search: 1,

          options: [
            {
              value: 0,
              label: '待审核',
              tagColor: 'info'

            },
            {
              value: 1,
              label: '审核成功',
              tagColor: 'danger'

            },

            {
              value: 2,
              label: '审核失败',
              tagColor: 'danger'

            }

          ]
        },
        {
          label: '审核备注',
          prop: 'verifyFailRemark',
          type: 'textarea',
          noList: 1

        },

        {
          label: '申请时间',
          prop: 'createTime',
          type: 'date',
          search: 1,
          isItem: 1

        },
        {
          label: '审核时间',
          prop: 'verifyTime',
          type: 'input',
          isItem: 1

        }

      ]
    }
  },

  mounted() {
    this.merchant_plat_type()
    this.sys_country_code_name()
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
    sys_country_code_name() {
      this.$axios.get(this.dataObj.sys_country_code_name).then((res) => {
        this.formArr.forEach((r) => {
          if (r.prop == 'countryCode') {
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
    coloseFn2() {
      this.isVerifyMch = false
      this.verifyStatus = ''
      this.verifyFailRemark = ''
    },
    verifyMch(row) {
      this.obj = row
      this.isVerifyMch = true
    },

    verifyMchFn() {
      this.$prompt('请输入谷歌验证码', '安全验证', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.+$/,
        inputErrorMessage: '谷歌验证码不能为空'
      }).then(({ value }) => {
        this.$axios.put('/agent/mchVerifyMgr/verifyMch', {
          verifyStatus: this.verifyStatus,
          verifyFailRemark: this.verifyFailRemark,
          mchId: this.obj.mchId,
          googleCode: value

        }).then(() => {
          this.$message({
            message: '审核成功',
            type: 'success'
          })
          this.coloseFn2()
          this.$refs.elTableColumns.resetQuery()
        })
      })
    }

  }
}
</script>
<style lang="scss" scoped></style>

