<template>
  <v-container class="pa-0">
    <SystemBar />
    <!--AppBar /-->
  </v-container>
</template>

<script>
import SystemBar from '@/components/SystemBar';
// import AppBar from '@/components/AppBar';

export default {
  name: 'header',
  data: () => ({
    form: {
      name: '',
      position: '',
    },
    isLogin: false,
    alert: false,
  }),
  components:{
    SystemBar,
    // AppBar
  },
  methods: {
    storeIt() {
      this.$store.commit('change', this.form);
      this.isLogin = this.$store.getters.isLogin;
      this.alert = false;
      if (this.isLogin) {
        this.$router.push('/view');
      } else {
        this.alert = true;
      }
    },
  },
};
</script>
