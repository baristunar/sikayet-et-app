<template>
  <div>
    <v-row>
      <v-col cols="6" class="mx-auto">
        <v-form>
          <v-subheader class="font-weight-bold"
            >Yeni ve Eski Şifrenizi Giriniz</v-subheader
          >

          <v-text-field
            v-model="currentPassword"
            :append-icon="currentPwShow ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="currentPwShow ? 'text' : 'password'"
            name="currentPassword"
            @click:append="currentPwShow = !currentPwShow"
            label="Mevcut Şifre"
          ></v-text-field>

          <v-text-field
            v-model="newPassword"
            :append-icon="newPwShow ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="newPwShow ? 'text' : 'password'"
            name="newPassword"
            @click:append="newPwShow = !newPwShow"
            label="Yeni Şifre"
          ></v-text-field>

          <v-text-field
            v-model="newPassword2"
            :append-icon="newPw2Show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="newPw2Show ? 'text' : 'password'"
            name="newPassword2"
            @click:append="newPw2Show = !newPw2Show"
            label="Yeni Şifre Tekrar"
          ></v-text-field>

          <v-btn class="success float-right">Kaydet</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPwShow: false,
      newPwShow: false,
      newPw2Show: false,

      currentPassword: "",
      newPassword: "",
      newPassword2: "",

      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
};
</script>

<style>
</style>