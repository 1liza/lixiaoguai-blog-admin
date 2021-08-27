<template>
  <div class="app-container">
    <!-- 数据列表 :data 绑定渲染的数据, border 纵向边框 -->
    <!-- 渲染树形数据时，必须要指定 row-key, list集合中的 id属性 -->
    <el-form :inline="true" size="mini">
      <el-form-item label="菜单名称：">
        <el-input v-model.trim="query.name" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="fetchData">查询</el-button>
        <el-button icon="el-icon-refresh" class="filter-item" @click="reload">重置</el-button>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-circle-plus-outline"
          @click="handleAdd(0)"
        >新增</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="list"
      row-key="id"
      border
      highlight-current-row
      style="width: 100%"
    >
      <!-- type="index"获取索引值，从1开始 ，label显示标题，prop 数据字段名，width列宽 -->
      <el-table-column align="center" type="index" label="序号" width="60" />

      <el-table-column align="left" prop="name" label="名称" />

      <el-table-column align="center" prop="url" label="请求地址" />

      <el-table-column align="center" prop="code" label="权限标识" />

      <el-table-column align="center" prop="type" label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type === 1">目录</span>
          <span v-if="scope.row.type === 2">菜单</span>
          <span v-if="scope.row.type === 3">按钮</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="code" label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon" />
        </template>
      </el-table-column>

      <el-table-column align="center" prop="sort" label="排序" />

      <el-table-column align="center" label="操作" width="260">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="handleAdd(scope.row.id)"
          >新增</el-button>
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
            删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <edit
      :visible="edit.visible"
      :title="edit.title"
      :remote-close="remoteClose"
      :form-data="edit.formData"
    />
  </div>
</template>

<script>
import api from '@/api/menu'
import edit from './Edit'

export default {
  data() {
    return {
      query: {},
      list: [],
      edit: {
        visible: false,
        title: '',
        formData: {}
      }
    }
  },
  created() {
    this.fetchData()
  },
  components: {
    edit
  },
  methods: {
    fetchData() {
      api.getList(this.query).then(response => {
        this.list = response.data
      })
    },
    handleAdd(id) {
      console.log('新增', id)
      this.edit.visible = true
      this.edit.title = '新增'
      this.edit.formData.parentId = id
    },
    handleEdit(id) {
      console.log('编辑', id)
    },
    handleDelete(id) {
      console.log('删除', id)
    },
    remoteClose() {
      this.edit.visible = false
      this.edit.formData = {}
    }
  }
}

</script>

<style lang="scss" scoped>
</style>
