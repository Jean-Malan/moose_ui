export default {
  namespaced: true,
  state: {
    showContactModal: false,
    showNewContactModal: false,
    showNewGlAccount: false,
    showEditGlAccount: false,
    showNewSalesInvoiceModal: false
  },
  actions: {
    displayContactModal(context) {
      context.commit("showContact")
    },
    toggleNewContactModal(context) {
      context.commit("showNewContact")
    },
    toggleNewGlAccount(context) {
      context.commit("showNewContact")
    },
    toggleNewSalesInvoice(context) {
      context.commit("showNewSalesInvoice")
    },
    toggleEditGlAccount(context) {
      context.commit("mutateEditGlAccount")
    }
  },
  mutations: {
    showContact(state) {
      state.showContactModal = !state.showContactModal
    },
    showNewContact(state) {
      state.showNewContactModal = !state.showNewContactModal
    },
    showGlAccount(state) {
      state.showNewGlAccountModal = !state.showNewGlAccountModal
    },
    showNewSalesInvoice(state) {
      state.showNewSalesInvoiceModal = !state.showNewSalesInvoiceModal
    },
    mutateEditGlAccount(state) {
      state.showEditGlAccount = !state.showEditGlAccount
      console.log(showEditGlAccount)
    }
  },

  getters: {
    getShowContact(state, getters) {
      return state.showContactModal
    },
    getNewShowContact(state, getters) {
      return state.showNewContactModal
    },
    getShowNewGlAccount(state, getters) {
      return state.showNewContactModal
    },
    getEditGlAccount(state, getters) {
      return state.showEditGlAccount
    },
    getNewSaleInvoice(state, getters) {
      return state.showNewSalesInvoiceModal
    }
  }
}
