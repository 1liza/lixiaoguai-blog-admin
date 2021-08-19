import request from '@/utils/request'

export default {
  getList(query, current = 1, size = 20) {
    return request({
      url: `/article/label/search`,
      method: 'post',
      data: { ...query, current, size } // 合并成一个对象
    })
  },
  addList(data) {
    return request({
      url: '/article/label',
      method: 'post',
      data: data
    })
  },
  getById(id) {
    return request({
      url: `/article/label/${id}`, // 反单引号 ``
      method: 'get'
    })
  },
  update(data) {
    return request({
      url: `/article/label`,
      method: 'put', // put 方式提交
      data: data
    })
  },
  deleteById(id) {
    return request({
      url: `/article/label/${id}`, // 反单引号 ``
      method: 'delete' // delete 方式提交
    })
  }
}
