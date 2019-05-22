import contactApi from "../../api/contacts"

export default {
  namespaced: true,
  state: {
    all: []
  },
  actions: {
    // Getting and setting the state here - It needs to be split!
    getAllContacts({ context, state, getters, commit, rootState }) {
      var token = rootState.user.token
      var data = contactApi.getAllContacts(token)
      state.all = data
    },
    updateContact(context, data) {
      contactApi.editContact(data)
      context.commit("updateContacts", data)
    },
    postNewContact(context, data) {
      context.commit("addNewContact", data)
      contactApi.newContact(data)
    }
  },
  mutations: {
    addNewContact(state, data) {
      state.all.push(data)
    },
    updateContacts(state, data) {
      var idList = []
      // console.log(state.all[0].data)
      state.all[0].data.forEach(d => idList.push(d.id))
      // console.log(state.all)
      var contactIndex = idList.findIndex(i => i == data.id)
      var contact = state.all[0].data[contactIndex]

      contact.attributes["address-one"] = data.contact.address_one
      contact.attributes["city"] = data.contact.city
      contact.attributes["contact-number"] = data.contact.contact
      contact.attributes["email"] = data.contact.email
      contact.attributes["first-name"] = data.contact.first_name
      contact.attributes["last-name"] = data.contact.last_name
      contact.attributes["website"] = data.contact.website
      contact.attributes["zipcode"] = data.contact.zipcode
      contact.attributes["address-two"] = data.contact.country
    }
  },
  getters: {
    allContacts(state, getters) {
      return state.all
    }
  }
}
