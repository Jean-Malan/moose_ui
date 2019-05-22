import user from "../../api/user"

export default {
  namespaced: true,
  state: {
    loginScreen: false,
    // token:
    //   "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtb29zZV9hcGkiLCJleHAiOjE1NTk5NjgyNjUsImlhdCI6MTU1NzU0OTA2NSwiaXNzIjoibW9vc2VfYXBpIiwianRpIjoiODdmZjI2ZjYtMDNhNy00MzM5LTgxY2EtMmM0YzcxNDc4OTNkIiwibmJmIjoxNTU3NTQ5MDY0LCJzdWIiOiIxNyIsInR5cCI6ImFjY2VzcyJ9.aTht-9uTZhB7drNYxkhnmamVG_cdk5KQT0styB3RkJW2CuNWSK3pxIwr9pyulyYwwJ9pG_LnsrYk1K8esko2lg",
    token: [],
    password: [],
    email: []
  },
  actions: {
    showLoginScreen(context) {
      context.commit("showLogin")
    },
    getSignin(context, data, password) {
      var password = data[1]
      var email = data[0]
      var data = user.getUserToken(email, password)
      context.commit("setToken", data)
      // console.log(data)s
    },
    userLogout({ context }) {
      var data = user.userLogout()
      console.log(data)
      return data
      // user.userLogout(token)
    },
    getSignup(context, data, password) {
      var password = data[1]
      var email = data[0]
      var data = user.userSignup(email, password)
      context.commit("setToken", data)
      // console.log(data)s
    }
  },

  getters: {
    returnToken(state, getters) {
      return state.token
    },
    LoginScreenState(state, getters) {
      return state.loginScreen
    }
  },

  mutations: {
    showLogin(state) {
      state.loginScreen = !state.loginScreen
    },
    setToken(state, data) {
      state.token = data
      // state.token = data.token
    }
  }
}
