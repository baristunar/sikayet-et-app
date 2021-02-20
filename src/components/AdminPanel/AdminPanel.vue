<template>
  <v-row>
    <v-col cols="12">
      <v-card class="pa-5">
        <v-toolbar flat color="primary" dark>
          <!-- Menu -->

          <v-toolbar-title>Admin Paneli</v-toolbar-title>
        </v-toolbar>

        <v-tabs vertical>
          <v-tab v-for="item in adminMenu" :key="item">
            <v-icon left> {{ item.icon }}</v-icon>
            <span> {{ item.title }}</span>
          </v-tab>

          <!-- Slider Content -->
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <!--   <app-user-information /> -->
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <app-create-trademark />
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <!--  <appPasswordChange /> -->
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import appCreateTrademark from "@/components/AdminPanel/appCreateTrademark";

export default {
  components: {
    appCreateTrademark,
  },
  data() {
    return {
      adminMenu: [
        {
          title: "Kullanıcı İşlemleri",
          icon: "mdi-account",
        },
        {
          title: "Marka Oluştur",
          icon: "mdi-trademark",
        },
      ],
    };
  },
};
</script>

<style>
</style>