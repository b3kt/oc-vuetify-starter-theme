<template>
  <v-container class="pa-0 full-width">
    <v-card flat tile class="mb-6">
      <v-toolbar color="primary" dark extended flat height="120">
        <div style="width:1080px;" class="mx-auto">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </div>
      </v-toolbar>
      <v-card class="mx-auto pa-0" max-width="1080" style="margin-top: -64px;">
        <v-toolbar flat>
          <v-toolbar-title class="grey--text">
              Hi {{ userName }}.
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-apps</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text v-if="true" style="height: auto;" class="elevation-0" >
            <AccountTabs />
        </v-card-text>
      </v-card>
    </v-card>

    <!-- <v-container style="max-width:1080px;" class="mx-auto pa-0">
      <div>
        <h1>Dashboard</h1>
        <p class="text-center"></p>
        <p class="w-full text-center my-8">
          <a
            class="bg-grey-dark hover:bg-grey-darker text-white font-bold py-2 px-4 m-2 rounded cursor-pointer"
            @click.prevent="alert('This is a test message.', 'success')"
          >Test Alert</a>
        </p>
      </div>
    </v-container> -->
  </v-container>
</template>

<script>
import bus from "@/services/jwt/bus";
import { mapGetters } from "vuex";
import AccountTabs from '@/components/AccountTabs';
export default {
  data() {
    return {};
  },
  components: {
      AccountTabs
  },
  mounted () {
    this.$store.dispatch("tryAutoLogin");
    if(!this.$store.getters.isAuthenticated){
      this.$router.push('login')  
    }
  },
  computed: {
    ...mapGetters(["userName","isAuthenticated"])
  },
  methods: {
    alert(message, level) {
      bus.$emit("flash", message, level);
    }
  }
};
</script>