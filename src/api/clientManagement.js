import request from '@/utils/request'
import qs from 'qs'

// 校验个人客户
export function verifyClientEnterprise({ certType, certNo } = { certType, certNo }) {
  return request({
    url: '/openAccountEnterprise/verifyClientEnterprise',
    method: 'post',
    data: qs.stringify({
      certType,
      certNo
    })
  })
}

// 查询企业客户
export function qryCustInfoServiceEnterprise(
  { busiLicenseCode } = { busiLicenseCode }) {
  return request({
    url: '/qryCustInfoService',
    method: 'post',
    data: qs.stringify({
      busiLicenseCode
    })
  })
}

// 查询个人客户
export function qryCustInfoService(
  { certNo } = { certNo }) {
  return request({
    url: '/qryCustInfoService',
    method: 'post',
    data: qs.stringify({
      certNo
    })
  })
}

// 添加企业客户
export function addEnterpriseCustService(data) {
  return request({
    url: '/addEnterpriseCustService',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 添加个人客户
export function addPersonCustService({ custName, custType, custAddr, certType, certNo, telePhone, sex, country, endTime } = {
  custName,
  custType,
  custAddr,
  certType,
  certNo,
  telePhone,
  sex,
  country,
  endTime
}) {
  return request({
    url: '/addPersonCustService',
    method: 'post',
    data: qs.stringify({
      custName,
      custType,
      custAddr,
      certType,
      certNo,
      telePhone,
      sex,
      country,
      endTime
    })
  })
}
