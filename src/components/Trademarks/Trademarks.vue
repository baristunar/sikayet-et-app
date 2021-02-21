<template>
  <v-row class="justify-center">
    <v-col cols="8">
      <h1 class="info--text">Markalar</h1>
      <!--       <pre>{{ getTrademarks }}</pre> -->
      <v-card
        class="d-flex pa-5 justify-space-around mt-5"
        color="blue-grey darken-3"
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

        <v-card-text
          class="font-weight-bold d-flex flex-column align-center white--text"
          ><p>{{ item.companyName }}</p>

       
          <p>
            <v-rating
              v-model="item.rating"
              background-color="warning lighten-1"
              color="warning"
              :empty-icon="$mdiStarOutline"
              :full-icon="$mdiStar"
              :half-icon="$mdi - star - half"
              length="5"
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
      empty_icon: "$ratingEmpty",
      half_icon: "fas fa-star-half",
      full_icon: "fas fa-star",
    };
  },
  mounted() {
    this.$store.dispatch("trademarks/fetchTrademarks");
    console.log("this.trademark", this.trademarks);

    setTimeout(() => {
      this.trademarks.forEach((item) => {
        item.rating = this.changeRating(item.solvedComplaints, item.complaints);
      });
    }, 200);

    setTimeout(() => {
      console.log("adlasdlas", this.trademarks);
    }, 5000);
  },
  computed: {
    ...mapGetters({
      trademarks: "trademarks/_getTrademarks",
    }),
  },
  methods: {
    changeRating(solvedComplaints, complaints) {
      let rate = (solvedComplaints?.length / complaints?.length) * 100;
      console.log("rate", rate);
      if (rate > 90 && rate <= 100) {
        return 5;
      }
      if (rate > 80 && rate <= 90) {
        return 4.5;
      }
      if (rate > 70 && rate <= 80) {
        return 4;
      }
      if (rate > 60 && rate <= 70) {
        return 3.5;
      }
      if (rate > 50 && rate <= 60) {
        return 3;
      }
      if (rate > 40 && rate <= 50) {
        return 2.5;
      }
      if (rate > 30 && rate <= 40) {
        return 2;
      }
      if (rate > 20 && rate <= 30) {
        return 1.5;
      }
      if (rate > 10 && rate <= 20) {
        return 1;
      }
      if (rate > 0 && rate <= 10) {
        return 0.5;
      }
      if (solvedComplaints?.length === 0 && complaints?.length === 0) {
        return 5;
      } else return 0;
    },
  },
};
</script>

<style>
</style>