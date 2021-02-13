<template>
  <v-row>
    <v-col cols="8">
      <h1 class="info--text">Markalar</h1>

      <v-card
        class="d-flex pa-5 justify-space-around mt-5"
        color="blue-grey lighten-5"
        v-for="i in 10"
        :key="i"
      >
        <v-card class="d-flex align-center justify-center">
          <v-card-actions>
            <v-img
              src="https://files.sikayetvar.com/lg/cmp/20/2035.png?1527662585"
              max-width="88"
              max-height="48.83"
              alt=""
            >
            </v-img>
          </v-card-actions>
        </v-card>

        <v-card-text class="font-weight-bold d-flex flex-column align-center"
          ><p>Sürat Kargo</p>

          <p>
            <v-rating
              v-model="rating"
              color="yellow darken-3"
              background-color="white darken-1"
              empty-icon="$ratingFull"
              half-increments
              readonly
            ></v-rating>
          </p>
        </v-card-text>

        <v-card>
          <v-card-text
            class="d-flex align-center deep-purple--text font-weight-bold"
          >
            <div>
              <v-icon left>mdi-comment-text</v-icon>
            </div>
            <div class="pa-2 text-center">
              <span>Şikayet Sayısı</span>
              <br />
              <span>45.000</span>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      rating: 5,
    };
  },
};
</script>

<style>
</style>