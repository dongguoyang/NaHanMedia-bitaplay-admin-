import request from '@/utils/request'

export function getAppVserion(data) {
  return request({
    url: '/appVersion/list',
    method: 'post',
    data
  })
}

export function addAppVserion(data) {
  return request({
    url: '/appVersion/save',
    method: 'post',
    data
  })
}




