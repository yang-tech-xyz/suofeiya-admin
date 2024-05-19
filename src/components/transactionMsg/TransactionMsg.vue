<template>
    <div class="box">
      <div class="tag" v-show="tableData.length!=0"></div>

      <el-tooltip content="消息" effect="light" placement="bottom">
        <div class="suoImg">
          <img src="../../assets/img/10.png" alt=""/>
        </div>

        <div slot="content">
          <el-table :data="tableData" stripe>
            <el-table-column
                prop="id"
                label="id"
                width="50">
            </el-table-column>
            <el-table-column
                prop="type"
                label="事务"
                width="100">
              <template v-slot="scope">
                <span>{{ scope.row.type }}</span>
              </template>
            </el-table-column>
<!--            <el-table-column-->
<!--                prop="transNo"-->
<!--                label="事务号"-->
<!--                width="80">-->
<!--            </el-table-column>-->
            <el-table-column
                prop="symbol"
                label="symbol"
                width="100">
            </el-table-column>
            <el-table-column
                prop="tokenAmount"
                label="数量"
                width="50">
              <template v-slot="scope">
                <span>{{ scope.row.tokenAmount || scope.row.withdrawAmount }}</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="erc20Address"
                label="erc20地址"
                width="200">
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
      tableData: []
    }
  },
  created() {
    setInterval(()=>{
      this.load();
    },2000)
  },
  methods:{
    load(){
      server.get("/transaction/unAudit").then(data => {
        this.tableData = data
        console.log(this.tableData,"this.tableData")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  position: relative;
  margin-right: 20px;

  .tag{
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