import request from '@/utils/request'

export function getProviderList(data) {
  return request({
    url: '/provider/list',
    method: 'post',
    data
  })
}

export function editProviderStatus(data) {
  return request({
    url: '/provider/edit-status',
    method: 'post',
    data
  })
}

export function getProviderInfoList(data) {
  return request({
    url: '/provider/info',
    method: 'post',
    data
  })
}

export function editProviderInfoStatus(data) {
  return request({
    url: '/provider/edit-info-status',
    method: 'post',
    data
  })
}




