<template>
  <div>
    <elTableColumns ref="elTableColumns" :data-obj="dataObj" :form-arr="formArr" @addOrEditOther="isShow = true" />
    <el-dialog :close-on-click-modal="false" :visible.sync="isShow" title="我要提币" width="600px">
      <el-form>

        <el-form-item label="提币币种" label-width="140px">
          USDT
        </el-form-item>
        <el-form-item label="提币网络" label-width="140px">
          <el-select v-model="value" placeholder="请选择提币网络" style="width:100%">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="提币地址" label-width="140px">
          <div class="t1">
            <el-input v-model="newPwd2" placeholder="请输入提币地址" type="text" />
            <el-button type="primary" class="add" @click="isShow2=true">选择地址</el-button>
          </div>
        </el-form-item>
        <el-form-item label="提币数量" label-width="140px">
          <el-input v-model="newPwd2" placeholder="请输入提币数量" type="number" />
          <div class="t2">USDT <span>全部</span></div>

          <div class="t3">可提余额：<span>0 USDT</span></div>
        </el-form-item>
        <el-form-item label="" label-width="140px">
          <div class="t4">温馨提示</div>
          <div class="t5">
            为保障您的资金安全，提现网络、提现地址、收款地址在您首次提现
            输入选择时自动绑定，若后续需要修改，请联系客服进行修改
          </div>
          <div class="t6">
            <p>
              到账数量： <span>0USDT</span>
            </p>
            <p>
              手续费： <span>0.00 USDT</span>
            </p>
          </div>
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShow=false">取消</el-button>

          <el-button type="primary" @click="saveFn">
            提币确认
          </el-button>
        </span>

      </template>

    </el-dialog>
    <el-dialog :close-on-click-modal="false" :visible.sync="isShow2" title="提币地址管理" width="1000px">
      <div class="sdt">
        <elTableColumns ref="elTableColumns2" :data-obj="dataObj2" :form-arr="formArr2">
          <template v-slot:userBtn="scope">
            <el-button size="small" type="text">选取</el-button>

          </template>
        </elTableColumns>
      </div>

    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      newPwd2: '',
      isShow: false,
      isShow2: false,
      options: [{
        value: 1,
        label: 'TRC20'
      }, {
        value: 2,
        label: 'ERC20'
      }],
      value: '',

      dataObj: {
        name: '提币记录',
        listUrl: '/无接口',
        addUrl: '/agent/appVersionInfo',
        detailUrl: '/agent/appVersionInfo',
        export: '/agent/appVersionInfo/export',
        addText: '我要提币',
        editdText: '我要提币',
        detailBtnShow: 1,
        isAddOrEditOther: 1

      },
      formArr: [
        {
          label: '序号',
          prop: 'id',
          type: 'input'
        },
        {
          label: '币种',
          prop: 'id',
          type: 'input'

        },
        {
          label: '提币网络',
          prop: 'id',
          type: 'input'

        },
        {
          label: '数量',
          prop: 'id',
          type: 'input'

        },

        {
          label: '提币地址',
          prop: 'versionNo',
          type: 'input'

        },
        {
          label: 'TXID',
          prop: 'versionNo',
          type: 'input'
        },
        {
          label: '实际到账数量',
          prop: 'imgUrl',
          type: 'input'

        },
        {
          label: '手续费',
          prop: 'imgUrl',
          type: 'input'

        },
        {
          label: '提币后余额',
          prop: 'imgUrl',
          type: 'input'

        },
        {
          label: '提币时间',
          prop: 'imgUrl',
          type: 'input'

        },

        {
          label: '审核时间',
          prop: 'imgUrl',
          type: 'input'

        },
        {
          label: '状态',
          prop: 'status',
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
              label: '审核中',
              tagColor: 'info'
            },

            {
              value: 2,
              label: '审核成功'
            },
            {
              value: 3,
              label: '驳回',
              tagColor: 'danger'

            }

          ]
        }

      ],
      dataObj2: {
        name: '提币地址管理',
        listUrl: '/无接口',
        addUrl: '/agent/appVersionInfo',
        deleteUrl: '/agent/appVersionInfo',
        addText: '添加提币地址',
        editdText: '添加提币地址',
        noSearch: 1,
        isAdd: 1

      },
      formArr2: [
        {
          label: '币种',
          prop: 'id',
          type: 'input'

        },
        {
          label: '网络名称',
          prop: 'id',
          type: 'input',
          addOrEdit: 1

        },
        {
          label: '提币钱包',
          prop: 'id',
          type: 'input',
          addOrEdit: 1

        },
        {
          label: '钱包地址',
          prop: 'id',
          type: 'input',
          addOrEdit: 1

        },

        {
          label: '创建时间',
          prop: 'versionNo',
          type: 'input'

        }

      ]
    }
  },

  mounted() {

  },
  methods: {

    saveFn() {

    }

  }
}
</script>
<style lang="scss" scoped>
.t1{
  display: flex;
  .add{
    margin-left: 10px;
  }
}
.t2{
  position: absolute;
  right:10px;
  top:0;
  span{
    color: #49B1B3;
    margin-left: 10px;
    cursor: pointer;
  }
}
.t3{
  span{
    color: #49B1B3;
  }
}
.t4{
  color: #999;
}
.t5{
  line-height: 1.4;
  color: red;
}
.t6{
  display: flex;
  justify-content: space-between;
  span{
    color: #49B1B3;

  }
}
.sdt{
  margin-top: -30px;
}
</style>

