import request from '@/utils/request'

export function getProviderFinanceRechargeBalance(data) {
  return request({
    url: '/provider-finance/recharge-balance',
    method: 'post',
    data
  })
}

export function getProviderFinanceWithdraw(data) {
  return request({
    url: '/provider-finance/withdraw',
    method: 'post',
    data
  })
}

export function doProviderFinanceWithdraw(data) {
  return request({
    url: '/provider-finance/do-withdraw',
    method: 'post',
    data
  })
}

export function getProviderFinanceRechargeLogin(data) {
  return request({
    url: '/provider-finance/recharge-login',
    method: 'post',
    data
  })
}

export function getProviderFinanceRechargeFuel(data) {
  return request({
    url: '/provider-finance/recharge-fuel',
    method: 'post',
    data
  })
}

export function getProviderFinanceRechargeReward(data) {
  return request({
    url: '/provider-finance/recharge-reward',
    method: 'post',
    data
  })
}
