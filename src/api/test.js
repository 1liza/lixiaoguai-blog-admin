import request from '@/utils/request'
// 创建请求实例
export default {
  test() {
    return request({
      url: '/test',
      method: 'post',
      data: {
        'name': '李'
      }
    })
  }
}
