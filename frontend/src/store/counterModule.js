const state = {
  count: 0,
}

const mutations = {
  increment(state) {
    state.count++
    console.log("INCREMENT")
  },
  incrementBy(state, n) {
    state.count += n
    console.log("INCREMENT_BY")
  },
  decrement(state) {
    state.count--
    console.log("DECREMENT")
  },
}

const actions = {
  incrementAsync({ commit }) {
    setTimeout(() => {
      commit("increment")
    }, 1000)
  },
}

const getters = {
  getCount: (state) => state.count,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
