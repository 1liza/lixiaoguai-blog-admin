<template>
  <!--弹窗-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
    :rules="rules"
    width="500px"
  >
    <el-form
      ref="formData"
      :rules="rules"
      :model="formData"
      label-width="100px"
      style="width: 400px;"
      status-icon
    >
      <el-form-item label="类型：" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
          <!-- 如果 formData.parentId=0 是根菜单，就不显示按钮，注意是数字0，不是字符串没有引号 -->
          <el-radio v-if="formData.parentId !== 0" :label="3">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 按钮：不要显示 请求地址url、 图标icon , 在按钮上对应的写明就行，所以不需要-->
      <el-form-item label="名称：" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="权限标识：" prop="code">
        <el-input v-model="formData.code" />
      </el-form-item>
      <el-form-item v-if="formData.type != 3" label="请求地址：" prop="url">
        <el-input v-model="formData.url" />
      </el-form-item>
      <el-form-item v-if="formData.type != 3" label="图标：" prop="icon">
        <el-input v-model="formData.icon" />
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input-number v-model="formData.sort" :min="1" :max="10000" />
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
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    remoteClose: Function,
    formData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rules: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'change' }],
        code: [{ required: true, message: '请输入权限标识', trigger: 'change' }],
        type: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm() {
      this.remoteClose()
    },
    handleClose() {
      this.remoteClose()
    }
  }
}
</script>

<style></style>
