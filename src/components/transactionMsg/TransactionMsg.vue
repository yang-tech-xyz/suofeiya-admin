<template>

  <div class="box">

    <el-dialog
        :modal-append-to-body="false"
        append-to-body
        :close-on-click-modal="false"
        :visible.sync="isUpdateRateBTC"
        title="BTC提现审批"
        width="800px"
    >
      <el-form>
        <el-form-item label="事务编号" label-width="200px">
          <el-input
              v-model="transactionNo"
              placeholder="请输入事务编号"
              disabled

              type="text"
          />
        </el-form-item>
        <el-form-item label="BTC提现生成的hash值" label-width="200px">
          <el-input
              v-model="hash"
              placeholder="请输入BTC提现生成的hash值"
              type="text"
          />
        </el-form-item>
        <el-form-item label="是否通过" label-width="200px">
          <el-radio v-model="pass" :label="true">通过</el-radio>
          <el-radio v-model="pass" :label="false">不通过</el-radio>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
              @click="
              isUpdateRateBTC = false
              transactionNo = ''
            "
          >
            取消
          </el-button>

          <el-button type="primary" @click="personal_sign">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
        :modal-append-to-body="false"
        append-to-body
        :close-on-click-modal="false"
        :visible.sync="isUpdateRate"
        title="提现审批"
        width="800px"
    >
      <el-form>
        <el-form-item label="事务编号" label-width="200px">
          <el-input
              v-model="transactionNo"
              placeholder="请输入事务编号"
              disabled
              type="text"
          />
        </el-form-item>
        <el-form-item label="是否通过" label-width="200px">
          <el-radio v-model="pass" :label="true">通过</el-radio>
          <el-radio v-model="pass" :label="false">不通过</el-radio>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
              @click="
              isUpdateRate = false
              transactionNo = ''
            "
          >
            取消
          </el-button>

          <el-button type="primary" @click="personal_sign2">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <div class="tag" v-show="tableData.length!=0"></div>

    <el-tooltip  v-model="showTooltip"   content="消息" effect="light" placement="bottom" >
      <div class="suoImg">
        <img src="../../assets/img/10.png" alt=""/>
      </div>

      <div slot="content">
        <el-table :data="tableData" stripe>
          <el-table-column
              prop="chainId"
              label="节点id"
              width="80">
          </el-table-column>
          <el-table-column
              prop="tokenId"
              label="币种id"
              width="100">
          </el-table-column>
          <el-table-column
              prop="status"
              label="事务状态"
              width="90">
            <template v-slot="scope">
              <span>{{ scope.row.status=='0x0'?'未审核':scope.row.status=='0x1'?'审核通过':'审核拒绝'  }}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="symbol"
              label="symbol"
              width="80">
          </el-table-column>
          <el-table-column
              prop="tokenAmount"
              label="数量"
              width="80">
            <template v-slot="scope">
              <span>{{ scope.row.tokenAmount || scope.row.withdrawAmount }}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="userId"
              label="用户id"
              width="80">
          </el-table-column>
          <el-table-column
              prop="transNo"
              label="事务号"
              width="160">
          </el-table-column>
          <el-table-column
              prop="withdrawReceiveAddress"
              label="提现接收地址"
              width="200">
          </el-table-column>
          <el-table-column label="操作" width="260">
            <template slot-scope="scope">

              <el-button  style="margin-bottom: 10px;"  v-if="scope.row.symbol == 'BTC' && scope.row.transNo" @click="showTooltip=false;isUpdateRateBTC = true;transactionNo=scope.row.transNo">
                BTC提现审批
              </el-button>
              <el-button style="margin-bottom: 10px;"  v-if="scope.row.transNo" @click="showTooltip=false;isUpdateRate = true;transactionNo=scope.row.transNo;">
                提现审批
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </el-tooltip>

  </div>

</template>

<script>
import server from "@/utils/request"

export default {
  name: 'TransactionMsg',
  data() {
    return {
      tableData: [],
      showTooltip:false,
      isUpdateRateBTC:false,
      isUpdateRate:false,
      transactionNo:"",
      hash:"",
      pass:false,

    }
  },
  mounted() {
    setInterval(() => {
      if(this.$store.state.user.token){
        this.load();
      }
    }, 2000)
  },
  methods: {
    load() {
      server.get("/transaction/unAudit", {notShowError: true}).then(data => {
        this.tableData = data
      })
    },
    personal_sign() {
      var self = this
      var timestamp = 'sign_' + new Date().getSeconds()
      this.showTooltip = false;
      try {
        window.ethereum
            .enable()
            .then(function (accounts) {
              console.log(accounts)
              window.ethereum
                  .request({
                    method: 'personal_sign',
                    params: [
                      timestamp,
                      window.ethereum.selectedAddress.toLowerCase(),
                    ],
                  })
                  .then((signature) => {
                    self.$axios
                        .post('/transaction/withdrawBTCAudit', {
                          signMsg: signature,
                          content: timestamp,
                          pass: self.pass,
                          hash: self.hash,
                          transactionNo: self.transactionNo,
                        })
                        .then((res) => {
                          if (res.code == 200) {
                            console.log(res)
                            self.transactionNo = ''
                            self.hash = ''
                            self.pass = true
                            self.isUpdateRateBTC = false
                            self.$refs.elTableColumns.resetQuery()
                          }
                        })
                        .catch((err) => {
                          self.$message({
                            message: '操作失败',
                            type: 'warning',
                          })
                        })
                  })
            })
            .catch(function (reason) {
              self.$message({
                message: '操作失败',
                type: 'warning',
              })
            })
      } catch (error) {
        this.$message({
          message: '请下载小狐狸',
          type: 'warning',
        })
      }
    },
    personal_sign2() {
      var self = this
      var timestamp = 'sign_' + new Date().getTime()
      this.showTooltip = false;

      try {
        window.ethereum
            .enable()
            .then(function (accounts) {
              window.ethereum
                  .request({
                    method: 'personal_sign',
                    params: [
                      timestamp,
                      window.ethereum.selectedAddress.toLowerCase(),
                    ],
                  })
                  .then((signature) => {
                    self.$axios
                        .post('/transaction/withdrawAudit', {
                          signMsg: signature,
                          content: timestamp,
                          pass: self.pass,
                          transactionNo: self.transactionNo,
                        })
                        .then((res) => {
                          if (res.code == 200) {
                            console.log(res)
                            self.transactionNo = ''
                            self.pass = true
                            self.isUpdateRate = false

                            self.$refs.elTableColumns.resetQuery()
                          }
                        })
                        .catch((err) => {
                          self.$message({
                            message: '操作失败',
                            type: 'warning',
                          })
                        })
                  })
            })
            .catch(function (reason) {
              self.$message({
                message: '操作失败',
                type: 'warning',
              })
            })
      } catch (error) {
        this.$message({
          message: '请下载小狐狸',
          type: 'warning',
        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  margin-right: 20px;

  .tag {
    position: absolute;
    top: 5px;
    right: 1px;
    width: 7px;
    height: 8px;
    border-radius: 50%;
    background: red;
  }
}

.suoImg {
  height: 100%;
  display: inline-block;
  vertical-align: top;
  padding: 0 5px;
  cursor: pointer;

  img {
    width: 26px;
    vertical-align: middle;
  }
}

.suoImg:hover {
  background: rgba(0, 0, 0, 0.025);
}
</style>