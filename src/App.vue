<template>
  <v-app>
    <Header :showMenu="$route.meta.showMenu" />
    <v-content>
      <router-view/>
    </v-content>
    <Footer :showMenu="$route.meta.showMenu" />
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  data: () => ({
    dialog: false,
  }),
  components: {
    Header, Footer
  },
  mounted(){}
};
</script>

<style type="text/cs" src="@/assets/css/custom.css" />

<style>
.no-span {
    display: table;
    white-space: nowrap;
}
.no-span:before, .no-span:after {
    border-top: 6px solid #faae23;
    content: '';
    display: table-cell;
    position: relative;
    top: 0.7em;
    width: 45%;
}
.no-span:before { right: 1.5%; }
.no-span:after { left: 1.5%; }
</style>