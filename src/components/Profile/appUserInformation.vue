<template>
  <v-row class="pa-5">
    <!-- Left Section -->
    <v-col cols="6">
      <v-form>
        <v-text-field
          disabled
          label="İsim"
          v-model="activeUser.firstname"
        ></v-text-field>
        <v-text-field
          disabled
          label="E-posta"
          v-model="activeUser.email"
        ></v-text-field>
        <v-text-field
          disabled
          label="Cep Telefonu"
          v-model="activeUser.phone"
        ></v-text-field>

        <v-select
          v-model="activeUser.gender"
          :label="activeUser.gender ? activeUser.gender : 'Cinsiyet'"
          outlined
          disabled
          dense
        ></v-select>
      </v-form>
    </v-col>

    <!-- Right Section -->
    <v-col cols="6">
      <v-text-field
        disabled
        label="Soyisim"
        v-model="activeUser.lastname"
      ></v-text-field>
      <v-text-field
        disabled
        label="T.C. Kimlik No"
        v-model="activeUser.trIdNo"
      ></v-text-field>
      <v-text-field
        disabled
        label="Doğum Tarihi"
        v-model="activeUser.birthday"
      ></v-text-field>

      <v-btn
        class="info float-right mr-3"
        @click="$router.push(`/profil/${activeUser.id}`)"
      >
        Düzenle</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      activeUser: JSON.parse(localStorage?.getItem("user")),
      gender: [
        {
          title: "Erkek",
          value: 1,
        },
        {
          title: "Kadın",
          value: 2,
        },
        {
          title: "Belirtmek İstemiyorum",
          value: 0,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      user: "user/_currentUser",
    }),
  },
};
</script>

<style></style>
