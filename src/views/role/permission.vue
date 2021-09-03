<template>
  <!--弹窗-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
    width="500px"
  >
    <!-- v-loading 值为 true 显示加载中 -->
    <el-form v-loading="loading" label-width="80px">
      <!--
      data 数据集合，default-checked-keys 默认勾选
      props
      node-key 每个树节点用来作为唯一标识的属性
      show-checkbox 显示勾选框
      accordion 每次只打开一个同级树节点展开
      highlight-current 高亮当前选中节点
      -->
      <el-tree
        ref="tree"
        :data="menuList"
        :default-checked-keys="menuIds"
        :props="{children: 'children', label: 'name'}"
        node-key="id"
        show-checkbox
        accordion
        highlight-current
      />
      <el-form-item align="center">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitForm('formData')">确 定
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import menuApi from '@/api/menu'
import roleApi from '@/api/role'
export default {
  props: {
    roleId: null, // 角色id
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    remoteClose: Function
  },
  data() {
    return {
      loading: false, // 加载中
      menuList: [], // 所有菜单集合
      menuIds: [] // 角色拥有的权限菜单ids
    }
  },
  watch: {
    visible: function(val) {
      if (val) {
        this.getMenuList()
      }
    }
  },
  methods: {
    // 关闭窗口
    handleClose(done) {
      this.menuIds = []
      this.menuList = []
      this.remoteClose()
    },
    // 提交表单
    submitForm(formName) {
      const checkedMenuIds = this.$refs.tree.getCheckedKeys()
      roleApi.saveRoleMenu(this.roleId, checkedMenuIds).then(response => {
        if (response.code === 20000) {
          // 提交成功, 关闭窗口, 刷新列表
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          // 关闭窗口
          this.handleClose()
        } else {
          this.$message({
            type: 'error',
            message: '保存失败'
          })
        }
      })
    },
    getMenuList() {
      this.loading = true
      menuApi.getList({}).then(response => {
        this.menuList = response.data
        this.getMenuIdsByRoleId(this.roleId)
        this.loading = false
      })
    },
    getMenuIdsByRoleId(roleId) {
      roleApi.getMenuIdsByRoleId(roleId).then(response => {
        this.menuIds = response.data
      })
    }
  }
}
</script>
