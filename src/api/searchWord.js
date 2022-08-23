import request from '@/utils/request'

export function getSearchWordList(data) {
  return request({
    url: '/search-word/list',
    method: 'post',
    data
  })
}


