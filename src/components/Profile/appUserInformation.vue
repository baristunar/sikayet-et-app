<template>
  <div>
    <v-row class="pa-5">
      <!-- Left Section -->
      <v-col cols="6">
        <v-form>
          <v-text-field disabled label="İsim"></v-text-field>
          <v-text-field disabled label="E-posta"></v-text-field>
          <v-text-field disabled label="Cep Telefonu"></v-text-field>

          <v-select
            disabled
            :items="sex"
            item-text="title"
            item-value="value"
            label="Cinsiyet"
            outlined
            dense
          ></v-select>
        </v-form>
      </v-col>

      <!-- Right Section -->
      <v-col cols="6">
        <v-text-field disabled label="Soyisim"></v-text-field>
        <v-text-field disabled label="T.C. Kimlik No"></v-text-field>
        <v-text-field disabled label="Doğum Tarihi"></v-text-field>
        <v-text-field disabled label="Cep Telefonu"></v-text-field>
        <v-btn class="info float-right mr-3"> Düzenle</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sex: [
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
};
</script>

<style>
</style>