<template>
  <v-container class="pa-0 full-width">
    <v-card flat tile class="mb-6">
      <!-- <v-toolbar color="primary" dark extended flat height="120">
        <div style="width:1080px;" class="mx-auto">
          <v-app-bar-nav-icon>
            <v-icon>mdi-heart</v-icon>
          </v-app-bar-nav-icon>
          <v-btn class="mx-1" color="white" text>Magazine</v-btn>
          <v-btn class="mx-1" color="white" text>Blog</v-btn>
          <v-btn class="mx-1" color="white" text>About</v-btn>
        </div>
        
      </v-toolbar> -->
      <Carousel />

      <v-container>
        <v-card class="mx-auto "  max-width="1080" style="margin-top: -77px;">
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
        <v-card-text v-if="true" style="height: 200px;">
          
        </v-card-text>
      </v-card>


      </v-container>
    </v-card>

    <v-container style="max-width:1080px;" class="mx-auto pa-0">
      <h1>Featured</h1>
      <v-divider class="py-3"></v-divider>
      <v-row style="max-width:1080px;" class="mx-auto">
        <v-layout row wrap class="px-1">
          <v-flex v-for="i in 12" :key="i" xs2>
            <v-card class="ma-2">
                <img
                  :src="`https://randomuser.me/api/portraits/women/${i + 8}.jpg`"
                  class="image pa-2"
                  alt="lorem"
                />
            </v-card>
          </v-flex>
        </v-layout>
      </v-row>
    </v-container>

    <br/>
    <br/>

     <v-container style="max-width:1080px;" class="mx-auto pa-0">
      <h1>Latest Update</h1>
      <v-divider class="py-3"></v-divider>
      <v-row style="max-width:1080px;" class="mx-auto">
        <v-layout row wrap class="px-1">
          <v-flex v-for="i in 12" :key="i" xs2>
            <v-card class="ma-2">
                <img
                  :src="`https://randomuser.me/api/portraits/women/${i + 5}.jpg`"
                  class="image pa-2"
                  alt="lorem"
                />
            </v-card>
          </v-flex>
        </v-layout>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import Carousel from '@/components/Carousel'
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
  components: {
    Carousel
  },
  mounted() {
    this.$store.dispatch("tryAutoLogin");
    this.isValid = this.$store.getters.isLogin;
    if (this.isValid) {
      this.candidate = this.$store.getters.login;
    } 
    this.listPosts();
  },
  methods: {
    clearAndBack() {
      this.$store.commit("change", "{}");
      this.$router.push({name:'Home'});
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
