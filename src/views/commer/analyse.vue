<template>
  <div class="controller">
    <div ref="pieChart" class="chart-container"/>

<!--    <div ref="lineChart" class="chart-container"/>-->

    <div class="chart-container" >
      <div class="margin-context">
        今日出入金
      </div>
      <div class="search-container">
      </div>
      <el-table :data="withdrawList.data" v-loading="withdrawList.loading" element-loading-text="加载中" :height="'250px'">
        <el-table-column prop="symbol" label="币种"/>
        <el-table-column prop="deposit" label="充值金额"/>
        <el-table-column prop="withdraw" label="提现金额"/>
        <el-table-column prop="diff" label="差额"/>
      </el-table>
    </div>

    <div class="chart-container" style="width: 100%;">
      <div class="margin-context">
        用户邀请统计
      </div>
      <div class="search-container">
        <!-- <el-input v-model="userInput" placeholder="请输入用户名id" class="input" /> -->
        <el-form :inline="true">
          <el-form-item label="用户ID:">
            <el-input v-model="invitePage.walletUserId" placeholder="请输入用户ID" class="input"/>
          </el-form-item>
          <el-form-item label="钱包:">
            <el-input v-model="invitePage.walletInput" placeholder="请输入钱包号" class="input"/>
          </el-form-item>
          <el-button type="primary" @click="getMemberInvitePage">搜索</el-button>
          <el-button type="" @click="invitePage.walletUserId='';invitePage.walletInput=''; getMemberInvitePage()">重置</el-button>
        </el-form>
      </div>
      <el-table :data="invitePage.tableData" v-loading="invitePage.loading" element-loading-text="加载中" :height="'450px'">
        <!-- 表格列 -->
        <el-table-column prop="userId" label="ID"/>
        <el-table-column prop="wallet" label="钱包"/>
        <el-table-column prop="invitedUserId" label="上级用户 ID"/>
        <el-table-column prop="invitedUserWallet" label="上级钱包地址"/>
        <el-table-column prop="inviteMemberCount" label="伞下用户数"/>
        <el-table-column prop="inviteMemberPowerNumber" label="伞下矿机台数"/>
        <el-table-column prop="totalStoreAmount" label="伞下总质押量"/>
      </el-table>
      <div style="margin: 0 auto;width: fit-content">
        <el-pagination
            @size-change="invitePageHandleSizeChange"
            @current-change="invitePageHandleCurrentChange"
            :current-page="invitePage.pageNum"
            :page-sizes="[10,20,50,100]"
            :page-size="invitePage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="invitePage.totalRows"
        />
      </div>
    </div>

    <div class="chart-container" style="width: 100%;">
      <div class="margin-context">
        今日出入金统计
      </div>
      <div class="search-container">
        <el-form :inline="true" >
          <el-form-item label="用户ID:">
            <el-input v-model="withdrawPage.walletUserId" placeholder="请输入用户ID" class="input"  style="width: 130px" />
          </el-form-item>
          <el-form-item label="钱包:">
            <el-input v-model="withdrawPage.walletInput" placeholder="请输入钱包号" class="input"/>
          </el-form-item>
          <el-form-item label="时间范围:">
            <el-date-picker
                style="width: 300px"
                v-model="withdrawPage.time"
                type="daterange"
                format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-button type="primary" @click="getDepositWithdrawPage">搜索</el-button>
          <el-button type="" @click="withdrawPage.walletUserId='';withdrawPage.walletInput='';withdrawPage.time=''; getDepositWithdrawPage()">重置</el-button>
        </el-form>

      </div>
      <el-table :data="withdrawPage.tableData" v-loading="withdrawPage.loadingSymbol" element-loading-text="加载中" :height="'450px'" style="margin-top:30px">
        <el-table-column prop="symbol" label="币种"/>
        <el-table-column prop="deposit" label="充值金额"/>
        <el-table-column prop="withdraw" label="提现金额"/>
        <el-table-column prop="diff" label="差额（充值 - 提现）"/>
      </el-table>
      <div style="margin: 0 auto;width: fit-content">
        <el-pagination
            @size-change="withdrawPageHandleSize"
            @current-change="withdrawPageHandleChange"
            :current-page="withdrawPage.pageNum"
            :page-size="withdrawPage.pageSize"
            :page-sizes="[20,30,50,100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="withdrawPage.total"
        />
      </div>

    </div>

    <div class="chart-container" style="width: 100%;">
      <div class="margin-context">
        用户直推统计
      </div>
      <div class="search-container">
        <el-form :inline="true" >
          <el-form-item label="用户ID:">
            <el-input v-model="userDirect.userId" placeholder="请输入用户ID" class="input"  style="width: 130px" />
          </el-form-item>
          <el-form-item label="钱包:">
            <el-input v-model="userDirect.wallet" placeholder="请输入钱包号" class="input"/>
          </el-form-item>
          <el-button type="primary" @click="getUserDirect()">搜索</el-button>
          <el-button type="" @click="userDirect.userId='';userDirect.wallet='';getUserDirect()">重置</el-button>
        </el-form>

      </div>
      <el-table :data="userDirect.tableData" v-loading="userDirect.loadingSymbol" element-loading-text="加载中" :height="'450px'" style="margin-top:30px">
        <el-table-column prop="userId" label="用户ID"/>
        <el-table-column prop="wallet" label="钱包"/>
        <el-table-column prop="grade" label="等级"/>
        <el-table-column prop="totalInviteUser" label="伞下用户数"/>
        <el-table-column prop="totalInvitePowerNumber" label="伞下矿机台数"/>
      </el-table>
    </div>

  </div>
