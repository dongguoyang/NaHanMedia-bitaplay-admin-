import request from '@/utils/request'

export function getGradeList() {
  return request({
    url: '/grade/list',
    method: 'get',
  })
}

export function saveGrade(data) {
  return request({
    url: '/grade/save',
    method: 'post',
    data
  })
}



