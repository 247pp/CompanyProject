import request from '@/utils/request'
import { getFormDataStr } from '@/utils'

import qs from 'qs'

export function PayMentFee(
  { oderId, fee, fee_code, fee_name } = { oderId, fee, fee_code, fee_name }) {
  return request({
    url: '/PayMentFee',
    method: 'get',
    data: qs.stringify({
      oderId, fee, fee_code, fee_name
    })
  })
}

export function modityOrderStatusService(
  { orderId, orderStatus, operateType, orderProcStatus } = { orderId, orderStatus, operateType, orderProcStatus }) {
  return request({
    url: '/modityOrderStatusService',
    method: 'post',
    data: qs.stringify({
      orderId, orderStatus, operateType, orderProcStatus
    })
  })
}

export function regionServiceQry(
  { regionCode, regionName } = { regionCode, regionName }) {
  return request({
    url: '/regionServiceQry',
    method: 'post',
    data: qs.stringify({
      regionCode, regionName
    })
  })
}

export function productServiceQry(
  { productRegion, productModel, productType, startTime, endTime, productName, productId, userType, custId } = {
    productRegion,
    productModel,
    productType,
    startTime,
    endTime,
    productName,
    productId,
    userType,
    custId
  }) {
  return request({
    url: '/productService',
    method: 'post',
    data: qs.stringify({
      productRegion,
      productModel,
      productType,
      startTime,
      endTime,
      productName,
      productId,
      userType,
      custId
    })
  })
}

export function queryUserscribeProdByUserInfoService(
  { custId, status, userType } = { custId, status, userType }) {
  return request({
    url: '/queryUserscribeProdByUserInfoService',
    method: 'post',
    data: qs.stringify({
      custId, status, userType
    })
  })
}

export function qryCustInfoListService(
  { custType, status } = { custType, status }) {
  return request({
    url: '/qryCustInfoListService',
    method: 'post',
    data: qs.stringify({
      custType, status
    })
  })
}

export function addJobOpenService(query) {
  return request({
    url: '/addJobOpenService',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: getFormDataStr(query)
  })
}

export function stationPerChangeServiceModify(query) {
  return request({
    url: '/stationPerChangeService',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: getFormDataStr(query)
  })
}

export function regisAccount(query) {
  return request({
    url: '/registerAccountService',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: getFormDataStr(query)
  })
}

export function checkSmallStationNameService(
  { smallStationName, custId } = { smallStationName, custId }) {
  return request({
    url: '/checkSmallStationNameService',
    method: 'post',
    data: qs.stringify({
      smallStationName, custId
    })
  })
}

export function fetchArea(query) {
  return request({
    url: '/account/area',
    method: 'post',
    data: query
  })
}

export function fetchList(query) {
  return request({
    url: '/account/list',
    method: 'post',
    data: query
  })
}

export function fetchListChange({ smallStationName, userType, custId, status, pageNum } = {
  smallStationName,
  userType,
  custId,
  status,
  pageNum
}) {
  return request({
    url: '/queryUserscribeProdByUserInfoService',
    method: 'post',
    data: qs.stringify({ smallStationName, userType, custId, status })
  })
}

// export function fetchEnterprise(query) {
//   return request({
//     url: '/enterprise/list',
//     method: 'post',
//     params: query
//   })
// }

// 小站数据变更-小站数据查询
export function littleSiteServiceQry({ userId } = { userId }) {
  return request({
    url: '/userProdQryService',
    method: 'post',
    data: qs.stringify({
      userId
    })
  })
}

// 查询企业小站
export function productServiceQryServices(
  { userId } = { userId }) {
  return request({
    url: '/productServiceQryService',
    method: 'post',
    data: qs.stringify({
      userId
    })
  })
}
