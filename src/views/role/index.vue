<template>
  <div class="role-container">
    <el-form :inline="true" size="mini">
      <el-form-item label="菜单名称：">
        <el-input v-model.trim="query.name" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="fetchData">查询</el-button>
        <el-button icon="el-icon-refresh" class="filter-item" @click="reload">重置</el-button>
        <el-button
          v-if="roleIds"
          icon="el-icon-circle-plus-outline"
          type="success"
          @click="handleUserRole"
        >设置角色</el-button>
        <el-button
          v-if="!roleIds"
          type="primary"
          size="mini"
          icon="el-icon-circle-plus-outline"
          @click="handleAdd(0)"
        >新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 数据列表 :data 绑定渲染的数据, border 纵向边框 -->
    <el-table ref="dataTable" row-key="id" :data="list" border highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
      <!-- type="index"获取索引值，从1开始 ，label显示标题，prop 数据字段名，width列宽 -->
      <el-table-column
        v-if="roleIds"
        type="selection"
        reserve-selection
        align="center"
        width="60"
      />
      <el-table-column type="selection" width="55" />
      <el-table-column align="center" type="index" label="序号" width="60" />
      <el-table-column align="center" prop="name" label="角色名称" />
      <el-table-column align="center" prop="remark" label="备注" />
      <el-table-column v-if="!roleIds" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handlePermission(scope.row.id)">分配权限</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
            删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  分页-->
    <el-pagination
      :current-page="page.current"
      :page-sizes="[10, 20, 50]"
      :page-size="page.size"
      :total="page.total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <edit
      :visible="edit.visible"
      :form-data="edit.formData"
      :title="edit.title"
      :remote-close="remoteClose"
    />

    <permission
      title="分配权限"
      :visible="per.visible"
      :remote-close="remotePerClose"
      :role-id="per.roleId"
    />

  </div>
</template>

<script>
import api from '@/api/role'
import edit from './Edit'
import permission from './permission'

export default {
  components: {
    edit,
    permission
  },
  props: {
    roleIds: null
  },
  data() {
    return {
      list: [], // 列表数据
      page: { // 分页相关
        total: 0, // 总记录数
        current: 1, // 当前页码
        size: 20 // 每页显示20条数据
      },
      query: {}, // 查询条件
      edit: {
        visible: false,
        title: '',
        formData: {}
      },
      per: {
        visible: false,
        roleId: null
      },
      checkedRoleList: []
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
        this.checkedRoles()
      })
    },
    reload() {
      this.query = {}
      this.fetchData()
    },
    handleAdd() {
      this.edit.visible = true
      this.edit.title = '新增'
      this.edit.formData = {}
    },
    handlePermission(id) {
      console.log('分配权限', id)
      api.getById(id).then(response => {
        if (response.code === 20000) {
          this.per.visible = true
          this.per.roleId = id
        }
      })
    },
    remoteClose() {
      this.edit.visible = false
      this.fetchData()
    },
    remotePerClose() {
      this.per.visible = false
      this.per.roleId = null
      this.fetchData()
    },
    handleEdit(id) {
      console.log('编辑', id)
      api.getById(id).then(response => {
        if (response.code === 20000) {
          this.edit.visible = true
          this.edit.title = '编辑'
          this.edit.formData = response.data
        }
      })
    },
    handleDelete(id) {
      console.log('删除', id)
      this.$confirm('确定删除该条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteById(id).then(response => {
          this.$message({
            type: response.code === 20000 ? 'success' : 'error',
            message: response.message
          })
        })
        this.remoteClose()
      }).catch(() => {})
    },
    handleSizeChange(val) {
      this.page.size = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.page.current = val
      this.fetchData()
    },
    checkedRoles() {
      this.$refs.dataTable.clearSelection()
      if (this.roleIds) {
        // 取出列表中每个角色，与用户角色ids进行匹配，匹配上了则选中
        this.list.forEach(item => {
          // 匹配上了
          if (this.roleIds.indexOf(item.id) !== -1) {
            // 选中，注意在 el-table 加上 ref="dataTable"
            this.$refs.dataTable.toggleRowSelection(item, true)
          }
        })
      }
    },
    handleSelectionChange(val) {
      this.checkedRoles = val
    },
    handleUserRole() {
      const checkedRoleIds = []
      // 1. 遍历获取已选中的角色id
      this.checkedRoleList.forEach(item => {
        checkedRoleIds.push(item.id)
      })
      // 2. 触发父组件 user/index.vue 的 saveUserRole 事件保存用户角色数据
      this.$emit('saveUserRole', checkedRoleIds)
    }
  }
}
</script>
