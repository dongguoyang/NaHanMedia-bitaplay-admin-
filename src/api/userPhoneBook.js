import request from '@/utils/request'

export function getUsersAddressBook(data) {
  return request({
    url: '/UsersAddressBook/list',
    method: 'post',
    data
  })
}

export function getUsersAddressLog(data) {
  return request({
    url: '/UsersAddressBookItem/list',
    method: 'post',
    data
  })
}




