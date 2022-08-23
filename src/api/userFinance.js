import request from '@/utils/request'

export function getUserFinanceWithdraw(data) {
  return request({
    url: '/user-finance/withdraw',
    method: 'post',
    data
  })
}

export function doUserFinanceWithdraw(data) {
  return request({
    url: '/user-finance/do-withdraw',
    method: 'post',
    data
  })
}

export function getUserDownloadReward(data) {
  return request({
    url: '/user-finance/download-reward',
    method: 'post',
    data
  })
}

export function getUserRecommendReward(data) {
  return request({
    url: '/user-finance/recommend-reward',
    method: 'post',
    data
  })
}
