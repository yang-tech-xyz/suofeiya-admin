<template>
  <div class="dashboard-container">
    <div class="list2">
      <div class="item">
        <div class="title">今日统计</div>
        <el-row :gutter="12">

          <el-col :span="6">
            <el-card shadow="hover">
              <div>佣金总额</div>
              <div>{{ getTodayStatistics.totalCommission }}</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>已结算佣金</div>
              <div>{{ getTodayStatistics.settledCommission }}</div>

            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>待结算佣金</div>
              <div>{{ getTodayStatistics.unSettledCommission }}</div>

            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>可提现佣金</div>
              <div>{{ getTodayStatistics.withdrawalCommission }}</div>
            </el-card>
          </el-col>

        </el-row>
        <br>
        <el-row :gutter="12">

          <el-col :span="6">
            <el-card shadow="hover">
              <div>商户佣金总额</div>
              <div>{{ getTodayStatistics.totalMchCommission }}</div>

            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>承兑商佣金总额</div>
              <div>{{ getTodayStatistics.totalAccCommission }}</div>

            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>商户成交总额</div>
              <div>{{ getTodayStatistics.totalMchTrade }}</div>

            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>承兑商成交总额</div>
              <div>{{ getTodayStatistics.totalAccTrade }}</div>
            </el-card>
          </el-col>

        </el-row>
      </div>
      <div class="item">
        <div class="title">昨日统计 </div>
        <el-row :gutter="12">

          <el-col :span="6">
            <el-card shadow="hover">
              <div>佣金总额</div>
              <div>{{ getYesterdayStatistics.totalCommission }}</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>已结算佣金</div>
              <div>{{ getYesterdayStatistics.settledCommission }}</div>

            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>待结算佣金</div>
              <div>{{ getYesterdayStatistics.unSettledCommission }}</div>

            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>可提现佣金</div>
              <div>{{ getYesterdayStatistics.withdrawalCommission }}</div>
            </el-card>
          </el-col>

        </el-row>
        <br>
        <el-row :gutter="12">

          <el-col :span="6">
            <el-card shadow="hover">
              <div>商户佣金总额</div>
              <div>{{ getYesterdayStatistics.totalMchCommission }}</div>

            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>承兑商佣金总额</div>
              <div>{{ getYesterdayStatistics.totalAccCommission }}</div>

            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>商户成交总额</div>
              <div>{{ getYesterdayStatistics.totalMchTrade }}</div>

            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>承兑商成交总额</div>
              <div>{{ getYesterdayStatistics.totalAccTrade }}</div>
            </el-card>
          </el-col>

        </el-row>
      </div>

      <div class="item">
        <div class="title">邀请统计

        </div>
        <el-row :gutter="12">

          <el-col :span="6">
            <el-card shadow="hover">
              <div>邀请商户总数</div>
              <div>{{ getInviteStatistics.inviteMchNum }}</div>

            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>直邀商户总数

              </div>
              <div>{{ getInviteStatistics.directInviteMchNum }}</div>

            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>间邀商户总数

              </div>
              <div>{{ getInviteStatistics.indirectInviteMchNum }}</div>

            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>
                昨日新增商户数</div>
              <div>{{ getInviteStatistics.yesterdayMchNum }}</div>

            </el-card>
          </el-col>

        </el-row>
        <br>
        <el-row :gutter="12">

          <el-col :span="6">
            <el-card shadow="hover">
              <div>
                邀请承兑商总数</div>
              <div>{{ getInviteStatistics.inviteAccNum }}</div>

            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>
                直邀承兑商总数</div>
              <div>{{ getInviteStatistics.directInviteAccNum }}</div>

            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>
                间邀承兑商总数</div>
              <div>{{ getInviteStatistics.indirectInviteAccNum }}</div>

            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>昨日新增承兑商数</div>
              <div>{{ getInviteStatistics.yesterdayAccNum }}</div>

            </el-card>
          </el-col>

        </el-row>
      </div>
    </div>
    <div class="dis">
      <div class="title">
        <p>我的信息</p>
        <p>
          <el-button type="text" @click="isShow = true">设置我邀请承兑商返佣比例
          </el-button>

        </p>

      </div>
      <div class="list">
        <div>
          <p>代理UID</p>
          <p>{{ detail.accUid }}</p>
        </div>
        <div>
          <p>姓名 </p>
          <p>{{ detail.nickName }}</p>
        </div>
        <div>
          <p>上级UID</p>
          <p>{{ detail.email }}</p>
        </div>
        <div>
          <p>我当前商户返佣比例 </p>
          <p>{{ detail.areaCode ? '+' : '' }}{{ detail.areaCode }} {{ detail.mobile }}</p>
        </div>

        <div>
          <p>我当前承兑商收款返佣比</p>
          <p>{{ detail.supId }}</p>
        </div>
        <div>
          <p>我当前承兑商代付返佣比</p>
          <p>{{ detail.supUid }}</p>
        </div>
        <div>
          <p>一级代理总数</p>
          <p>{{ detail.authFlag == 0 ? '未认证' : '已认证' }}</p>
        </div>
        <div>
          <p>间接代理总数</p>
          <p>{{ detail.regTime }}</p>

        </div>
        <div>
          <p>直邀承兑商总数</p>
          <p>{{ detail.authTime }}</p>
        </div>
        <div>
          <p>间邀承兑商总数</p>
          <p>{{ detail.googleStatus == 0 ? '未绑定' : '已绑定' }}</p>
        </div>
        <div>
          <p>直邀商户总数</p>
          <p>{{ detail.supIdType == 0 ? '无上级' : detail.supIdType == 1 ? '承兑商' : '代理商' }}</p>
        </div>
        <div>
          <p>间邀商户总数 </p>
          <p>{{ detail.lastLoginIp }}</p>
        </div>
        <div>
          <p>当前状态</p>
          <p>{{ detail.status==1?'禁用':'正常' }}</p>
        </div>
        <div>
          <p>成为代理时间</p>
          <p>{{ detail.createTime }}</p>

        </div>
        <div>
          <p>下级邀请承兑商收款返佣比例

          </p>
          <p>{{ detail.colRate }}</p>
        </div>
        <div>
          <p>下级邀请承兑商代付返佣比例

          </p>
          <p>{{ detail.payRate }}</p>

        </div>
        <div>
          <p>邀请承兑商代码</p>
          <p>{{ detail.inviteCode }}</p>
        </div>
        <div>
          <p>邀请承兑商链接</p>
          <p>{{ detail.xxx }}</p>
        </div>
        <div>
          <p>邀请二维码</p>
          <p><img class="codeImg" src="../../assets/img/1.png" alt=""></p>
        </div>
      </div>

    </div>

    <el-dialog :close-on-click-modal="false" :visible.sync="isShow" title="设置承兑商返佣比例" width="800px">
      <el-form>

        <el-form-item label="设置下级承兑商邀请承兑商收款返佣比例" label-width="300px">
          <el-input v-model="subColRate" placeholder="请输入设置下级承兑商邀请承兑商收款返佣比例" type="number">
            <div slot="append">%</div>

          </el-input>
          <div @click="subColRate=getAgentInfo.colRate">我当前邀请承兑商收款返佣比例：{{ getAgentInfo.colRate }}%</div>

        </el-form-item>

        <el-form-item label="设置下级承兑商邀请承兑商代付返佣比例" label-width="300px">
          <el-input v-model="subPayRate" placeholder="请输入设置下级承兑商邀请承兑商代付返佣比例" type="number">
            <div slot="append">%</div>

          </el-input>
          <div @click="subPayRate=getAgentInfo.payRate">我当前邀请承兑商代付返佣比例：{{ getAgentInfo.payRate }}%</div>

        </el-form-item>
        <el-form-item label="" label-width="300px">

          <div class="red">
            <div>注1：设置比例需大于等于0，小于等于“我当前邀请承兑商收款返佣比
              例”或“我当前邀请承兑商代付返佣比例”；</div>
            <div>注2：请严格设置比例，一旦设置提交后，当前阶段不可再修改！</div>
          </div>

        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="saveFn">
            提交并生成邀请链接
          </el-button>
        </span>

      </template>

    </el-dialog>

  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      detail: {},
      isShow: false,
      agent: '',
      subPayRate: '',
      subColRate: '',
      getYesterdayStatistics: '',
      getTodayStatistics: '',
      getInviteStatistics: '',
      getAgentInfo: ''
    }
  },
  computed: {

  },
  created() {
    this.getYesterdayStatisticsFn()
    this.getTodayStatisticsFn()
    this.getInviteStatisticsFn()
    this.getAgentInfoFn()
  },
  methods: {
    getYesterdayStatisticsFn() {
      this.$axios.get('/agent/home/getYesterdayStatistics').then((res) => {
        this.getYesterdayStatistics = res
      })
    },
    getTodayStatisticsFn() {
      this.$axios.get('/agent/home/getTodayStatistics').then((res) => {
        this.getTodayStatistics = res
      })
    },
    getInviteStatisticsFn() {
      this.$axios.get('/agent/home/getInviteStatistics').then((res) => {
        this.getInviteStatistics = res
      })
    },
    getAgentInfoFn() {
      this.$axios.get('/agent/home/getAgentInfo').then((res) => {
        this.getAgentInfo = res
      })
    },
    saveFn() {
      this.$prompt('请输入谷歌验证码', '安全验证', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.+$/,
        inputErrorMessage: '谷歌验证码不能为空'
      }).then(({ value }) => {
        this.$axios.post('/agent/home/generateInvitationLink', {
          googleCode: value,
          subColRate: this.subColRate,
          subPayRate: this.subPayRate

        }).then(() => {
          this.subColRate = ''
          this.subPayRate = ''
          this.isShow = false
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.$refs.elTableColumns.resetQuery()
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;

  .list2 {
    width: 59%;

    .item {
      border: 1px solid #dfe6ec;
      padding: 20px;
      margin-bottom: 20px;

      .el-card {
        text-align: center;

        >div:nth-child(1) {
          >div:nth-child(1) {
            color: #7F7F7F;
            font-weight: bold;
            margin-bottom: 10px;
          }

          >div:nth-child(2) {
            color: #333;
            font-weight: bold;
            font-size: 22px;
          }
        }

      }

      .el-row {
        >div:nth-child(2) {
          .el-card__body {
            >div:nth-child(2) {
              color: #D9001B !important;
              font-weight: bold;
              font-size: 22px;
            }
          }
        }

        >div:nth-child(3) {
          .el-card__body {
            >div:nth-child(2) {
              color: #F59A23 !important;
              font-weight: bold;
              font-size: 22px;
            }
          }
        }

        >div:nth-child(4) {
          .el-card__body {
            >div:nth-child(2) {
              color: #4B7902 !important;
              font-weight: bold;
              font-size: 22px;
            }
          }
        }

      }

      .title {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 15px;
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 15px;

      }
    }
  }
}

.dis {
  width: 40%;

  .title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 15px;
    border-bottom: 1px solid #dfe6ec;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      padding: 0;
      margin: 0;
    }

  }
}

.list {
  border: 1px solid #dfe6ec;
  margin-bottom: 30px;
  font-size: 14px;
  width: 100%;

  >div {
    text-align: center;
    display: flex;
    border-bottom: 1px solid #dfe6ec;

    p {
      margin: 0;
      padding: 0;
    }

    >p:nth-child(1) {
      background: #f5f7fa;
      width: 35%;
      padding: 13.3px 0;
      display: flex;
      align-items: center;
      justify-content: center;

    }

    >p:nth-child(2) {
      width: 65%;
      padding: 18px 0;
      display: flex;
      align-items: center;
      justify-content: center;

    }
  }

  >div:last-child {
    border-bottom: 0;
  }
}

.codeImg {
  width: 50px;
}

.red {
  color: red;
}
</style>
