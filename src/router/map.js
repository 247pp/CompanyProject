export const routerMap = {
  documentation: () => import('@/views/documentation/index'),
  example: () => import('@/views/example/index'),
  index: () => import('@/views/dashboard/index'),
  theme: () => import('@/views/theme/index'),
  create: () => import('@/views/example/create'),
  edit: () => import('@/views/example/edit'),
  modal: () => import('@/views/example/modal'),
  menu1: () => import('@/views/nested/menu1/index'),
  'menu1-1': () => import('@/views/nested/menu1/menu1-1'),
  'menu1-2': () => import('@/views/nested/menu1/menu1-2'),
  'menu1-2-1': () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  'menu1-2-2': () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  'menu1-3': () => import('@/views/nested/menu1/menu1-3'),
  menu2: () => import('@/views/nested/menu2/index'),
  directive: () => import('@/views/permission/directive'),
  page: () => import('@/views/permission/page'),
  openAccount: () => import('@/views/littleSite/openAccount'),
  changeService: () => import('@/views/littleSite/changeService'),
  paymentSuccPage: () => import('@/views/littleSite/paymentSuccPage'),
  openAccountPersonal: () => import('@/views/littleSite/openAccountPersonal'),
  openAccountEnterprise: () => import('@/views/littleSite/openAccountEnterprise'),
  openAccountPersonalA: () => import('@/views/littleSite/openAccountPersonalA'),
  orderSearchStrategy: () => import('@/views/littleSite/orderSearchStrategy'),
  orderSearchOpen: () => import('@/views/littleSite/orderSearchOpen'),
  orderHandle: () => import('@/views/littleSite/openOrderHandle')
}
