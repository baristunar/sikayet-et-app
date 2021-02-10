<template>
  <v-row class="d-flex justify-center align-center">
    <v-col cols="6">
      <v-card outlined>
        <v-card-title>Şikayet Oluştur</v-card-title>
        <v-card-text>
          <v-form class="pa-5">
            <v-text-field label="Başlık" prepend-icon="mdi-format-title"></v-text-field>
            <v-textarea prepend-icon="mdi-table-of-contents" label="Şikayet Detayı" no-resize></v-textarea>

            <v-autocomplate label="Marka"></v-autocomplate>
            <v-btn color="success" class="float-right">Tamamla</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-img src="@/assets/images/create-complaint.jpg"></v-img>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style>
</style>