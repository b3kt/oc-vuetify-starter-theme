// import Vue from 'vue'
import Constant from '@/constant'
import axios from '@/services/jwt/axios'

const moduleProfile = {
  state: {
    first_name: null,
    last_name: null,
    email: null,
    whatsapp_no: null,
    birthdate: null,
    location: null,
    description: null
  },
  mutations: {
    setUserProfile(state, userdata) {
      state.first_name = userdata.profile.first_name,
      state.last_name = userdata.profile.last_name,
      state.email = userdata.email,
      state.whatsapp_no = userdata.profile.whatsapp_no,
      state.birthdate = userdata.profile.birthdate,
      state.location = userdata.profile.location,
      state.description = userdata.profile.description
    },
    getUserProfile(state) {
      return state;
    },
    clearUserProfile(state){
      state.profile = null
    }
  },
  actions: {
    fetchUserProfile({ commit }) {
      axios.get(Constant.API_ME_URL)
        .then((response) => {
          if(response.data.state){
            commit('setUserProfile', response.data.user)
          }else{
            commit('setFormErrors', {
              message: "Failed while fetch the data",
              status: 'FAIL'
            });
          }
        }).catch(() => {
          commit('setFormErrors', {
            message: "Unable to load data",
            status: 'FAIL'
          });
        });
    },
    updateUserProfile({ commit }, profile) {
      axios.post(Constant.API_ME_URL, profile)
        .then((response) => {
          if(response.data.state){
            commit('setUserProfile', response.data.user)
            commit('setFormErrors', {
              message: "Successfully updated",
              status: 'SUCCESS'
            });
          }else{
            commit('setFormErrors', {
              message: "Failed to updat, please try again.",
              status: 'FAIL'
            });
          }
        }).catch(() => {
          commit('setFormErrors', {
            message: "Invalid email or password, Please check email/password",
            status: 'FAIL'
          });
        });
    },
    clearUserProfile ({ commit }) {
      commit('clearUserProfile')
    }

  },
  getters: {}
}

export default moduleProfile;