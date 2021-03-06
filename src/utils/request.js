import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  PcCookie,
  Key
} from '@/utils/cookie' // 对 cookie 操作

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent

    /* if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    } */
    const accessTokenKey = PcCookie.get(Key.accessTokenKey)
    if (accessTokenKey) {
      // 针对每个请求，请求头带上令牌 Authorization: Bearer token
      config.headers.Authorization = 'Bearer ' + accessTokenKey
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    if (error.response && error.response.status !== 401) {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
    // 401 发送刷新令牌请求锁， 防止并发重复请求,
    // true 还未请求，false 正在请求刷新
    let isLock = true
    if (isLock && PcCookie.get(Key.refreshTokenKey)) {
      // 有刷新令牌，防止并发重复请求刷新，
      isLock = false
      // 通过刷新令牌获取新令牌，
      window.location.href =
        `${process.env.VUE_APP_AUTH_CENTER_URL}/refresh?
      redirectURL=${window.location.href}`
    } else {
      // 没有刷新令牌，则跳转认证客户端
      window.location.href =
        `${process.env.VUE_APP_AUTH_CENTER_URL}?redirectURL=${window.location.href}`
    }
    return Promise.reject('令牌过期，重新认证')
  }
)

export default service
