<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-img :src="require('../assets/logo.png')" class="my-3" contain height="200"></v-img>
      </v-flex>
      <v-flex xs4 offset-xs4>
        <!-- <v-row justify="space-around">
            <v-switch v-model="valid" class="ma-4" label="Valid" readonly></v-switch>
            <v-switch v-model="lazy" class="ma-4" label="Lazy"></v-switch>
        </v-row>-->
        <v-container grid-list-xs style="max-width:480px">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-card>
              <v-card-title primary-title>title</v-card-title>
              <v-card-text>
                <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-select
                  v-model="select"
                  :items="items"
                  :rules="[v => !!v || 'Item is required']"
                  label="Item"
                  required
                ></v-select>

                <v-checkbox
                  v-model="checkbox"
                  :rules="[v => !!v || 'You must agree to continue!']"
                  label="Do you agree?"
                  required
                ></v-checkbox>
              </v-card-text>
              <v-card-actions>
                <v-flex xs12 class="text-right">
                  <!-- <v-btn :disabled="!valid" color="success"  @click="validate">Validate</v-btn>
                  <v-btn color="error" @click="reset">Reset Form</v-btn>
                  <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn> -->
                </v-flex>
              </v-card-actions>
            </v-card>
          </v-form>
          <!--  -->
        </v-container>
      </v-flex>
      <v-flex xs4 offset-xs4 mb-5>
        <!-- <v-card>
          <h2 class="headline font-weight-bold mb-3">Welcome to DEA Training</h2>Your need to input your information to enter into our training room
          <v-alert
            v-model="alert"
            color="pink"
            dark
            border="top"
            icon="mdi-keyboard-settings"
            transition="scale-transition"
            dismissible
          >
            <h2>Please provide a valid info!</h2>
          </v-alert>
          <v-text-field v-model="form.name" label="Name"></v-text-field>
          <v-text-field v-model="form.position" label="Position"></v-text-field>
          <v-btn color="primary" @click="storeIt()">Check Training Now</v-btn>
        </v-card>-->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "header",
  data: () => ({
    form: {
      name: "",
      position: ""
    },
    isLogin: false,
    alert: false
  }),
  components: {
    // AppBar
  },
  methods: {
    storeIt() {
      this.$store.commit("change", this.form);
      this.isLogin = this.$store.getters.isLogin;
      this.alert = false;
      if (this.isLogin) {
        this.$router.push("/view");
      } else {
        this.alert = true;
      }
    }
  }
};
</script>