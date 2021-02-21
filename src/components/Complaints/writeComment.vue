<template>
  <v-row class="justify-center">
    <v-col cols="6">
      <v-card
        class="mb-5 pa-5"
        v-for="item in complaints"
        :key="item.id"
        outlined
        shaped
        :elevation="10"
      >
        <v-card-title class="mb-3">
          <v-avatar class="pl-1">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
          <h3 class="pl-4">{{ item.header }}</h3>
          <h3 class="pl-4 ml-auto">
            {{ item.trademarkName }}
            <v-icon right class="green--text">mdi-check-circle</v-icon>
          </h3>
        </v-card-title>

        <v-card-subtitle class="pb-3">
          {{ item.userFirstname }} {{ item.userLastname }}

          <span class="pl-5">{{ item.createdAt }}</span>
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>
            {{ item.description }}
            <router-link class="pl-3" to="/complaints"
              >Devamını oku...</router-link
            >
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" text
            >Yorum Yap <v-icon right>mdi-comment</v-icon></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style></style>
