<template>
  <el-dialog title="title" :visible.sync="visible" :before-close="handleClose" width="500px">
    <el-form
      ref="formData"
      :rules="rules"
      status-icon
      :model="formData"
      label-width="100px"
      label-position="right"
      style="width: 400px"
    >
      <el-form-item label="分类名称:" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序:" prop="sort">
        <el-input-number
          v-model="formData.sort"
          style="width: 300px;"
        />
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input
          v-model="formData.remark"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入备注"
        />
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
import api from '@/api/category'

export default {
  props: {
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
      default: {}
    },
    remoteClose: Function
  },
  data() {
    return {
      rules: { // 校验规则
        name: [ // 与 el-form-item 标签的 prop 属性值对应
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        sort: [
          { required: true, message: '请输入排序号', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // handleClose(done) {
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       this.remoteClose()
    //     })
    //     .catch(_ => {})
    // },
    handleClose(done) {
      this.$refs['formData'].resetFields()
      this.remoteClose()
    },
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
    async submitData() {
      let response = null
      if (this.formData.id) {
        response = await api.update(this.formData)
      } else {
        response = await api.addList(this.formData)
      }
      if (response.code === 20000) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
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
