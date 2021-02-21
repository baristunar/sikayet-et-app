<template>
  <!-- Left Section -->

  <v-form>
    <v-row class="pa-5">
      <v-col cols="6">
        <v-select disabled label="Şehir" outlined dense></v-select>
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
        <v-btn class="info float-right mr-3"> Düzenle</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      activeUser: JSON.parse(localStorage.getItem("user")),
    };
  },
};
</script>

<style></style>
