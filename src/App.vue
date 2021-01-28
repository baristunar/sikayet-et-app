<template>
  <v-app class="grey lighten-4">
    <navbar />

    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/Header/Navbar";
import Footer from "@/components/Footer/Footer";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
