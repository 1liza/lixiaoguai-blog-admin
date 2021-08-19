<template>
  <div class="category-container">
<!--    搜索栏-->
    <el-form :model="query" :inline="true">
      <el-form-item label="分类名称">
        <el-input v-model="query.name" size="mini" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="query.status" clearable size="mini" placeholder="请选择">
          <el-option
            v-for="item in statusOptions"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" icon="el-icon-refresh" @click="onReset">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="onAdd">新增</el-button>
      </el-form-item>
    </el-form>
<!--    表单-->
    <el-table
      :data="list"
      border
      highlight-current-row
      stripe
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        width="60"
        align="center"
      />
      <el-table-column
        prop="name"
        align="center"
        label="分类名称"
      />
      <el-table-column
        prop="sort"
        align="center"
        label="排序"
      />
      <el-table-column
        prop="remark"
        align="center"
        label="备注"
      />
      <el-table-column
        prop="status"
        align="center"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 0 ? 'danger' : 'success'"
            disable-transitions
          >
            {{ scope.row.status ? '正常' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row.id)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    分页-->
    <div class="block">
      <el-pagination
        :current-page="page.current"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!--    弹窗-->
    <edit
      :title="edit.title"
      :visible="edit.visible"
      :formData="edit.formData"
      :remoteClose="remoteClose"
    />

  </div>
</template>

<script>
import api from '@/api/category'
import Edit from './Edit'
const statusOptions = [
  { code: 0, name: '禁用' },
  { code: 1, name: '正常' }
]
export default {
  components: {
    Edit
  },
  data() {
    return {
      list: [],
      page: {
        total: 0,
        current: 1,
        size: 20
      },
      query: {},
      statusOptions,
      code: '',
      edit: {
        visible: false,
        title: '',
        formData: {
          id: null,
          name: '',
          sort: '',
          remark: '',
          status: ''
        }
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.getList(this.query, this.page.current, this.page.size).then(response => {
        this.list = response.data.records
        this.page.total = response.data.total
      })
    },
    handleSizeChange(val) {
      this.page.size = val
      this.fetchData()
    },
    handleCurrentChange(currPage) {
      this.page.current = currPage
      this.fetchData()
    },
    onSubmit() {
      this.page.current = 1
      this.fetchData()
    },
    onReset() {
      this.query = {}
      this.fetchData()
    },
    remoteClose() {
      this.edit.formData = {}
      this.edit.visible = false
      this.fetchData()
    },
    onAdd() {
      this.edit.visible = true
      this.edit.title = '新增'
    },
    handleEdit(id) {
      api.getById(id).then(response => {
        if (response.code === 20000) {
          this.edit.formData = response.data
          this.edit.visible = true
          this.edit.title = '编辑'
        }
      })
    },
    handleDelete(id) {
      this.$confirm('确认删除这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认
        api.deleteById(id).then(response => {
          // 提示信息
          this.$message({
            type: response.code === 20000 ? 'success' : 'error',
            message: response.message
          })
          // 刷新列表
          this.fetchData()
        })
      }).catch(() => {
        // 取消删除，不理会
      })
    }
  }
}

</script>

<style lang="scss" scoped>
el-input {
  width: 100px;
}
</style>
