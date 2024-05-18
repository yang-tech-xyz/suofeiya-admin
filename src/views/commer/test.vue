<template>
    <div class="controller">
      <div ref="pieChart" class="chart-container" />
      <div ref="lineChart" class="chart-container" />
      <div class="chart-container">
        <div class="search-container">
          <el-input v-model="symbol" placeholder="请输入币种" class="input" />
          <el-button type="primary" @click="searchSymbol">确认</el-button>
        </div>
        <el-table :data="tableDataSymbol" v-loading="loadingSymbol" element-loading-text="加载中" :height="'300px'">
          <el-table-column prop="symbol" label="币种" />
          <el-table-column prop="deposit" label="充值金额" />
          <el-table-column prop="withdraw" label="提现金额" />
          <el-table-column prop="diff" label="差额" />
        </el-table>
        <el-pagination
          @size-change="handleSymbolSizeChange"
          @current-change="handleSymbolCurrentChange"
          :current-page="currentPageSymbol"
          :page-size="pageSizeSymbol"
          :page-sizes="[10]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRowsSymbol"
        /> 
      </div>
      <div class="chart-container">
        <div class="search-container">
          <el-input v-model="walletInput" placeholder="请输入钱包号" class="input" />
          <el-input v-model="userInput" placeholder="请输入用户名" class="input" />
          <el-button type="primary" @click="search">确认</el-button>
        </div>
        <el-table :data="tableData" v-loading="loading" element-loading-text="加载中" :height="'300px'">
          <!-- 表格列 -->
          <el-table-column prop="userId" label="ID" />
          <el-table-column prop="wallet" label="钱包" />
          <el-table-column prop="invitedUserId" label="邀请人 ID" />
          <el-table-column prop="inviteMemberCount" label="被邀请人" />
          <el-table-column prop="inviteMemberPowerNumber" label="矿机台数" />
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRows"
        /> 
      </div>
    </div>
  </template>
  
  <script>
  import service from "@/utils/request"
  import * as echarts from 'echarts'
  
  export default {
    data() {
      return {
        pieData: {}, // 用于存储饼图数据的变量
        barData: [], // 用于存储柱状图数据的变量
        lineData: [], // 用于存储折线图数据的变量
        scatterData: [], // 用于存储散点图数据的变量
        tableData: [], // 用于存储表格数据的变量
        tableDataSymbol: [],
        totalRowsSymbol: 0,
        loadingSymbol: false,
        walletInput: '', // 用户输入的钱包号
        userInput: '', // 用户输入的用户名
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页条数
        totalRows: 0, // 总条数
        loading: false, // 加载状态
        currentPageSymbol: 1,
        pageSizeSymbol: 10
      }
    },
    created() {
      this.getPieData();
      this.getLineData();
      this.getTableData();
      this.getTableDataSymbol()
    },
    mounted() {
      window.addEventListener('resize', this.handleResize); // 监听窗口大小变化
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize); // 移除监听器
    },
    watch: {
      currentPageSymbol() {
        this.getTableDataSymbol(); // 当 currentPageSymbol 变化时调用获取数据的方法
      },
      currentPage() {
        this.getTableData(); // 当 currentPage 变化时调用获取数据的方法
      }
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
      async getBarData() {
        try {
          const response = await service.get("/topSettle/getDepositWithdrawPage",)
            this.barData = response.list;
            console.log("柱状图图数据",this.barData.list);
            this.updateBarChart();
  
        } catch (error) {
          console.error('获取柱状图数据失败：', error);
        }
      },
      async getLineData() {
        try {
          const response = await service.get("/topSettle/getDepositWithdrawPage",)
          this.lineData = response.list
          // !!!!!!!!!!!!!!记得修改回下面那个请求路径！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
          // const response = await service.get("/topSettle/getDepositWithdrawList")
          //   this.lineData = response.data
            console.log(response, '柱状图数据获取成功',this.lineData);
            this.updateLineChart();
        } catch (error) {
          console.error('获取柱状图数据失败：', error);
        }
      },
      async getTableData() {
        try {
          this.loading = true;
          const dto  = {
            currentPage: this.currentPage, // 当前页数
            pageSize: this.pageSize, // 每页条数
          }
          const response2 = await service.get("/topSettle/getMemberInvitePage",{currentPage: '2',pageSize: this.pageSize})
          console.log(response2.list,2222222222222)
          this.tableData = response2.list;
          this.totalRows = Number( response2.total);
        } catch (error) {
          console.error('获取表格数据失败：', error);
        } finally {
          this.loading = false;
        }
      },
      async getTableDataSymbol() {
        try {
          const dto  = {
            currentPage: this.currentPageSymbol, // 当前页数
            pageSize: this.pageSizeSymbol, // 每页条数
          }
          this.loadingSymbol = true;
          const response2 = await service.get("/topSettle/getDepositWithdrawPage",{params:dto})
          // const response2 = await service.get("/topSettle/getDepositWithdrawPage",{currentPage: 2,pageSize: this.pageSizeSymbol})
          console.log(response2.list,'getTableDataSymbol')
          this.tableDataSymbol = response2.list;
          this.totalRowsSymbol =Number( response2.total);
        } catch (error) {
          console.error('获取表格数据失败：', error);
        } finally {
          this.loadingSymbol = false;
        }
      },
      async search() {
        // 根据输入的钱包号和用户名搜索表格数据
        const dto = {userId:this.userInput,wallet:'1615'}
        const response2 = await service.get("/topSettle/getMemberInvitePage",{params:dto})
        this.tableData = response2.list;
          this.totalRows = response2.total;
      },
      async searchSymbol(){
        const dto = {userId:this.userInput}
        const response2 = await service.get("/topSettle/getDepositWithdrawPage",{params:dto})
        this.tableDataSymbol = response2.list;
          this.totalRowsSymbol =Number( response2.total);
      },
      handleSizeChange(newSize) {
        this.pageSize = newSize;
        this.getTableData(); // 重新获取数据
      },
      handleCurrentChange(newPage) {
        this.currentPage = newPage;
        this.getTableData(); // 重新获取数据
      },
      handleSymbolSizeChange(newSize) {
        this.pageSizeSymbol = newSize;
        this.getTableDataSymbol(); // 重新获取数据
      },
      handleSymbolCurrentChange(newPage) {
        this.currentPageSymbol = newPage;
        this.getTableDataSymbol(); // 重新获取数据
      },
      updatePieChart() {
        if (!this.pieData || typeof this.pieData.yesterdayCount === 'undefined' || typeof this.pieData.todayCount === 'undefined') {
          console.error('pieData 数据无效', this.pieData);
          return;
        }
  
        const dataSource = {
          totalNum: parseInt(this.pieData.totalCount),
          dataList: [
            {
              title: '昨日新增',
              countNum: parseInt(this.pieData.yesterdayCount)
            },
            {
              title: '今日新增',
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
            subtext: `(${total}人)`,
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
      getStackedBarOption(userIds, deposits, withdraws, diffs) {
        return {
          title: {
            text: `出入金额统计`,
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: userIds
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
      getScatterOption(data) {
        return {
          xAxis: {
            type: 'category'
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data,
            type: 'scatter'
          }]
        }
      }
    }
  }
  </script>
  
  <style lang="scss">
  .controller {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .chart-container {
      width: 45%;
      height: 400px;
      margin: 20px;
      border: 1px solid #ccc;
      box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
      position: relative; /* 确保容器定位 */
      overflow: hidden; /* 隐藏超出容器的内容 */
    }
  
    .search-container {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
  
    .input {
      width: 200px; /* 调整输入框宽度 */
      margin-right: 10px; /* 调整输入框之间的间距 */
    }
  
    @media screen and (max-width: 600px) {
      .chart-container {
        width: 100%; /* 在小屏幕上，图表容器占据 100% 宽度 */
      }
    }
  }
  </style>
  