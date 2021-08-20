<template>
  <el-dialog title="title" :visible.sync="visible" :before-close="handleClose" width="70%">
    <el-form
      ref="formData"
      status-icon
      :model="formData"
      label-width="100px"
      label-position="right"
      style="width: 100%"
    >
      <!--      标题-->
      <el-form-item label="标题:" prop="title">
        <el-input
          v-model="formData.title"
          readonly
        />
      </el-form-item>
      <!--      标签-->
      <el-form-item label="标签:" prop="labelIds">
        <el-imput
          :disable="true"
        />
      </el-form-item>
      <!--      主图-->
      <el-form-item label="主图:" prop="imageUrl">
        <el-image
          style="width: 180px; height: 180px"
          :src="formData.imageUrl"
        />
      </el-form-item>
      <!--      是否公开-->
      <el-form-item label="是否公开:">
        <el-radio-group v-model="formData.ispublic" disabled>
          <el-radio :label='1'>公开</el-radio>
          <el-radio :label='0'>不公开</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--      简介-->
      <el-form-item label="简介:">
        <el-input
          v-model="formData.summary"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          readonly
        />
      </el-form-item>
      <!--      内容-->
      <el-form-item label="内容:">
        <mavon-editor
          v-model="formData.htmlContent"
          :toolbars="markdownOption"
        />
      </el-form-item>
      <el-form-item v-if="check" align="center">
        <el-button type="primary" size="medium" @click="auditSuccess">
          审核通过</el-button>
        <el-button type="danger" size="medium" @click="auditFail">审核不通过</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import api from '@/api/article'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

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
    remoteClose: Function,
    check: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: false, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        trash: false, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      }
    }
  },
  components: {
    mavonEditor
  },
  methods: {
    auditSuccess() {
      this.$confirm('确定审核通过吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.auditSuccess(this.id).then(response => {
          this.$message({
            type: 'success',
            message: '审核通过提交成功'
          })
          this.remoteClose()
        })
      }).catch(() => {})
    },
    auditFail() {
      this.$confirm('确定审核不通过吗？', '提示', {
        confirmButtonText: '',
        cancelButtonText: '',
        type: ''
      }).then(() => {
        api.auditFail(this.id).then(response => {
          this.$message({
            type: 'success',
            message: '审核不通过提交成功'
          })
          this.remoteClose()
        })
      }).catch(()=>{})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
