<template>
  <v-card height="400px">
    <v-footer padless absolute>
      <v-card flat tile width="100%" class="primary text-center">
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
            <v-icon class="white--text" size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Barış Tunar</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        "mdi-medium",
        "mdi-instagram",
        "mdi-email",
        "mdi-linkedin",
        "mdi-twitter",
      ],
    };
  },
};
</script>

<style>
</style>