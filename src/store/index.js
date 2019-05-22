import Vuex from "vuex"
import Vue from "vue"
import cart from "./modules/cart"
import products from "./modules/products"
import financialTransactions from "./modules/financial_transactions"
import glAccounts from "./modules/gl_accounts"
import user from "./modules/user"
import contacts from "./modules/contacts"
import design from "./modules/design"
import sales from "./modules/sales"
import modals from "./modules/modals"

// import createPersistedState from "vuex-persistedstate"
// import Cookies from "js-cookie"
import VuexPersistence from "vuex-persist"

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  modules: {
    cart,
    products,
    user,
    contacts,
    glAccounts,
    modals,
    design,
    sales,
    financialTransactions
  },
  state: {},

  getters: {},

  actions: {},

  mutations: {},

  plugins: [new VuexPersistence().plugin]
})
