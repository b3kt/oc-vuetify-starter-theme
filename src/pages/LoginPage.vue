<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-card width="480" class="mx-auto mt-12 pt-12 pb-6" flat>
        <v-card-title primary-title class="text-center">
          <div class="mx-auto">
            Welcome {{isAuthenticated}}
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form>
            <v-text-field name="email" label="Email" 
                 v-model="credentials.email"
                id="email"></v-text-field>
            <v-text-field
              name="name"
              label="Enter your password"
              hint="At least 8 characters"
              min="8"
              :append-icon="value ? 'mdi-lock' : 'mdi-lock-open'"
              :append-icon-cb="() => (value = !value)"
              :rules="[() => ('The email and password you entered don\'t match')]"
              :type="value ? 'password' : 'text'"
              @keydown.enter.prevent="login"
              v-model="credentials.password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" large block dark
             @click.prevent="login"
            >Login</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn text small block 
            @click.prevent="forgot"
          >Forgot Password?</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      value: false,
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  mounted () {
    this.$store.dispatch('tryAutoLogin')
    if(this.$store.getters.isAuthenticated){
      //this.$router.push('/')  
    }

    

  },
  methods: {
    forgot () {
      this.$router.push({ name: 'ForgotPassword' })
    },
    login () {
      this.clearFormErrors()
      this.$store.dispatch('login', this.credentials)
    },
    resetForm () {
      this.credentials = {
        email: '',
        password: ''
      }
      this.clearFormErrors()
    },
    ...mapMutations([
      'clearFormErrors'
    ])
  },
  computed: {
    ...mapGetters([
      'hasValidationError',
      'getValidationError',
      'isAuthenticated'
    ])
  }
}
</script>