import request from '@/utils/request'

export default {
  getList(query, current = 1, size = 20) {
    return request({
      url: '/article/article/search',
      method: 'post',
      data: {
        // {name: '前端', status: 1, current: current, size: size}
        ...query, current, size
      }
    })
  },
  getById(id) {
    return request({
      url: `/article/article/${id}`,
      // 有变量的时候需要使用反单引号
      method: 'get'
    })
  },
  deleteById(id) {
    return request({
      url: `/article/article/${id}`,
      method: 'delete'
    })
  },
  auditSuccess(id) {
    return request({
      url: `/article/article/audit/success/${id}`, // 反单引号 ``
      method: 'get',
    })
  },
// 审核不通过
  auditFail(id) {
    return request({
      url: `/article/article/audit/fail/${id}`, // 反单引号 ``
      method: 'get',
    })
  }
}
