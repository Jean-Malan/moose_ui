import salesApi from "@/api/sales.js"

export default {
  namespaced: true,
  state: {
    sales: []
  },
  actions: {
    fetchAllSales(context) {
      var data = salesApi.allSales()
      context.commit("setAllSales", data)
    },
    postNewSaleEntry(context, sales) {
      let data = salesApi.postNewSaleEntry(sales)
    },
  },
  mutations: {
    addNewSaleEntry() {


    },
    setAllSales(state, sales) {
      // update sales
      console.log(sales)
      state.sales = sales
    }
  },

  getters: {
    getAllSales(state, getters) {
      return state.sales
    }
  }
}
