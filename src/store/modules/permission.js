// import { asyncRouterMap, constantRouterMap } from '@/router'
import { constantRouterMap } from '@/router'
import { getList } from '../../api/menu'
import { generateRouter } from '../../utils/generateRouters'
import { routerMap } from '../../router/map'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      const { roles } = data
      const { menuId } = data
      let accessedRouters
      return new Promise(resolve => {
        getList(menuId).then(res => {
          console.log(res)
          res.data.data.menuId = menuId
          const routers = generateRouter(routerMap, res.data.data)
          if (roles.includes('admin')) {
            accessedRouters = routers
          } else {
            accessedRouters = filterAsyncRouter(routers, roles)
          }

          console.log('accessedRouters')
          console.log(accessedRouters)
          commit('SET_ROUTERS', accessedRouters)
          resolve()
        })
      })
    }
  }
}

export default permission
