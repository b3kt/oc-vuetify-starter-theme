import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import { sync } from 'vuex-router-sync';
import axios from 'axios';
import './registerServiceWorker'

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

import moment from 'moment'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
})

Vue.filter('titlecase', function(value) {
  if (value) {
    return value.replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
  }
})

sync(store, router);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
