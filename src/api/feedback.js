import request from '@/utils/request'

export function getFeedbackList(data) {
  return request({
    url: '/feedback/list',
    method: 'post',
    data
  })
}

export function handelFeedback(data) {
  return request({
    url: '/feedback/handel',
    method: 'post',
    data
  })
}
