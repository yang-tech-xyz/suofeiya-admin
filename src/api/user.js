import request from '@/utils/request'
const FORM_CONTENT_TYPE = 'application/x-www-form-urlencoded'

export function getImage(data) {
  return request({
    url: '/imageCode/getImage/tab',
    method: 'get',
    data
  })
}

export function login(data) {
  let params = {}
  let datas = {}
  console.log(data)

  const { account, randomStr, googleCode, grant_type, scope, mobile, verifyCode } = data
  if (grant_type == 'mobile') {
    params = { mobile, verifyCode, grant_type, scope }
  } else {
    params = { account, googleCode, password: data.password  }
  }

  return request({
    url: '/topAdmin/public/login',
    method: 'post',
    params,
    data: params,
    headers: {
      skipToken: true,
      Authorization: sessionStorage.getItem('basicAuth')

    }

  })
}

export function getUserPerms() {
  return request({
    url: '/admin/menu',
    method: 'get'
  })
}

