<template>
  <v-row class="pa-5 justify-center">
    <v-col cols="4">
      <v-form>
        <v-text-field
          label="İsim"
          v-model="activeUser.firstname"
        ></v-text-field>
        <v-text-field
          label="E-posta"
          v-model="activeUser.email"
          disabled
        ></v-text-field>
        <v-text-field
          label="Cep Telefonu"
          v-model="activeUser.phone"
        ></v-text-field>

        <v-select
          v-model="activeUser.gender"
          :items="gender"
          :label="activeUser.gender ? activeUser.gender : 'Cinsiyet'"
          outlined
          dense
        ></v-select>
      </v-form>
    </v-col>

    <!-- Right Section -->
    <v-col cols="4">
      <v-text-field
        label="Soyisim"
        v-model="activeUser.lastname"
      ></v-text-field>
      <v-text-field
        label="T.C. Kimlik No"
        v-model="activeUser.trIdNo"
      ></v-text-field>
      <v-text-field
        label="Doğum Tarihi"
        v-model="activeUser.birthday"
      ></v-text-field>
      <v-select
        label="Şehir"
        :items="cities"
        v-model="activeUser.city"
        outlined
        dense
      ></v-select>
    </v-col>
    <v-col cols="8">
      <v-textarea
        full-width
        v-model="activeUser.adress"
        color="primary"
        no-resize
        label="Adres Detay"
      ></v-textarea>
    </v-col>
    <v-col cols="8">
      <v-alert v-if="isUpdated" type="success">
        Bilgileriniz Kaydedilmiştir.
      </v-alert>
      <v-btn class="info float-right mr-3" @click="saveData"> Kaydet</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      isUpdated: false,
      activeUser: JSON.parse(localStorage.getItem("user")),
      gender: ["Erkek", "Kadın", "Belirtmek İstemiyorum"],
      cities: [
        "Adana",
        "Adıyaman",
        "Afyon",
        "Ağrı",
        "Amasya",
        "Ankara",
        "Antalya",
        "Artvin",
        "Aydın",
        "Balıkesir",
        "Bilecik",
        "Bingöl",
        "Bitlis",
        "Bolu",
        "Burdur",
        "Bursa",
        "Çanakkale",
        "Çankırı",
        "Çorum",
        "Denizli",
        "Diyarbakır",
        "Edirne",
        "Elazığ",
        "Erzincan",
        "Erzurum",
        "Eskişehir",
        "Gaziantep",
        "Giresun",
        "Gümüşhane",
        "Hakkari",
        "Hatay",
        "Isparta",
        "İçel (Mersin)",
        "İstanbul",
        "İzmir",
        "Kars",
        "Kastamonu",
        "Kayseri",
        "Kırklareli",
        "Kırşehir",
        "Kocaeli",
        "Konya",
        "Kütahya",
        "Malatya",
        "Manisa",
        "Kahramanmaraş",
        "Mardin",
        "Muğla",
        "Muş",
        "Nevşehir",
        "Niğde",
        "Ordu",
        "Rize",
        "Sakarya",
        "Samsun",
        "Siirt",
        "Sinop",
        "Sivas",
        "Tekirdağ",
        "Tokat",
        "Trabzon",
        "Tunceli",
        "Şanlıurfa",
        "Uşak",
        "Van",
        "Yozgat",
        "Zonguldak",
        "Aksaray",
        "Bayburt",
        "Karaman",
        "Kırıkkale",
        "Batman",
        "Şırnak",
        "Bartın",
        "Ardahan",
        "Iğdır",
        "Yalova",
        "Karabük",
        "Kilis",
        "Osmaniye",
        "Düzce",
      ],
    };
  },
  methods: {
    saveData() {
      this.$store.dispatch("user/updateProfile", this.activeUser);
      this.isUpdated = true;
    },
  },
  watch: {
    isUpdated() {
      if (this.isUpdated) {
        setTimeout(() => {
          this.isUpdated = false;
        }, 2000);
      }
    },
  },
};
</script>

<style>
</style>