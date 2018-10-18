import Layout from '@/views/layout/Layout'

export function generateRouter(routerMap, asyncMenu) {
  function generateAsyncRouter(localRouterMap, serverRouterMap) {
    serverRouterMap.forEach(function(item, index) {
      if (item.component === 'Layout') {
        item.component = Layout
      } else {
        item.component = localRouterMap[item.component]
      }
      if (item.children && item.children.length > 0) {
        generateAsyncRouter(localRouterMap, item.children)
      }
    })
    return serverRouterMap
  }

  const MenuKey = 'SideMenu'

  function getMenuListLocal() {
    return sessionStorage.getItem(MenuKey)
  }

  function setMenuList(menu) {
    return sessionStorage.setItem(MenuKey, menu)
  }

  const localMenuObj = JSON.parse(getMenuListLocal())
  let asyncMenuObj
  if (localMenuObj) {
    asyncMenuObj = localMenuObj.menuList
  } else {
    const menuId = asyncMenu.menuId + ''
    const menuList = asyncMenu.menuList
    asyncMenuObj = menuList
    setMenuList(JSON.stringify({ menuId, menuList }))
  }

  const menuListObj = generateAsyncRouter(routerMap, asyncMenuObj)
  return menuListObj
}
