import request from '@/utils/request'

export function getWebFeedbackList(data) {
  return request({
    url: '/web-feedback/list',
    method: 'post',
    data
  })
}

export function handelWebFeedback(data) {
  return request({
    url: '/web-feedback/handel',
    method: 'post',
    data
  })
}
