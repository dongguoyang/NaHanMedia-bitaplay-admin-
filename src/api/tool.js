import request from '@/utils/request'

export function ksAds(data) {
  return request({
    url: '/tool/ks_ads',
    method: 'post',
    data
  })
}





