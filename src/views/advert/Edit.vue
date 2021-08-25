<template>
  <el-dialog :title="title" :visible.sync="visible" :before-close="handleClose" width="500px">
    <el-form
      ref="formData"
      :rules="rules"
      status-icon
      :model="formData"
      label-width="100px"
      label-position="right"
      style="width: 400px"
    >
      <!--      广告图片-->
      <!--      action 指定上传地址，但是我们不用它默认的，所以给它空的，不能把它删除，默认这个必须要有-->
      <!--      show-file-list 是否显示已上传文件列表，因为上传的是图片，不是文件，所以不要显示-->
      <!--      http-request 自定义上传实现-->
      <el-form-item label="广告图片:" prop="imageUrl">
        <el-upload
          class="avatar-uploader"
          accept="image/*"
          action=""
          :show-file-list="false"
          :http-request="uploadMainImg"
        >
          <img v-if="formData.imageUrl" :src="formData.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <!--      广告标题-->
      <el-form-item label="广告标题:" prop="title">
        <el-input
          v-model="formData.title"
        />
      </el-form-item>
      <!--      广告链接-->
      <el-form-item label="广告链接:" prop="advertUrl">
        <el-input
          v-model="formData.advertUrl"
        />
      </el-form-item>
      <!--      跳转方式-->
      <el-form-item label="跳转方式:" prop="advertUrl">
        <el-select v-model="formData.advertTarget" placeholder="请选择">
          <el-option label="新窗口打开" value="_blank" />
          <el-option label="当前窗口打开" value="_self" />
        </el-select>
      </el-form-item>
      <!--      状态-->
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--      广告位置-->
      <el-form-item label="广告位置" prop="position">
        <el-input-number v-model="formData.position" />
      </el-form-item>
      <!--      排序-->
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="formData.sort" />
      </el-form-item>
      <!--      按钮-->
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
import commonApi from '@/api/common'

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
      default: () => {}
    },
    remoteClose: Function,
    oldImageUrl: String
  },
  data() {
    return {
      rules: { // 校验规则
        imageUrl: [
          { required: true, message: '请上传广告图片', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入广告标题', trigger: 'blur' }
        ],
        advertUrl: [
          { required: true, message: '请输入广告链接', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        position: [
          { required: true, message: '请输入广告位置', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
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
    },
    uploadMainImg(file) {
      const data = new FormData()
      data.append('file', file.file)
      commonApi.uploadImg(data).then(response => {
        // 防止多次上次，上传成功后把原来的照片删除
        this.deleteImg()
        this.formData.imageUrl = response.data
      }).catch(() => {
        this.$message({
          showClose: true,
          message: '上传失败',
          type: 'error'
        })
      })
    },
    // 删除主图, 上传成功和关闭窗口调用删除上一次上传的图片
    deleteImg() {
      // 以防上传后，表单没有提交，这样就不能把进入到修改页面时最初的图片删除，
      // 如果删除了下次再点击修改，就找不到图片了
      if (this.formData.imageUrl && this.formData.imageUrl !== this.oldImageUrl) {
        commonApi.deleteImg(this.formData.imageUrl)
      }
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
