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
  },
  addList(data) {
    return request({
      url: '/system/role',
      method: 'post',
      data
    })
  },
  updateList(data) {
    return request({
      url: '/system/role',
      method: 'put',
      data
    })
  },
  deleteById(id) {
    return request({
      url: `/system/role/${id}`,
      method: 'delete'
    })
  },
  getMenuIdsByRoleId(id) {
    return request({
      url: `/system/role/${id}/menu/ids`, // 反单引号 ``
      method: 'get'
    })
  },
  saveRoleMenu(id, menuIds) {
    return request({
      url: `/system/role/{id}/menu/save`,
      method: 'post',
      data: menuIds
    })
  }
}
