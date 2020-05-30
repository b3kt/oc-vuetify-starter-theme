<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-card width="480" class="mx-auto mt-12 pt-12 pb-6" flat>
        <v-card-title primary-title class="text-center">
          <div class="font-weight-black mx-auto display-2">Sign Up</div>
        </v-card-title>
        <v-card-text class="text-center font-weight-light">
          Already Registered ?
          <router-link :to="{name:'Login'}" class="hyperlink">Login</router-link>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-form>
            <v-text-field
              name="email"
              label="Type your Email"
              id="email"
              flat
              append-icon="fa fa-envelope"
              outlined
              :rules="[rules.required]"
              v-model="registration.email"
            ></v-text-field>
            <v-text-field
              name="password"
              label="Enter your password"
              hint="At least 8 characters"
              min="8"
              solo
              flat
              outlined
              v-model="registration.password"
              :append-icon="hidePassword ? 'fa fa-lock' : 'fa fa-lock-open'"
              :append-icon-cb="() => (hidePassword = !hidePassword)"
              :rules="[rules.required, rules.min]"
              :type="hidePassword ? 'password' : 'text'"
            ></v-text-field>
            <v-text-field
              name="repeat"
              label="Type your password again"
              hint="At least 8 characters"
              min="8"
              solo
              flat
              outlined
              v-model="registration.password_confirmation"
              :append-icon="hidePassword ? 'fa fa-lock' : 'fa fa-lock-open'"
              :append-icon-cb="() => (hidePassword = !hidePassword)"
              :rules="[rules.required, rules.passwordMatch(registration.password, registration.password_confirmation)]"
              :type="hidePassword ? 'password' : 'text'"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="mx-2 pb-6">
          <v-btn color="primary" x-large block dark @click.prevent="register">Register</v-btn>
        </v-card-actions>

      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      hidePassword: true,
      registration: {
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      rules: {
        required: value => !!value || "This field is required.",
        min: v => v.length >= 8 || "Min 8 characters",
        email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid email format.'
          },
        passwordMatch: (value1, value2) => value1 === value2 || 'Please you entered doesn not match.'
      }
    };
  },
  methods: {
    register() {
      this.clearFormErrors();
      this.$store.dispatch("register", this.registration);
    
      // this.$router.push("Login");
    },
    resetForm() {
      this.registration = {
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
      };
    },
    ...mapMutations(["clearFormErrors"])
  },
  computed: {
    ...mapGetters(["hasValidationError", "getValidationError"]),
    getPasswordConfirmation() {
      return this.password_confirmation
    },
  },
  watch: {
    '$store.state.formErrors': function() {
      if(this.$store.state.formErrors.message !== undefined){
        this.$toast(this.$store.state.formErrors.message,  {
          color: this.$store.state.formErrors.status === 'FAIL' ? 'red': 'green',
          dismissable: true,
          queueable: true
        })
      }
    }
  },
};
</script>