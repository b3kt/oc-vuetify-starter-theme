import Vue from 'vue'
import bus from '@/services/jwt/bus'
import Vuex from 'vuex'
import axios from '@/services/jwt/axios'
import router from '@/router'
import Constant from '@/constant'
import moduleProfile from './modules/profile'

Vue.use(Vuex)

const state = {
  jsonWebToken: null,
  // userEmail: null,
  // userName: null,
  formErrors: {},
  currentUser: {}
};

const mutations = {
  setAuthCredentials(state, authData) {
    state.jsonWebToken = authData.token
  },
  clearAuthCredentials(state) {
    state.jsonWebToken = null
  },
  setFormErrors(state, errors) {
    state.formErrors = errors
  },
  clearFormErrors(state) {
    state.formErrors = {}
  },
  clearAuthData(state) {
    state.jsonWebToken = null
    state.userName = null
    state.userEmail = null
  },
  setCurrentUser(state, user) {
    state.currentUser = user
  }
};

const actions = {
  setLogoutTimer({ commit }, expirationTime) {
    setTimeout(() => {
      commit('clearAuthData')
    }, expirationTime * 1000)
  },
  login({ commit, dispatch }, credentials) {
    axios.post(Constant.API_LOGIN_URL, { login: credentials.email, password: credentials.password })
      .then((response) => {
        dispatch('getUser')
        const now = new Date()
        const expirationDate = new Date(now.getTime() + (response.data.expires_in * 1000))
        localStorage.setItem('auth_token', response.data.token)
        localStorage.setItem('auth_expiration', expirationDate)

        if (response.data.state) {
          dispatch('setLogoutTimer', response.data.expires_in)

          router.push({ name: 'Dashboard' })
        } else {
          commit('setFormErrors', {
            message: "Invalid email or password, Please check email/password"
          });
        }

      }).catch(() => {
        commit('setFormErrors', {
          message: "Invalid email or password, Please check email/password"
        });

        bus.$emit('flash', 'I could not retrieve your user profile from the server.', 'danger')
      }) // See axios config for basic error handling
  },
  tryAutoLogin({ commit }) {
    const jwt = localStorage.getItem('auth_token')
    if (!jwt) {
      return
    }
    const expirationDate = localStorage.getItem('auth_expiration') ? new Date(localStorage.getItem('auth_expiration')) : ''
    const now = new Date()
    if (now >= expirationDate) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_expiration')
      commit('clearAuthCredentials')
      return
    }
    commit('setAuthCredentials', { token: jwt })
  },
  logout({ commit, dispatch}) {
    commit('clearAuthCredentials')
    dispatch('clearUserProfile')

    bus.$emit('flash', 'Goodbye! Your session has ended.', 'success')
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_expiration')
    router.push({ name: 'Login' })
  },
  register({ commit, dispatch }, registration) {
    axios.post(Constant.API_REGISTER_URL, {
      username: registration.username,
      email: registration.email,
      password: registration.password,
      password_confirmation: registration.password_confirmation
    }).then(response => {
      const now = new Date()
      // const expirationDate = new Date(now.getTime() + (response.data.expires_in * 1000))
      const expirationDate = new Date(now.getTime() + (3600 * 1000))
      localStorage.setItem('auth_token', response.data.access_token)
      localStorage.setItem('auth_expiration', expirationDate)

      commit('setAuthCredentials', {
        token: response.data.access_token
      })
      dispatch('setLogoutTimer', 3600)
      dispatch('getUser')
      bus.$emit('flash', 'Registration complete; you have been signed in.', 'success')

      router.push({ name: 'Dashboard' })
    }).catch(() => { }) // See axios config for basic error handling
  },
  getUser({ commit }) {
    axios.get(Constant.API_GETME_URL)
      .then((response) => {
        commit('setUserEmail', response.data.user.email)
        commit('setUserName', response.data.user.username)
      })
      .catch(() => {
        bus.$emit('flash', 'I could not retrieve your user profile from the server.', 'danger')
      })
  }
};

const getters = {
  // login: state => state.login,
  // isLogin: state => state.login != null && state.login.name && state.login.name != null,
  isAuthenticated(state) {
    const jwt = localStorage.getItem('auth_token')
    if(state.jsonWebToken === null){
      state.jsonWebToken = jwt
    }
    return state.jsonWebToken !== null
  },
  jsonWebToken(state) {
    const jwt = localStorage.getItem('auth_token')
    if(state.jsonWebToken === null){
      state.jsonWebToken = jwt
    }
    return state.jsonWebToken
  },
  hasValidationError: (state) => (input) => {
    return Object.prototype.hasOwnProperty.call(state.formErrors, input)
  },
  getValidationError: (state) => (input) => {
    if (Object.prototype.hasOwnProperty.call(state.formErrors, input)) {
      const error = state.formErrors[input]

      return Array.isArray(error) ? error[0] : error
    }

    return null
  }
};

export default new Vuex.Store({
  modules: {
    profile: moduleProfile,
  },
  state,
  mutations,
  actions,
  getters
});

