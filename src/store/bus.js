import store from '@/store'
import router from '../router'

const EventBus = function(Vue) {
  const Bus = new Vue()
  // 封装页面跳转方法
  const roles = ['admin']
  Bus.$jump = function(menuId, route) {
    sessionStorage.removeItem('SideMenu') // 删除本地缓存的菜单项
    store.dispatch('GenerateRoutes', { roles, menuId }).then(() => { // 根据roles权限生成可访问的路由表
      router.addRoutes(store.getters.addRouters)
      router.push('/' + route)
    })
  }

  Vue.prototype.$bus = Bus
}

export default EventBus
