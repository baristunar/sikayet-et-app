<template>
  <v-row class="justify-center">
    <v-col cols="8">
      <h1 class="info--text">Markalar</h1>
      <!--       <pre>{{ getTrademarks }}</pre> -->
      <v-card
        class="d-flex pa-5 justify-space-around mt-5"
        color="blue-grey lighten-5"
        v-for="item in trademarks"
        :key="item.id"
      >
        <v-card class="d-flex align-center justify-center">
          <v-card-actions>
            <v-img
              :src="item.companyLogo"
              max-width="88"
              max-height="48.83"
              alt=""
            >
            </v-img>
          </v-card-actions>
        </v-card>

        <v-card-text class="font-weight-bold d-flex flex-column align-center"
          ><p>{{ item.companyName }}</p>

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
              <span>{{ item.complaints.length }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      rating: 5,
    };
  },
  created() {
    this.$store.dispatch("trademarks/fetchTrademarks");
  },
  computed: {
    ...mapGetters({
      trademarks: "trademarks/_getTrademarks",
    }),
  },
};
</script>

<style>
</style>