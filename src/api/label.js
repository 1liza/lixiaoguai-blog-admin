import request from '@/utils/request'

export default {
  getList(query, current = 1, size = 20) {
    return request({
      url: '/article/label/search',
      method: 'post',
      data: {...query, current, size}
    })
  },
  addList(data) {
    return request({
      url: '/article/label',
      method: 'post',
      data: data
    })
  },
  getNormalList() {
    return request({
      url: ''
    })
  }
}
