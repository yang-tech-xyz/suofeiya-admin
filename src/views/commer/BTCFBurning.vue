<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>BTCF销毁</span>
    </div>
    <el-form ref="form" :model="form" label-width="130px">
      <el-form-item label="累计销毁">
        <el-input v-model="burningAmount" disabled></el-input>
      </el-form-item>
      <el-form-item label="销毁BTCF数量">
        <el-input v-model="form.input"></el-input>
      </el-form-item>
      <el-button style="margin-left: 130px" type="primary" @click="onBurning">确定销毁</el-button>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      burningAmount: 0,
      form: {
        input: "",
      },
    }
  },

  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$axios
          .get('/topTokenBurning/getBurning')
          .then((res) => {
              this.burningAmount = res.burningAmount;
          })
          .catch((err) => {
            this.$message({
              message: '操作失败',
              type: 'warning',
            })
          })
    },
    async onBurning() {
      if(!this.form.input) return;
      await this.$confirm('请手动将销毁数量'+this.form.input + '的BTCF币转入黑洞合纸地址 0x000000000000000000000000000000000000dEaD', '你确定要销毁？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      this.$axios
          .post('/topTokenBurning/burning', {
            burningAmount: this.form.input
          })
          .then((res) => {
            if (res) {
              this.$message({
                message: '操作成功',
                type: 'success',
              })
              this.init();
              this.form.input = "";
            }
          })
          .catch((err) => {
            console.log(err)

            this.$message({
              message: '操作失败',
              type: 'warning',
            })
          })
    }
  },
}
</script>
<style lang="scss" scoped>
.box-card {
  margin: 40px;
}
</style>
