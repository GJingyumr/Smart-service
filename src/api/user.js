import request from '@/utils/request'

// 获取验证码接口
const getCaptcha = () => {
  return request({
    url: '/captcha',
    method: 'GET'
  })
}

const login = (data) => {
  return request({
    url:
      '/login?username=' +
      data.username +
      '&password=' +
      data.password +
      '&code=' +
      data.code +
      '&token=' +
      data.token,
    method: 'POST'
  })
}

const logout = () => {
  return request({ url: '/logout', method: 'POST' })
}

export default {
  getCaptcha,
  login,
  logout
}
