<template>
  <div>
    <v-card class="pa-5">
      <v-row class="d-flex align-center pa-5">
        <v-col cols="12">
          <v-btn to="/kayit" color="info" class="float-right"
            >Hesabınız yok mu? Üye ol!</v-btn
          >
        </v-col>
        <v-col cols="8" class="d-none d-md-flex">
          <v-img src="@/assets/images/login.jpg" alt="login" />
        </v-col>
        <v-col cols="4" xs12>
          <v-card-title> Giriş Yap </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation class="pa-5">
              <v-text-field
                v-model="loginData.userMail"
                :rules="[loginRules.requiredField]"
                label="E-posta"
                required
                rounded
                outlined
                dense
              ></v-text-field>

              <v-text-field
                v-model="loginRules.userPw"
                :rules="requiredField"
                label="Şifre"
                required
                rounded
                outlined
                dense
              ></v-text-field>

              <v-btn color="primary" class="float-right"> Giriş yap </v-btn>
            </v-form>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        userMail: "",
        userPw: "",
      },
      loginRules: {
        requiredField: [(v) => !!v || "Bu alan zorunludur"],
      },
    };
  },
  methods: {},
};
</script>

<style>
</style>