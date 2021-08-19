<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{name}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '@/api/test'
export default {
  data() {
    return {
      name: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.test().then(response => {
        this.name = response
      })
    }
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
