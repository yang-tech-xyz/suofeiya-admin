<template>
  <div class="crud-container">
    <!-- 按钮用于 CRUD 操作 -->
    <el-button type="primary" @click="showAddDialog">新增</el-button>

    <!-- 表格用于显示数据 -->
    <el-table :data="paginatedData" element-loading-text="加载中" :height="'500px'" style="width: 100%" >
      <!-- 其他数据列 -->
      <el-table-column prop="id" label="ID" width="80px"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="createdBy" label="创建人" width="120px"></el-table-column>
      <el-table-column prop="createdDate" label="创建时间" width="180px"></el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="showDeleteDialog(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-if="showPagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pagination.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
    >
    </el-pagination>

    <!-- 添加/编辑对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <el-form ref="form" :model="formData" :rules="formRules">
        <el-form-item label="语言" prop="lang">
          <el-select v-model="formData.lang" placeholder="请选择语言">
            <el-option label="中文" value="cn"></el-option>
            <el-option label="English" value="en"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="labels.title" prop="title">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item :label="labels.createdBy" prop="createdBy">
          <el-input v-model="formData.createdBy"></el-input>
        </el-form-item>
        <el-form-item :label="labels.contents" prop="contents">
          <el-input v-model="formData.contents" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveData">保存</el-button>
      </span>
    </el-dialog>

    <!-- 删除对话框 -->
    <el-dialog title="删除数据" :visible.sync="deleteDialogVisible" width="30%">
      <span>确定删除所选数据吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="handleDelete">删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import service from "@/utils/request"

export default {
  data() {
    return {
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      dialogVisible: false,
      dialogTitle: '',
      formData: {
        title: '',
        createdBy: '',
        contents: '',
        lang:''
      },
      deleteDialogVisible: false,
      selectedRows: [],
      formRules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        createdBy: [
          { required: true, message: '创建人不能为空', trigger: 'blur' }
        ],
        contents: [
          { required: true, message: '富文本内容不能为空', trigger: 'blur' }
        ]
      },
      selectedLanguage: 'zh_CN',
      labels: {
        title: '标题',
        createdBy: '创建人',
        contents: '富文本内容'
      }
    };
  },
  computed: {
    paginatedData() {
      const start = (this.pagination.currentPage - 1) * this.pagination.pageSize;
      const end = start + this.pagination.pageSize;
      return this.tableData.slice(start, end);
    },
    showPagination() {
      return this.tableData.length > this.pagination.pageSize;
    }
  },
  watch: {
    selectedLanguage(newLang) {
      this.updateLabels(newLang);
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // 模拟 API 调用
      setTimeout(() => {
        // 模拟数据
        this.getList();
        this.pagination.total = this.tableData.length;
      }, 1000);
    },
    getList() {
      // 这里要做分页。。。
      service
        .get("/topNotice/getList")
        .then((data) => {
          this.tableData = data
        })
        .catch((error) => {
          console.error('获取数据失败：', error);
        });
    },
    showAddDialog() {
      this.dialogTitle = '新增数据';
      this.formData = {};
      this.dialogVisible = true;
    },
    showEditDialog(row) {
      this.dialogTitle = '编辑数据';
      this.formData = { ...row };
      this.dialogVisible = true;
    },
    saveData() {
      // 手动触发表单校验
      this.$refs.form.validate((valid) => {
        if (valid) {
          let url = "topNotice/edit";
          const call = (res) => {
            this.getList();
            this.pagination.total = this.tableData.length;
            this.dialogVisible = false;
          };
          if (this.dialogTitle === '新增数据') {
            url = "topNotice/add";
          }
          service.post(url, { ...this.formData })
            .then((data) => {
              call(data);
            })
            .catch((error) => {
              // ....
            });
        } else {
          // 表单校验不通过，不执行保存操作，可以给出提示
          this.$message.error('请填写完整表单');
        }
      });
    },
    showDeleteDialog(id) {
      this.selectedRows = [id];
      this.deleteDialogVisible = true;
    },
    handleDelete() {
      // 执行删除操作
      const id = this.selectedRows[0];
      service
        .post(`/topNotice/delete/${id}`)
        .then(() => {
          this.getList(); // 刷新列表数据
          this.deleteDialogVisible = false;
          this.pagination.currentPage = 1; // 删除后重置为第一页
        })
        .catch((error) => {
          console.error('删除数据失败：', error);
        });
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.pagination.currentPage = 1; // 更改页面大小后重置为第一页
    },
    handleCurrentChange(page) {
      this.pagination.currentPage = page;
    },
    updateLabels(language) {
      const labels = {
        zh_CN: {
          title: '标题',
          createdBy: '创建人',
          contents: '富文本内容'
        },
        en_US: {
          title: 'Title',
          createdBy: 'Created By',
          contents: 'Rich Text Content'
        }
      };
      this.labels = labels[language];
    }
  }
};
</script>

<style lang="scss" scoped>
.crud-container {
  margin: 20px;
}
</style>
