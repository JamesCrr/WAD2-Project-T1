const state = {
  isLoggedIn: false,
  isVolunteer: false,
  authDetails: null,
  accountDetails: null,
}

const mutations = {
  // Login as User or Organsiation
  m_Login(state, payload) {
    const { isVolunteer, authDetails, accountDetails } = payload

    state.isLoggedIn = true
    state.isVolunteer = isVolunteer
    state.authDetails = authDetails
    state.accountDetails = accountDetails

    /**
     * Prob need to store in Cookies or Local Storage
     * because when refresh or enter new URL, then all will be gone
     */

    // console.log("LOGIN")
  },
  m_Logout(state) {
    state.isLoggedIn = false
    state.authDetails = null
    state.accountDetails = null
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
