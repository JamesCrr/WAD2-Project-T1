import { createStore } from "vuex"

// Create a new store instance.
const store = createStore({
  state() {
    return {
      count: 0,
    }
  },
  mutations: {
    increment(state) {
      state.count++
      console.log("INCREMENT")
    },
    decrement(state) {
      state.count--
      console.log("DECREMENT")
    },
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit("increment")
      }, 1000)
    },
  },
  getters: {
    getCount: (state) => state.count,
  },
})

export default store
