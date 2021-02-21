<template>
  <v-row class="justify-center">
    <v-col cols="6">
      <!-- Main Complaint -->
      <v-card
        class="mb-5 pa-5 white--text"
        color="error lighten-1"
        v-for="item in complaintDetail"
        :key="item.id"
        outlined
        shaped
        :elevation="10"
      >
        <v-card-title class="mb-3 white--text">
          <v-avatar class="pl-1">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
          <h3 class="pl-4 white--text">{{ item.header }}</h3>
          <h3 class="pl-4 ml-auto white--text">
            {{ item.trademarkName }}
            <v-icon right class="success--text darken-1"
              >mdi-check-circle</v-icon
            >
          </h3>
        </v-card-title>

        <v-card-subtitle
          class="pb-3 d-flex justify-space-between white--text font-weight-bold"
        >
          {{ item.userFirstname }} {{ item.userLastname }}

          <span class="pl-5">{{ item.createdAt }}</span>
        </v-card-subtitle>

        <v-card-text class="white--text">
          <div>
            {{ item.description }}
          </div>
        </v-card-text>
      </v-card>

      <!-- ALL COMMENTS -->

      <v-card
        class="mb-5 pa-5"
        v-for="item in allComments"
        :key="item.userID"
        outlined
        shaped
        :elevation="10"
      >
        <v-avatar class="pl-1 white--text" size="50" color="info">
          {{ item.username[0] }}
        </v-avatar>
        <v-card-title class="mb-3 d-flex justify-space-between">
          <h3 class="pl-4">{{ item.username }}</h3>
          <v-card-subtitle class="pb-3">
            <span class="pl-5">{{ item.createdAt }}</span>
          </v-card-subtitle>
        </v-card-title>

        <v-card-text class="text--primary">
          <div>{{ item.comment }}</div>
        </v-card-text>
      </v-card>

      <!-- Create comment Section -->
      <v-card
        class="mb-5 pa-5"
        outlined
        shaped
        :elevation="10"
        color="grey lighten-1"
      >
        <v-card-text class="text--primary d-flex">
          <v-avatar color="primary" class="white--text mr-5" size="50">{{
            activeUser.firstname[0]
          }}</v-avatar>
          <v-textarea label="Yorum Yap" no-resize v-model="comment">
          </v-textarea>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn color="success" :disabled="comment === ''" @click="newComment"
            >Tamamla</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { appAxios } from "@/utils/securedAxios";
export default {
  data() {
    return {
      comment: "",
      complaintDetail: [],
      activeUser: JSON.parse(localStorage.getItem("user")),
    };
  },
  created() {
    this.fetchComplaintDetail();
  },
  methods: {
    fetchComplaintDetail() {
      console.log("calıstı");
      appAxios
        .get(`/complaints/${this.$route.params.id}`)
        .then((get_response) => {
          console.log("get_Resp => ", get_response);
          this.complaintDetail.push(get_response.data);
          console.log(this.complaintDetail);
          console.log(get_response.data);
        })
        .catch((e) => {
          console.log("get error => ", e);
        });
    },
    newComment() {
      const commentData = {
        userID: this.activeUser.id,
        username: this.activeUser.firstname + " " + this.activeUser.lastname,
        comment: this.comment,
        createdAt: new Date(),
      };
      this.complaintDetail.forEach((item) =>
        item.comments.push({ ...commentData })
      );

      appAxios
        .patch(`/complaints/${this.$route.params.id}`, this.complaintDetail[0])
        .then((newComment_response) => {
          console.log(newComment_response.data);
          this.comment = "";
        });
    },
  },
  computed: {
    allComments() {
      let comments = [];
      comments = this.complaintDetail[0].comments;
      return comments;
    },
  },
};
</script>

<style></style>
