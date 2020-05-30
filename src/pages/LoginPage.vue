<template>
  <v-container grid-list-xs>
    <v-form @submit.prevent="submit">
      
    <v-layout row wrap>
          
      <v-card width="480" class="mx-auto mt-12 pt-12 pb-6" flat>
        <v-card-title primary-title class="text-center">
          <div class="mx-auto display-2 font-weight-black">Login</div>
        </v-card-title>
        <v-card-text class="text-center font-weight-light">
          Not Registered ?
          <router-link :to="{name:'Register'}" class="hyperlink">Register</router-link>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
            <v-text-field
              name="email"
              label="Email"
              v-model="credentials.email"
              :rules="[rules.required, rules.email]"
              id="email"
              append-icon="mdi-email"
              flat
              outlined
              autocomplete="username"
            ></v-text-field>
            <v-text-field
              autocomplete="current-password"
              name="password"
              label="Password"
              :rules="[rules.required]"
              type="password"
              append-icon="mdi-lock"
              @keydown.enter.prevent="login"
              v-model="credentials.password"
              flat
              outlined
            ></v-text-field>
        </v-card-text>
        <v-card-actions class="mx-2">
          <v-btn color="primary" x-large block dark type="submit">Login</v-btn>
        </v-card-actions>
        <v-card-text class="text-center font-weight-light">
          Forgot your password? 
          <router-link :to="{name:'ForgotPassword'}" class="hyperlink">Reset password</router-link>
        </v-card-text>
      </v-card>
    </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"

export default {
  data() {
    return {
      value: false,
      credentials: {
        email: "",
        password: ""
      },
      rules: {
        required: value => !!value || "This field is required.",
        min: v => v.length >= 8 || "Min 8 characters",
        email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid email format.'
          },
      }
    };
  },
  mounted() {
    this.$store.dispatch("tryAutoLogin");
    if (this.$store.getters.isAuthenticated) {
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    submit() {
      if(this.credentials.email !== '' && this.credentials.password !== ''){
        this.login()
      }
    },
    login() {
      this.clearFormErrors();
      this.$store.dispatch("login", this.credentials);
    },
    resetForm() {
      this.credentials = {
        email: "",
        password: ""
      };
      this.clearFormErrors();
    },
    ...mapMutations(["clearFormErrors"])
  },
  watch: {
    '$store.state.formErrors': function() {
      if(this.$store.state.formErrors.message !== undefined){
        this.$toast(this.$store.state.formErrors.message,  {
          color: 'red',
          dismissable: true,
          queueable: true
        })
      }
    }
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