// 校验成功
const verifyClientEnterpriseSucceed = {
  'respCode': '0000',
  'respDesc': '成功',
  'data': {}
}

// 校验不成功
const verifyClientEnterpriseRejected = {
  'respCode': '9999',
  'respDesc': '校验不成功',
  'data': {}
}

export default {
  verifyClientEnterprise: config => {
    if (Math.round(Math.random())) {
      return verifyClientEnterpriseSucceed
    } else {
      return verifyClientEnterpriseRejected
    }
  }
}
