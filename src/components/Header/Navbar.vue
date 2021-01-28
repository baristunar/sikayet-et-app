<template>
  <nav>
    <!-- Navbar starts -->

    <v-app-bar flat app class="grey lighten-4">
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link to="/" class="link text-uppercase grey--text" link
          >ŞİKAYET ET</router-link
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-layout>
        <v-flex row align-center justify-space-around>
          <v-col cols="8" sm="8" lg="8">
            <v-text-field
              class="hidden-xs-only"
              v-model="search"
              flat
              dense
              clearable
              hide-details
              placeholder="Şikayet ya da Marka ara"
            >
            </v-text-field>
          </v-col>

         <!--  <v-btn text color="grey" class="hidden-xs-only"
            >Çıkış Yap <v-icon right>mdi-logout-variant</v-icon>
          </v-btn> -->
          
           <v-btn text color="grey"
            >GİRİŞ YAP/ÜYE OL <v-icon right>mdi-login-variant</v-icon>
          </v-btn> 
        </v-flex>
      </v-layout>
    </v-app-bar>

    <!-- Navbar ends -->

    <!-- Left panel starts-->

    <v-navigation-drawer app class="primary" v-model="drawer">
      <v-layout column align-center>
        <v-flex class="my-5">
          <v-avatar size="128">
            <img :src="user.avatar" :alt="user.full_name" />
          </v-avatar>
          <p class="white--text subheading mt-3">
            {{ user.full_name }}
          </p>
          <p class="white--text subheading mt-3">
            {{ user.profession }}
          </p>
        </v-flex>
      </v-layout>
      <v-divider class="white"></v-divider>
      <v-list class="mt-5">
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
          color="white"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title class="white--text">
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-layout column align-center class="mt-5">
        <!-- <v-btn text color="white" class="vissible-xs-only"
          >Çıkış Yap <v-icon right>mdi-logout-variant</v-icon>
        </v-btn> -->
        <v-btn text color="grey"
          >GİRİŞ YAP/ÜYE OL <v-icon right>mdi-login-variant</v-icon>
        </v-btn>
      </v-layout>
    </v-navigation-drawer>

    <!-- Left panel ends -->
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      search: "",
      user: {
        full_name: "Barış Tunar",
        profession: "Front End Developer",
        avatar:
          "https://media-exp1.licdn.com/dms/image/C4D03AQFly-l_jhZGoQ/profile-displayphoto-shrink_400_400/0/1609102801471?e=1617235200&v=beta&t=8nhTMAl2SP61CQjWdc-T3dhZbhcowtmmHxhKxCEsXmk",
      },
      links: [
        {
          icon: "mdi-home",
          text: "Anasayfa",
          route: "/",
        },
        {
          icon: "mdi-account-box",
          text: "Profil",
          route: "/profil",
        },
        {
          icon: "mdi-comment-text-multiple",
          text: "Şikayetler",
          route: "/sikayetler",
        },
        {
          icon: "mdi-domain",
          text: "Markalar",
          route: "/markalar",
        },
      ],
    };
  },
};
</script>

<style>
.link {
  text-decoration: none;
}
</style>