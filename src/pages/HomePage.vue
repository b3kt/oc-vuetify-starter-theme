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
        <v-card-text v-if="true" style="height: 200px;"></v-card-text>
      </v-card>
    </v-card>

    <v-container style="max-width:1080px;" class="mx-auto pa-0 ">
      <h1 class="display-1">Latest Update</h1>
      <v-divider class="py-3"></v-divider>
      <v-row style="max-width:1080px;" class="mx-auto">
        <v-layout row wrap class="px-1">
          <v-flex v-for="i in 6" :key="i" xs4>
            <v-card class="ma-2">
              <v-card-media contain height="auto">
                <img
                  :src="`https://randomuser.me/api/portraits/women/${i + 5}.jpg`"
                  class="image pa-2"
                  alt="lorem"
                />
              </v-card-media>
            </v-card>
          </v-flex>
        </v-layout>
      </v-row>
    </v-container>
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
