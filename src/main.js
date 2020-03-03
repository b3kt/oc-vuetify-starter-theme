import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import { sync } from 'vuex-router-sync';
import axios from 'axios';
import jquery from './assets/js/jquery.min.js'
import './registerServiceWorker'

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$jquery = jquery;

sync(store, router);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
