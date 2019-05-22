import sales from "@/api/sales.js"

export default {
  namespaced: true,
  state: {
    sales: []
  },
  actions: {
    fetchAllSales(context) {
      var data = sales.allSales()
      context.commit("setAllSales", data)
      // return new Promise((resolve, reject) => {
      //   sales.allSales(sale => {
      //     console.log(sale)
      //    
      //     resolve()
      //   })
      // })
    }
  },
  mutations: {
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
