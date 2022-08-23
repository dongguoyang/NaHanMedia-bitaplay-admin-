import request from '@/utils/request'

export function getCategoryList(data) {
  return request({
    url: '/category/list',
    method: 'post',
    data
  })
}

export function addCategory(data) {
  return request({
    url: '/category/add',
    method: 'post',
    data
  })
}

export function getCategoryTree() {
  return request({
    url: '/category/tree',
    method: 'get',
  })
}


export function getCategoryCascaderTree() {
  return request({
    url: '/category/cascader-tree',
    method: 'get',
  })
}


