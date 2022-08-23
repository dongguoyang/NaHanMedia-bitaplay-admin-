import request from '@/utils/request'

export function getOccupationList(data) {
  return request({
    url: '/occupation/list',
    method: 'post',
    data
  })
}

export function saveOccupation(data) {
  return request({
    url: '/occupation/save',
    method: 'post',
    data
  })
}



