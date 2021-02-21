<template>
  <v-row>
    <v-col cols="6" class="mx-auto">
      <v-form>
        <v-subheader class="font-weight-bold"
          >Yeni ve Eski Şifrenizi Giriniz</v-subheader
        >

        <v-text-field
          v-model="currentPassword"
          :append-icon="currentPwShow ? 'mdi-eye' : 'mdi-eye-off'"
          :type="currentPwShow ? 'text' : 'password'"
          name="currentPassword"
          @click:append="currentPwShow = !currentPwShow"
          label="Mevcut Şifre"
        ></v-text-field>

        <v-text-field
          v-model="newPassword"
          :append-icon="newPwShow ? 'mdi-eye' : 'mdi-eye-off'"
          :type="newPwShow ? 'text' : 'password'"
          name="newPassword"
          @click:append="newPwShow = !newPwShow"
          label="Yeni Şifre"
        ></v-text-field>

        <v-text-field
          v-model="newPassword2"
          :append-icon="newPw2Show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="newPw2Show ? 'text' : 'password'"
          name="newPassword2"
          @click:append="newPw2Show = !newPw2Show"
          label="Yeni Şifre Tekrar"
        ></v-text-field>

        <v-alert type="success" v-if="changePasswordStatus === true">
          Şifre değiştirme işlemi başarılı.
        </v-alert>

        <v-alert type="error" v-if="changePasswordStatus === false">
          {{ alertMessage }}
        </v-alert>
        <v-btn
          class="success float-right"
          @click="changePassword"
          :disabled="
            currentPassword === '' || newPassword === '' || newPassword2 === ''
          "
          >Kaydet</v-btn
        >
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      changePasswordStatus: null,
      alertMessage: "",
      currentPwShow: false,
      newPwShow: false,
      newPw2Show: false,
      currentPassword: "",
      newPassword: "",
      newPassword2: "",
      activeUser: JSON.parse(localStorage?.getItem("user")),

      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    changePassword() {
      if (
        this.currentPassword === "" ||
        this.newPassword === "" ||
        this.newPassword2 === " "
      ) {
        this.changePasswordStatus = false;
        this.clearInputs();
        return (this.alertMessage = "Lütfen Şifre Alanlarını Doldurunuz");
      }
      if (this.activeUser.password !== this.currentPassword) {
        this.changePasswordStatus = false;
        return (this.alertMessage = "Girilen mevcut şifre hatalı!");
      }
      if (
        this.activeUser.password === this.currentPassword &&
        this.newPassword === this.newPassword2
      ) {
        this.activeUser.password = this.newPassword;
        this.$store.dispatch("user/changePassword", { ...this.activeUser });
        this.changePasswordStatus = true;
        this.clearInputs();
      } else {
        this.changePasswordStatus = false;
        this.clearInputs();
        return (this.alertMessage = "Yeni şifreler birbiriyle uyuşmuyor");
      }
    },
    clearInputs() {
      this.currentPassword = "";
      this.newPassword = "";
      this.newPassword2 = "";
    },
  },
  watch: {
    changePasswordStatus() {
      if (this.changePasswordStatus !== null) {
        setTimeout(() => {
          this.changePasswordStatus = null;
          this.alertMessage = "";
        }, 3000);
      }
    },
  },
};
</script>

<style></style>
