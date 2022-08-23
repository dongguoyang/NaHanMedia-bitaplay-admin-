import request from '@/utils/request'

export function getDashboardIndex() {
  return request({
    url: '/dashboard/index',
    method: 'get',
  })
}

export function getDashboardKsAds() {
  return request({
    url: '/dashboard/ks-ads',
    method: 'get',
  })
}



