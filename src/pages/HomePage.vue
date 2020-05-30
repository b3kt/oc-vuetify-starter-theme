<template>
  <v-container>
    <v-layout row wrap>
      <v-col>
        Public Page
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
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
      this.$router.push({ name: "Home" });
    },
    listPosts() {
      // apiService
      //   .getPosts()
      //   .then(response => response.data)
      //   .then(response => {
      //     this.posts = response;
      //   });
    }
  }
};
</script>
