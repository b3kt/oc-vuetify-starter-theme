<template>
  <v-container class="pa-0">
    <v-card flat tile>
      <v-toolbar color="primary" dark extended flat>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </v-toolbar>

      <v-card class="mx-auto" max-width="1080" style="margin-top: -64px;">
        <v-toolbar flat>
          <v-toolbar-title class="grey--text">Title</v-toolbar-title>

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

        <v-card-text style="height: 200px;"></v-card-text>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import apiService from "../services";

export default {
  data: () => ({
    candidate: {
      name: "",
      position: ""
    },
    isValid: false,
    posts: [],
    headers: [
      {
        text: "Id",
        align: "right",
        value: "id"
      },
      {
        text: "Title",
        value: "title",
        align: "left"
      },
      {
        text: "Description",
        value: "body",
        align: "left"
      }
    ]
  }),
  mounted() {
    this.$store.dispatch("GET_LOGIN");
    this.isValid = this.$store.getters.isLogin;
    if (this.isValid) {
      this.candidate = this.$store.getters.login;
    } else {
      this.$router.push("/");
    }
    this.listPosts();
  },
  methods: {
    clearAndBack() {
      this.$store.commit("change", "{}");
      this.$router.push("/");
    },
    listPosts() {
      apiService
        .getPosts()
        .then(response => response.data)
        .then(response => {
          this.posts = response;
        });
    }
  }
};
</script>
