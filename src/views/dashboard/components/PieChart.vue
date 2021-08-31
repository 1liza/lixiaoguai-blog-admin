<template>
  <div ref="main" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    legendData: {
      type: Array,
      default: () => ['前端', 'Java', '移动端', '大数据', '人工智能', '区块链']
    },
    seriesData: { // 柱状数据
      type: Array,
      default: () => [
        { value: 335, name: '前端' },
        { value: 310, name: 'Java' },
        { value: 234, name: '移动端' },
        { value: 135, name: '大数据' },
        { value: 1548, name: '人工智能' },
        { value: 1548, name: '区块链' }
      ]
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
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.main, 'macarons')
      this.chart.setOption({
        title: {
          text: '各技术频道文章统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/> {b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.legendData
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: this.seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0,0,0,0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style>

</style>
