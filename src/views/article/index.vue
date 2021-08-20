<template>
  <div class="article-container">
    <!--    搜索栏-->
    <el-form :model="query" :inline="true">
      <el-form-item label="文章标题">
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
    </el-form>
    <!--    表单-->
    <el-table
      :data="list"
      :check="edit.check"
      border
      highlight-current-row
      stripe
      style="width: 100%"
    >
      <!--      序号-->
      <el-table-column
        type="index"
        label="序号"
        width="60"
        align="center"
      />
      <!--      文章标题-->
      <el-table-column
        prop="title"
        align="center"
        label="文章标题"
      />
      <!--      浏览数-->
      <el-table-column
        prop="viewCount"
        align="center"
        label="浏览数"
      />
      <!--      点赞数-->
      <el-table-column
        prop="thumhup"
        align="center"
        label="点赞数"
      />
      <!--      是否公开-->
      <el-table-column
        prop="ispublic"
        align="center"
        label="是否公开"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 0 ? 'danger' : 'warning'"
            disable-transitions
          >
            {{ scope.row.status ? '公开' : '不公开' }}
          </el-tag>
        </template>
      </el-table-column>
      <!--      状态-->
      <el-table-column
        prop="status"
        align="center"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" type="primary" plain>未审核</el-tag>
          <el-tag v-if="scope.row.status === 2" type="success" plain>审核通过</el-tag>
          <el-tag v-if="scope.row.status === 3" type="warning" plain>审核未通过</el-tag>
          <el-tag v-if="scope.row.status === 0" type="danger" plain>已删除</el-tag>
        </template>
      </el-table-column>
      <!--      最后更新时间-->
      <el-table-column
        prop="updateDate"
        align="center"
        label="最后更新时间"
      />
      <!--      操作-->
      <el-table-column
        label="操作"
        align="left"
        width="210"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="onLook(scope.row.id)"
          >查看</el-button>
          <el-button
            v-if="scope.row.status === 1"
            size="mini"
            type="success"
            @click="onCheck(scope.row.id)"
          >审核</el-button>
          <el-button
            v-if="scope.row.status !== 0"
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
      :title="edit.diaTitle"
      :visible="edit.visible"
      :form-data="edit.formData"
      :check="edit.check"
      :remote-close="remoteClose"
    />

  </div>
</template>

<script>
import api from '@/api/article'
import Edit from './Edit'
const publishOptions = [
  { code: 0, name: '不公开' },
  { code: 1, name: '公开' }
]
const statusOptions = [
  { code: 0, name: '已删除' },
  { code: 1, name: '未审核' },
  { code: 2, name: '审核未通过' },
  { code: 3, name: '审核已通过' }
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
      publishOptions,
      statusOptions,
      code: '',
      edit: {
        visible: false,
        diaTitle: '',
        formData: {},
        check: false
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
    onLook(id) {
      api.getById(id).then(response => {
        if (response.code === 20000) {
          this.edit.formData = response.data
          this.edit.diaTitle = '文章详情'
          this.edit.visible = true
        }
      })
    },
    onCheck(id) {
      api.getById(id).then(response => {
        if (response.code === 20000) {
          this.edit.formData = response.data
          this.edit.visible = true
          this.edit.check = true
          this.edit.diaTitle = '审核文章'
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
