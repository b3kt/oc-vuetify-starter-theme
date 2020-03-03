<template>
  <v-card flat>
    <v-tabs vertical>
      <v-tab v-for="tab in tabs" :key="tab.id">
        <v-icon left>mdi-account</v-icon>
        {{ tab.title }}
      </v-tab>

      <v-tab-item>
        <ProfileForm />
      </v-tab-item>
      <v-tab-item>
        <OrdersForm />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import ProfileForm from "@/components/forms/ProfileForm";
import OrdersForm from "@/components/forms/OrdersForm";

export default {
  name: "account-tabs",
  data() {
    return {
      tabs: [
        { id: "profile", title: "Profile" },
        { id: "orders", title: "Orders" }
      ],
      slides: ["First"]
    };
  },
  components: {
    ProfileForm,
    OrdersForm
  }
};
</script>