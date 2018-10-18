import request from '@/utils/request'

export function getList(menuId) {
  const data = {
    menuId
  }
  return request({
    url: '/menu/list',
    method: 'post',
    data
  })
}
