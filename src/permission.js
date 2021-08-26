import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
// ++ 1. 导入 cookie.js 获取认证信息 ++
import {
  PcCookie,
  Key
} from '@/utils/cookie'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()

  // +++ 2. 获取 accessToken +++
  const hasToken = PcCookie.get(Key.accessTokenKey)

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      /*       const hasGetUserInfo = store.getters.name
            if (hasGetUserInfo) {
              next()
            } else {
              try {
                // get user info
                await store.dispatch('user/getInfo')

                next()
              } catch (error) {
                // remove token and go to login page to re-login
                await store.dispatch('user/resetToken')
                Message.error(error || 'Has Error')
                next(`/login?redirect=${to.path}`)
                NProgress.done()
              }
            } */
      // +++ 3. 获取用户信息 +++
      const hasGetUserInfo = PcCookie.get(Key.userInfoKey)
      if (hasGetUserInfo) {
        // 有，跳转目标路由
        // 是否已经初始化过权限菜单 ++++
        if (store.getters.init === false) {
          // 获取用户拥有的权限菜单 ，调用 store/modules/menu.js 的 GetUserMenu
          store.dispatch('menu/GetUserMenu').then(() => {
            // 继承访问目标路由且不会留下history记录
            next({
              ...to,
              replace: true
            })
          })
        } else {
          next() // 继承访问目标路由
        }
      } else {
        // 没有则跳转认证客户端
        window.location.href =
          `${process.env.VUE_APP_AUTH_CENTER_URL}?redirectURL=${window.location.href}`
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
      // ++ 未认证，跳转认证客户端进行登录 ++
      window.location.href =
        `${process.env.VUE_APP_AUTH_CENTER_URL}?redirectURL=${window.location.href}`
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
