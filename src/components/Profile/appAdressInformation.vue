<template>
  <div>
    <!-- Left Section -->

    <v-form>
      <v-row class="pa-5">
        <v-col cols="6">
          <v-select disabled label="Şehir" outlined dense></v-select>
        </v-col>

        <v-col cols="12">
          <v-textarea
            full-width
            disabled
            no-resize
            label="Adres Detay"
          ></v-textarea>
          <v-btn class="info float-right mr-3"> Düzenle</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>