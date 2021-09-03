<template>
  <div
    ref="main"
    :class="className"
    :style="{width:width,height:height}"
  />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons')
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    className: {
      type: String,
      default: 'chart'
    },
    xAxisData: { // x轴显示的年月
      type: Array,
      default: () => ['2021-01', '2021-02', '2021-03', '2021-04', '2021-05', '2021-06']
    },
    seriesData: { // 柱状数据
      type: Array,
      default: () => [10, 52, 200, 334, 390, 330]
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    } else {
      this.chart.dispose()
      this.chart = null
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.main, 'macarons')
      this.chart.setOption({
        title: {
          text: '近6个月发布的文章数',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [ // x 轴
          {
            type: 'category',
            data: this.xAxisData,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [ // y 轴
          {
            type: 'value'
          }
        ],
        series: [ // 系列，显示的数据
          {
            name: '发布数', // 悬浮提示内容
            type: 'bar', // 柱状类型
            barWidth: '60%', // 每个柱状宽度
            data: this.seriesData
          }
        ]
      })
    }
  }
}
</script>
