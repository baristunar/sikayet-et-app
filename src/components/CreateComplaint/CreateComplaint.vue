<template>
  <v-row class="d-flex justify-center align-center">
    <v-col cols="6">
      <v-card
        outlined
        :loading="loadingStatus"
        :disabled="loadingStatus"
        class="pa-5"
      >
        <v-card-title>Şikayet Oluştur</v-card-title>
        <v-card-text>
          <v-form class="pa-5">
            <v-text-field
              v-model="complaintHeader"
              label="Başlık"
              prepend-icon="mdi-format-title"
            ></v-text-field>

            <v-textarea
              v-model="complaintDescription"
              prepend-icon="mdi-table-of-contents"
              label="Şikayet Detayı"
              no-resize
            ></v-textarea>

            <v-autocomplete
              v-model="selectedTrademark"
              :items="trademarks"
              item-text="companyName"
              prepend-icon="mdi-trademark"
              color="primary"
              label="Şikayet Etmek İstediğiniz Marka"
              item-value="id"
              clearable
            >
            </v-autocomplete>

            <v-btn color="success" class="float-right" @click="createComplaint"
              >Tamamla</v-btn
            >
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      activeUser: null,
      selectedTrademark: null,
      complaintHeader: "",
      complaintDescription: "",
    };
  },
  created() {
    this.$store.dispatch("trademarks/fetchTrademarks");
    this.activeUser = JSON.parse(localStorage.getItem("user"));
    console.log("activeUser => ", this.activeUser);
  },
  computed: {
    ...mapGetters({
      trademarks: "trademarks/_getTrademarks",
      loadingStatus: "loading/getLoadingStatus",
    }),
  },
  methods: {
    createComplaint() {
      const trademark = this.trademarks.filter(
        (item) => item.id === this.selectedTrademark
      );
      const complaintData = {
        userFirstname: this.activeUser.firstname,
        userLastname: this.activeUser.lastname,
        userID: this.activeUser.id,
        header: this.complaintHeader,
        description: this.complaintDescription,
        trademarkID: this.selectedTrademark,
        trademarkName: trademark[0].companyName,
        createdAt: new Date(),
      };

      this.$store.dispatch("complaints/newComplaint", complaintData);
    },
  },
};
</script>

<style></style>
