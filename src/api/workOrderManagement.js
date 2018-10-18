import request from '@/utils/request'
import qs from 'qs'

// 策略工单查询
export function strategyOrderQryListService(
  {
    custType,
    eventType,
    startTime,
    endTime,
    identiNumber,
    pageNo,
    pageSize
  } = {
    custType,
    eventType,
    startTime,
    endTime,
    identiNumber,
    pageNo,
    pageSize
  }) {
  return request({
    url: '/strategyOrderQryListService',
    method: 'post',
    data: qs.stringify({
      custType,
      eventType,
      startTime,
      endTime,
      identiNumber,
      pageNo,
      pageSize
    })
  })
}

// 开通工单查询
export function queryJobService(
  {
    custType,
    jobId,
    jobType,
    startTime,
    endTime,
    orderId,
    pageNo,
    pageSize
  } = {
    custType,
    jobId,
    jobType,
    startTime,
    endTime,
    orderId,
    pageNo,
    pageSize
  }) {
  return request({
    url: '/queryJobService',
    method: 'post',
    data: qs.stringify({
      custType,
      jobId,
      jobType,
      startTime,
      endTime,
      orderId,
      pageNo,
      pageSize
    })
  })
}

