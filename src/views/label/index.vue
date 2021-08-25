<template>
  <div class="label-container">
    <!--搜索框-->
    <el-form :model="query" :inline="true">
      <el-form-item label="标签名称">
        <el-input v-model="query.name" size="mini" />
      </el-form-item>
      <el-form-item label="分类名称">
        <el-select v-model="query.categoryName" clearable size="mini" placeholder="请选择">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
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
    <!--列表-->
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
        label="标签名称"
      />
      <el-table-column
        prop="categoryName"
        align="center"
        label="分类名称"
      />
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
    <!--分页-->
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
    <Edit
      :form-data="edit.formData"
      :visible="edit.visible"
      :title="edit.title"
      :remote-close="remoteClose"
      :category-list="categoryList"
    />
  </div>
</template>

<script>
import api from '@/api/label'
import categoryApi from '@/api/category'
import Edit from './Edit'
export default {
  components: {
    Edit
  },
  data() {
    return {
      list: [],
      page: {
        current: 1,
        size: 20
      },
      query: {},
      edit: {
        visible: false,
        title: '',
        formData: {
        }
      },
      categoryList: []
    }
  },
  created() {
    this.fetchData()
    this.getCategoryList()
  },
  methods: {
    fetchData() {
      api.getList(this.query, this.page.current, this.page.size).then(response => {
        this.list = response.data.records
        this.page.total = response.data.total
      })
    },
    handleCurrentChange(curPage) {
      this.page.current = curPage
      this.fetchData()
    },
    handleSizeChange(curSize) {
      this.page.size = curSize
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
    onAdd() {
      this.edit.visible = true
      this.edit.title = '新增'
    },
    remoteClose() {
      this.edit.formData = {}
      this.edit.visible = false
      this.fetchData()
    },
    getCategoryList() {
      categoryApi.getNormalList().then(response => {
        this.categoryList = response.data
      })
    },
    handleEdit(id) {
      // console.log('编辑', id)
      api.getById(id).then(response => {
        if (response.code === 20000) {
          this.edit.formData = response.data
          // 弹出窗口
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

</style>
