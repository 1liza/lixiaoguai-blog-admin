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
  </div>
</template>

<script>
import api from '@/api/label'

export default {
  data() {
    return {
      list: {},
      page: {
        current: 1,
        size: 20
      },
      query: {}
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

    }
  }
}

</script>

<style lang="scss" scoped>

</style>
