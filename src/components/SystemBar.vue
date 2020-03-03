<template>
  <div class="blue">
    <v-system-bar
      window
      dark
      color="transparent"
      class="mx-auto text-white"
      style="max-width:1080px;"
    >
      <v-icon>mdi-home</v-icon>
      <span class="left">
        <router-link class="hyperlink text-white" :to="{name: 'Home'}">Home</router-link>
      </span>
      <v-spacer></v-spacer>
      <div v-if="isAuthenticated">
        <span class="pl-6">
          <a href="#" class="text-white hyperlink" @click.prevent="logout()">Cart</a>
        </span>
        <span class="pl-6">
          <a href="#" class="text-white hyperlink" @click.prevent="logout()">Account</a>
        </span>
        <span class="pl-6">
          <a href="#" class="text-white hyperlink" @click.prevent="logout()">Logout</a>
        </span>
      </div>
      <div v-else>
        <span class="pl-6">
          <router-link class="hyperlink text-white" to="login">Login</router-link>
        </span>
        <span class="pl-6">&middot;</span>
        <span class="pl-6">
          <router-link class="hyperlink text-white" to="register">Register</router-link>
        </span>
      </div>
    </v-system-bar>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({}),
  mounted() {
    this.$store.dispatch("tryAutoLogin");
  },
  methods: {
    logout() {
      alert("asdasd");
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
