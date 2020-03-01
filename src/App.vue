<template>
  <v-app>
    <Header />
    <v-content>
      <router-view/>
    </v-content>
    <v-layout>
      <v-dialog v-model="dialog" persistent width="800" >
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            Training Info
          </v-card-title>

          <v-card-text>
            <p>This is a special training by MT!</p>
            <p>If you want to join, please contact to MT.</p>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'App',
  data: () => ({
    dialog: false,
  }),
  components: {
    Header
  }
};
</script>
