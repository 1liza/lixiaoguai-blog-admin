<template>
  <!--弹窗-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
    width="500px"
  >
    <el-form
      ref="formData"
      :model="formData"
      label-width="100px"
      style="width: 400px;"
      status-icon
    >
      <el-form-item label="名称：" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input
          v-model="formData.remark"
          type="textarea"
          :autosize="{ minRows:
            2, maxRows: 4}"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item align="right">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitForm('formData')">确 定
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
// 接收父组件传递的属性
  props: {
    visible: { // 弹出隐藏
      type: Boolean,
      default: false
    },
    title: { // 标题
      type: String,
      default: ''
    },
    formData: { // 表单数据
      type: Object,
      default: {}
    },
    remoteClose: Function // 用于关闭窗口
  },
  methods: {
    // 关闭弹窗
    handleClose(done) {
    },
    // 提交表单
    submitForm(formName) {
    }
  }
}
</script>
