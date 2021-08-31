<template>
  <div class="dashboard-container">
    <el-row :gutter="40">

      <panel-group />

      <el-col :xs="24" :sm="24" :lg="12">
        <el-card>
          <pie-chart />
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="12">
        <el-card>
          <bar-chart />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import PanelGroup from './components/PanelGroup'
export default {
  components: {
    PieChart,
    BarChart,
    PanelGroup
  }
}

</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
