import Vue from 'vue'
import bus from '@/services/jwt/bus'
import Vuex from 'vuex'
import axios from '@/services/jwt/axios'
// import router from '@/router'
import Constant from '@/constant'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productList: []
  },
  mutations: {
    setProductList (state, productData) {
      state.productList = productData
    }
  },
  actions: {
    getProduct ({ commit }) {
      axios.get(Constant.API_PRODUCT_URL)
        .then((response) => {
          commit('setProductList', response.data)
        })
        .catch(() => {
          bus.$emit('flash', 'I could not retrieve your user profile from the server.', 'danger')
        })
    }
  },
  getters: {
    productList (state) {
      return state.productList
    }
  }
});

