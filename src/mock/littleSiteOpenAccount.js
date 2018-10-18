const areaRange = {
  'respCode': '0000',
  'respDesc': '成功',
  'data': [{
    value: '中国、蒙古、韩国、印度',
    label: '中国、蒙古、韩国、印度'
  }, {
    value: '中国',
    label: '中国'
  }, {
    value: '中国、中东、非洲、移动波束',
    label: '中国、中东、非洲、移动波束'
  }, {
    value: '中东北非',
    label: '中东北非'
  }, {
    value: '东印度洋至西太平洋，移动波束',
    label: '东印度洋至西太平洋，移动波束'
  }]
}

const areaList = {
  'respCode': '0000',
  'respDesc': '成功',
  total: 100,
  'data': [
    {
      date: '2016-05-03',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },
    {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },
    {
      date: '2016-05-04',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },
    {
      date: '2016-05-01',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },
    {
      date: '2016-05-08',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },
    {
      date: '2016-05-06',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },
    {
      date: '2016-05-07',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }
  ]
}
const enterpriseList = {
  'respCode': '0000',
  'respDesc': '成功',
  total: 100,
  'data': [
    {
      date: '2016-05-03',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }
  ]
}

export default {
  getArea: config => {
    console.log(config.url.split('0='))
    const index = Number(config.url.split('0=')[1])
    if (index === 1) {
      return areaRange
    }
    if (index === 2) {
      return areaList
    }
    if (index === 3) {
      return enterpriseList
    }
  },
  checkServie: config => {
    return {
      'respDesc': '小站名称可用',
      'data': {},
      'respCode': '0000'
    }
  }
}
