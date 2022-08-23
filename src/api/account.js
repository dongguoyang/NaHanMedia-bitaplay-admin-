import request from '@/utils/request'

export function getUserList(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}

export function editUserStatus(data) {
  return request({
    url: '/user/edit-status',
    method: 'post',
    data
  })
}



