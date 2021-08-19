import request from '@/utils/request'

export default {
  getList(query, current = 1, size = 20) {
    return request({
      url: '/article/category/search',
      method: 'post',
      data: {
        // {name: '前端', status: 1, current: current, size: size}
        ...query, current, size
      }
    })
  },
  addList(data) {
    return request({
      url: '/article/category',
      method: 'post',
      data: data
    })
  }
}
