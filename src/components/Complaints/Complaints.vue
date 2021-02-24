<template>
  <v-row class="justify-space-around">
    <!-- Cards -->
    <v-col cols="6">
      <h2 v-if="filteredList.length === 0">
        Aramınıza uygun sonuç bulunamamıştır.
      </h2>
      <v-card
        class="mb-5 pa-5"
        v-for="item in filteredList"
        :key="item.id"
        outlined
        shaped
        :elevation="10"
      >
        <v-card-title class="mb-3">
          <v-avatar class="pl-1">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
          <h3 class="pl-4">{{ item.header }}</h3>
          <h3 class="pl-4 ml-auto">
            {{ item.trademarkName }}
            <v-icon v-if="item.isSolved" right class="green--text"
              >mdi-check-circle</v-icon
            >
          </h3>
        </v-card-title>

        <v-card-subtitle class="pb-3">
          {{ item.userFirstname }} {{ item.userLastname }}

          <span class="pl-5">{{
            `${timesAgo(item.createdAt)} oluşturuldu.`
          }}</span>
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>
            {{ item.description }}
            <router-link class="pl-3" :to="`/sikayetler/${item.id}`"
              >Devamını oku...</router-link
            >
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="$router.push(`/sikayetler/${item.id}`)"
          >
            <v-icon left>mdi-comment</v-icon> Yorum Yap
          </v-btn>

          <v-btn
            v-if="item.userID !== activeUser.id"
            :class="{
              'success--text': item.supports.some(
                (element) => element.userID === activeUser.id
              ),
            }"
            class="primary--text"
            text
            @click="supportComplaint(item)"
          >
            {{
              item.supports.some((element) => element.userID === activeUser.id)
                ? "Destekledin"
                : "Destekle"
            }}
            <v-icon left>mdi-thumb-up</v-icon>
          </v-btn>
          <v-card-text
            class="info--text font-weight-bold"
            v-if="item.supports.length > 0"
            >{{ item.supports.length }} Destekçi</v-card-text
          >
          <v-btn
            v-if="item.comments.length > 0"
            text
            color="info"
            @click="$router.push(`/sikayetler/${item.id}`)"
          >
            {{ item.comments.length }} Yorum</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>

    <!-- Filtering -->

    <v-col
      cols="4"
      class="filter-fixed hidden-xs-only"
      style="position: relative"
    >
      <v-card class="pa-5 filter-fixed" dark>
        <v-form>
          <v-text-field
            v-model="search"
            filled
            dense
            rounded
            placeholder="Şikayetler içinde ara"
          ></v-text-field>
        </v-form>
        <v-card-subtitle class="display-1"
          ><v-icon>mdi-filter</v-icon> Filtrele</v-card-subtitle
        >
        <v-card-text>
          <v-checkbox
            v-model="solvedFilter"
            label="Çözülen Şikayetler"
            color="red"
            :value="solvedFilter"
            hide-details
          ></v-checkbox>
        </v-card-text>

        <v-card-text class="mt-4">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" text dark v-bind="attrs" v-on="on">
                Sırala
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="item in filterTitles" :key="item.id">
                <v-list-item-title
                  ><v-btn @click="filterItems(item.id)" text>{{
                    item.title
                  }}</v-btn></v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import helperMixin from "@/utils/helperMixin";
import { mapGetters } from "vuex";
export default {
  mixins: [helperMixin],

  data() {
    return {
      activeUser: JSON.parse(localStorage.getItem("user")),
      supportMessage: "Destekle",
      filterTitles: [
        { id: 1, title: "En yeni" },
        { id: 2, title: "En çok görüntülenen" },
        { id: 3, title: "En çok destek alan" },
        { id: 4, title: "En çok yorum alan" },
      ],
      search: "",
      solvedFilter: false,
    };
  },
  created() {
    this.$store.dispatch("complaints/fetchComplaints");
  },
  methods: {
    supportComplaint(item) {
      let data = item;
      console.log("data", data);
      const isExist = data?.supports.some(
        (item) => item?.userID === this.activeUser?.id
      );

      if (isExist) {
        data.supports = data?.supports.filter(
          (item) => item?.userID !== this.activeUser?.id
        );
        this.$store.dispatch("complaints/updateComplaints", data);
      } else {
        data?.supports.push({ userID: this.activeUser.id });
        this.$store.dispatch("complaints/updateComplaints", data);
      }
    },
    filterItems(id) {
      if (id === 4) {
        console.log("calıstı");
        return this.complaints.filter((item) => item.comments.sort());
      }
    },
  },
  computed: {
    ...mapGetters({
      complaints: "complaints/_getComplaints",
    }),
    filteredList() {
      if (this.search.length > 0) {
        return this.complaints.filter(
          (item) =>
            item?.description
              .toLowerCase()
              .includes(this.search.toLowerCase()) ||
            item?.trademarkName
              .toLowerCase()
              .includes(this.search.toLowerCase()) ||
            item?.header.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      if (this.solvedFilter) {
        return this.complaints.filter((item) => item.isSolved === true);
      } else {
        return this.complaints;
      }
    },
  },
};
</script>

<style>
.filter-fixed {
  position: fixed;
  right: 20;
  top: 20;
  min-width: 600px;
  overflow: hidden;
}
</style>