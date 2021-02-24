<template>
  <v-row class="justify-center">
    <v-col cols="6">
      <!-- Main Complaint -->
      <v-card
        class="mb-5 pa-5 white--text"
        :class="{ success: item.isSolved }"
        color="info lighten-1"
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
          </h3>
        </v-card-title>
        <v-card-subtitle v-if="item.isSolved">
          <h3 class="white--text">
            Çözüldü
            <v-icon right class="white--text darken-1">mdi-check-circle</v-icon>
          </h3>
        </v-card-subtitle>

        <v-card-subtitle
          class="pb-3 d-flex justify-space-between white--text font-weight-bold"
        >
          {{ item.userFirstname }} {{ item.userLastname }}

          <span class="pl-5">{{
            `${timesAgo(item.createdAt)} oluşturuldu.`
          }}</span>
        </v-card-subtitle>

        <v-card-text class="white--text">
          <div>
            {{ item.description }}
          </div>
        </v-card-text>
        <v-card-actions class="white--text">
          <v-btn
            v-if="item.userID === activeUser.id && !item.isSolved"
            class="success"
            :class="{ success: item.isSolved }"
            @click="openDialog(item)"
            >Çözüldü</v-btn
          >
        </v-card-actions>
      </v-card>

      <!-- Dialog -->

      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline"> Sorununuz çözüldü mü? </v-card-title>

          <v-card-text>
            Şikayet durumunuzu çözüldü olarak değiştirmek istediğinizden emin
            misiniz?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="changeToSolved">
              Evet
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              @click="(dialog = false), (updateData = Object)"
            >
              Hayır
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- ALL COMMENTS -->

      <v-card
        class="mb-5 pa-5"
        v-for="item in allComments"
        :key="item.createdAt"
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
            <span class="pl-5">{{
              `${timesAgo(item.createdAt)} oluşturuldu.`
            }}</span>
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
import helperMixin from "@/utils/helperMixin";
import { appAxios } from "@/utils/securedAxios";
export default {
  mixins: [helperMixin],
  data() {
    return {
      dialog: false,
      updateData: Object,
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
        item.comments?.push({ ...commentData })
      );

      appAxios
        .patch(`/complaints/${this.$route.params.id}`, this.complaintDetail[0])
        .then((newComment_response) => {
          console.log(newComment_response.data);
          this.comment = "";
        });
    },
    openDialog(item) {
      this.dialog = true;
      this.updateData = item;
    },
    changeToSolved() {
      if (!this.updateData.isSolved) {
        this.updateData.isSolved = true;
        this.$store.dispatch("complaints/updateComplaints", this.updateData);
        this.updateData = Object;
        this.dialog = false;
      }
    },
  },
  computed: {
    allComments() {
      let comments = [];
      comments = this.complaintDetail[0]?.comments || [];
      console.log("comments", comments);
      return comments;
    },
  },
};
</script>

<style></style>
