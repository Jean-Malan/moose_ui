import transactions from "@/api/financial_transactions"

export default {
  namespaced: true,
  state: {
    transactions: []
  },
  actions: {
    fetchProducts(context) {
      return new Promise((resolve, reject) => {
        transactions.getTransactions(transactions => {
          context.commit("setProducts", transactions)
          resolve()
        })
      })
    }
  },
  mutations: {
    setTransactionss(state, transactions) {
      // update products
      state.transactions = transactions
    }
  },

  getters: {
    productIsInStock() {
      return product => {
        return product.inventory > 0
      }
    }
  }
}
