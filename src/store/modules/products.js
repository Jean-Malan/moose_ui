import shop from "@/api/shop"
import financial_transactions from "../../api/financial_transactions"

export default {
  namespaced: true,
  state: {
    items: [],
    token: [],
    password: [],
    email: []
  },
  actions: {
    getSignInData(data) {},
    fetchProducts(context) {
      return new Promise((resolve, reject) => {
        shop.getProducts(items => {
          context.commit("setProducts", items)
          resolve()
        })
      })
    },
    getSignin(context) {
      var data = financial_transactions.getTransactions()
      context.commit("setToken", data)
    }
  },
  mutations: {
    setToken(state, data) {
      state.token = data
      console.log("seeeeeeeeeeet:", data)
      // state.token = data.token
    },
    setProducts(state, products) {
      // update products
      state.items = products
    },
    decrementProductInventory(state, product) {
      product.inventory--
    }
  },
  getters: {
    availableProducts(state, getters) {
      return state.items.filter(item => item.inventory > 0)
    },

    productIsInStock() {
      return product => {
        return product.inventory > 0
      }
    }
  }
}
