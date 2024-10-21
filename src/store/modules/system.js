const state = {
  // reset
  reset: false
}

const mutations = {
  SET_RESET: (state, data) => {
    state.reset = data
  },
}

const actions = {
  setReset({ commit }, data) {
    commit('SET_RESET', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
