import glAccountApi from "../../api/gl_accounts"

export default {
  namespaced: true,
  state: {
    all: []
  },
  actions: {
    // Getting and setting the state here - It needs to be split!
    getAllGlAccounts({ context, state, getters, commit, rootState }) {
      var token = rootState.user.token
      console.log(glAccountApi.getAllGlAccounts(token))
      var data = glAccountApi.getAllGlAccounts(token)
      state.all = data
    },
    updateGlAccount(context, data) {
      glAccountApi.updateGlAccount(data)
      context.commit("editGlAccount", data)
    },
    postNewGlAccount(context, data) {
      glAccountApi.postNewGlAccount(data)
      context.commit("addNewGlAccount", data)
    }
  },

  mutations: {
    editGlAccount(state, data) {
      var index = state.all[0]["data"].findIndex(i => i.id == data[0])
      var accountType = ""

      switch (data[1].account_type) {
        case 0:
          accountType = "current_asset"
        case 1:
          accountType = "non_current_asset"
        case 2:
          accountType = "current_liability"
        case 3:
          accountType = "non_current_liability"
        case 4:
          accountType = "equity"
        case 5:
          accountType = "cost_of_sales"
        case 6:
          accountType = "operating_expense"
        case 7:
          accountType = "sales"
        case 8:
          accountType = "other_income"
        default:
          accountType = "current_asset"
      }

      // var accountNew = {
      //   title: data[1].title,
      //   account_code: data[1].account_code,
      //   account_type: accountType
      // }

      // console.log([index])
      state.all[0]["data"][index].title = data[1].title
      state.all[0]["data"][index].account_code = data[1].account_code
      state.all[0]["data"][index].account_type = accountType
    },
    addNewGlAccount(state, data) {
      console.log("DAAATAA", data)
      var accountType = ""
      switch (data.account_type) {
        case 0:
          accountType = "current_asset"
        case 1:
          accountType = "non_current_asset"
        case 2:
          accountType = "current_liability"
        case 3:
          accountType = "non_current_liability"
        case 4:
          accountType = "equity"
        case 5:
          accountType = "cost_of_sales"
        case 6:
          accountType = "operating_expense"
        case 7:
          accountType = "sales"
        case 8:
          accountType = "other_income"
        default:
          accountType = "current_asset"
      }

      var accountNew = {
        title: data.title,
        account_code: data.account_code,
        account_type: accountType
      }

      console.log(accountNew)
      state.all[0].data.push(accountNew)
    },
    updateGlAccountList(state, data) {}
  },
  getters: {
    allGlAccounts(state, getters) {
      return state.all
    }
  }
}
