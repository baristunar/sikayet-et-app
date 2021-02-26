<template>
  <v-card class="pa-5">
    <v-row class="d-flex align-center pa-5">
      <v-col cols="12">
        <v-btn to="/kayit" color="info" class="float-right"
          >Hesabınız yok mu? Üye ol!</v-btn
        >
      </v-col>
      <v-col cols="6" class="d-none d-md-flex">
        <v-img src="@/assets/images/login.jpg" alt="login" />
      </v-col>
      <v-col cols="6" xs12>
        <v-card-title> Giriş Yap </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation class="pa-5">
            <v-radio-group v-model="loginData.registerType" row>
              <v-radio label="Bireysel Giriş" :value="true"></v-radio>
              <v-radio label="Kurumsal Giriş" :value="false"></v-radio>
            </v-radio-group>

            <v-text-field
              v-model="loginData.email"
              :rules="[loginRules.requiredField]"
              label="E-posta"
              required
              rounded
              outlined
              dense
            ></v-text-field>

            <v-text-field
              v-model="loginData.password"
              :rules="[loginRules.requiredField]"
              label="Şifre"
              required
              type="password"
              rounded
              outlined
              dense
            ></v-text-field>

            <v-alert
              v-if="alert"
              type="error"
              dark
              dense
              icon="mdi-alert"
              prominent
            >
              Hatalı Kullanıcı Adı/E-posta
            </v-alert>

            <v-btn color="primary" class="float-right" @click="login">
              Giriş yap
            </v-btn>
          </v-form>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      valid: false,

      loginData: {
        email: "",
        password: "",
        registerType: true,
      },
      loginRules: {
        requiredField: (v) => !!v || "Bu alan zorunludur",
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch("user/login", { ...this.loginData });
    },
  },
  computed: {
    ...mapGetters({
      alert: "user/_loginReject",
    }),
  },
};
</script>

<style></style>
