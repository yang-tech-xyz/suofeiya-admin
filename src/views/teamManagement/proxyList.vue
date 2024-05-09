<template>
  <div>
    <elTableColumns ref="elTableColumns" :data-obj="dataObj" :form-arr="formArr">
      <template v-slot:btnOther>
        <el-button
          class="addBtn"
          type="primary"
          icon="el-icon-plus"
          @click="upgradeAgent = true; getAgentUid()"
        >新增代理</el-button>

      </template>
      <template v-slot:userBtn="scope">
        <el-button v-if="scope.row.status == 1" size="small" type="text" @click="updateStatus(scope.row)">启用</el-button>
        <el-button v-else size="small" type="text" style="color:red" @click="updateStatus(scope.row)">禁用</el-button>
        <el-button
          size="small"
          type="text"
          @click="goTo('/teamManagement/proxyListDetail?agentId=' + scope.row.agentId)"
        >详情</el-button>
        <el-button size="small" type="text" @click="isUpdateRate = true; obj = scope.row">调整返佣比例</el-button>
        <el-button size="small" type="text" @click="resetPassword(scope.row, 1)">重置密码</el-button>
      </template>
    </elTableColumns>
    <el-dialog :close-on-click-modal="false" :visible.sync="isDialog" title="查看" width="800px">
      <div class="borBox">
        <div class="title">商户基础信息</div>
        <div class="list">
          <div>
            <p>商户UID</p>
            <p>{{ detail.mchId }}</p>
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

    <el-dialog :close-on-click-modal="false" :visible.sync="isUpdateRate" title="调整返佣比例" width="600px">
      <el-form>

        <el-form-item label="商户返佣比例" label-width="140px">
          <el-input v-model="obj.mchRate" placeholder="请输入商户返佣比例" type="number" />
          <span class="set">%</span>
        </el-form-item>
        <el-form-item label="承兑商收款佣金" label-width="140px">
          <el-input v-model="obj.colRate" placeholder="请输入承兑商收款佣金" type="number" />
          <span class="set">%</span>
        </el-form-item>
        <el-form-item label="承兑商代付佣金" label-width="140px">
          <el-input v-model="obj.payRate" placeholder="请输入承兑商代付佣金" type="number" />
          <span class="set">%</span>
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closerFn">取消</el-button>

          <el-button type="primary" @click="saveFn">
            确定调整
          </el-button>
        </span>

      </template>

    </el-dialog>

    <el-dialog :close-on-click-modal="false" :visible.sync="isResetPassword" :title="title" width="600px">
      <el-form>

        <el-form-item label="输入修改密码" label-width="140px">
          <el-input v-model="newPwd" placeholder="默认初始密码：123456" type="password" />
        </el-form-item>
        <el-form-item label="确认修改密码" label-width="140px">
          <el-input v-model="confirmPwd" placeholder="默认初始密码：123456" type="password" />
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="coloseFn2">取消</el-button>

          <el-button type="primary" @click="resetPasswordFn">
            确定
          </el-button>
        </span>

      </template>

    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="upgradeAgent"
      title="新增代理"
      width="600px"
      :before-close="agentInfoSaveCloseFn"
    >
      <el-form>
        <el-form-item label="代理UID" label-width="140px">
          <el-input v-model="getAccountDetail.agentUid" disabled placeholder="请输入代理UID" type="text" />
        </el-form-item>
        <el-form-item label="姓名" label-width="140px">
          <el-input v-model="getAccountDetail.agentName" placeholder="请输入姓名" type="text" />
        </el-form-item>
        <el-form-item label="邮箱" label-width="140px">
          <el-input v-model="getAccountDetail.email" placeholder="请输入邮箱" type="text" />
        </el-form-item>
        <el-form-item label="手机号" label-width="140px">
          <div class="areaCode">
            <el-select
              v-model="getAccountDetail.areaCode"
              style="width:160px !important;margin-right: 4px;"
              filterable
              placeholder="请选择国家"
            >
              <el-option
                v-for="(item, idx) in countryArr"
                :key="idx"
                :label="'+' + item.value + ' ' + item.label"
                :value="item.value"
              />
            </el-select>
            <el-input v-model="getAccountDetail.mobile" placeholder="请输入手机号" type="text" />
          </div>

        </el-form-item>

        <el-form-item label="登录初始密码" label-width="140px">
          <el-input v-model="getAccountDetail.password" placeholder="请输入登录初始密码" type="password" />
        </el-form-item>
        <el-form-item label="确认初始密码" label-width="140px">
          <el-input v-model="getAccountDetail.confirmPwd" placeholder="请输入确认初始密码" type="password" />
        </el-form-item>
        <el-form-item label="设置收款返佣比例" label-width="140px">
          <el-input v-model="getAccountDetail.colRate" placeholder="请输入设置收款返佣比例" type="text">
            <div slot="append">%</div>

          </el-input>
          <div class="clickPush" @click="getAccountDetail.colRate = dataRes.defaultColRate">
            我当前邀请承兑商收款返佣比例：{{ dataRes.defaultColRate }}%</div>
        </el-form-item>
        <el-form-item label="设置代付返佣比例" label-width="140px">
          <el-input v-model="getAccountDetail.payRate" placeholder="请输入设置代付返佣比例" type="text">
            <div slot="append">%</div>

          </el-input>
          <div class="clickPush" @click="getAccountDetail.payRate = dataRes.defaultPayRate">
            我当前邀请承兑商代付返佣比例：{{ dataRes.defaultPayRate }}%</div>
        </el-form-item>
        <el-form-item label="设置商户返佣比例" label-width="140px">
          <el-input v-model="getAccountDetail.mchRate" placeholder="请输入设置商户返佣比例" type="text">
            <div slot="append">%</div>

          </el-input>
          <div class="clickPush" @click="getAccountDetail.mchRate = dataRes.defaultMchRate">
            我当前邀请商户返佣比例：{{ dataRes.defaultMchRate }}%</div>

        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="agentInfoSaveCloseFn">取消</el-button>
          <el-button type="primary" @click="agentInfoSave">
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
      isDialog: false,
      isUpdateRate: false,
      negative: 1,
      changeRate: '',
      changeRemark: '',
      mchRate: '',
      obj: {},
      detail: {},
      getAccountDetail: {
        agentUid: '',
        email: '',
        areaCode: '',
        mobile: '',
        password: '',
        confirmPwd: '',
        colRate: '',
        payRate: '',
        mchRate: ''
      },

      type: '',
      title: '',
      newPwd: '',
      confirmPwd: '',
      isResetPassword: false,
      upgradeAgent: false,

      countryArr: [],

      dataObj: {
        name: '代理列表',
        listUrl: '/agent/agentInfo/getAgentPage',

        updateStatus: '/agent/agentInfo/updateStatus',
        updateRate: '/agent/agentInfo/updateRate',
        detailUrl: '/agent/agentInfo/getAgentDetail/',
        sys_country_code_name: '/agent/common/dict/type/sys_country_code_name',
        getAgentUid: '/agent/agentInfo/generateAgentUid',
        getDefaultRate: '/agent/agentInfo/getDefaultRate',

        operateWidth: '250',
        deleteId: 'agentId'
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

        }, {
          label: '上级Uid',
          prop: 'supUid',
          type: 'input',
          search: 1

        }, {
          label: '总代理人数',
          prop: 'agentNum',
          type: 'input'

        }, {
          label: '上级设置收款返佣比例',
          prop: 'colRate',
          type: 'input',
          width: '170'

        }, {
          label: '上级设置代付返佣比例',
          prop: 'payRate',
          type: 'input',
          width: '170'

        }, {
          label: '上级设置商户返佣比例',
          prop: 'mchRate',
          type: 'input',
          width: '170'

        }, {
          label: '一级代理人数',
          prop: 'firstAgentNum',
          type: 'input'

        }, {
          label: '间接代理人数',
          prop: 'indirectAgentNum',
          type: 'input',

          search: 1

        }, {
          label: '直接邀请商户数',
          prop: 'directMchNum',
          type: 'input'

        }, {
          label: '间接邀请商户数',
          prop: 'indirectMchNum',
          type: 'input'

        }, {
          label: '直接邀请承兑商人数',
          prop: 'directAccNum',
          type: 'input',
          width: '150'

        }, {
          label: '间接邀请承兑商人数',
          prop: 'indirectAccNum',
          type: 'input',
          width: '150'

        }, {
          label: '状态',
          prop: 'status',
          type: 'status',
          isItem: 1,
          search: 1,

          options: [
            {
              value: 0,
              label: '已启用'
            },
            {
              value: 1,
              label: '未启用',
              tagColor: 'danger'

            }

          ]

        },
        {
          label: '成为代理时间',
          prop: 'createTime',
          type: 'date',
          search: 1,
          width: '160'
        }

      ],
      dataRes: {}
    }
  },

  mounted() {
    this.sys_country_code_name()
    this.getDefaultRate()
  },

  methods: {
    getDefaultRate() {
      this.$axios.get(this.dataObj.getDefaultRate).then((res) => {
        this.dataRes = res
      })
    },
    getAgentUid() {
      this.$axios.get(this.dataObj.getAgentUid).then((res) => {
        this.getAccountDetail.agentUid = res
      })
    },
    sys_country_code_name() {
      this.$axios.get(this.dataObj.sys_country_code_name).then((res) => {
        this.countryArr = res
      })
    },
    coloseFn2() {
      this.newPwd = ''
      this.confirmPwd = ''
      this.isResetPassword = false
    },
    resetPasswordFn() {
      let url = ''
      if (this.type == 1) {
        url = '/admin/agentInfo/resetPwd'
      }

      if (this.type == 1 || this.type == 2) {
        if (!this.newPwd || !this.confirmPwd) {
          return this.$message.error('密码不能为空')
        }
        if (this.newPwd != this.confirmPwd) {
          return this.$message.error('两次密码输入不一致')
        }
      }

      this.$prompt('请输入谷歌验证码', '安全验证', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.+$/,
        inputErrorMessage: '谷歌验证码不能为空'
      }).then(({ value }) => {
        this.$axios.put(url, {
          newPwd: this.newPwd,
          confirmPwd: this.confirmPwd,
          agentId: this.obj.agentId,
          googleCode: value

        }).then(() => {
          this.coloseFn2()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.$refs.elTableColumns.resetQuery()
        })
      })
    },
    resetPassword(row, type) {
      this.obj = row
      this.type = type
      if (type == 1) {
        this.title = '重置登录密码'
        this.isResetPassword = true
      }
    },

    detailUrl(row) {
      this.$axios.get(this.dataObj.detailUrl + row.mchId).then((res) => {
        this.detail = res
        this.isDialog = true
      })
    },

    updateStatus(row) {
      this.$confirm(row.status == 0 ? '确定禁用, 是否继续?' : '确定启用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$prompt('请输入谷歌验证码', '安全验证', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.+$/,
          inputErrorMessage: '谷歌验证码不能为空'
        }).then(({ value }) => {
          this.$axios.put(this.dataObj.updateStatus, {
            status: row.status == 0 ? 1 : 0,
            agentId: row.agentId,
            googleCode: value

          }).then(() => {
            this.$message({
              message: row.status == 0 ? '禁用成功' : '启用成功',
              type: 'success'
            })
            this.$refs.elTableColumns.resetQuery()
          })
        })
      })
    },
    closerFn() {
      this.isUpdateRate = false
    },
    saveFn() {
      this.$prompt('请输入谷歌验证码', '安全验证', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.+$/,
        inputErrorMessage: '谷歌验证码不能为空'
      }).then(({ value }) => {
        this.$axios.put(this.dataObj.updateRate, {
          agentId: this.obj.agentId,
          mchRate: this.obj.mchRate,
          colRate: this.obj.colRate,
          payRate: this.obj.payRate,
          googleCode: value

        }).then(() => {
          this.$message({
            message: '调整成功',
            type: 'success'
          })
          this.closerFn()
          this.$refs.elTableColumns.resetQuery()
        })
      })
    },
    agentInfoSaveCloseFn() {
      this.upgradeAgent = false
      this.getAccountDetail = {
        agentUid: '',
        email: '',
        areaCode: '',
        mobile: '',
        password: '',
        confirmPwd: '',
        colRate: '',
        payRate: '',
        mchRate: ''
      }
    },
    agentInfoSave() {
      this.$prompt('请输入谷歌验证码', '安全验证', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.+$/,
        inputErrorMessage: '谷歌验证码不能为空'
      }).then(({ value }) => {
        this.$axios.post('/agent/agentInfo/save', { ...this.getAccountDetail, googleCode: value }).then(() => {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.agentInfoSaveCloseFn()
          this.$refs.elTableColumns.resetQuery()
        })
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

.addBtn {
  margin-bottom: 20px;
}

.areaCode {
  height: 44px;
  z-index: 1;
  display: flex;
  width: 100%;

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
  height: 34px;
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  top: 1px;
}

.clickPush {
  cursor: pointer;
  color: #1890ff;
}</style>

