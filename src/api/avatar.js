import request from '@/utils/request'

export function getAvatarList(data) {
  return request({
    url: '/avatar/list',
    method: 'post',
    data
  })
}

export function saveAvatar(data) {
  return request({
    url: '/avatar/save',
    method: 'post',
    data
  })
}


export function delAvatar(data) {
  return request({
    url: '/avatar/del',
    method: 'post',
    data
  })
}



