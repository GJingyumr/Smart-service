import request from '@/utils/request'

// 获取验证码接口
const getCaptcha = () => {
  return request({
    url: '/captcha',
    method: 'GET'
  })
}
// 登录接口
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
// 退出登录
const logout = () => {
  return request({ url: '/logout', method: 'POST' })
}
// 获取用户信息
const getuserInfo = () => {
  return request({ url: '/user/info', method: 'GET' })
}
// 获取用户列表
const getuserlist = (data) => {
  return request({
    url: `/user/list?current=${data.current}&size=${data.size}&username=${data.username}`,
    method: 'GET'
  })
}
// 获取角色列表
const getrolelist = (data) => {
  return request({ url: `/role/list?current=${data.current}&size=${data.size}&name=${data.name}`, method: 'GET' })
}
// 获取菜单列表
const getmenulist = () => {
  return request({ url: '/menu/list', method: 'GET' })
}
export default {
  getCaptcha,
  login,
  logout,
  getuserInfo,
  getuserlist,
  getrolelist,
  getmenulist
}
