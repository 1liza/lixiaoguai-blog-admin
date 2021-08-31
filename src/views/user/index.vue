<template>
  <div class="app-container">
    <el-form :inline="true" size="mini">
      <el-form-item label="用户名:">
        <el-input v-model.trim="query.username" />
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input v-model.trim="query.mobile" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="queryData">查询</el-button>
        <el-button icon="el-icon-refresh" class="filter-item" @click="reload">重置</el-button>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-circle-plus-outline"
          @click="handleAdd"
        >新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 数据列表 :data 绑定渲染的数据, border 纵向边框 -->
    <el-table :data="list" border highlight-current-row style="width: 100%">
      <!-- type="index"获取索引值，从1开始 ，label显示标题，prop 数据字段名，width列宽 -->
      <el-table-column align="center" type="index" label="序号" width="60" />
      <el-table-column align="center" prop="username" label="用户名" />
      <el-table-column align="center" prop="nickName" label="昵称" />
      <el-table-column align="center" prop="mobile" label="手机号" />
      <el-table-column align="center" prop="email" label="邮箱" />
      <el-table-column
        align="center"
        prop="isAccountNonExpired"
        label="帐号过期"
        width="80"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isAccountNonExpired === 0" type="danger">过期</el-tag>
          <el-tag v-if="scope.row.isAccountNonExpired === 1" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="isAccountNonLocked"
        label="帐号锁定"
        width="80"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isAccountNonLocked === 0" type="danger">锁定</el-tag>
          <el-tag v-if="scope.row.isAccountNonLocked === 1" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="isCredentialsNonExpired"
        label="密码过期"
        width="80"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isCredentialsNonExpired === 0" type="danger">过期
          </el-tag>
          <el-tag v-if="scope.row.isCredentialsNonExpired === 1" type="success">正常
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isEnabled" label="是否可用" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isEnabled === 0" type="danger">已删除</el-tag>
          <el-tag v-if="scope.row.isEnabled === 1" type="success">可用</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="340">
        <!-- isEnabled == 1 才显示操作按钮-->
        <template v-if="scope.row.isEnabled == 1" slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
            删除</el-button>
          <el-button size="mini" type="success" @click="handleRole(scope.row.id)">
            设置角色</el-button>
          <el-button size="mini" type="success" @click="handlePwd(scope.row.id)">密码修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
      :title="edit.title"
      :form-data="edit.formData"
      :remote-close="this.remoteClose"
      />
  </div>
</template>

<script>
import * as api from '@/api/user'
import edit from './Edit'

export default {
  components: {
    edit
  },
  data() {
    return {
      query: {},
      list: [],
      page: {
        size: 20,
        current: 1,
        total: 0
      },
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
  methods: {
    fetchData() {
      api.getList(this.query).then(response => {
        if (response.code === 20000) {
          this.list = response.data.records
          this.page.total = response.data.total
        }
      })
    },
    // 当每页显示条数改变后,被触发 , val是最新的每页显示条数
    handleSizeChange(val) {
      this.page.size = val
      this.fetchData()
    },
    // 当页码改变后,被触发 , val 是最新的页面
    handleCurrentChange(val) {
      this.page.current = val
      this.fetchData()
    },
    // 查询
    queryData() {
      this.page.current = 1
      this.fetchData()
    },
    // 重置
    reload() {
      this.query = {}
      this.fetchData()
    },
    remoteClose() {
      this.edit.visible = false
    },
    // 新增
    handleAdd() {
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
        api.deleteById(id).then(response => {
          this.$message({
            type: response.code === 20000 ? 'success' : 'error',
            message: response.message
          })
        })
        this.fetchData()
      }).catch(() => {})
    },
    handleRole() {

    },
    handlePwd() {

    }
  }
}
</script>
