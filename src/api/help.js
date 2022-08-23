import request from '@/utils/request'

export function helpList(data) {
  return request({
    url: '/help/list',
    method: 'post',
    data
  })
}

export function helpHandle(data) {
  return request({
    url: '/help/handle',
    method: 'post',
    data
  })
}





