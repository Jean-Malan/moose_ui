export default {
  namespaced: true,
  state: {
    navbarColour: "#495057"
  },
  actions: {
    updateNavColour(context, colour) {
      context.commit("changeNavbarColour", colour)
    }
  },
  mutations: {
    changeNavbarColour(state, colour) {
      state.navbarColour = colour
    }
  },
  getters: {
    getNavbarColour(state, getters) {
      return state.navbarColour
    }
  }
}
