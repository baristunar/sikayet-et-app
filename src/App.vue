<template>
  <v-app class="grey lighten-4">
    <navbar />

    <v-main>
      <router-view></router-view>
    </v-main>
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
