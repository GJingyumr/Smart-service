import UserApi from '../../api/user'
import { setItem, getItem } from '../../utils/storage'
export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    userInfo: getItem('userInfo') || ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      setItem('userInfo', userInfo)
    }
  },
  actions: {
    async login({ commit }, loginForm) {
      const token = await UserApi.login(loginForm)
      console.log(token)
      commit('setToken', token)
      return token
    },
    async getUserInfo({ commit }, payload) {
      const userInfo = await UserApi.getuserInfo()
      commit('setUserInfo', userInfo)
      return userInfo
    }
  }
}
