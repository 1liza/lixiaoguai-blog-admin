import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getUserMenuList(userId) {
  return request({
    url: `/system/menu/user/${userId}`,
    method: 'get'
  })
}

export function getList(query, current = 1, size = 20) {
  return request({
    url: '/system/user/search',
    method: 'post',
    data: { ...query, current, size }
  })
}

export function add(data) {
  return request({
    url: `/system/user`,
    method: 'post',
    data
  })
}
export function getById(id) {
  return request({
    url: `/system/user/${id}`, // 反单引号 ``
    method: 'get'
  })
}
export function update(data) {
  return request({
    url: `/system/user`,
    method: 'put', // put 方式提交
    data
  })
}
export function deleteById( id ) {
  return request({
    url: `/system/user/${id}`, // 反单引号 ``
    method: 'delete', // delete 方式提交
  })
}
