<template>
  <v-row>
    <!-- Cards -->
    <v-col cols="12" sm="6" md="8">
      <v-card
        class="mb-5 pa-5"
        v-for="i in 10"
        :key="i"
        outlined
        shaped
        elevation="10"
      >
        <v-card-title class="mb-3">
          <v-avatar class="pl-1">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
          <h3 class="pl-4">MNG KARGO PAKETİMİ GETİRMEDİ</h3>
          <h3 class="pl-4 ml-auto">
            MNG KARGO
            <v-icon right class="green--text">mdi-check-circle</v-icon>
          </h3>
        </v-card-title>

        <v-card-subtitle class="pb-3">
          Barış tunar <span class="pl-5">30 dakika önce</span>
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est odit
            officia cupiditate similique quam soluta, ullam aliquam harum
            nostrum placeat nisi accusantium consequatur aperiam facere
            voluptate quo ex debitis quidem!
            <router-link class="pl-3" to="/complaints"
              >Devamını oku...</router-link
            >
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" text
            >Yorum Yap <v-icon right>mdi-comment</v-icon></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>

    <!-- Filtering -->

    <v-col cols="6" md="4" class="hidden-xs-only">
      <v-card class="pa-5" dark>
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
            v-model="ex4"
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
export default {
  data() {
    return {
      items: [
        { title: "En yeni" },
        { title: "En çok görüntülenen" },
        { title: "En çok destek alan" },
        { title: "En çok yorum alan" },
      ],
    };
  },
};
</script>

<style>
</style>