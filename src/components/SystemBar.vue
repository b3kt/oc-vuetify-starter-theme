<template>
  <div class="blue">
    <v-system-bar window dark color="transparent" class="mx-auto text-white" style="max-width:1080px;">
        <v-icon>mdi-home</v-icon>
        <span class="left"><router-link class="hyperlink  text-white" to="/">Home</router-link></span>
        <v-spacer></v-spacer>
        <span class="px-1"><router-link class="hyperlink  text-white" to="login">Login</router-link></span>
        <span class="px-1">&middot;</span>
        <span class="px-1"><router-link class="hyperlink  text-white" to="register">Register</router-link></span>
    </v-system-bar>
  </div>
</template>
<script>
export default {};
</script>