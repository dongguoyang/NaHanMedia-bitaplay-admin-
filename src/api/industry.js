import request from '@/utils/request'

export function getIndustryList(data) {
  return request({
    url: '/industry/list',
    method: 'post',
    data
  })
}

export function getIndustryAll() {
  return request({
    url: '/industry/all',
    method: 'get',
  })
}

export function saveIndustry(data) {
  return request({
    url: '/industry/save',
    method: 'post',
    data
  })
}



