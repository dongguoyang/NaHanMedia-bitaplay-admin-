import request from '@/utils/request'

export function searchSystem(data) {
  return request({
    url: '/system/search',
    method: 'post',
    data
  })
}

export function saveSystem(data) {
  return request({
    url: '/system/save',
    method: 'post',
    data
  })
}


export function getSystemAgreement() {
  return request({
    url: '/system/agreement',
    method: 'get',
  })
}



