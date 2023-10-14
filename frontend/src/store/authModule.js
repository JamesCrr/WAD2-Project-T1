const state = {
  isLoggedIn: false,
  isVolunteer: false,
  authDetails: null,
}

const mutations = {
  // Login as User or Organsiation
  m_Login(state, payload) {
    const { isVolunteer, authDetails } = payload

    state.isLoggedIn = true
    state.isVolunteer = isVolunteer
    state.authDetails = authDetails
    // console.log("LOGIN")
  },
  m_Logout(state) {
    state.isLoggedIn = false
    state.authDetails = null
    // console.log("LOGOUT")
  },
}

const actions = {}

const getters = {
  getIsLoggedIn: (state) => state.isLoggedIn,
  getIsVolunteer: (state) => state.isVolunteer,
  getAuthDetails: (state) => state.authDetails,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
