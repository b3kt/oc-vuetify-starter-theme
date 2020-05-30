<template>
  <v-container id="inspire" full-width> 
    <v-app-bar app flat clipped-right color="white" light class="bottomline elevation-1">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer />
      <v-toolbar color="transparent" flat>
        <v-btn class="align-right" text outlined :to="{ name:'Home'}">
          <v-icon>fa fa-logout</v-icon>  
          Home
        </v-btn>  
        <v-btn class="align-right" text outlined @click.stop="logout()">
          <v-icon>fa fa-logout</v-icon>  
          Logout
        </v-btn>  
      </v-toolbar>
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight" />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app left color="secondary  darken-3">
      <v-list dense nav color="secondary darken-3" dark>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.url">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="left" fixed temporary />

    <v-content class="pa-0">
      <router-view></router-view>
    </v-content>

    <v-navigation-drawer v-model="right" fixed right temporary />
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  props: {
    source: String
  },

  data: () => ({
    items: [
      { title: "Settings", icon: "fa fa-sliders-h", url: "/dashboard/setting" },
      { title: "Help", icon: "fa fa-question-circle", url: "/dashboard/help" }
    ],
    drawer: null,
    drawerRight: null,
    right: false,
    left: false
  }),
  methods: {
    logoutConfirm() {},
    logout() {
      this.dialog = false; 
      this.clearFormErrors();
      this.$store.dispatch("logout");
    },
    ...mapMutations(["clearFormErrors"])
  },
  computed: {
    ...mapGetters([
      "hasValidationError",
      "getValidationError",
      "isAuthenticated"
    ])
  }
};
</script>