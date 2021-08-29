import request from '@/utils/request'

export default {
  getList(query, current = 1, size = 20) {
    return request({
      url: '/system/role/search',
      method: 'post',
      data: { ...query, current, size }
    })
  },
  getById(id) {
    return request({
      url: `/system/role/${id}`,
      method: 'get'
    })
  }
}
