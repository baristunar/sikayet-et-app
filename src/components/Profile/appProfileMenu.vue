<template>
  <div>
    <v-card>
      
      <v-toolbar flat color="primary" dark>
        <!-- Menu -->

        <v-toolbar-title>Kullanıcı Bilgileri</v-toolbar-title>

      </v-toolbar>

      <v-tabs vertical>
        <v-tab v-for="item in profileMenu" :key="item.title" c>
          <v-icon left> {{ item.icon }}</v-icon>
          <span> {{ item.title }}</span>
        </v-tab>

        <!-- Slider Content -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <app-user-information />
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <app-adress-information />
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <appPasswordChange />
            </v-card-text>
          </v-card>
        </v-tab-item>

      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import appUserInformation from "./appUserInformation";
import appAdressInformation from "./appAdressInformation";
import appPasswordChange from "./appPasswordChange";
export default {
  components: {
    appUserInformation,
    appAdressInformation,
    appPasswordChange,
  },
  data() {
    return {
      profileMenu: [
        {
          title: "Kişisel Bilgiler",
          icon: "mdi-account",
        },
        {
          title: "Adres Bilgileri",
          icon: "mdi-pencil-outline",
        },
        {
          title: "Şifre Değişikliği",
          icon: "mdi-lock",
        },
      ],
    };
  },
};
</script>

<style>
</style>