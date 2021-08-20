<template>
  <el-dialog :title="title" :visible.sync="visible" :before-close="handleClose" width="500px">
    <el-form
      :rules="rules"
      ref="formData"
      status-icon
      :model="formData"
      label-width="100px"
      label-position="right"
      style="width: 400px"
    >
      <el-form-item label="标签名称:" prop="name">
        <el-input v-model="formData.name" size="mini" />
      </el-form-item>
      <el-form-item label="分类名称" prop="categoryName">
        <el-select v-model="formData.categoryName" clearable size="mini" placeholder="请选择">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submitForm('formData')">
          确定</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import api from '@/api/label'

export default {
  props: {
    categoryList: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    formData: {
      type: Object,
      default: () => {}
    },
    remoteClose: Function
  },
  data() {
    return {
      rules: { // 校验规则
        name: [ // 与 el-form-item 标签的 prop 属性值对应
          { required: true, message: '请输入标签名称', trigger: 'blur' }
        ],
        categoryName: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleClose(done) {
      this.$refs['formData'].resetFields()
      this.remoteClose()
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 校验通过，提交数据
          this.submitData()
        } else {
          // 验证不通过
          return false
        }
      })
    },
    // 异步方法提交数据
    async submitData() {
      // let response = await api.add(this.formData)
      let response = null
      // 有 id 值则修改，没有id则新增
      if (this.formData.id) {
        response = await api.update(this.formData)
      } else {
        response = await api.addList(this.formData)
      }
      // 等上面返回数据response后再进行处理
      if (response.code === 20000) {
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
