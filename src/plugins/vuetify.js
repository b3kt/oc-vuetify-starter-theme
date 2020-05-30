import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify, { VSnackbar } from 'vuetify/lib';
import VueI18n from 'vue-i18n'


import {
  VApp,
  VBtn,
  VBtnToggle,
  VCheckbox,
  VDivider,
  VGrid,
  VIcon,
  VList, VListTile, VListTileAvatar,
  VProgressLinear,
  VTextField,
  VMenu,
  VCard, VCardMedia, VCardText, VCardTitle,
  VDatePicker
} from 'vuetify';


Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VBtnToggle,
    VCheckbox,
    VDivider,
    VGrid,
    VIcon,
    VList,VListTile, VListTileAvatar,
    VProgressLinear,
    VTextField,
    VMenu,
    VCard, VCardMedia, VCardText, VCardTitle,
    VSnackbar,
    VDatePicker
  }
});

import VuetifyToast from 'vuetify-toast-snackbar'
Vue.use(VuetifyToast, {
	x: 'right', // default
	y: 'top', // default
	color: 'info', // default
	iconColor: '', // default
	classes: [
		'body-2'
	],
	timeout: 3000, // default
	dismissable: true, // default
	multiLine: false, // default
	vertical: false, // default
	queueable: false, // default
	showClose: false, // default
	closeText: '', // default
	closeIcon: 'close', // default
	closeColor: '', // default
	slot: [], //default
	shorts: {
		custom: {
			color: 'purple'
		}
	},
	property: '$toast' // default
})

Vue.use(VueI18n);

import en from '@/i18n/locales/en'

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
  theme: {
    themes: {
      light: {
        primary: '#d53b30',
        secondary: '#faae23',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
  lang: {
    locales: { en },
    current: 'en',
  },
});


