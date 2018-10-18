const menu1 = {
  'respCode': '0000',
  'respDesc': '成功',
  'data': {
    varsion: 1,
    menuId: 1,
    menuList: [
      {
        path: '/littleSite',
        component: 'Layout',
        redirect: 'noredirect',
        name: 'LittleSite',
        meta: {
          title: 'littleSite',
          icon: 'nested'
        },
        children: [
          {
            path: 'openAccount',
            name: 'OpenAccount',
            component: 'openAccount', // Parent router-view
            meta: { title: 'openAccount', icon: 'theme' }
          },
          {
            path: 'changeService',
            component: 'changeService',
            name: 'ChangeService',
            meta: { title: 'changeService', icon: 'theme' }
          },
          {
            path: 'paymentSuccPage',
            component: 'paymentSuccPage',
            name: 'PaymentSuccPage',
            meta: { title: 'paymentSuccPage', icon: 'theme' },
            hidden: true
          }
        ]
      },
      {
        path: '/personalBusiness',
        component: 'Layout',
        redirect: 'noredirect',
        meta: { title: 'personalBusiness', icon: 'theme' },
        children: [
          {
            path: 'openAccountPersonal',
            component: 'openAccountPersonal',
            name: 'OpenAccountPersonal',
            meta: { title: 'openAccountPersonal', icon: 'theme' },
            showOne: true
          }
        ]
      },
      { path: '*', redirect: '/404', hidden: true }
    ]
  }
}

const menu2 = {
  'respCode': '0000',
  'respDesc': '成功',
  'data': {
    varsion: 1,
    menuId: 2,
    menuList: [
      {
        path: '/nested',
        component: 'Layout',
        redirect: '/nested/menu1/menu1-1',
        name: 'Nested',
        meta: {
          title: 'nested',
          icon: 'nested'
        },
        children: [
          {
            path: 'menu1',
            component: 'menu1', // Parent router-view
            name: 'Menu1',
            meta: { title: 'menu1' },
            redirect: '/nested/menu1/menu1-1',
            children: [
              {
                path: 'menu1-1',
                component: 'menu1-1',
                name: 'Menu1-1',
                meta: { title: 'menu1-1' }
              },
              {
                path: 'menu1-2',
                component: 'menu1-2',
                name: 'Menu1-2',
                redirect: '/nested/menu1/menu1-2/menu1-2-1',
                meta: { title: 'menu1-2' },
                children: [
                  {
                    path: 'menu1-2-1',
                    component: 'menu1-2-1',
                    name: 'Menu1-2-1',
                    meta: { title: 'menu1-2-1' }
                  },
                  {
                    path: 'menu1-2-2',
                    component: 'menu1-2-2',
                    name: 'Menu1-2-2',
                    meta: { title: 'menu1-2-2' }
                  }
                ]
              },
              {
                path: 'menu1-3',
                component: 'menu1-3',
                name: 'Menu1-3',
                meta: { title: 'menu1-3' },
                hidden: true // 不在菜单中显示，但可以访问
              }
            ]
          },
          {
            path: 'menu2',
            name: 'Menu2',
            component: 'menu2',
            meta: { title: 'menu2' }
          }
        ]
      },
      { path: '*', redirect: '/404', hidden: true }
    ]
  }
}

const menu3 = {
  'respCode': '0000',
  'respDesc': '成功',
  'data': {
    varsion: 1,
    menuId: 3,
    menuList: [
      {
        path: '/clientManagementEnterprise',
        component: 'Layout',
        redirect: '/clientManagementEnterprise/openAccountEnterprise',
        name: 'ClientManagementEnterprise',
        meta: {
          title: 'clientManagementEnterprise',
          icon: 'nested'
        },
        children: [
          {
            path: 'openAccountEnterprise',
            name: 'OpenAccountEnterprise',
            component: 'openAccountEnterprise', // Parent router-view
            meta: { title: 'openAccountEnterprise', icon: 'theme' },
            showOne: true
          }
        ]
      },
      {
        path: '/clientManagementPersonal',
        component: 'Layout',
        redirect: '/clientManagementPersonal/openAccountPersonal',
        name: 'ClientManagementPersonal',
        meta: {
          title: 'clientManagementPersonal',
          icon: 'nested'
        },
        children: [
          {
            path: 'openAccountPersonalA',
            name: 'OpenAccountPersonalA',
            component: 'openAccountPersonalA', // Parent router-view
            meta: { title: 'openAccountPersonalA', icon: 'theme' },
            showOne: true
          }
        ]
      },
      { path: '*', redirect: '/404', hidden: true }
    ]
  }
}

const menu4 = {
  'respCode': '0000',
  'respDesc': '成功',
  'data': {
    varsion: 1,
    menuId: 4,
    menuList: [
      {
        path: '/workOrderStrategy',
        component: 'Layout',
        redirect: 'noredirect',
        meta: { title: 'workOrderStrategy', icon: 'documentation', noCache: true },
        children: [
          {
            path: '/workOrderStrategy/orderSearchStrategy',
            component: 'orderSearchStrategy',
            name: 'OrderSearchStrategy',
            meta: { title: 'orderSearchStrategy', icon: 'documentation', noCache: true },
            showOne: true
          }
        ]
      },
      {
        path: '/openWorkOrder',
        component: 'Layout',
        redirect: 'noredirect',
        meta: { title: 'openWorkOrder', icon: 'documentation', noCache: true },
        children: [
          {
            path: 'orderSearchOpen',
            name: 'OrderSearchOpen',
            component: 'orderSearchOpen', // Parent router-view
            meta: { title: 'orderSearchOpen', icon: 'theme' },
            showOne: true
          },
          {
            path: 'orderHandle',
            component: 'orderHandle',
            name: 'OrderHandle',
            meta: { title: 'orderHandle', icon: 'theme' },
            hidden: true
          }
        ]
      },
      { path: '*', redirect: '/404', hidden: true }
    ]
  }
}

const menu5 = {
  'respCode': '0000',
  'respDesc': '成功',
  'data': {
    varsion: 1,
    menuId: 5,
    menuList: [
      {
        path: '/example',
        component: 'Layout',
        redirect: '/example/index',
        children: [
          {
            path: 'index',
            component: 'example',
            name: 'Example',
            meta: { title: 'example', icon: 'example', noCache: true }
          }
        ]
      },
      { path: '*', redirect: '/404', hidden: true }
    ]
  }
}

export default {

  getList: config => {
    console.log('#################')
    // console.log(config)
    // JSON.parse(config.body)
    // console.log(JSON.parse(config.body).menuId)
    const menuId = parseInt(JSON.parse(config.body).menuId)
    console.log('menuId')
    console.log(menuId)
    switch (menuId) {
      case 1:
        return menu1
      case 2:
        return menu2
      case 3:
        return menu3
      case 4:
        return menu4
      case 5:
        return menu5
    }
  }
}