</template>

<script>
import service from "@/utils/request"
import * as echarts from 'echarts'
import {parseTime} from "@/utils";

export default {
  data() {
    return {
      pieData: {}, // 用于存储饼图数据的变量
      barData: [], // 用于存储柱状图数据的变量
      lineData: [], // 用于存储折线图数据的变量
      scatterData: [], // 用于存储散点图数据的变量
      userDirect:{
        userId:"",
        wallet:"",
        tableData:[],
        loadingSymbol:false
      },
      withdrawPage:{
        walletUserId:"",
        walletInput:'',
        time:[],
        pageNum:0,
        pageSize:20,
        total:0,

        tableData:[],
      },
      withdrawList:{
        data:[],
        loading:false,
      },
      // 用户邀请统计
      invitePage:{
        loading:false,

        tableData:[],
        walletInput:"",
        walletUserId:"",
        pageNum:0,
        pageSize:20,
        totalRows:0,
      },
      tableData: [], // 用于存储表格数据的变量
      tableDataSymbol: [],
      totalRowsSymbol: 0,
      loadingSymbol: false,
      walletInput: '', // 用户输入的钱包号
      walletUserId: '', // 用户输入的用户id
      userInput: 0, // 用户输入的用户名ID
      currentPage: 1, // 当前页数
      pageSize: 9999999, // 每页条数
      totalRows: 0, // 总条数
      loading: false, // 加载状态
      currentPageSymbol: 1,
      pageSizeSymbol: 10,
      symbol: ''
    }
  },
  created() {
    this.getPieData();
    this.getLineData();
  },
  mounted() {
    window.addEventListener('resize', this.handleResize); // 监听窗口大小变化
    this.getDepositWithdrawPage()
    this.getMemberInvitePage();

  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize); // 移除监听器
  },
  methods: {
    handleResize() {
      // 遍历所有图表容器，并调用 echarts 的 resize 方法
      ['pieChart', 'barChart', 'lineChart', 'scatterChart'].forEach(chartRef => {
        if (this.$refs[chartRef]) {
          echarts.getInstanceByDom(this.$refs[chartRef]).resize();
        }
      });
    },
    async getUserDirect(){
      this.userDirect.loadingSymbol = true;
      let data = {}
      if(this.userDirect.userId){
        data.userId  = this.userDirect.userId;
      }
      if( this.userDirect.wallet){
        data.wallet = this.userDirect.wallet
      }
      const response = await service.get("/topSettle/getDirect",{params: data})
      if (response) {
        this.userDirect.tableData = response
        this.userDirect.loadingSymbol = false;
      }
    },
    async getPieData() {
      try {
        const response = await service.get("/topSettle/getMemberCount")
        if (response) {
          this.pieData = response
          console.log(this.pieData, '饼图数据获取成功');
          this.updatePieChart();
        } else {
          console.error('获取饼图数据失败：无效的响应结构', response);
        }
      } catch (error) {
        console.error('获取饼图数据失败：', error);
      }
    },
    async getLineData() {
      try {
        this.withdrawList.loading = true;
        // const response = await service.get("/topSettle/getDepositWithdrawPage",)
        // this.lineData = response.list
        // !!!!!!!!!!!!!!记得修改回下面那个请求路径！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        const data = await service.get("/topSettle/getDepositWithdrawList")
        // this.lineData = response.data
        this.withdrawList.data = data
        this.withdrawList.loading = false
        // console.log(response, '柱状图数据获取成功', this.lineData);
        // this.updateLineChart();
      } catch (error) {
        console.error('获取柱状图数据失败：', error);
      }
    },
    async getMemberInvitePage() {
      try {
        this.invitePage.loading = true;
        const dto = {
          userId: this.invitePage.walletUserId,
          wallet: this.invitePage.walletInput,
          pageNum: this.invitePage.pageNum, // 当前页数
          pageSize: this.invitePage.pageSize, // 每页条数
        }
        // debugger
        const response2 = await service.get("/topSettle/getMemberInvitePage", {params: dto})
        this.invitePage.tableData = response2.list;
        this.invitePage.totalRows = Number(response2.total);
        this.invitePage.loading = false;
      } catch (error) {
        console.error('获取表格数据失败：', error);
      } finally {
        this.loading = false;
      }
    },

    async search() {
      // 根据输入的钱包号和用户名搜索表格数据
      console.log(this.userInput, this.walletInput, 66666666666666);
      const dto = {wallet: this.walletInput}
      // const response2 = await service.get("/topSettle/getMemberInvitePage",{params:dto})
      const response2 = await service.get("/topSettle/getMemberInvitePage", {params: dto})
      this.tableData = response2.list;
      this.totalRows = response2.total;
    },
    async getDepositWithdrawPage() {
      this.withdrawPage.loadingSymbol = true
      let dto = {
        userId: this.withdrawPage.walletUserId,
        wallet: this.withdrawPage.walletInput,
        pageNum: this.withdrawPage.pageNum, // 当前页数
        pageSize: this.withdrawPage.pageSize, // 每页条数
      }
      if(this.withdrawPage.time && this.withdrawPage.time[0] && this.withdrawPage.time[1]){
        console.log(this.withdrawPage.time,"this.withdrawPage.time")
        dto.startDateTime = parseTime(this.withdrawPage.time[0],'{y}-{m}-{d}')  + " 00:00:00";
        dto.endDateTime =  parseTime(this.withdrawPage.time[1],'{y}-{m}-{d}') + " 23:59:59" ;
      }
      const response2 = await service.get("/topSettle/getDepositWithdrawPage", {params: dto})
      this.withdrawPage.tableData = response2.list;
      this.withdrawPage.total = Number(response2.total);
      this.withdrawPage.loadingSymbol = false
    },
    invitePageHandleSizeChange(newSize){
      this.invitePage.pageSize = newSize
    },
    invitePageHandleCurrentChange(newPage){
      this.invitePage.newPage = newPage;
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.getTableData(); // 重新获取数据
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.getTableData(); // 重新获取数据
    },
    withdrawPageHandleSize(newSize) {
      this.withdrawPage.pageSize = newSize;
      this.getDepositWithdrawPage(); // 重新获取数据
    },
    withdrawPageHandleChange(newPage) {
      this.withdrawPage.pageNum = newPage;
      this.getDepositWithdrawPage(); // 重新获取数据
    },
    updatePieChart() {
      if (!this.pieData || typeof this.pieData.yesterdayCount === 'undefined' || typeof this.pieData.todayCount === 'undefined') {
        console.error('pieData 数据无效', this.pieData);
        return;
      }

      const dataSource = {
        totalNum: parseInt(this.pieData.totalCount ?? 0),
        dataList: [
          {
            title: '昨日注册用户',
            countNum: parseInt(this.pieData.yesterdayCount)
          },
          {
            title: '今日注册用户',
            countNum: parseInt(this.pieData.todayCount)
          },
          {
            title: '新增注册用户',
            countNum: parseInt(this.pieData.diff)
          }
        ]
      }

      this.$nextTick(() => {
        this.initChart(this.$refs.pieChart, this.getPieOption(dataSource.dataList, dataSource.totalNum))
      })
    },
    updateBarChart() {
      if (!this.barData.length) {
        console.error("barData 数据无效", this.barData);
        return;
      }

      const userIds = this.barData.map(item => item.symbol);
      const deposits = this.barData.map(item => parseFloat(item.deposit));
      const withdraws = this.barData.map(item => parseFloat(item.withdraw));
      const diffs = this.barData.map(item => parseFloat(item.diff));

      this.$nextTick(() => {
        this.initChart(this.$refs.barChart, this.getStackedBarOption(userIds, deposits, withdraws, diffs));
      });
    },
    updateLineChart() {
      if (!this.lineData || !Array.isArray(this.lineData)) {
        console.error('lineData 数据无效', this.lineData);
        return;
      }

      const userIds = this.lineData.map(item => item.symbol);
      const deposits = this.lineData.map(item => parseFloat(item.deposit));
      const withdraws = this.lineData.map(item => parseFloat(item.withdraw));
      const diffs = this.lineData.map(item => parseFloat(item.diff));

      this.$nextTick(() => {
        this.initChart(this.$refs.lineChart, this.getLineOption(userIds, deposits, withdraws, diffs))
      })
    },
    initChart(container, option) {
      const chart = echarts.init(container)
      option && chart.setOption(option)
    },
    getPieOption(dataList, total) {
      const data = dataList.map(item => {
        return {
          value: item.countNum,
          name: `${item.title}${item.countNum}人`
        }
      })
      return {
        title: {
          text: `今日新增用户数`,
          subtext: ``,
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '50%',
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    },

    getLineOption(symbol, deposits, withdraws, diffs) {
      return {
        title: {
          text: `今日出入金额统计`,
          left: 'left',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Deposit', 'Withdraw', 'Diff'],
          left: 'right'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: symbol
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Deposit',
            type: 'bar',
            stack: 'total',
            data: deposits
          },
          {
            name: 'Withdraw',
            type: 'bar',
            stack: 'total',
            data: withdraws
          },
          {
            name: 'Diff',
            type: 'bar',
            stack: 'total',
            data: diffs
          }
        ]
      };
    },

  }
}
</script>

<style lang="scss">
.controller {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .chart-container {
    width: 47%;
    //min-height: 400px;
    margin: 10px 10px;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
    position: relative; /* 确保容器定位 */
    overflow: hidden; /* 隐藏超出容器的内容 */
    padding: 20px; /* 增加内边距 */
  }

  .search-container {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    padding: 5px; /* 增加内边距 */
  }

  .margin-context {
    text-align: center;
    margin: 0px auto;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .input {
    width: 200px; /* 调整输入框宽度 */
    margin-right: 10px; /* 调整输入框之间的间距 */
  }

  .el-button {
    margin-left: 5px; /* 增加按钮的左外边距 */
  }

  @media screen and (max-width: 600px) {
    .chart-container {
      width: 100%; /* 在小屏幕上，图表容器占据 100% 宽度 */
    }
  }
}
</style>

