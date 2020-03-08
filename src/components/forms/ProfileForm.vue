<template>
  <v-container pa-0>
    <v-expansion-panels
        :accordion="true"
        :multiple="true"
        :flat="false"
        :hover="true"
    >
      <v-expansion-panel v-for="p in forms" :key="p">
        <v-expansion-panel-header elevation-0 class="flat">{{p.label}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row no-gutters>
            <v-col cols="12" sm="6" md="8">
              <v-card class="pa-2" flat tile v-for="x in p.fields" :key="x">
                <v-file-input
                  v-if="x.type=='file'"
                  :readonly="x.mode == 'r'"
                  :disabled="x.mode == 'r'"
                  v-model="x.value"
                  :rules="nameRules"
                  class="col-2 "
                  :label="x.title"
                  required
                  flat 
                ></v-file-input>
                <v-text-field
                  v-if="x.type=='text'"
                  :readonly="x.mode == 'r'"
                  :disabled="x.mode == 'r'"
                  v-model="x.value"
                  :rules="nameRules"
                  class="col-2 "
                  :label="x.title"
                  required
                  flat 
                ></v-text-field>
                <v-textarea
                  v-if="x.type=='textarea'"
                  :readonly="x.mode == 'rw'"
                  :disabled="x.mode == 'rw'"
                  v-model="x.value"
                  :rules="nameRules"
                  class="col-2 "
                  :label="x.title"
                  required
                  flat 
                ></v-textarea>
              </v-card>
            </v-col>
            <v-col cols="6" md="4">
              <!-- <v-card class="pa-2" outlined tile>.col-6 .col-md-4</v-card> -->
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
export default {
    data () {
        return {
            forms : [
                {
                    label: "Avatar",
                    fields: [
                        {title: "Full Name", value:"Full Name", mode: "rw", type:"file"},
                    ]
                },
                {
                    label: "Personal Info",
                    fields: [
                        {title: "Full Name", value:"Full Name", mode: "rw", type:"text"},
                        {title: "Username", value:"Username", mode: "r", type:"text"},
                        {title: "Email", value:"Email", mode: "r", type:"text"},
                        {title: "Phone", value:"Phone", mode: "rw", type:"text"},
                    ]
                },
                {
                    label: "Description",
                    fields: [
                        {title: "Description", value:"Username", mode: "r", type:"textarea"},
                    ]
                },
                {
                    label: "Wallet",
                    fields: [
                        {title: "Balance", value:"100000", mode: "r", type:"text"},
                    ]
                }
            ],
        }
    }
};
</script>

<style scoped>
input{
    font-weight: 900;
}
</style>