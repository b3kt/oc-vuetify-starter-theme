<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-card width="480" class="mx-auto mt-12 pt-12 pb-6" flat>
        <v-card-title primary-title class="text-center">
          <div class="mx-auto">Welcome</div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form>
            <v-text-field name="username" label="Username" id="username" v-model="registration.username"></v-text-field>
            <v-text-field name="email" label="Email" id="email" v-model="registration.email"></v-text-field>
            <v-text-field
              name="password"
              label="Enter your password"
              hint="At least 8 characters"
              min="8"
              v-model="registration.password"
              :append-icon="value ? 'mdi-lock' : 'mdi-lock-open'"
              :append-icon-cb="() => (value = !value)"
              :rules="[() => ('The email and password you entered don\'t match')]"
              :type="value ? 'password' : 'text'"
            ></v-text-field>
            <v-text-field
              name="repeat"
              label="Enter your password"
              hint="At least 8 characters"
              min="8"
              v-model="registration.password_confirmation"
              :append-icon="value ? 'mdi-lock' : 'mdi-lock-open'"
              :append-icon-cb="() => (value = !value)"
              :rules="[() => ('The email and password you entered don\'t match')]"
              :type="value ? 'password' : 'text'"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" large block dark @click.prevent="register">Register</v-btn>
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
      registration: {
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  methods: {
    register() {
      this.clearFormErrors();
      this.$store.dispatch("register", this.registration);
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
    ...mapGetters(["hasValidationError", "getValidationError"])
  }
};
</script>