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
          >ŞİKAYETİM VAR</router-link
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

          <v-btn
            text
            color="grey"
            class="hidden-xs-only"
            v-if="isAuthenticated"
            @click.prevent="logout"
            >Çıkış Yap <v-icon right>mdi-logout-variant</v-icon>
          </v-btn>

          <v-btn v-if="!isAuthenticated" text color="grey" to="/giris"
            >GİRİŞ YAP/ÜYE OL <v-icon right>mdi-login-variant</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-app-bar>

    <!-- Navbar ends -->

    <!-- Left panel starts-->

    <v-navigation-drawer app class="primary" v-model="drawer">
      <v-layout v-if="isAuthenticated" column align-center>
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
      <v-divider v-if="isAuthenticated" class="white"></v-divider>

      <v-list class="mt-5">
        <v-list-item
          v-for="link in sidebarLinks"
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
        <v-btn
          v-if="isAuthenticated"
          text
          color="white"
          class="vissible-xs-only"
          @click.prevent="logout"
          >Çıkış Yap <v-icon right>mdi-logout-variant</v-icon>
        </v-btn>

        <v-btn v-if="!isAuthenticated" text color="white" to="/giris"
          >GİRİŞ YAP/ÜYE OL <v-icon right>mdi-login-variant</v-icon>
        </v-btn>
      </v-layout>
    </v-navigation-drawer>

    <!-- Left panel ends -->
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      activeUser: JSON.parse(localStorage.getItem("user")),
      drawer: false,
      search: "",
      user: {
        full_name: "Barış Tunar",
        profession: "Front End Developer",
        avatar:
          "https://media-exp1.licdn.com/dms/image/C4D03AQGobHoaRpNrcw/profile-displayphoto-shrink_100_100/0/1613906754331?e=1619654400&v=beta&t=HQEzdrPdJ6_LQi6zLFMgL-qgmbCtZiLWuwSxw6qZMng",
      },
      sidebarLinks: [
        { icon: "mdi-home", text: "Anasayfa", route: "/" },
        {
          icon: "mdi-account-edit",
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
        {
          icon: "mdi-lead-pencil",
          text: "Şikayet Yaz",
          route: "/sikayetyaz",
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      isAuthenticated: "user/_isAuthenticated",
    }),
  },

  methods: {
    logout() {
      this.$store.commit("user/logout");
      this.setLinks();
    },
  },
};
</script>

<style>
.link {
  text-decoration: none;
}
</style>