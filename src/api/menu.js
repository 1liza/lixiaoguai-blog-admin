import request from '@/utils/request'

export default {
// 列表分页接口
  getList(query) {
    return request({
      url: `/system/menu/search`,
      method: 'post',
      data: query
    })
  },
  getById(id) {
    return request({
      url: `/system/menu/${id}`,
      method: 'get'
    })
  },
  deleteById(id) {
    return request({
      url: `/system/menu/${id}`,
      method: 'delete'
    })
  }
}
