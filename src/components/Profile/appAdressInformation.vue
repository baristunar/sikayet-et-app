<template>
  <!-- Left Section -->

  <v-form>
    <v-row class="pa-5">
      <v-col cols="6">
        <v-select
          label="Şehir"
          v-model="activeUser.city"
          outlined
          dense
          :items="cities"
          disabled
        ></v-select>
      </v-col>

      <v-col cols="12">
        <v-textarea
          full-width
          v-model="activeUser.adress"
          disabled
          color="primary"
          no-resize
          label="Adres Detay"
        ></v-textarea>
        <v-btn
          class="info float-right mr-3"
          @click="$router.push(`/profil/${activeUser.id}`)"
        >
          Düzenle</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
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
      activeUser: JSON.parse(localStorage.getItem("user")),
    };
  },
};
</script>

<style></style>
