import Mock from 'mockjs'
import { param2ObjFormData } from '@/utils'

export default {

  getList: config => {
    const payload = param2ObjFormData(config.body)
    const recordsTotal = 35
    const pageNo = parseInt(payload.pageNo)
    const pageSize = parseInt(payload.pageSize)
    const total = Math.ceil(recordsTotal / pageSize)
    // list
    // const data = Mock.mock({
    //   'rows|10': [{
    //     'id|+1': 1, // |+1标示自增长 具体的几种规则请看文档
    //     'name|string': '@name', // @name根据name命令生成随机名称，具体看文档
    //     'avatar': '@image(\'200x100\', \'#ececec\', \'#ccc\', \'@title\')', // 暂时不能
    //     'orderNo': '@guid()',
    //     'timestamp': +Mock.Random.date('T'),
    //     'price': '@float(1000, 15000, 0, 2)',
    //     'status|1': ['success', 'pending'],
    //     'jobId': '@guid()',
    //     'custName': '@cname()',
    //     'custType|1': ['个人', '企业'], // 数组中的一个
    //     'createTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
    //     'identiNumber': '@guid()',
    //     'jobContent': '@cparagraph()'
    //   }],
    //   'respCode': '0000',
    //   'respDesc': '成功',
    //   'recordsTotal': recordsTotal,
    //   'total': total,
    //   'pageNo': pageNo
    // })

    const data = Mock.mock({
      'rows|10': [{
        'id|+1': 1,
        'jobId': '@guid()',
        'custName': '@cname()',
        'eventType|1': ['流量提醒', '流量降速', '流量停机'],
        'custType|1': ['个人', '企业'], // 数组中的一个
        'createTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
        'identiNumber': '@guid()',
        'jobContent': '@cparagraph()'
      }],
      'respCode': '0000',
      'respDesc': '成功',
      'recordsTotal': recordsTotal,
      'total': total,
      'pageNo': pageNo
    })
    return data
  }
}
