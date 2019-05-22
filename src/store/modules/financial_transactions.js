import shop from "@/api/shop"
import financialTransactions from "../../api/financial_transactions"
import { setTimeout } from "timers"

export default {
  namespaced: true,
  state: {
    all: []
  },
  actions: {
    // Getting and setting the state here - It needs to be split!
    getAllFinancialTransactions({
      context,
      state,
      getters,
      commit,
      rootState
    }) {
      var token = rootState.user.token
      console.log(token)
      var data = financialTransactions.allFinancialTransactions(token)
      console.log(data)
      state.all = data
    }
  },
  mutations: {
    updateFinancialTreansactions(state, data) {
      state.all = data
    }
  },
  getters: {
    allFinancialTransactions(state, getters) {
      return state.all
    }
  }
}
