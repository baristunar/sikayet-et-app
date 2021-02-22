<template>
  <v-row class="justify-space-around">
    <!-- Cards -->
    <v-col cols="6">
      <v-card
        class="mb-5 pa-5"
        v-for="item in complaints"
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
            <v-icon right class="green--text">mdi-check-circle</v-icon>
          </h3>
        </v-card-title>

        <v-card-subtitle class="pb-3">
          {{ item.userFirstname }} {{ item.userLastname }}

          <span class="pl-5">{{ item.createdAt }}</span>
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
            label="Çözülen Şikayetler"
            color="red"
            value="red"
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
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-title
                  ><v-btn text>{{ item.title }}</v-btn></v-list-item-title
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      activeUser: JSON.parse(localStorage.getItem("user")),
      supportMessage: "Destekle",
      items: [
        { title: "En yeni" },
        { title: "En çok görüntülenen" },
        { title: "En çok destek alan" },
        { title: "En çok yorum alan" },
      ],
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
        this.$store.dispatch("complaints/updateSupports", data);
      } else {
        data?.supports.push({ userID: this.activeUser.id });
        this.$store.dispatch("complaints/updateSupports", data);
      }
    },
  },
  computed: {
    ...mapGetters({
      complaints: "complaints/_getComplaints",
    }),
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