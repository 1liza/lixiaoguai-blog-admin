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
  },
  getById(id) {
    return request({
      url: `/article/category/${id}`,
      // 有变量的时候需要使用反单引号
      method: 'get'
    })
  },
  update(data) {
    return request({
      url: '/article/category',
      method: 'put',
      data: data
    })
  },
  deleteById(id) {
    return request({
      url: `/article/label/${id}`,
      method: 'delete'
    })
  },
  getNormalList() {
    return request({
      url: '/article/category/list',
      method: 'get'
    })
  }
}
