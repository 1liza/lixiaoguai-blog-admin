<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" >
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总用户
          </div>
          <count-to :start-val="0" :end-val="userTotal" :duration="2600" class="card-panelnum"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="education" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总文章
          </div>
          <count-to :start-val="0" :end-val="articleTotal" :duration="3000" class="cardpanel-
num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" >
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="question" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总提问
          </div>
          <count-to :start-val="0" :end-val="questionTotal" :duration="3200" class="cardpanel-
num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import CountTo from 'vue-count-to'
export default {
  components: {
    CountTo
  },
  props: {
    userTotal: {
      type: Number,
      default: 0
    },
    articleTotal: {
      type: Number,
      default: 0
    },
    questionTotal: {
      type: Number,
      default: 0
    }
  }
}
</script>
