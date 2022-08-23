import request from '@/utils/request'

export function getAppList(data) {
  return request({
    url: '/app/list',
    method: 'post',
    data
  })
}

export function getAppVersion(data) {
  return request({
    url: '/app/version',
    method: 'post',
    data
  })
}
export function editAppVersionStatus(data) {
  return request({
    url: '/app/edit-version-status',
    method: 'post',
    data
  })
}

export function editAppRecommend(data) {
  return request({
    url: '/app/edit-recommend',
    method: 'post',
    data
  })
}

export function editAppDownloadCount(data) {
  return request({
    url: '/app/edit-download-count',
    method: 'post',
    data
  })
}


export function appDownloadRecord(data) {
  return request({
    url: '/app/download-record',
    method: 'post',
    data
  })
}

