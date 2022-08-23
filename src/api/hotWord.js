import request from '@/utils/request'

export function getHotWordList(data) {
  return request({
    url: '/hot-word/list',
    method: 'post',
    data
  })
}

export function saveHotWord(data) {
  return request({
    url: '/hot-word/save',
    method: 'post',
    data
  })
}

export function delHotWord(data) {
  return request({
    url: '/hot-word/del',
    method: 'post',
    data
  })
}

